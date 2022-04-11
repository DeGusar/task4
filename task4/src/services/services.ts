import axios from 'axios';
import { RequestLoginType } from '../types/types';

/* const url = 'https://task4-authorization.herokuapp.com/auth'; */
const url = 'http://localhost:5000/auth';
export type requestSignUpType = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};
export function createUser(bodyObject: requestSignUpType) {
  return axios.post(`${url}/registration`, {
    ...bodyObject,
  });
}
export function genereateUsers(bodyObject: requestSignUpType[]) {
  return axios.post(`${url}/create`, {
    ...bodyObject,
  });
}

export function login(body: RequestLoginType) {
  return axios.post(`${url}/login`, {
    ...body,
  });
}
export function getUsers() {
  return axios.get(`${url}/users`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('apiKey')}`,
    },
  });
}

export function blockUsers(body: string[]) {
  return axios.patch(`${url}/block`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('apiKey')}`,
    },
    body,
  });
}
export function deleteUsers(body: string[]) {
  return axios.delete(`${url}/delete`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apiKey')}`,
    },
    data: {
      body,
    },
  });
}
export function unblockUsers(body: string[]) {
  return axios.patch(`${url}/unblock`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('apiKey')}`,
    },
    body,
  });
}
