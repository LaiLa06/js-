import React from 'react'
import PropsTypes from "prop-types";
import action from '../../store/action'

export default class VoteFooter extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        let {store: {dispatch}} = this.props;

        return <div className={'panel-footer text-right'}>
            <button className={'btn btn-success'} onClick={() => {
                dispatch(action.vote.support())
            }}>支持︿(￣︶￣)︿
            </button>
            <button className={'btn btn-danger'} style={{marginLeft: '20px'}} onClick={() => {
                dispatch(action.vote.against())
            }}>反对╮(╯﹏╰）╭
            </button>
        </div>
    }
}

