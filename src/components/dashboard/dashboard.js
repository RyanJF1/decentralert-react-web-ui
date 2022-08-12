import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from "axios";
import {Button, Table} from "reactstrap";

const Dashboard = () => {
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
            <Breadcrumb parent="Dashboard" title="Dashboard" />
            <div className="container-fluid">

            </div>


        </Fragment>


    );
};


export default Dashboard;