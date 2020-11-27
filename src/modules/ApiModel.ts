export async function GetUser(id: number): Promise<User> {
  return fetch("https://ituapi.herokuapp.com/users/" + id)
    .then(response => response.json())
    .then(data => data as User);
}

interface User {
  id: number;
  name: string;
  type: number;
  typeStr: string;
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

interface Events {
  id: number;
  meetPoint: string;
  startPoint: string;
  pilotId: number;
  escortId: number;
  eventType: number;
  meetDate: string;
  startDate: string;
  customerPhone: string;
  description: string;
}
