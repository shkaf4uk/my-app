import React from 'react';
import './Login.css'
import {API_KEY_3, API_URL, fetchAPI} from "../../../api/api";
import classNames from 'classnames';
import AppContextHOC from '../../HOC/AppContextHOC'

class LoginForm extends React.PureComponent {
    state = {
        username: "",
        password: "",
        errors: {},
        submitting: false
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({
            [name]: value,
            errors: {
                ...prevState.errors,
                [name]: null,
                base: null
            }
        }));
    }

    handleBlur = event => {
        const {name} = event.target;
        const errors = this.validFields();
        const error = errors[name]
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    [name]: error,
                }
            }))
        }
    }

    validFields = () => {
        const errors = {};
        if (this.state.username === "") {
            errors.username = "Required"
        }
        if (this.state.password.length < 5) {
            errors.password = "Required. Must be 5 characters or more"
        }
        return errors;
    }

    onSubmit = async () => {
        try {
            this.setState({
                submitting: true,
            })

            const data = await fetchAPI(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)

            const result = await fetchAPI(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    request_token: data.request_token
                })
            })

            const session = await fetchAPI(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    request_token: result.request_token
                })
            });

            this.props.getSessionId(session.session_id)

            const account = await fetchAPI(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session.session_id}`);
            this.setState({
                submitting: false,
            }, () => {
                this.props.getUser(account);
            })


        } catch (e) {
            this.setState({
                submitting: false,
                errors: {
                    base: e.status_message
                }
            })
        }

    }

    onLogin = e => {
        e.preventDefault();
        const errors = this.validFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors,
                }
            }))
        } else {
            this.onSubmit()
        }
    }

    getClassForInput = key => {
        return classNames("form-control", {
            "invalid": this.state.errors[key]
        })
    }

    render() {
        const {errors, username, password, submitting} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-5">
                            <div className="card-body">
                                <h4 className="card-title text-center">Sign In</h4>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <label htmlFor="inputName">Login</label>
                                        <input name="username" value={username} type="text" id="inputName"
                                               className={this.getClassForInput("username")}
                                               placeholder="Login" required
                                               onChange={this.onChange} onBlur={this.handleBlur}/>
                                    </div>
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                    <div className="form-label-group">
                                        <label htmlFor="inputPassword">Password</label>
                                        <input name="password" value={password} type="password" id="inputPassword"
                                               className={this.getClassForInput("password")}
                                               placeholder="Password" required onChange={this.onChange}/>
                                    </div>
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember
                                            me</label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase"
                                            type="submit" onClick={this.onLogin} disabled={submitting}>Sign In
                                    </button>
                                    {errors.base && <div className="invalid-feedback text-center">{errors.base}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppContextHOC(LoginForm)