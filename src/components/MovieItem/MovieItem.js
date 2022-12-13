import React, { Component } from 'react';
import './MovieItem.css';
import store from '../../store/Store';

class MovieItem extends Component {
    state = {
        id: '',
        title: '',
        poster: '',
        year: ''
    };

    addMovieToFavorits = (Title, Year, Poster, imdbID) => {
        store.dispatch({
            type: 'ADD_TO_FAVORITS',
            payload: {
                title: Title,
                year: Year,
                poster: Poster,
                id: imdbID
            }
        });
    };

    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        return (
            <article className="movie-item" key={imdbID}>
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={() => this.addMovieToFavorits(Title, Year, Poster, imdbID)} >Əlavə Et</button>
                </div>
            </article>
        );
    }
};
export default MovieItem;