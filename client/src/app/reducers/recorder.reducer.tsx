import { RecorderState } from '../interfaces/recorder.interfaces';
import { START, StartAction, STOP, StopAction } from '../actions/recorder.actions';

const initialState: RecorderState = {
    dateStart: ''
};

const recorderReducer = (
    state: RecorderState = initialState,
    action: StartAction | StopAction
) => {
    switch (action.type) {
        case START:
            return { ...state, dateStart: new Date().toISOString() };

        case STOP:
            return { ...state, dateStart: '' };

        default:
            return state;
    }
};

export default recorderReducer;