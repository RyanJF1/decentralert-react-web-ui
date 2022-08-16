import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from "axios";
import {Button, Table} from "reactstrap";

const Transfers = () => {
    const [addresses, setAddresses] = useState([]);
    const [transfers, setTransfers] = useState([]);


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

    const getTransfers = (address) => {
        axios.get(process.env.REACT_APP_API_URL + "/address/transfers?address=" + address,{
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




    return (
        <Fragment>
            <Breadcrumb parent="Dashboard" title="Transfers" />
            <div className="container-fluid">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nickname</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {addresses.map((address, i) => {
                        return  <tr key={i}>
                            <td >{address.id}</td>
                            <td>{address.nickname}</td>
                            <td>{address.address_id}</td>
                            <td>
                                <Button variant="primary" onClick={() => getTransfers(address.address_id)}>Get Transfers</Button>
                            </td>

                        </tr>
                    })
                    }
                    </tbody>
                </Table>
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


export default Transfers;