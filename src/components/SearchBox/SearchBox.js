import React, { Component } from 'react';
import './SearchBox.css';
import store from '../../store/Store';
class SearchBox extends Component {
    state = {
        searchLine: ''
    }

    searchMovies = (e) => {
        this.setState({ searchLine: e.target.value });

    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        store.dispatch({
            type: 'SEARCH_MOVIES',
            payload: {
                searchLine: this.state.searchLine
            }
        });
    }
    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                       Film adına görə axtarış:
                        <input
                            type="text"
                            className="search-box__form-input"
                            value={this.state.searchLine}
                            onChange={this.searchMovies}
                            placeholder="Film adını daxil edin"
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                       Axtar
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchBox;