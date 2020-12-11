//autor: Jiří Vlasák
import { Event, User } from "./ApiModel";
const colors = ["red", "blue", "yellow", "green"];


export function escortEventsCountData(events: Event[], userId: number): {}
{
    const escortCount = events.filter(
        (a) => a.escortId == userId,
    ).length;
    const pilotCount = events.filter((a) => a.pilotId == userId)
        .length;
    return {
        labels: ["Jako doprovod", "Jako pilot"],
        datasets: [
            {
                label: "Počet letů",
                backgroundColor: [colors[0], colors[1]],

                data: [escortCount, pilotCount],
            },
        ],
    };
}

export function weekDayCounts(events: Event[]): {}
{
    const eventsCounts = Array(7).fill(0);
    const customerCounts = Array(7).fill(0);
    events.forEach(event =>
    {
        const day = new Date(event.startDate).getDay()
        eventsCounts[day] += 1;
        customerCounts[day] += event.customerCount;
    });
    const days = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
    return {
        labels: days,
        datasets: [
            {
                label: "Počet letů",
                backgroundColor: colors[0],
                data: eventsCounts,
            },
            {
                label: "Počet zákazníků",
                backgroundColor: colors[1],
                data: customerCounts,
            },
        ],
    };
}

export function monthsCounts(events: Event[]): {}
{
    const eventsCounts = Array(12).fill(0);
    const customerCounts = Array(12).fill(0);

    events.forEach(event =>
    {
        const month = new Date(event.startDate).getMonth()
        eventsCounts[month] += 1;
        customerCounts[month] += event.customerCount;
    });
    return {
        labels: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
        datasets: [
            {
                label: "Počet letů",
                backgroundColor: colors[0],

                data: eventsCounts,
            },
            {
                label: "Počet zákazníků",
                backgroundColor: colors[1],

                data: customerCounts,
            },
        ],
    };
}

export function userEvents(events: Event[], users: User[]): {}
{
    const userCounts: { [s: number]: number } = {};
    users.forEach((user) =>
    {
        userCounts[user.id] = 0;
    });
    events.forEach((event) =>
    {
        if (event.pilotId)
        {
            userCounts[event.pilotId] += 1;
        }
        if (event.escortId)
        {
            userCounts[event.escortId] += 1;
        }
    });

    return {
        labels: users.sort((a) => a.id).map((a) => a.name),
        datasets: [
            {
                label: "Počet letů",
                backgroundColor: colors[0],
                data: Object.values(userCounts),
            },
        ],
    };
}