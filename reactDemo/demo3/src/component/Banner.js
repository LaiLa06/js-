/*<Banner data={IMG_DATA} interval={3000} step={1} speed={300}/>*/
import React from 'react'
import PropTypes from 'prop-types'
import '../static/css/banner.css'

export default class Banner extends React.Component {
    static defaultProps = {
        data: [],
        interval: 3000,
        step: 1,
        speed: 300
    };
    static propTypes = {
        data: PropTypes.array,
        interval: PropTypes.number,
        step: PropTypes.number,
        speed: PropTypes.number
    };

    constructor(props) {
        super(props);
        // 初始化状态
        let {step, speed} = this.props;
        this.state = {
            step,
            speed
        }
    }

    componentWillMount() {
        // 克隆数据
        let {data} = this.props,
            cloneData = data.slice(0);

        cloneData.push(data[0]);
        cloneData.unshift(data[data.length - 1]);
        this.cloneData = cloneData;   //实例上供其他方法调用

    }

    // 控制自动轮播
    componentDidMount() {
        // 把定时器返回值挂载到实例上，方便后期清除，结束自动轮播
        this.autoTimer = setInterval(this.autoMove, this.props.interval);
    }

    componentWillUpdate(nextProps, nextState) {
        // 边界判断：如果最新修改的step索引大于最大索引（已经是最后一个了）我们让其立即（无动画）回到索引为1的位置
        if (nextState.step > (this.cloneData.length - 1)) {
            this.setState({
                step: 1,
                speed: 0
            })
        }
    }

    componentDidUpdate() {
        // 只要是从克隆的第一张理解切换到真实第一张后，我们才做以下处理：让其从第一张运动到第二张
        let {step, speed} = this.state;
        if (step === 1 && speed === 0) {
            // 为啥要设置定时器延迟：
            // css3的transition有个漏洞：（主栈执行的时候，短时间内遇到设置的transition-duration的代码，以最后一次设置为主）
            let timer = setTimeout(() => {
                this.setState({
                    step: 1,
                    speed: this.props.speed
                });
                clearTimeout(timer)
            }, 0)
        }
    }

    render() {
        let {data} = this.props,
            {cloneData} = this;
        if (cloneData.length === 0) return '';

        // 控制wrapper的样式
        let {step, speed} = this.state;
        let wrapperSty = {
            width: cloneData.length * 1000 + 'px',
            left: -step * 1000 + 'px',
            transition: `left ${speed}ms linear 0ms`,
        };

        return <section className='container'>
            <ul className='wrapper' style={wrapperSty}>
                {
                    cloneData.map((item, index) => {
                        let {title, pic} = item;
                        return <li key={index}>
                            <img src={pic} alt={title}/>
                        </li>
                    })
                }
            </ul>
            <ul className='focus'>
                {
                    data.map((item, index) => {
                        let tempIndex = step - 1;
                        step === 0 ? tempIndex = (data.length - 1) : null;
                        step === (cloneData.length - 1) ? tempIndex = 0 : null;
                        return <li  key={index} className={index === tempIndex ? 'active' : ''}></li>
                    })
                }
            </ul>
            <a href="javascript:;" className='arrow arrowLeft'>

            </a>
            <a href="javascript:;" className='arrow arrowRight'>

            </a>
        </section>;
    }

    // 好习惯是，render上面写钩子函数，下面写自定义函数
    // 向右切换
    autoMove = () => {
        this.setState({
            step: this.state.step + 1
        });

    }
}

