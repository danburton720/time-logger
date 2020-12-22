import React from 'react';
import moment from 'moment';
import styles from './Day.scss';
import TimeCard from '../TimeCard/TimeCard';
import { DateData } from '../../util/dateRange';
import classnames from 'classnames';
import { UserEvent } from '../../interfaces/user-events.interfaces';
import { createUserEvent } from '../../actions/user-events.actions';
import { useDispatch } from 'react-redux';

const Day: React.FC<{day: DateData, today: string, dayEvents: UserEvent[] }> = ({ day, today, dayEvents }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(createUserEvent(day.date))
    }

    const isToday = today === moment(day.date).format('LL');
    return (
        <div className={classnames(styles.day, isToday && styles.today )}>
            <span className={styles.dayTitle}>{day.dayTitle}</span>
            <span>{moment(day.date).format('LL')}</span>
            {dayEvents && dayEvents.map(event => {
                return (
                    <TimeCard
                    key={event.id}
                    event={event}
                />
                )
            })}
            <button
                className={styles.dayButton}
                onClick={handleClick}
            >
                Add event
            </button>
        </div>
    )
};

export default Day;