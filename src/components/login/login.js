import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from "axios";
import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, Input} from "reactstrap";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const login = (username, password) => {
        axios.post(process.env.REACT_APP_API_URL + "/login", {
            username: username,
            password: password,
        },{
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }})
            .then(function (response) {
                console.log(response);
                localStorage.setItem("x-user-token", response.data);
                console.log(localStorage.getItem("x-user-token"));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const logout = () => {
        localStorage.setItem("x-user-token", null);
        console.log(localStorage.getItem("x-user-token"));
    }
        return(
            <div className="container">
                <div className="form-box">
                    <div className="header-form">
                        <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{fontSize:"110px"}}></i></h4>
                        <div className="image">
                        </div>
                    </div>
                    <div className="body-form">
                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-user"></i></span>
                                </div>
                                <Input
                                    placeholder="Username"
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-lock"></i></span>
                                </div>
                                <Input
                                    placeholder="Password"
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <button type="button" className="btn btn-secondary btn-block" onClick={() => login(username, password)}>LOGIN</button>
                            <button type="button" className="btn btn-secondary btn-block" onClick={() => logout()}>LOGOUT</button>
                        </form>
                    </div>
                </div>
            </div>
        )
};


export default Login;