import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from "axios";
import {Button, FormGroup, Input, Table} from "reactstrap";

const Research = () => {
    const [addresses, setAddresses] = useState([]);
    const [transfers, setTransfers] = useState([]);
    const [address, setAddress] = useState('');


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

    const getTransfers = (address_id) => {
        axios.get(process.env.REACT_APP_API_URL + "/address/transfers?address=" + address_id,{
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }})
            .then(function (response) {
                console.log(response);
                setTransfers(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const handleAddressChange = event => {
        setAddress(event.target.value);
    };

    return (
        <Fragment>
            <Breadcrumb parent="Dashboard" title="Research" />
            <div className="container-fluid">
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
                <Button variant="primary" onClick={() => getTransfers(address)}>Get Research</Button>
            </div>

            <div className="container-fluid">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Block #</th>
                        <th>Hash</th>
                        <th>To</th>
                        <th>Value</th>
                        <th>Asset</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transfers.map((transfer, i) => {
                        return  <tr key={i}>
                            <td>{transfer.blockNum}</td>
                            <td>{transfer.hash}</td>
                            <td>{transfer.to}</td>
                            <td>{transfer.value}</td>
                            <td>{transfer.asset}</td>
                            <td>{transfer.time}</td>
                        </tr>
                    })
                    }
                    </tbody>
                </Table>
            </div>


        </Fragment>


    );
};


export default Research;