import React, {useEffect, useRef, useState} from 'react';
import { addZero } from '../../util/dateConvert';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { start, stop } from '../../actions/recorder.actions';
import { selectDateStart } from '../../selectors/recorder.selectors';
import styles from './Recorder.scss'
import {createUserEvent} from "../../actions/user-events.actions";

const Recorder = () => {
    const dispatch = useDispatch();
    const dateStart = useSelector(selectDateStart);
    const started = dateStart !== '';
    let interval = useRef<number>(0);
    const [, setCount] = useState<number>(0);

    const handleClick = () => {
        if (started) {
            window.clearInterval(interval.current);
            dispatch(createUserEvent())
            dispatch(stop());
        } else {
            dispatch(start());
            interval.current = window.setInterval(() => {
                setCount(count => count + 1)
            }, 1000)
        }
    };

    useEffect(() => {
        return () => {
            window.clearInterval(interval.current);
        }
    }, [])

    let seconds = started ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000) : 0;
    const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
    seconds -= hours * 60 * 60;
    const minutes = seconds ?  Math.floor(seconds / 60) : 0;
    seconds -= minutes * 60;

    return (
        <div className={classnames(styles.recorder, started && styles.recorderStarted)}>
            <button
                onClick={handleClick}
                className={styles.recorderRecord}>
                <span></span>
            </button>
            <div className={styles.recorderCounter}>
                {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
            </div>
        </div>
    );
};

export default Recorder;