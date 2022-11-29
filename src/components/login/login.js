import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {
    Button,
    Input,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader, Spinner
} from "reactstrap";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);

    const toggle = () => setModal(!modal);
    const history = useHistory();
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
                setSuccess(true);
               history.push("/home");
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const logout = () => {
        localStorage.setItem("x-user-token", null);
        console.log(localStorage.getItem("x-user-token"));
    }
    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const addUser = (name, email, password) => {
        axios.post(process.env.REACT_APP_API_URL + "/user", {

            email: email,
            name: name,
            password: password
        },{
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
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
                            <Button color="primary" onClick={toggle}>
                                Create account
                            </Button>

                        </form>
                    </div>
                    {success && <Button onClick={() => setSuccess(true)}>Success<Spinner animation="border" role="status">
                    </Spinner></Button>}

                </div>
                <div>

                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>Create Account</ModalHeader>
                        <ModalBody>
                            <div>
                                <Input
                                    placeholder="Name"
                                    onChange={handleNameChange}
                                />
                                <Input
                                    placeholder="Email"
                                    onChange={handleEmailChange}
                                />
                                <Input
                                    placeholder="Password"
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => {toggle(); addUser(name, email, password)}}>
                                Add
                            </Button>{' '}
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>

        )
};


export default Login;