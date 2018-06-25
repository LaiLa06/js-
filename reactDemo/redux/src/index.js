import React from 'react';
import ReactDOM from 'react-dom';
import Vote from "./component/vote/Vote";
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'

ReactDOM.render(<main>
    <Vote title={'英格兰VS巴拿马'} store={store}/>
</main>, document.getElementById('root'));
