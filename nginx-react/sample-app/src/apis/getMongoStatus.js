import axios from 'axios';

export const getMongoStatus = async () => {
    try {
        const response = await axios.get('http://192.168.99.100:3000/mongoStatus');
        if (response) {
            return {
                status: response.status,
                data: response.data,
            }
        }
    } catch (err) {
        return {
            err: err,
            data: [],
            status: err.response.status
        }
    }
}

export default getMongoStatus;