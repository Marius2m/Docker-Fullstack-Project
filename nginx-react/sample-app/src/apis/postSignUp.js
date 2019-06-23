import axios from 'axios';

export const postSignUp = async () => {
    const namesArr = ["Marius", "Alex", "Andra", "Cristina", "Daian"];
    const ageArr = [19, 22, 18, 45, 33];
    const index = Math.floor(Math.random() * 5);

    let userData = {
        name: namesArr[index]
    };
    
    if (index % 2 === 0) {
        userData.age = ageArr[index]
    }

    try {
        const response = await axios.post('http://192.168.99.100:3000/signup', userData);
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
        }
    }
}

export default postSignUp;