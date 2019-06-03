import React, {Fragment} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {SignIn} from '@indec/react-address-commons';

import Footer from './Footer';
import Welcome from './Welcome';

const WithoutSessionRoutes = () => (
    <HashRouter>
        <Fragment>
            <main>
                <Switch>
                    <Route path="/login" component={SignIn}/>
                    <Route path="/" component={Welcome}/>
                </Switch>
            </main>
            <Footer/>
        </Fragment>
    </HashRouter>
);

export default WithoutSessionRoutes;
