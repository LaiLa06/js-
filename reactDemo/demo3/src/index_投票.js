import React from 'react';
import ReactDOM, {render} from 'react-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css'

class Vote extends React.Component {
    constructor() {
        super();
        this.state = {
            n: 0, // 支持人数
            m: 0  // 反对人数
        }
    }

    static defaultProps = {
        title: ''
    };
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    render() {
        let {n, m} = this.state,
            rate = (n + m) === 0 ? '0%' : ((n / (n + m)) * 100).toFixed(2) + '%';

        return <section className='panel panel-default'>
            <div className='panel-heading'>
                <h3 className='panel-title'>{this.props.title}</h3>
            </div>
            <div className='panel-body'>
               {/* 支持人数：{n}
                <br/>
                反对人数：{m}
                <br/>
                支持率：{rate}*/}

              {/*  支持人数：<span ref='spanLeft'>0</span>
                <br/>
                反对人数：<span ref='spanRight'>0</span>
                <br/>
                支持率：<span ref='spanRate'></span>*/}

                {/* 直接挂载在实例上，用的时候直接从this上解构 */}
                支持人数：<span ref={x => this.spanLeft = x}>0</span>
                <br/>
                反对人数：<span ref={x => this.spanRight = x}>0</span>
                <br/>
                支持率：<span ref={x => this.spanRate =x }></span>
            </div>
            <div className='panel-footer'>
                {/*<input type="button" value='支持' className='btn btn-success' onClick={this.support.bind(this)}/>*/}
                <button className='btn btn-success' onClick={this.support}>支持</button>
                <button className='btn btn-danger' onClick={this.against}>反对</button>
            </div>
        </section>;
    }

    support = ev => {
        // JSX中的事件绑定，this是undefined ，这样不太好，我想让this是当前实例，所以真实项目中，给JSX元素绑定的事件方法，一般都是箭头函数
        // ev.target   通过事件源可以获取当前操作的元素（一般很少操作，框架用数据驱动DOM的改变）
        // this.setState({n: this.state.n + 1})
        // refs: 是react中专门提供操作DOM来实现需求的方式，它是个对象，存储了当前组件中所有的设置ref属性的元素
        // （元素的ref属性值是啥，refs中存储的元素的属性名是啥）

        // let {spanLeft} = this.refs;
        let {spanLeft} = this;

        spanLeft.innerHTML++;
        this.computed();
    };
    against = ev => {
        // this.setState({m: this.state.m + 1});
        // let {spanRight} = this.refs;
        let {spanRight} = this;
        spanRight.innerHTML++;
        this.computed();
    };
    computed = () => {
        // let {spanLeft, spanRight, spanRate} = this.refs,
        let {spanLeft, spanRight, spanRate} = this,
            n = parseFloat(spanLeft.innerHTML),
            m = parseFloat(spanRight.innerHTML),
            rate = (n + m) === 0 ? '0%' : ((n / (n + m) * 100).toFixed(2) + '%');
        spanRate.innerHTML = rate;


    }
}


ReactDOM.render(<div>
    <Vote title='世界杯 法国VS秘鲁'/>
</div>, root);


/*
在react当中：
1、基于数据驱动（修改状态数据，react帮助我们重新渲染视图）完成的组件叫做“受控组件（受数据管控的组件）”
2、基于ref操作DOM实现视图更新，叫做“非受控组件”
真实项目中，建议多使用“受控组件”
*/
