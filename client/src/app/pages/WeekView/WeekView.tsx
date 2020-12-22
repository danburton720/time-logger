import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styles from './WeekView.scss';
import moment from 'moment';
import DayContainer from '../../components/DayContainer/DayContainer';
import Recorder from '../../components/Recorder/Recorder';
import { RootState } from '../../store';
import { loadUserEvents } from '../../actions/user-events.actions';
import { selectUserEventsArray } from '../../selectors/user-events.selectors';
import { UserEvent } from '../../interfaces/user-events.interfaces';
import { addZero } from '../../util/dateConvert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const mapState = (state: RootState) => ({
    events: selectUserEventsArray(state)
});

const mapDispatch = {
    loadUserEvents
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const createDateKey = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${addZero(month)}-${addZero(day)}`;
}

const groupEventsByDay = (events: UserEvent[]) => {
    const groups: Record<string, UserEvent[]> = {};

    const addToGroup = (dateKey: string, event: UserEvent) => {
        if (groups[dateKey] === undefined) {
            groups[dateKey] = [];
        }

        groups[dateKey].push(event);
    }

    events.forEach((event) => {
        const dateStartKey = createDateKey(new Date(event.dateStart));
        const dateEndKey = createDateKey(new Date(event.dateEnd));

        addToGroup(dateStartKey, event);

        if (dateEndKey !== dateStartKey) {
            addToGroup(dateEndKey, event);
        }
    });
    return groups;
};

const WeekView: React.FC<Props> = ({events, loadUserEvents}) => {
    let groupedEvents: ReturnType<typeof groupEventsByDay> | undefined;

    moment.locale('en-gb');
    const today = moment().format('LL');
    const startOfWeek = moment().startOf('isoWeek');
    const endOfWeek = moment().endOf('isoWeek');

    const [week, setWeek] = useState({ start: startOfWeek, end: endOfWeek });

    useEffect(() => {
        loadUserEvents();
    }, [week]);

    if (events.length) {
        const weekEvents = events.filter(event =>
            moment(event.dateStart).format('LL') >= moment(week.start).format('LL') &&
            moment(event.dateEnd).format('LL') <= moment(week.end).format('LL'));
        groupedEvents = groupEventsByDay(weekEvents);
    }

    const handleLeftClick = () => {
        setWeek({
            start: moment(week.start).subtract(7, 'd'),
            end: moment(week.end).subtract(7, 'd')
        });
    }

    const handleRightClick = () => {
        setWeek({
            start: moment(week.start).add(7, 'd'),
            end: moment(week.end).add(7, 'd')
        });
    }

    return groupedEvents ? (
        <div className={styles.weekView}>
            <div>
                {`${moment(week.start).format('LL')} - ${moment(week.end).format('LL')}`}
            </div>
            <Recorder/>
            <div className={styles.weekBox}>
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={handleLeftClick}
                />
                <DayContainer
                    startOfWeek={moment(week.start).format('LL')}
                    endOfWeek={moment(week.end).format('LL')}
                    today={today}
                    weekEvents={groupedEvents}
                />
                <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={handleRightClick}
                />
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    )
};

export default connector(WeekView);