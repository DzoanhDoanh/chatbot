import axios from './customize-axios';

const fetchMessage = (message) => {
    return axios.get(`users?message=${message}`);
};
export { fetchMessage };
