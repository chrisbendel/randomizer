import React, {useState, useEffect} from 'react';
import * as moment from 'moment';

export function Clock() {
    const [time, setTime] = useState(moment());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="clock">
            <span className="clock-font">{time.format('hh')}:</span>
            <span className="clock-font">{time.format('mm')}</span>
            <div className="clock-info">
                <div className="clock-font-small">{time.format('A')}</div>
                <div className="clock-font-small">{time.format('ss')}</div>
            </div>
        </div>
    )
}
