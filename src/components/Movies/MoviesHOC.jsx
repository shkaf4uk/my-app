import React from "react";
import {API_KEY_3, API_URL} from "../../api/api";
import queryString from 'query-string'

export default (Component) => class MoviesHOC extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
        };
    }

    getMovies = (filters, page) => {
        const {filters: {sort_by, primary_release_year, with_genres}} = this.props;
        const queryStringParams = {
            api_key: API_KEY_3,
            language: "ru-RU",
            sort_by,
            page,
            primary_release_year
        }

        if (with_genres.length > 0) {
            queryStringParams.with_genres = with_genres
        }

        const link = `${API_URL}/discover/movie?${queryString.stringify(queryStringParams)}`;
        fetch(link)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({
                    movies: data.results,
                    total_pages: data.total_pages,
                });
                this.props.onChangePagination(page, this.state.total_pages);
            })
    }

    componentDidMount() {
        this.getMovies(this.props.filters.sort_by, this.props.page)
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filters !== this.props.filters) {
            this.getMovies(this.props.filters.sort_by, 1);
            this.props.onChangePagination(1);
        }

        if (prevProps.page !== this.props.page) {
            this.getMovies(this.props.filters.sort_by, this.props.page);
        }
    };

    render() {
        const {movies} = this.state
        return  <Component movies={movies} />
    }
}


