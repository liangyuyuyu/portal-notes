import React from 'react';
import { Button, DatePicker } from 'antd';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Button type="primary">Primary Button</Button>
                <DatePicker/>
            </div>
        )
    }
}