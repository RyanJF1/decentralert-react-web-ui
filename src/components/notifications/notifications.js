import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import {Table} from "reactstrap";
import axios from "axios";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);


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
    }, []);




    return (
        <Fragment>
            <Breadcrumb parent="Dashboard" title="Default" />
            <div className="container-fluid">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nickname</th>
                        <th>Address</th>
                        <th>Notify</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notifications.map((notification, i) => {
                        return  <tr>
                            <td key={i}>{notification.id}</td>
                            <td>{notification.nickname}</td>
                            <td>{notification.address_id}</td>
                            <td>{notification.notify.toString()}</td>

                        </tr>
                    })
                    }
                    </tbody>
                </Table>
            </div>


        </Fragment>
    );
};


export default Notifications;