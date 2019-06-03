import React, {Fragment} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {
    Credentials, Home, Logs, Users, BlockSpreadsheets, DwellingSpreadsheets
} from '@indec/react-address-commons';

import Footer from './Footer';
import Header from './Header';
import Unlock from '../Unlock';
import Assign from '../Assign';
import Compare from '../Compare';
import Review from '../Review';
import Reports from '../Reports';
import ReviewEditor from '../Review/AreaReview';
import FieldMaterials from '../FieldMaterials';
import UpsTable from '../FieldMaterials/UpsTable';
import AreaTable from '../FieldMaterials/AreaTable';
import MonitoringResponse from '../Monitoring/MonitoringResponse';
import MonitoringList from '../Monitoring/MonitoringList';
import {PROJECT_TITLE, MMUVRA_URI, USERS_CREDENTIALS_ROUTE} from '../../constants';
import Charts from '../Charts';
import Dwellings from '../FieldMaterials/Dwellings';

const WithSessionRoutes = () => (
    <HashRouter>
        <Fragment>
            <Header/>
            <main>
                <Switch>
                    <Route exact path="/unlock" component={Unlock}/>
                    <Route exact path="/assign" component={Assign}/>
                    <Route
                        exact
                        path="/users"
                        component={() => <Users userCredentialsRoute={USERS_CREDENTIALS_ROUTE}/>}
                    />
                    <Route
                        exact
                        path={`${USERS_CREDENTIALS_ROUTE}/:id`}
                        render={props => <Credentials url={MMUVRA_URI} title={PROJECT_TITLE} {...props}/>}
                    />
                    <Route path="/monitoring/response/:state?/:ups?/:area?" component={MonitoringResponse}/>
                    <Route path="/monitoring" component={MonitoringList}/>
                    <Route exact path="/charts" component={Charts}/>
                    <Route path="/review/:id/:state?/:ups?/:area?/editor" component={ReviewEditor}/>
                    <Route path="/review/:state?/:ups?/:area?" component={Review}/>
                    <Route path="/reports/:id/:area" component={Reports}/>
                    <Route path="/compare/:id/:area" component={Compare}/>
                    <Route exact path="/fieldMaterials" component={FieldMaterials}/>
                    <Route exact path="/fieldMaterials/state/:state" component={UpsTable}/>
                    <Route exact path="/fieldMaterials/state/:state/ups/:ups" component={AreaTable}/>
                    <Route
                        exact
                        path="/fieldMaterials/state/:state/ups/:ups/area/:area"
                        component={Dwellings}
                    />
                    <Route
                        exact
                        path="/blockSpreadsheets/state/:state/ups/:ups/area/:area"
                        render={({match}) => (
                            <BlockSpreadsheets
                                match={match}
                                path={`/fieldMaterials/state/${match.params.state}/ups/${match.params.ups}`}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/dwellingSpreadsheets/state/:state/ups/:ups/area/:area"
                        render={({match}) => (
                            <DwellingSpreadsheets
                                match={match}
                                path={`/fieldMaterials/state/${match.params.state}/ups/${match.params.ups}`}
                            />
                        )}
                    />
                    <Route exact path="/" component={Home}/>
                    <Route path="/logs" component={Logs}/>
                    <Route component={Home}/>
                </Switch>
            </main>
            <Footer/>
        </Fragment>
    </HashRouter>
);

export default WithSessionRoutes;
