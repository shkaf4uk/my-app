import React from "react";
import Filters from "../../Filters/Filters";
import MovieList from "../../Movies/MovieList/MovieList";

class MoviesPage extends React.Component {
    constructor() {
        super();

        this.state = {
            filters: {
                sort_by: 'popularity.desc',
                primary_release_year: "2020",
                with_genres: []
            },
            page: 1,
            total_pages: 0,
        };
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
        const {filters, page, total_pages} = this.state;
        return (
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
        );
    }
}

export default MoviesPage;
