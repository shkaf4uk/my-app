import React from "react";
import MovieItem from "./MovieItem/MovieItem";
import PropTypes from 'prop-types';
import MoviesContainerHOC from "../MoviesHOC";

const MovieList = ({movies}) => {
    return <div className='row'>
            {movies.map(movie => {
                return <div className="col-6 p-4" key={movie.id}>
                    <div className={'row'}>
                        <MovieItem movie={movie}/>
                    </div>
                </div>
            })}
        </div>
}

MovieList.defaultProps = {
    movies: []
}

MovieList.propTypes = {
    movies: PropTypes.array
}

export default MoviesContainerHOC(MovieList);
