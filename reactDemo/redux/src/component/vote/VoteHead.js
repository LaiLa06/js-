import React from 'react'

export default class VoteHead extends React.Component{
    static defaultProps = {
      title:'标题'
    };
    constructor(props){
        super(props)
    }
    render(){
        return <div className={'panel panel-heading'}>
           <h3 className={'panel-title'}>{this.props.title}</h3>
        </div>
    }
}