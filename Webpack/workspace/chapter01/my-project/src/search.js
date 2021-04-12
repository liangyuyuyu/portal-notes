import React from 'react';
import ReactDOM from 'react-dom';
import avatar from './assets/images/avatar.png';
import './search.less';
import './search.scss';

class Search extends React.Component {
    render() {
        return <div className="search-text backgroundColor">
            搜索文字<img src={ avatar }/>
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);