import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import store from '../../store/Store';

class Movies extends Component {
    state = {
        movies: []
    }

    componentDidMount() {
        store.subscribe(() => {
            const initialState = store.getState();
            fetch(`http://www.omdbapi.com/?apikey=55ab3850&s=${initialState.searchLine}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        movies: data.Search,
                    });
                }
                );
        });
    };

    render() {
        return (
            <ul className="movies">
                {this.state.movies.map((movies) =>
                    <li className="movies__item" key={movies.Search}>
                        <MovieItem {...movies} />
                    </li>
                )}
            </ul>
        );
    }
}

export default Movies;