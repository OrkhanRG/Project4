import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        title: '',
        movies: []
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
                .then(resp => {
                    if (resp.ok) {
                        return resp.json();
                    } else {
                        alert('Список не найден :(')
                    };
                })
                .then(data => {
                    if (data) {
                        this.setState({ movies: data.movies, title: data.title })
                    } else {
                        alert('Список не найден :(')
                    }
                })
        }

    }

    render() {
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.movies}>
                                <a href={`https://www.imdb.com/title/${item.id}/`} target="_blank">{item.title} ({item.year})</a>

                            </li>
                        )
                    })}
                </ul>
            </div >
        );
    }
}

export default ListPage;
