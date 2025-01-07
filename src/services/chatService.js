import axios from './customizeAxios';

const fetchMessage = (query, session_id) => {
    return axios.post(`/query`, { query, session_id });
};
export { fetchMessage };
