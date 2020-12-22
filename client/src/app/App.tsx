import React from 'react';

import styles from '../themes/index.scss';
import WeekView from './pages/WeekView/WeekView';
import Header from "./components/Header/Header";

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <Header />
            <WeekView />
        </div>
    )
};

export default App;