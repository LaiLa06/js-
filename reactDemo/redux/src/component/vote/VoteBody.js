import React from 'react'
import PropsTypes from 'prop-types'

export default class VoteBody extends React.Component {
    constructor(props) {
        super(props);
        // init state
        let {store: {getState}} = this.props,
            {n, m} = getState().vote;
        this.state = {n, m};

    }

    componentDidMount() {
        let {store: {getState, subscribe}} = this.props;
        /*subscribe:事件池追加方法，当容器中的状态改变，事件池中的方法会执行
*/
        let unsubscribe = subscribe(() => {
          let {n,m} = getState().vote;
          this.setState({
              n,m
          })
        })
        // unsubscribe() 把当前追加的方法再移除，解除绑定的方法
    }

    render() {
        let {n, m} = this.state,
            rate = (n / (n + m)) * 100;
        isNaN(rate) ? rate = 0 : null;

        return <div className={'panel-body'}>
            支持人数：<span>{n}</span> <br/>
            反对人数：<span>{m}</span><br/>
            支持比率：<span>{rate.toFixed(2) + '%'}</span>
        </div>
    }
}

