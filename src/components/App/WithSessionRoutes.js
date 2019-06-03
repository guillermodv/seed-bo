import React, {Fragment} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import Basic from './Basic';

const WithSessionRoutes = () => (
    <HashRouter>
        <Fragment>
            <Header/>
            <main>
                <Switch>
                    <Route exact path="/" component={Basic}/>
                    <Route component={Basic}/>
                </Switch>
            </main>
            <Footer/>
        </Fragment>
    </HashRouter>
);

export default WithSessionRoutes;
