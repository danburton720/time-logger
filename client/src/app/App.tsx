import React from 'react';

import styles from '../themes/index.scss';
import WeekView from './pages/WeekView/WeekView';

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <WeekView />
        </div>
    )
};

export default App;