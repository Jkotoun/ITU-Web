import {Event, User} from "./ApiModel";

export function weekDayCounts(events: Event[]): {} {
    const eventsCounts = Array(7).fill(0);
    const customerCounts = Array(7).fill(0);
    events.forEach(event => {
        const day = new Date(event.startDate).getDay()
        eventsCounts[day]+=1;
        customerCounts[day]+= event.customerCount;
    });  
    const days = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
    return {
      labels: days,
      datasets: [
        {
            data: eventsCounts,
        },
        {
            data: customerCounts,
        },
      ],
    };
  }

  export function monthsCounts(events: Event[]): {} {
    const eventsCounts = Array(12).fill(0);
    const customerCounts = Array(12).fill(0);

   events.forEach(event => {
       const month = new Date(event.startDate).getMonth()
       eventsCounts[month]+=1;
       customerCounts[month]+= event.customerCount;
   });  
    return {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
            data: eventsCounts,
        },
        {
            data: customerCounts,
        },
      ],
    };
  }

  export function userEvents(events: Event[], users: User[]): {} {
    const userCounts: { [s: number]: number } = {};
    users.forEach((user) => {
      userCounts[user.id] = 0;
    });
    events.forEach((event) => {
      if (event.pilotId) {
        userCounts[event.pilotId] += 1;
      }
      if (event.escortId) {
        userCounts[event.escortId] += 1;
      }
    });

    return {
      labels: users.sort((a) => a.id).map((a) => a.name),
      datasets: [
        {
          data: Object.values(userCounts),
        },
      ],
    };
  }