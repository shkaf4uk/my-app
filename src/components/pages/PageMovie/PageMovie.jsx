import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {API_KEY_3, API_URL, fetchAPI} from "../../../api/api";

const urlEmptyImg = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-for-free-design-a28c2f452f5c988ef92d66875b784209_screen.jpg?ts=1561393990";

function PageMovie(props) {
    console.log('props', props)
    // const [count, setCount] = useState(0);
    //
    useEffect(() => {
        let response = fetchAPI(`${API_URL}/movie/${props.match.params.id}?api_key=${API_KEY_3}&language=ru-RU`)
            .then(data => console.log(data));
        console.log(response)
    });

    return (
        <div className="choose_movie">
            <div className="card">
                <Link to={``}>
                    <img className="card-img-top card-img-height"
                         src={urlEmptyImg} alt=""/>
                </Link>
                <div className="card-body">
                    <h6 className="card-title">title</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Рейтинг: vote_average</p>
                        <button type="button" className="btn btn-success">Will Watch</button>
                    </div>
                    <button type="button">Watched</button>
                </div>
            </div>
        </div>

    );
}

export default PageMovie;


// componentDidMount() {
//     fetchAPI(`${API_URL}/movie/${this.props.match.params.id}?api_key=${API_KEY_3}&language=ru-RU`)
//         .then(data => console.log(data));
// }