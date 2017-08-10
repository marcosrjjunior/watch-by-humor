import React from 'react';
import './TitleItem.css';
import {genres} from './data';
import noImage from './no-image.png';

const TitleItem = ({title, showModal}) => {
    let image = noImage;
    if (title.poster_path) {
        image = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${title.poster_path}`;
    }

    const renderGenres = title.genre_ids.map((genre) => {
        if (title.genre_ids[title.genre_ids.length-1] === genre) {
            return <span key={genre}>{genres[genre]}</span>;
        }
        return <span key={genre}>{genres[genre]}, </span>;
    });

    return (
        <div className="TitleItem">
            <img className="poster" alt={title.title} src={image} onClick={() => showModal(title)} />
            <h1>{title.original_name ? title.original_name : title.title}</h1>
            <p>
                <a className="btn">{title.vote_average}</a>
            </p>
            <hr/>
            <p>{renderGenres}</p>
        </div>
    );
};

export default TitleItem;
