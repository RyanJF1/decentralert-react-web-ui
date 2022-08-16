import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from "axios";
import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState([]);


    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/ui/dashboard", {
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY
            }
        }).then(function (response) {
            console.log(response.data);
            setDashboard(response.data);
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
                        <CardTitle>Address Count</CardTitle>
                        <CardText>{dashboard.userCount}</CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardTitle>Notification Count</CardTitle>
                        <CardText>{dashboard.notificationCount}</CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardTitle>Address Count</CardTitle>
                        <CardText>{dashboard.addressCount}</CardText>
                    </CardBody>
                </Card>
            </div>


        </Fragment>


    );
};


export default Dashboard;