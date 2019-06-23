import React, { useState } from 'react';
import { getAggregationTime } from '../apis/getAggregationTime';

const FetchData = () => {
    const [aggregationTime, setAggregationTime] = useState(null);

    return (
        <div >
            <h1>FetchData</h1>
            <button onClick={async () => {
                let data = await getAggregationTime();
                setAggregationTime(data.time);
                console.log("Fetched data is: ", data);
              }}>
                Display Aggregation Time
              </button>
              {aggregationTime ? <p>{aggregationTime}</p> : null}
        </div>
    );
}

export default FetchData;
