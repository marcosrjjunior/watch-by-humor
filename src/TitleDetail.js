import React, { Component } from 'react';
import './TitleDetail.css';
import {apiKey} from './data';
import noImage from './no-image.png';
import imdbIcon from './imdb.png';

class TitleDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: props.modal,
            data: {}
        };

        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.title
        const { type } = this.props
        var url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`;
        fetch(url).then(function(response) {
            return response.json();
        }).then(function(data) {
            this.setState({
                data
            });
        }.bind(this));
    }

    render() {
        const imdb = `http://www.imdb.com/title/${this.state.data.imdb_id}`;
        const type = this.props.type;

        let image = noImage;
        if (this.state.data.poster_path) {
            image = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.state.data.poster_path}`;
        }

      let series;
        if (this.state.data.seasons) {
            series = <label>{this.state.data.seasons[this.state.data.seasons.length-1].season_number}</label>;
        }

        return (
            <div className="modal TitleDetail see-modal">
                <label className="modal-bg" onClick={this.closeModal}></label>
                <div className="modal-inner">
                    <label className="modal-close" onClick={this.closeModal}></label>
                    <div>
                        <img className="poster" alt={this.state.data.original_name} src={image} />
                    </div>
                    <div className="content">
                        <h3>{this.state.data.original_name ? this.state.data.original_name : this.state.data.title}</h3>
                        <div>
                            <small>{this.state.data.vote_average}</small>
                            { type === 'tv' ? (
                                <a href={this.state.data.homepage} target="_blank" rel="noopener noreferrer">Homepage</a>
                            ) : (
                                <a href={imdb} target="_blank" rel="noopener noreferrer">
                                    <img className="imdb" alt={this.state.data.title} src={imdbIcon} />
                                </a>
                            )}
                        </div>
                        <p className="overview">{this.state.data.overview}</p>
                        {type === 'tv' &&
                            <p>Seasons: {series}</p>
                        }
                    </div>
                </div>
            </div>
        );
    }

    closeModal() {
        this.setState({modal: ''});
        this.props.closeModal();
    }
}

export default TitleDetail;