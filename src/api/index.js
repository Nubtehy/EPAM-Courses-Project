import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
  listTask(filterValue) {
    return axios.get(`${apiPrefix}/tasks`,  {params: {
        offset: filterValue.offset,
        limit: filterValue.limit
      }
    });
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