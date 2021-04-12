import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import './index.less';
import 'antd/dist/antd.css';

class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                Hello React
                <Home />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

