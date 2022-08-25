import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import {Button, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import axios from "axios";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [addresses, setAddresses] = useState([]);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/notifications", {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY,
                'X-USER-TOKEN': localStorage.getItem("x-user-token")
            }
        })  .then(function(response) {
            setNotifications(response.data);
        })
            .catch(err => {
                console.log(err);
            });
        axios.get(process.env.REACT_APP_API_URL + "/address", {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }
        })  .then(function(response) {
            setAddresses(response.data);
        })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const deleteNotification = (id) => {
        axios.delete(process.env.REACT_APP_API_URL + "/notifications/" + id, {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }
        })
    }

    const disableNotification = (id) => {
        axios.put(process.env.REACT_APP_API_URL + "/notifications/" + id + "/_disable", {},{
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }
        }).then(function(response) {
            console.log(response.data);
        })
            .catch(err => {
                console.log(err);
            });

    }
    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const handleAddressChange = event => {
        setAddress(event.target.value);
    };

    const addNotification = (address) => {
        axios.post(process.env.REACT_APP_API_URL + "/notifications", {
            address_id: address
        },{
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY,
                'X-USER-TOKEN': localStorage.getItem("x-user-token")
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
            <Breadcrumb parent="Dashboard" title="Notifications" />
            <Button color="danger" onClick={toggle}>
                Add
            </Button>
            <div className="container-fluid">

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nickname</th>
                        <th>Address</th>
                        <th>Notify</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notifications.map((notification, i) => {
                        return  <tr>
                            <td key={i}>{notification.id}</td>
                            <td>{notification.nickname}</td>
                            <td>{notification.address_id}</td>
                            <td>{notification.notify.toString()}</td>
                            <td>
                                <Button variant="primary" onClick={() => disableNotification(notification.guid)}>Toggle</Button>
                                <Button variant="primary" onClick={() => deleteNotification(notification.guid)}>Delete</Button>
                            </td>

                        </tr>
                    })
                    }
                    </tbody>
                </Table>
            </div>

            <div>

                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Add Notification</ModalHeader>
                    <ModalBody>
                        <div>
                            <FormGroup>
                                <Input type="select" name="select" id="exampleSelect" onChange={handleAddressChange}>
                                    <option placeholder={"Address"}></option>
                                    {addresses.map((address, i) => {
                                       return  <option key={i} value={address.address_id}>{address.nickname}</option>
                                    })
                                    }
                                </Input>
                            </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() =>{toggle(); addNotification(address)}}>
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


export default Notifications;