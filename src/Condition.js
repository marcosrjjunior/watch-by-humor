import React, { Component } from 'react';
import {data} from './data';

class Condition extends Component {
    constructor(props) {
        super(props);

        this.state = { condition: props.condition };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        let options = '';
        if (data[this.props.humor]) {
            options = data[this.props.humor].options.map((option) => {
                return (
                    <option
                        value={option}
                        key={option}
                    >{data[this.props.humor][option].msg}</option>
                )
            });
        }

        return (
            <div>
                <select
                    name="condition"
                    value={this.state.condition}
                    onChange={event => this.handleInputChange(event.target.value) }
                    className="App-margin select"
                >
                    <option value="">Select the condition</option>
                    {options}
                </select>
            </div>
        );
    }

    handleInputChange(condition) {
        this.setState({condition});
        this.props.onConditionChange(condition);
    }
}

export default Condition;