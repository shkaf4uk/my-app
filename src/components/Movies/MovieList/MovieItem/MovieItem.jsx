import React from "react";
import {Link} from "react-router-dom";

const urlEmptyImg = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-for-free-design-a28c2f452f5c988ef92d66875b784209_screen.jpg?ts=1561393990";

class MovieItem extends React.Component {
    render() {
        const data = this.props.movie;
        const imagePath = data.backdrop_path || data.poster_path
        return (
            <div className="card">
                <Link to={`movie/${data.id}`}>
                    <img className="card-img-top card-img-height"
                         src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : urlEmptyImg} alt=""/>
                </Link>
                <div className="card-body">
                    <h6 className="card-title">{data.title}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Рейтинг: {data.vote_average}</p>
                        <button type="button" className="btn btn-success">Will Watch</button>
                    </div>
                    <button type="button">Watched</button>
                </div>
            </div>
        );
    }
}

export default MovieItem;
