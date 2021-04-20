import axios from 'axios'

const http = axios.create({})

http.interceptors.request.use((req) => {
  return req;
})

http.interceptors.response.use((res) => {
  return res;
})

export default http;