export async function GetUserType(id: number): Promise<UserType> {
  return fetch("https://ituapi.herokuapp.com/user-types/" + id)
    .then(response => response.json())
    .then(data => data as UserType);
}

export async function GetEventTypes(): Promise<EventType[]> {
  return fetch("https://ituapi.herokuapp.com/event-types/")
    .then(response => response.json())
    .then(data => data as EventType[]);
}

export async function GetUser(id: number): Promise<User> {
  const user = await fetch("https://ituapi.herokuapp.com/users/" + id)
    .then(response => response.json())
    .then(data => data as User);

  const UserType = await GetUserType(user.type);
  user.typeObj = UserType;
  return user;
}

export async function GetUsers(): Promise<User[]> {
  return fetch("https://ituapi.herokuapp.com/users/")
    .then(response => response.json())
    .then(data => data as User[]);
}

export async function GetEvents(): Promise<Event[]> {
  const types = await GetEventTypes();
  const users = await GetUsers();
  return fetch(`https://ituapi.herokuapp.com/events/`)
    .then(response => response.json())
    .then(data => data as Event[])
    .then(events => {
      events.forEach(event => {
        event.eventTypeObj = types.find(a => a.id === event.eventType);
        event.pilotObj = users.find(a=> a.id === event.pilotId);
        event.escortObj = users.find(a=> a.id === event.escortId);
      });
      return events;
    });
}

export async function GetUserEvents(userId: number): Promise<Event[]> {
  return GetEvents().then(events =>
    events.filter(
      event => event.pilotId === userId || event.escortId === userId,
    ),
  );
}

export interface User {
  id: number;
  name: string;
  type: number;
  typeObj: UserType | undefined;
  phone: string;
  email: string;
}

interface UserType {
  id: number;
  key: string;
  displayString: string;
}

interface EventType {
  id: number;
  key: string;
  displayString: string;
}

export interface Event {
  id: number;
  meetPoint: string;
  startPoint: string;
  pilotId: number;
  pilotObj: User|undefined;
  escortId: number;
  escortObj: User|undefined;
  eventType: number;
  eventTypeObj: EventType | undefined;
  meetDate: string;
  startDate: string;
  customerPhone: string;
  description: string;
  customerCount: number;
}
