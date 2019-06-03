import React, {Fragment} from 'react';
import {hot} from 'react-hot-loader';

import AppModal from './AppModal';
import Main from './Main';

const App = () => (
    <Fragment>
        <AppModal/>
        <Main/>
    </Fragment>
);

export default hot(module)(App);
