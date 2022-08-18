import React, { useEffect } from 'react';
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
import Transfers from "./components/transfers/transfers";
import Dashboard from "./components/dashboard/dashboard";

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

                                    {/* Support Ticket */}
                                    <Route path={`${process.env.PUBLIC_URL}/addresses/addresses`} component={Addresses} />
                                    <Route path={`${process.env.PUBLIC_URL}/notifications/notifications`} component={Notifications} />
                                    <Route path={`${process.env.PUBLIC_URL}/users/users`} component={Users} />
                                    <Route path={`${process.env.PUBLIC_URL}/transfers/transfers`} component={Transfers} />

                                    <Route path={`${process.env.PUBLIC_URL}/dashboard/dashboard`} component={Dashboard} />
                                </App>
                        </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();