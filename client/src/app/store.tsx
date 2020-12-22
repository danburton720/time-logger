import userEventsReducer from './reducers/user-events.reducer';
import recorderReducer from "./reducers/recorder.reducer";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    userEvents: userEventsReducer,
    recorder: recorderReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;