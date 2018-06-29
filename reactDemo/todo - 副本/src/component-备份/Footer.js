import React from 'react'
import action from "../store/action";
import {connect} from "react-redux";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        /*自己构建展示按钮的数据*/
        this.showData = [{text:'全部',flag:'all'},{text:'已完成',flag:'complete'},{text:'未完成',flag:'uncompleted'}]
    }

    render() {
        let {flag} = this.props;

        return <div className={'panel-footer'}>
            <ul className={'nav nav-pills'} onClick={this.updateFilter}>
                {
                    this.showData.map((item, index) => {
                        let {text, flag: itemFlg} = item;
                        return <li key={index} className={itemFlg === flag ? 'presentation active' : 'presentation'}>
                            <a flag={itemFlg}>{text}</a>
                        </li>
                    })
                }
            </ul>
        </div>
    }

    updateFilter = ev => {
        let target = ev.target,
            tagTag = target.tagName;
        /*合并事件源:事件源是LI，也让其变为里面的A */
        if (tagTag === 'LI') {
            target = target.firstElementChild;
            tagTag = target.tagName
        }
        if (tagTag === 'A') {
            let text = target.getAttribute('flag');
            target.innerHTML === '已完成' ? text = 'complete' : null;
            target.innerHTML === '未完成' ? text = 'uncompleted' : null;
            if (this.props.flag === text) return;   //如果当前筛选状态和点击的是一样，就没必要修改状态了
            this.props.filter(text);
        }
    }
}

export default connect(state => ({...state.todo}), action.todo)(Footer)