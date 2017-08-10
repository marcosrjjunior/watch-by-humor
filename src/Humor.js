import React, { Component } from 'react';
import SButton from './SButton.js';

class Humor extends Component {
    constructor(props) {
        super(props);

        this.state = { humor: this.props.humor };
        this.selectHumor = this.selectHumor.bind(this);
    }

    render() {
        return (
            <SButton
                name={this.props.title}
                onClick={(e) => this.selectHumor(e, this.props.humor)}
            />
        );
    }

    selectHumor(event, humor) {
        event.preventDefault();
        this.setState({humor});
        this.props.onHumorChange(humor);
    }
}

export default Humor;