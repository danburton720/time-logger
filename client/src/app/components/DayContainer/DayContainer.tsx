import React from 'react';
import styles from './DayContainer.scss';
import Day from '../Day/Day';
import { weekRange } from '../../util/dateRange';
import moment from 'moment';
import { UserEvent } from '../../interfaces/user-events.interfaces';

interface Props {
    startOfWeek: string;
    endOfWeek: string;
    today: string;
    weekEvents: Record<string, UserEvent[]>
}

const returnDays = (
    startOfWeek: string,
    endOfWeek: string,
    today: string,
    weekEvents: Record<string, UserEvent[]>
) => {
    let days = weekRange(startOfWeek, endOfWeek);
    return days.map((day, index: number) => {
        const dayEvents = weekEvents ? weekEvents[moment(day.date).format('YYYY-MM-DD')] : [];
        return <Day key={index} day={day} today={today} dayEvents={dayEvents} />
    });
};

const DayContainer: React.FC<Props> = (
    {startOfWeek, endOfWeek, today, weekEvents}
    ) => {
    return (
        <div className={styles.dayContainer}>
            {returnDays(startOfWeek, endOfWeek, today, weekEvents)}
        </div>
    )
};

export default DayContainer;




