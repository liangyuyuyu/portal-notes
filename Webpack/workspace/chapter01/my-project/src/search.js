import React from 'react';
import ReactDOM from 'react-dom';
import avatar from './assets/images/avatar.png';
import './search.less';

class Search extends React.Component {
    render() {
        return <div className="search-text">
            搜索文字<img src={ avatar }/>
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);