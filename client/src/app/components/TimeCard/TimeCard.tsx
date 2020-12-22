import React, { useEffect, useRef, useState } from 'react';
import styles from './TimeCard.scss';
import { getTime } from '../../util/dateConvert';
import { deleteUserEvent, updateUserEvent } from '../../actions/user-events.actions';
import { useDispatch } from 'react-redux';
import { UserEvent } from '../../interfaces/user-events.interfaces';

interface Props {
    event: UserEvent;
}

const TimeCard: React.FC<Props> = ({event}) => {
    const dispatch = useDispatch();
    const handleDeleteClick = () => {
        dispatch(deleteUserEvent(event.id));
    };
    const [titleEditable, setTitleEditable] = useState(false);
    const handleTitleClick = () => {
        setTitleEditable(true);
    };
    const [startTimeEditable, setStartTimeEditable] = useState(false);
    const handleTimeClick = () => {
        setStartTimeEditable(true);
    };
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (titleEditable || startTimeEditable) {
            inputRef.current?.focus();
        }
    }, [titleEditable, startTimeEditable]);
    const [title, setTitle] = useState(event.title);
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const [startTime, setStartTime] = useState(getTime(event.dateStart));
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value)
    }
    const [endTime, setEndTime] = useState(getTime(event.dateEnd));
    const handleTitleBlur = () => {
        if (title !== event.title) {
            dispatch(updateUserEvent({
                ...event, title
            }));
        }
        setTitleEditable(false);
    };
    const handleStartTimeBlur = () => {
        if (startTime !== event.dateStart) {
            const datePart = event.dateStart.substring(0,11)
            const dateTime = datePart + startTime + ':00+00:00';
            dispatch(updateUserEvent({
                ...event, dateStart: new Date(dateTime).toISOString()
            }));
        }
        setStartTimeEditable(false);
    };
    return (
        <div className={styles.timeCard}>
            {titleEditable ? (
                <input
                    type='text'
                    ref={inputRef}
                    value={title}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                />
            ) : (
                <span
                    onClick={handleTitleClick}
                >
                    {event.title}
                </span>
            )}
            <button
                className={styles.timeCardDelete}
                onClick={handleDeleteClick}
            >
                &times;
            </button>
            <div className={styles.timeRange}>
                <span
                    onClick={handleTimeClick}
                >
                    {startTime}
                </span>
                <span>{` - `}</span>
                <span>
                    {endTime}
                </span>
            </div>

            {startTimeEditable && (
                <div>
                    <input
                        type='time'
                        ref={inputRef}
                        onBlur={handleStartTimeBlur}
                        onChange={handleStartTimeChange}
                    />
                </div>
            )}
        </div>
    )
};

export default TimeCard;