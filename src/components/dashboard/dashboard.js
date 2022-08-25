import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from "axios";
import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Table} from "reactstrap";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/ui/dashboard", {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY,
                'X-USER-TOKEN': localStorage.getItem("x-user-token")
            }
        }).then(function (response) {
            console.log(response.data);
            setDashboard(response.data);
        })
            .catch(err => {
                console.log(err);
            });
        axios.get(process.env.REACT_APP_API_URL + "/notifications/history", {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY,
                'X-USER-TOKEN': localStorage.getItem("x-user-token")
            }
        }).then(function (response) {
            console.log(response.data);
            setHistory(response.data);
        })
            .catch(err => {
                console.log(err);
            });

    }, []);


    return (
        <Fragment>
            <Breadcrumb parent="Dashboard" title="Dashboard"/>
            <div className="container-fluid">
                <Card>
                    <CardBody>
                        <CardTitle>User Count</CardTitle>
                        <CardText>{dashboard.userCount}</CardText>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <CardTitle>Address Count</CardTitle>
                        <CardText>{dashboard.addressCount}</CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardTitle>Notification Count</CardTitle>
                        <CardText>{dashboard.notificationCount}</CardText>
                    </CardBody>
                </Card>
            </div>

            <div className="container-fluid">

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Address</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((history, i) => {
                        return  <tr key={i}>
                            <td>{history.addressId}</td>
                            <td>{history.lastSent}</td>
                        </tr>
                    })
                    }
                    </tbody>
                </Table>
            </div>
        </Fragment>


    );
};


export default Dashboard;