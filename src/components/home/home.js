import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from "axios";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";

const Home = () => {
    const [history, setHistory] = useState([]);
    const [modal, setModal] = useState(false);


    const toggle = () => setModal(!modal);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/history", {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }
        })  .then(function(response) {
            console.log(response.data);
            setHistory(response.data);
        })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <Fragment>
            <Breadcrumb parent="Home" title="Home" />
            <div className="container-fluid">    <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Nickname</th>
                    <th>Address</th>
                    <th>To</th>
                    <th>Asset</th>
                    <th>Value</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody  className="text-justify">
                {history.map((history, i) => {
                    return  <tr >
                        <td key={i}>{history.nickname}</td>
                        <td key={i}>{history.addressId}</td>
                        <td>{history.toAddress}</td>
                        <td>{history.asset}</td>
                        <td>{history.value}</td>
                        <td>{history.time}</td>
                    </tr>
                })
                }
                </tbody>
            </Table>
            </div>

        </Fragment>
    );
};


export default Home;