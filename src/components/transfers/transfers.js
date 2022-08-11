import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from "axios";
import {Button, Table} from "reactstrap";

const Transfers = () => {
    const [addresses, setAddresses] = useState([]);


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
                        return  <tr>
                            <td key={i}>{address.id}</td>
                            <td>{address.nickname}</td>
                            <td>{address.address_id}</td>
                            <td>
                                <Button variant="primary">Get Transfers</Button>
                            </td>

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