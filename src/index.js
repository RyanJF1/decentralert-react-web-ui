import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux **
import { Provider } from 'react-redux';
import store from './store';
import App from "./components/app";

// Import custom Components 

// import ServerComponent from './components/dashboard/server/server-component';


//config data
import configDB from './data/customizer/config'
import Notifications from "./components/notifications/notifications";
import Addresses from "./components/addresses/addresses";
import Users from "./components/users/users";
import Research from "./components/research/research";
import Login from "./components/login/login";
import Home from "./components/home/home";

const Root = () => {

    useEffect(() => {

        const abortController = new AbortController();
        const color = localStorage.getItem('color')
        const layout = localStorage.getItem('layout_version') || configDB.data.color.layout_version
        document.body.classList.add(layout);
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${color}.css`);



        return function cleanup() {
            abortController.abort();
        }

    }, []);

    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter basename={`/`}>
                        <Switch>
                                <App>
                                    <Route path={`/home`} component={Home} />
                                    <Route path={`/addresses`} component={Addresses} />
                                    <Route path={`/notifications`} component={Notifications} />
                                    <Route path={`/users`} component={Users} />
                                    <Route path={`/research`} component={Research} />
                                    <Route path={`/login`} component={Login} />
                                </App>
                        </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();