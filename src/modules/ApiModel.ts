// export async function GetUserType(id: number): Promise<UserType> {
//   return fetch("https://ituapi.herokuapp.com/user-types/" + id)
//     .then(response => response.json())
//     .then(data => data as UserType);
// }

import { use } from "vue/types/umd";

export async function GetEventTypes(): Promise<EventType[]> {
  return fetch("https://ituapi.herokuapp.com/event-types/")
    .then(response => response.json())
    .then(data => data as EventType[]);
}

export async function GetUser(id: number): Promise<User> {
  const user = await fetch("https://ituapi.herokuapp.com/users/" + id)
    .then(response => response.json())
    .then(data => data as User);

  // const UserType = await GetUserType(user.type);
  // user.typeObj = UserType;
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
        event.eventTypeObj = types.find(a => a.id === event.eventType)
        event.pilotObj = users.find(a=> a.id === event.pilotId)
        event.escortObj = users.find(a=> a.id === event.escortId)
      });
      return events;
    });
}
export async function getEventsInDate(date: Date): Promise<Event[]>{
    return GetEvents().then(events => events.filter(event => new Date(event.meetDate).toLocaleDateString() == date.toLocaleDateString()))
}

export async function GetUserEvents(userId: number): Promise<Event[]> {
  return GetEvents().then(events =>
    events.filter(
      event => event.pilotId === userId || event.escortId === userId,
    ),
  );
}

export async function GetEventBasic(eventId: number): Promise<Event>{
  const eventStates = await GetEventTypes();
  const users = await GetUsers();
  return fetch(`https://ituapi.herokuapp.com/events/` + eventId)
  .then(response => response.json())
  .then (data => data as Event)
}
export async function GetEvent(eventId: number): Promise<Event>{
  const eventStates = await GetEventTypes();
  const users = await GetUsers();
  
  return GetEventBasic(eventId).then (event => {
    event.eventTypeObj = eventStates.find(state => state.id == event.eventType);
    event.pilotObj = users.find(user => user.id == event.pilotId);
    event.escortObj = users.find(user => user.id == event.escortId);
    event.registeredEscortsObjArr = users.filter(user => event.registeredEscortIds?.includes(user.id));
    event.registeredPilotObjArr = users.filter(user => event.registeredPilotIds?.includes(user.id));
    return event;
  })
}


export enum role{
  pilot,
  escort
}

export async function regAsPilotOrEscort(regAs: role, eventId: number, userId: number)
{
  const event = await GetEventBasic(eventId);
  const ids = {
    registeredPilotIds: event.registeredPilotIds, 
    registeredEscortIds: event.registeredEscortIds
  }
  regAs == role.pilot ? ids.registeredPilotIds?.push(userId) : ids.registeredEscortIds?.push(userId);
  fetch(`https://ituapi.herokuapp.com/events/` + eventId, {
    method: 'PATCH',
    body: JSON.stringify(ids),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
}

export async function logoutAsPilotOrEscort(regAs: role, eventId: number, userId: number)
{


  const event = await GetEventBasic(eventId);
  
  const ids = {
    registeredPilotIds: event.registeredPilotIds, 
    registeredEscortIds: event.registeredEscortIds
  }

  if(regAs == role.pilot)
  {
    ids.registeredPilotIds = ids.registeredPilotIds?.filter(x => x!=userId)
  }
  else
  {
    ids.registeredEscortIds= ids.registeredEscortIds?.filter(x => x!=userId)
  }
  fetch(`https://ituapi.herokuapp.com/events/` + eventId, {
    method: 'PATCH',
    body: JSON.stringify(ids),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
}
export interface User {
  id: number;
  name: string;
  // type: number;
  // typeObj: UserType | undefined;
  phone: string;
  email: string;
}

// interface UserType {
//   id: number;
//   key: string;
//   displayString: string;
// }

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
  registeredPilotIds: number[]|undefined;
  registeredPilotObjArr: User[]|undefined;
  registeredEscortIds: number[]|undefined;
  registeredEscortsObjArr: User[]|undefined;
}
