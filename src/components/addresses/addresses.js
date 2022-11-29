import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from "axios";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";

const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [modal, setModal] = useState(false);
    const [nickname, setNickname] = useState('');
    const [address, setAddress] = useState('');


    const toggle = () => setModal(!modal);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/address", {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }
        })  .then(function(response) {
            console.log(response.data);
            setAddresses(response.data);
        })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const deleteAddress = (address) => {
        axios.delete(process.env.REACT_APP_API_URL + "/address/" + address, {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }
        })
    }

    const addAddress = (nickname, address) => {
        axios.post(process.env.REACT_APP_API_URL + "/address", {

            nickname: nickname,
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

    const handleAddressChange = event => {
        setAddress(event.target.value);

        console.log('value is:', event.target.value);
    };

    const handleNicknameChange = event => {
        setNickname(event.target.value);

        console.log('value is:', event.target.value);
    };

    return (
        <Fragment>
            <Breadcrumb parent="Home" title="Addresses" />

            <Button color="danger" onClick={toggle}>
                Add
            </Button>
            <div className="container-fluid">
                <Table striped bordered hover size={"sm"}>
                    <thead>
                    <tr>
                        <th>Nickname</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-justify">
                    {addresses.map((address, i) => {
                        return  <tr>
                            <td>{address.nickname}</td>
                            <td>{address.address_id}</td>
                            <td>
                                <Button size="sm" variant="danger" onClick={() => deleteAddress(address.address_id)}>Delete</Button>
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
                                placeholder="Nickname"
                                onChange={handleNicknameChange}
                            />
                            <Input
                                placeholder="Address"
                                onChange={handleAddressChange}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {addAddress(nickname, address); toggle();}} >
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


export default Addresses;