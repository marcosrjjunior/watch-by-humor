import React, { Component } from 'react';
import './App.css';
import Title from './Title.js';
import Condition from './Condition.js';
import Humor from './Humor.js';
import Paginate from './Paginate.js';
import TitleDetail from './TitleDetail';
import {data, apiKey} from './data';
import moment from 'moment';
import SButton from './SButton.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            humor: '',
            condition: '',
            page: 1,
            modal: false,
            currentTitle: {},
            type: 'movie',
            list: [],
            genres: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchList = this.fetchList.bind(this);
        this.onConditionChange = this.onConditionChange.bind(this);
        this.onHumorChange = this.onHumorChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let genres = data[this.state.humor][this.state.condition].genres;
        this.setState({genres, page:1}, () => setTimeout(this.fetchList(), 50));
    }

    fetchList() {
        const sevenMonthsAgo = moment().subtract(7, 'months').format('YYYY-MM-DD');
        const nextWeek = moment().add(1, 'weeks').format('YYYY-MM-DD');
        const type = this.state.type;

        var url = `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&language=en-US&with_original_language=en&sort_by=popularity.desc&include_adult=false&include_video=true&with_genres=${this.state.genres}&page=${this.state.page}&release_date.lte=${nextWeek}&release_date.gte=${sevenMonthsAgo}`;

        fetch(url).then(function(response) {
            if(response.ok) {
                return response.json();
            }
        }).then(function(data) {
            if (data && data.results.length > 0) {
                this.setState({list:data.results});
            }
        }.bind(this));
    }

    render() {
        const modal = this.state.modal;
        const type = this.state.type;
        const currentTitle = this.state.currentTitle;

        return (
            <div className="App">
                <div className="App-header">
                    <h2>Select your humor</h2>
                    <div>
                        <Humor
                            humor='bad'
                            title='Bad'
                            onHumorChange={this.onHumorChange}
                        />
                        <Humor
                            humor='excited'
                            title='Excited'
                            onHumorChange={this.onHumorChange}
                        />
                        <Humor
                            humor='lazy'
                            title='Lazy'
                            onHumorChange={this.onHumorChange}
                        />
                        <Humor
                            humor='inLove'
                            title='In Love'
                            onHumorChange={this.onHumorChange}
                        />
                        <Humor
                            humor='angry'
                            title='Angry'
                            onHumorChange={this.onHumorChange}
                        />
                    </div>
                </div>

                {this.state.humor &&
                <form onSubmit={this.handleSubmit}>
                    <p className="App-intro">
                        <small>Select the options</small>
                    </p>

                    <div>
                        <select
                            name="type"
                            value={this.state.type}
                            onChange={event => {this.handleInputChange(event); this.setState({list: []})}}
                            className="App-margin select"
                        >
                            <option value="">Select the Type</option>
                            <option value="movie">Movies</option>
                            <option value="tv">Tv Series</option>
                        </select>
                    </div>
                    <div>
                        <label>
                            <Condition
                                condition={this.state.condition}
                                humor={this.state.humor}
                                onConditionChange={this.onConditionChange}
                            />
                        </label>
                    </div>

                    {(this.state.humor && this.state.condition && this.state.type) &&
                        <SButton
                            name="Send"
                            size="small"
                            onClick={(e) => this.handleSubmit(e)}
                        />
                    }
                </form>
                }

                {this.state.list.length > 0 &&
                    <Paginate
                        page={this.state.page}
                        onPageChange={this.onPageChange}
                    />
                }

                {modal &&
                    <TitleDetail closeModal={this.closeModal} type={type} modal={modal} title={currentTitle} />
                }

                <div>
                    <Title
                        titles={this.state.list}
                        showModal={this.showModal}
                    />
                </div>
            </div>
        );
    }

    onPageChange(page) {
        this.setState({
            page
        }, () => setTimeout(this.fetchList(), 50));
    }

    onHumorChange(humor) {
        this.setState({humor: humor, condition: '', list: []});
    }

    onConditionChange(condition) {
        this.setState({condition, list: []});
    }

    showModal(title) {
        this.setState({modal: true, currentTitle: title});
    }

    closeModal() {
        this.setState({modal: ''});
    }
}

export default App;
