import axios from 'axios'

axios.defaults.timeout = 5000;

axios.defaults.headers = {'Content-Type': 'application/json;charset=UTF-8'};

//axios.defaults.baseURL = 'http://localhost:8080'; // 自己模拟接口
//axios.defaults.baseURL = 'https://easy-mock.com/mock/5a700f5ae1c78c20ab62a976/relay'; // 自己模拟接口

axios.defaults.transformRequest = data => {
  let str = ``;
  if (data && typeof data === 'object') {
    for (let attr in data) {
      if (data.hasOwnProperty(attr)) {
        str += `${attr}=${data[attr]}&`;
      }
    }
  }
  return str.substring(0, str.length - 1);
};
// 返回状态判断
axios.interceptors.response.use(result => result.data);

export function post (url, params) {
  return axios.post(url, params)
    .then(res => (res.data)).catch((error) => {console.log(error)});
}

export function get (url, params) {
  return axios.get({
    url,
    params,
  }).then(res => res.data).catch((error) => {});
}
