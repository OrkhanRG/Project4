const initialState = {
    idList: '',
    searchLine: '',
    favoritsMovies: []
};

export default function Reducer(state = initialState, action) {
    if (action.type === 'SEARCH_MOVIES') {
        return { ...state, searchLine: action.payload.searchLine }
    };


    if (action.type === 'ADD_TO_FAVORITS') {
        const favAction = action.payload;
        const arr = [...state.favoritsMovies];
        let fav = arr.find(item => item.id === action.payload.id);
        if (fav) {
            return state;
        } else {
            arr.push(favAction)
        }
        return {
            ...state,
            favoritsMovies: arr
        }
    };


    if (action.type === 'DELETE_FROM_FAVORITES') {
        const favFilm = [...state.favoritsMovies];
        let index = favFilm.findIndex(item => item.id === action.payload.id);
        favFilm.splice(index, 1)

        return {
            ...state,
            favoritsMovies: favFilm
        }
    };

    if (action.type === 'GET_ID') {
        return {
            ...state,
            idList: action.payload.listId
        }
    };
};
