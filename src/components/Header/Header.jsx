import React from 'react';
import Login from "./Login/Login";
import UserMenu from './User/UserMenu';

export default class Header extends React.Component {
    render() {
        const {user} = this.props
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link">Home</a>
                        </li>
                    </ul>
                    {user ? <UserMenu /> : <Login />}
                </div>
            </nav>
        );
    }
}
