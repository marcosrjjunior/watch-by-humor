import React, { Component } from 'react';
import SButton from './SButton.js';

class Paginate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: this.props.page,
            action: 'next',
            show: true,
        };

        this.selectPage = this.selectPage.bind(this);
        this.reloadButton = this.reloadButton.bind(this);
    }

    render() {
        const show = this.state.show;

        return (
            <div>
                {show && this.props.page > 1 &&
                    <SButton
                        name='Previous'
                        onClick={(e) => this.selectPage(e, this.props.page-1, 'previous')}
                    />
                }
                {show &&
                    <SButton
                        name='Next'
                        onClick={(e) => this.selectPage(e, this.props.page+1, 'next')}
                    />
                }
            </div>
        );
    }

    selectPage(event, page, action) {
        event.preventDefault();
        this.setState({
            page,
            action,
            show: false
        });
        this.reloadButton();
        this.props.onPageChange(page, action);
    }

    reloadButton() {
        setTimeout(
            () => { this.setState({show: true}); },
            200
        );
    }
}

export default Paginate;