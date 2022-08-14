import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from "axios";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const toggle = () => setModal(!modal);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/user", {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }
        })  .then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        })
            .catch(err => {
                console.log(err);
            });
    }, [users]);


    const deleteUser = (email) => {
        axios.delete(process.env.REACT_APP_API_URL + "/user/" + email, {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }
        })
    }
    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const addUser = (name, email) => {
        axios.post(process.env.REACT_APP_API_URL + "/user", {

            email: email,
            name: name
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

    return (
        <Fragment>
            <Breadcrumb parent="Dashboard" title="Users" />
            <Button color="danger" onClick={toggle}>
                Add
            </Button>
            <div className="container-fluid">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, i) => {
                        return  <tr>
                            <td key={i}>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button variant="danger" onClick={() => deleteUser(user.email)}>Delete</Button>
                            </td>

                        </tr>
                    })
                    }
                    </tbody>
                </Table>
            </div>
            <div>

                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
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
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {toggle(); addUser(name, email)}}>
                            Add
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>

        </Fragment>


    );
};


export default Users;