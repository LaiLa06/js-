import React from 'react';
import ReactDOM from 'react-dom';

class Vote extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <section className='panel panel-default' style={{width:'60%',margin:'20px auto'}}>
           <div className='panel-heading'>
               <h3></h3>
           </div>
            <div>
                支持人数:
                <br/>
                <br/>
                反对人数:
                <br/>
                <br/>
                支持率：
            </div>
            <div><button>支持</button>&nbsp;&nbsp;<button>反对</button></div>
        </section>
    }
}

