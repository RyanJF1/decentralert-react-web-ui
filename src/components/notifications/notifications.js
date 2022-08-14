import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import axios from "axios";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const toggle = () => setModal(!modal);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/notifications?email=ryan.j.fulton@gmail.com", {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }
        })  .then(function(response) {
            console.log(response.data);
            setNotifications(response.data);
        })
            .catch(err => {
                console.log(err);
            });
    }, [notifications]);

    const deleteNotification = (id) => {
        axios.delete(process.env.REACT_APP_API_URL + "/notifications?notificationId=" + id, {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }
        })
    }
    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const handleAddressChange = event => {
        setAddress(event.target.value);
    };

    const addNotification = (email, address) => {
        axios.post(process.env.REACT_APP_API_URL + "/notifications", {

            email: email,
            address_id: address
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
                                <Button variant="primary" onClick={() => deleteNotification(notification.id)}>Delete</Button>
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
                                placeholder="Email"
                                onChange={handleEmailChange}
                            />
                            <Input
                                placeholder="Address"
                                onChange={handleAddressChange}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() =>{toggle(); addNotification(email, address)}}>
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