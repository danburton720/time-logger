import React, { useEffect, useRef, useState } from 'react';
import styles from './TimeCard.scss';
import { getTime } from '../../util/dateConvert';
import { deleteUserEvent, updateUserEvent } from '../../actions/user-events.actions';
import { useDispatch } from 'react-redux';
import { UserEvent } from '../../interfaces/user-events.interfaces';

interface Props {
    event: UserEvent;
}

const TimeCard: React.FC<Props> = ({ event }) => {
    const dispatch = useDispatch();
    const handleDeleteClick = () => {
        dispatch(deleteUserEvent(event.id));
    };
    const [editable, setEditable] = useState(false);
    const handleTitleClick = () => {
        setEditable(true);
    };
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (editable) {
            inputRef.current?.focus();
        }
    }, [editable]);
    const [title, setTitle] = useState(event.title);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleBlur = () => {
        if (title !== event.title) {
            dispatch(updateUserEvent({
                ...event, title
            }));
        }
        setEditable(false);
    };
    const startTime = getTime(event.dateStart);
    const endTime = getTime(event.dateEnd);
    return (
        <div className={styles.timeCard}>
            {editable ? (
                <input
                    type='text'
                    ref={inputRef}
                    value={title}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
            <span>{startTime} - {endTime}</span>
        </div>
    )
};

export default TimeCard;