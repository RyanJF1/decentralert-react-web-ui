import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './i18n';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux **
import { Provider } from 'react-redux';
import store from './store';
import App from "./components/app";

// Import custom Components 
import Default from './components/dashboard/defaultCompo/default';
import Ecommerce from './components/dashboard/ecommerce';
import University from './components/dashboard/university';
import Server from './components/dashboard/server/serverComponent';
// import ServerComponent from './components/dashboard/server/server-component';
import Project from './components/dashboard/project/project';

import SupportTicket from './components/support-ticket/supportTicket';

//config data
import configDB from './data/customizer/config'
import Notifications from "./components/notifications/notifications";
import Addresses from "./components/addresses/addresses";

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
                                    {/* dashboard menu */}
                                    <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
                                        return (<Redirect to={`${process.env.PUBLIC_URL}/dashboard/default`} />)
                                    }} />
                                    <Route path={`${process.env.PUBLIC_URL}/dashboard/default`} component={Default} />
                                    <Route path={`${process.env.PUBLIC_URL}/dashboard/ecommerce`} component={Ecommerce} />
                                    <Route path={`${process.env.PUBLIC_URL}/dashboard/university`} component={University} />
                                    <Route path={`${process.env.PUBLIC_URL}/dashboard/server`} component={Server} />
                                    <Route path={`${process.env.PUBLIC_URL}/dashboard/project`} component={Project} />

                                    {/* Support Ticket */}
                                    <Route path={`${process.env.PUBLIC_URL}/addresses/addresses`} component={Addresses} />
                                    <Route path={`${process.env.PUBLIC_URL}/notifications/notifications`} component={Notifications} />
                                </App>
                        </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();