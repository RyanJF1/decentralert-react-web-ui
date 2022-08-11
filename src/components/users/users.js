import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from "axios";
import {Button, Table} from "reactstrap";

const Users = () => {
    const [users, setUsers] = useState([]);


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
    }, []);




    return (
        <Fragment>
            <Breadcrumb parent="Dashboard" title="Users" />
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
                                <Button variant="secondary">Edit</Button>
                                <Button variant="danger">Delete</Button>
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


export default Users;