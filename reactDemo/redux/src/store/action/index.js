/*
合并所有的actionCreator：类似reducer合并，为了防止冲突，合并后的对象是以版块名称单独划分管理
action={
 vote：{
   xxx(){}
 },
 personal：{}
}
*/

import vote from './vote'
import personal from './personal'

let action = {
    vote,
    personal
}

export default action;