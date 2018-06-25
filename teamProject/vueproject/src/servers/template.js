/*
  title：规则模块
  author：Laila
*/

import {get,post} from '../plugin/request.js'

export default {
  /**
   * 获取规则列表
   */
  getRuleList(params) {
    let url = "/liveRuleList";
    return post(url, params);
  },
  /**
   * 获取个人信息
   */
  getRuleList(params) {
    let url = "/personal";
    return get(url, params);
  },
}
