import React, { Component } from 'react';
import './Favorites.css';
import store from '../../store/Store';
import { Link } from 'react-router-dom';

class Favorites extends Component {
    state = {
        title: '',
        favorits: [],
        listId: '',
        disabled: true,
        showLink: true
    }

    componentDidMount() {
        store.subscribe(() => {
            const initialState = store.getState();
            this.setState({ favorits: initialState.favoritsMovies });
        })
    };

    deleteBut = (id) => {
        store.dispatch({
            type: 'DELETE_FROM_FAVORITES',
            payload: {
                id: id
            }
        });
    };

    getListId = (idList) => {
        store.dispatch({
            type: 'GET_ID',
            payload: {
                listId: idList,
            }
        })
    }

    saveFavList = () => {
        let data = { title: this.state.title, movies: this.state.favorits };
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                let listId = data.id;
                this.setState({
                    listId: listId
                });
            })
        if (this.state.favorits.length !== 0) {
            this.setState({ showLink: false });
        } else {
            this.setState({ showLink: true })
        };
    };

    handleChange = (e) => {
        this.setState({ title: e.target.value })
    };

    render() {

        return (
            <div className="favorites">
                <input value={this.state.title}
                    onChange={this.handleChange}
                    className="favorites__name"
                    placeholder='Siyahı adını daxil edin'
                />
                <ul className="favorites__list">
                    {this.state.favorits.map((item) => {
                        return <li key={item.id}><button onClick={() => this.deleteBut(item.id)}>X</button>  {item.title} ({item.year})</li>;
                    })}

                </ul>
                <button type="button" className={this.state.showLink ? 'favorites__save' : 'favorites__save-none'}
                    onClick={() => this.saveFavList()} disabled={!this.state.title}>Yadda Saxla</button>
                <div className={this.state.showLink ? 'favorites-link' : ''}>
                    <Link to={`/list/${this.state.listId}`}>Film siyahısına keç</Link>
                </div>
            </div>

        );
    }
}

export default Favorites;
