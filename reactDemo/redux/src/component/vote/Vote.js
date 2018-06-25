import React from 'react'
import PropsTypes from 'prop-types'
import VoteHead from "./VoteHead";
import VoteBody from "./VoteBody";
import VoteFooter from "./VoteFooter";


export default class Vote extends React.Component {
    static  defaultProps = {
      title:'标题'
    };   // 默认属性

    constructor(props) {
        super(props);
    }

    render() {
        let {store} = this.props;
        // title是标题，count是初始投票人数
        return <section className={'panel panel-default'} style={{width:'80%',margin:'20px auto'}}>
            <VoteHead/>
            <VoteBody store = {store}/>
            <VoteFooter store={store}/>
        </section>
    }
}