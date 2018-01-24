import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
  listTask() {
    return axios.get(`${apiPrefix}/tasks`);
  },
  singleTask(Id) {
    return axios.get(`${apiPrefix}/tasks/${Id}`);
  },

  createTask(data) {
    return axios.post(`${apiPrefix}/tasks`, data);
  },

  deleteTask(Id) {
    return axios.delete(`${apiPrefix}/tasks/${Id}`);
  }
}