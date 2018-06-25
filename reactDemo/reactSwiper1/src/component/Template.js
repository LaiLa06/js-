import React from 'react'

class Template extends React.Component{
    static defaultProps ={
      data:[],
      interval:3000,
      step:1,
      speed:300
    };
    constructor(props){
      super(props);
      let {step,speed} = this.props;
      this.state = {
          step,
          speed,
      }
    }
    componentWillMount(){
        let {data} = this.props;
        let  cloneData = [data[data.length-1],...data,data[0]];
        this.cloneData = cloneData;
    }
    componentDidMount(){
        this.autoTimer = setInterval(this.moveRight,this.props.interval)
    }
    componentWillUpdate(nextProps,nextState){
       let {step} = nextState,
           {cloneData} = this;
       if(step> cloneData.length-1){
           this.setState({
               step:1,
               speed:0
           })
       }
       if(step < 0){
           this.setState({
               step:cloneData.length-2,
               speed:0
           })
       }
    }
    componentDidUpdate(){
        let {step,speed} = this.state;
        if(step===1&&speed===0){
            let timer = setTimeout(()=>{
                this.setState({
                    step:2,
                    speed:this.props.speed
                });
                clearTimeout(timer)
            },0)
        }
        if(step===(this.cloneData.length-2)&&speed===0){
            this.setState({
                step:this.cloneData.length-1,
                speed:this.props.speed
            })
        }
    }
    render(){
        let {cloneData} = this,
            {data} = this.props,
            {step,speed} = this.state;
        let styAry = {
          width:`${cloneData.length*1000}px`,
          transform:`translateX(${-step*1000}px)`,
          transition:`transform ${speed}ms`
        };
        return <section className={'container'} onMouseEnter={this.pauseSwipe} onMouseLeave={this.startSwipe}>
            <ul className={'wrapper'} style={styAry} onTransitionEnd={()=>{this.isRun = false}}>
                {
                    cloneData.map((item,index)=>{
                        let {pic,title} = item;
                        return <li key={index}><img src={pic} alt={title}/></li>
                    })
                }
            </ul>
            <ul className={'focus'}>
                {
                    data.map((item,index)=>{
                        let tempIndex = step -1;
                        step >= (cloneData.length-1) ? tempIndex = 0 : null;
                        step === 0 ? tempIndex = (data.length-1) : null;
                        return  <li key={index} className={tempIndex === index?'active':''} onClick={this.bindFocus.bind(this,index)}></li>
                    })
                }
            </ul>
            <a href="javascript:;" className={'arrow arrowLeft'} onClick={this.moveLeft}></a>
            <a href="javascript:;" className={'arrow arrowRight'} onClick={this.moveRight}></a>
        </section>
    }
    moveLeft = ()=>{
      if(this.isRun) return;
      this.isRun = true;
      this.setState({
          step:this.state.step -1
      })
    };
    moveRight= ()=>{
        if(this.isRun) return;
        this.isRun = true;
        this.setState({
           step:this.state.step+1,
        })
    };
    pauseSwipe=()=>{
        clearInterval(this.autoTimer)
    };
    startSwipe=()=>{
        this.autoTimer = setInterval(this.moveRight,this.props.interval)
    };
    bindFocus=index=>{
        this.setState({
          step:index+1
      })
    }
}

export default Template;