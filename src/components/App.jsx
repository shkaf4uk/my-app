import React from "react";
import Filters from "./Filters/Filters";
import Header from "./Header/Header";
import Cookies from 'universal-cookie';
import {fetchAPI, API_KEY_3, API_URL} from '../api/api';
import MovieList from "./Movies/MovieList/MovieList";

const cookies = new Cookies();

export const AppContext = React.createContext()

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            user: null,
            session_id: null,
            filters: {
                sort_by: 'popularity.desc',
                primary_release_year: "2020",
                with_genres: []
            },
            page: 1,
            total_pages: 0,
        };
    }

    componentDidMount() {
        const session_id = cookies.get("session_id", {})
        if (session_id) {
            fetchAPI(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
                .then(user => {
                    this.getUser(user);
                    this.getSessionId(session_id)
                });
        }
    }

    getUser = user => {
        this.setState({
            user
        })
    }

    getSessionId = session_id => {
        cookies.set("session_id", session_id, {
            path: '/',
            maxAge: 3600
        });
        this.setState({
            session_id
        })
    }

    onLogOut = () => {
        cookies.remove("session_id");
        this.setState({
            session_id: null,
            user: null
        })
    }

    onChangeFilters = event => {
        const newFilters = {
            ...this.state.filters,
            [event.target.name]: [event.target.value]
        };

        this.setState({
            filters: newFilters
        });
    }

    onChangePagination = (page, total_pages = this.state.total_pages) => {
        this.setState({
            page,
            total_pages
        })
    }

    onChangeGenre = event => {
        const id = event.target.value;
        const {with_genres} = this.state.filters;
        let newGenres = [];
        if (with_genres.includes(id)) {
            newGenres = with_genres.filter(el => el !== id);
        } else {
            newGenres = [...with_genres, id]
        }

        this.setState(prevState => {
            return {
                filters: {
                    ...prevState.filters,
                    with_genres: newGenres
                }
            }
        })
    }

    render() {
        const {filters, page, total_pages, user, session_id} = this.state;
        return (
            <AppContext.Provider value={{
                user,
                session_id,
                getUser: this.getUser,
                getSessionId: this.getSessionId,
                onLogOut: this.onLogOut
            }}>
                <div>
                    <Header user={user}/>
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col-9">
                                <MovieList filters={filters}
                                           page={page}
                                           onChangePagination={this.onChangePagination}/>
                            </div>
                            <div className="col-3">
                                <h4>Фильтры</h4>
                                <Filters filters={filters}
                                         onChangeFilters={this.onChangeFilters}
                                         page={page}
                                         total_pages={total_pages}
                                         onChangePagination={this.onChangePagination}
                                         onChangeGenre={this.onChangeGenre}/>
                            </div>
                        </div>
                    </div>
                </div>
            </AppContext.Provider>
        );
    }
}

export default App;
