export interface UserEvent {
    id: number;
    title: string;
    dateStart: string;
    dateEnd: string;
}

export interface UserEventsState {
    byIds: Record<UserEvent['id'], UserEvent>;
    allIds: UserEvent['id'][];
}