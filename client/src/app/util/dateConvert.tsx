export const addZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

export const getTime = (date: string): string => {
    const event = new Date(date);
    const eventHours = event.getHours();
    const eventMinutes = event.getMinutes();
    return `${addZero(eventHours)}:${addZero(eventMinutes)}`;
}