import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
  listTask(filterValue) {
    return axios.get(`${apiPrefix}/tasks`,  {params: {
        offset: filterValue.offset,
        limit: filterValue.limit,
        searchparams: filterValue.filter
      }
    });
  },
  singleTask(Id) {
    return axios.get(`${apiPrefix}/tasks/${Id}`);
  },

  createTask(data) {
    return axios.post(`${apiPrefix}/tasks`, data);
  },

  updateTask(data) {
    return axios.post(`${apiPrefix}/tasks/update`, data);
  },

  deleteTask(Id) {
    return axios.delete(`${apiPrefix}/tasks/${Id}`);
  },

  listTeam() {
    return axios.get(`${apiPrefix}/team`);
  }
}