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
    const [titleEditable, setTitleEditable] = useState(false);
    const [startTimeEditable, setStartTimeEditable] = useState(false);
    const [endTimeEditable, setEndTimeEditable] = useState(false);
    const [title, setTitle] = useState(event.title);
    const [startTime, setStartTime] = useState(getTime(event.dateStart));
    const [endTime, setEndTime] = useState(getTime(event.dateEnd));

    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const handleDeleteClick = () => {
        dispatch(deleteUserEvent(event.id));
    };
    const handleTitleClick = () => {
        setTitleEditable(true);
    };
    const handleStartTimeClick = () => {
        setStartTimeEditable(true);
    };
    const handleEndTimeClick = () => {
        setEndTimeEditable(true);
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value)
    };
    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value)
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
    const handleEndTimeBlur = () => {
        if (endTime !== event.dateEnd) {
            const datePart = event.dateEnd.substring(0,11)
            const dateTime = datePart + startTime + ':00+00:00';
            dispatch(updateUserEvent({
                ...event, dateEnd: new Date(dateTime).toISOString()
            }));
        }
        setEndTimeEditable(false);
    };
    const handleTitleBlur = () => {
        if (title !== event.title) {
            dispatch(updateUserEvent({
                ...event, title
            }));
        }
        setTitleEditable(false);
    };

    useEffect(() => {
        if (titleEditable || startTimeEditable || endTimeEditable) {
            inputRef.current?.focus();
        }
    }, [titleEditable, startTimeEditable, endTimeEditable]);

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
                    onClick={handleStartTimeClick}
                >
                    {startTime}
                </span>
                <span>{` - `}</span>
                <span
                    onClick={handleEndTimeClick}
                >
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

            {endTimeEditable && (
                <div>
                    <input
                        type='time'
                        ref={inputRef}
                        onBlur={handleEndTimeBlur}
                        onChange={handleEndTimeChange}
                    />
                </div>
            )}
        </div>
    )
};

export default TimeCard;