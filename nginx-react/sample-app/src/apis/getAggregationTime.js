import axios from 'axios';

export const getAggregationTime = async () => {
    try {
        const response = await axios.get('http://192.168.99.100:3000/getAggregationTime');
        if (response.data) {
            return {
                time: response.data.time,
                persons: response.data.allPersons
            }
        }
    } catch (err) {
        return {
            err: err,
            data: [],
        }
    }
}

export default getAggregationTime;