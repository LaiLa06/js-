import React from 'react'
import reactDOM from 'react-dom'
import './static/css/reset.min.css'
import './static/css/index.css'
import Template from "./component/Template";

let imgData=[];
for (let i = 1; i < 4 ; i++) {
    imgData.push({
        id:0,
        title:'',
        pic:require(`./static/images/${i}.jpg`)
    })
};
reactDOM.render(<main>
    <Template data={imgData} step={1} speed={300} interval={3000}/>
</main>,root);