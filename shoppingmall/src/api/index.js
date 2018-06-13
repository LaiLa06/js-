// 使用axios请求数据
import axios from "axios"

// 配置基础路径
axios.defaults.baseURL = "https://www.easy-mock.com/mock/5b20c68116889c6fc1c504bc/shoppingmall";
axios.interceptors.response.use((res)=>res.data.data);

export let getSlidesDate=()=>{
  return axios.get('/slides')
};
