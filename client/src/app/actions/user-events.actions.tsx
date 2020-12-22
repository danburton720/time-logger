import 'regenerator-runtime/runtime';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { Action} from 'redux';
import { UserEvent } from '../interfaces/user-events.interfaces';
import { selectDateStart } from '../selectors/recorder.selectors';

export const LOAD_REQUEST = 'userEvents/load_request';
export const LOAD_SUCCESS = 'userEvents/load_success';
export const LOAD_FAILURE = 'userEvents/load_failure';
export const CREATE_REQUEST = 'userEvents/create_request';
export const CREATE_SUCCESS = 'userEvents/create_success';
export const CREATE_FAILURE = 'userEvents/create_failure';
export const UPDATE_REQUEST = 'userEvents/update_request';
export const UPDATE_SUCCESS = 'userEvents/update_success';
export const UPDATE_FAILURE = 'userEvents/update_failure';
export const DELETE_REQUEST = 'userEvent/delete_request';
export const DELETE_SUCCESS = 'userEvent/delete_success';
export const DELETE_FAILURE = 'userEvent/delete_failure';

export interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}
export interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
    payload: {
        events: UserEvent[];
    }
}
export interface LoadFailureAction extends Action<typeof LOAD_FAILURE> {
    error: string
}

export interface CreateRequestAction extends Action<typeof CREATE_REQUEST> {}
export interface CreateSuccessAction extends Action<typeof CREATE_SUCCESS> {
    payload: {
        event: UserEvent;
    }
}
export interface CreateFailureAction extends Action<typeof CREATE_FAILURE> {}

export interface UpdateRequestAction extends Action<typeof UPDATE_REQUEST> {}
export interface UpdateSuccessAction extends Action<typeof UPDATE_SUCCESS> {
    payload: {event: UserEvent}
}
export interface UpdateFailureAction extends Action<typeof UPDATE_FAILURE> {}

export interface DeleteRequestAction extends Action<typeof DELETE_REQUEST> {}
export interface DeleteSuccessAction extends Action<typeof DELETE_SUCCESS> {
    payload: {id: UserEvent['id']}
}
export interface DeleteFailureAction extends Action<typeof DELETE_FAILURE> {}

export const loadUserEvents = (): ThunkAction<
    void,
    RootState,
    undefined,
    LoadRequestAction | LoadSuccessAction | LoadFailureAction
    > => async (dispatch) => {
    dispatch({
        type: LOAD_REQUEST
    });

    try {
        const response = await fetch('http://localhost:3001/events');
        const events: UserEvent[] = await response.json();

        dispatch({
            type: LOAD_SUCCESS,
            payload: { events }
        });
    } catch (e) {
        dispatch({
            type: LOAD_FAILURE,
            error: 'Failed to load events.'
        });
    }
};

export const createUserEvent = (startDate?: string):ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    CreateRequestAction | CreateSuccessAction | CreateFailureAction
    > => async (
    dispatch,
    getState
) => {
    dispatch({
        type: CREATE_REQUEST
    });

    try {
        let dateStart = '';
        let dateEnd = '';
        if (startDate) {
            dateStart = startDate;
            dateEnd = startDate;
        } else {
            dateStart = selectDateStart(getState());
            dateEnd = new Date().toISOString();
        }

        const event: Omit<UserEvent, 'id'> = {
            title: 'No name',
            dateStart,
            dateEnd
        }

        const response = await fetch(`http://localhost:3001/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });

        const createdEvent: UserEvent = await response.json();

        dispatch({
            type: CREATE_SUCCESS,
            payload: { event: createdEvent }
        });
    } catch (e) {
        dispatch({
            type: CREATE_FAILURE
        })
    }
};

export const updateUserEvent = (event: UserEvent): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    UpdateRequestAction | UpdateSuccessAction | UpdateFailureAction
    > => async dispatch => {
    dispatch({
        type: UPDATE_REQUEST
    })

    try {
        const response = await fetch(`http://localhost:3001/events/${event.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });
        const updatedEvent: UserEvent = await response.json();

        dispatch({
            type: UPDATE_SUCCESS,
            payload: {event: updatedEvent}
        });
    } catch (e) {
        dispatch({
            type: UPDATE_FAILURE
        })
    }
};

export const deleteUserEvent = (id: UserEvent['id']): ThunkAction<
    Promise<void>,
    RootState,
    undefined,
    DeleteRequestAction | DeleteSuccessAction | DeleteFailureAction
    > => async (dispatch) => {
    dispatch({
        type: DELETE_REQUEST
    });

    try {
        const response = await fetch(`http://localhost:3001/events/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch({
                type: DELETE_SUCCESS,
                payload: { id }
            })
        }
    } catch (e) {
        dispatch({
            type: DELETE_FAILURE
        })
    }
};