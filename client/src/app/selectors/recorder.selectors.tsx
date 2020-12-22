import { RootState } from '../store';

export const selectRecorderState = (rootState: RootState) => rootState.recorder;
export const selectDateStart = (rootState: RootState) =>
    selectRecorderState(rootState).dateStart;