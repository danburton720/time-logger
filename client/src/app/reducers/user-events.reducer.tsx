import { UserEventsState } from '../interfaces/user-events.interfaces';
import {
    CREATE_SUCCESS,
    CreateSuccessAction,
    DELETE_SUCCESS,
    DeleteSuccessAction,
    LOAD_SUCCESS,
    LoadSuccessAction,
    UPDATE_SUCCESS,
    UpdateSuccessAction
} from '../actions/user-events.actions';

const initialState: UserEventsState = {
    byIds: {},
    allIds: []
}

const userEventsReducer = (
    state: UserEventsState = initialState,
    action:
        | LoadSuccessAction
        | CreateSuccessAction
        | UpdateSuccessAction
        | DeleteSuccessAction
) => {
    switch (action.type) {
        case LOAD_SUCCESS:
            const { events } = action.payload;
            return {
                ...state,
                allIds: events.map(({ id }) => id),
                byIds: events.reduce<UserEventsState['byIds']>((byIds, event) => {
                    byIds[event.id] = event;
                    return byIds;
                }, {})
            };

        case CREATE_SUCCESS:
            const { event } = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, event.id],
                byIds: { ...state.byIds, [event.id]: event }
            };

        case UPDATE_SUCCESS:
            const { event: updatedEvent } = action.payload;
            return {
                ...state,
                byIds: {...state.byIds, [updatedEvent.id]: updatedEvent}
            };

        case DELETE_SUCCESS:
            const { id } = action.payload;
            const newState = {
                ...state,
                byIds: { ...state.byIds },
                allIds: state.allIds.filter(storedId => storedId !== id)
            }
            delete newState.byIds[id];
            return newState;

        default:
            return state;
    }
};

export default userEventsReducer;