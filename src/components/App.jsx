import React from "react";
import Header from "./Header/Header";
import Cookies from 'universal-cookie';
import {fetchAPI, API_KEY_3, API_URL} from '../api/api';
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import { BrowserRouter, Route, Link } from "react-router-dom";
import PageMovie from "./pages/PageMovie/PageMovie";

const cookies = new Cookies();

export const AppContext = React.createContext()

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            user: null,
            session_id: null,
        };
    }

    componentDidMount() {
        const session_id = cookies.get("session_id", {})
        if (session_id) {
            fetchAPI(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
                .then(user => {
                    this.getUser(user);
                    this.getSessionId(session_id);
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
        cookies.remove("session_id", {path: "/"});
        this.setState({
            session_id: null,
            user: null
        })
    }

    render() {
        const {user, session_id} = this.state;
        return (
            <BrowserRouter>
                <AppContext.Provider value={{
                    user,
                    session_id,
                    getUser: this.getUser,
                    getSessionId: this.getSessionId,
                    onLogOut: this.onLogOut
                }}>
                    <div>
                        <Header user={user}/>
                        <Route exact path="/" component={MoviesPage}/>
                        <Route path="/movie/:id" component={PageMovie} />
                    </div>
                </AppContext.Provider>
            </BrowserRouter>
        );
    }
}

export default App;
