import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator} from '@indec/react-commons';

import {User} from '../../model';
import {requestSession} from '../../actions';
import WithSessionRoutes from './WithSessionRoutes';
import WithoutSessionRoutes from './WithoutSessionRoutes';

class Main extends PureComponent {
    static propTypes = {
        requestSession: PropTypes.func.isRequired,
        profile: PropTypes.instanceOf(User),
        loading: PropTypes.bool
    };

    static defaultProps = {
        profile: null,
        loading: true
    };

    componentDidMount() {
        this.props.requestSession();
    }

    render() {
        const {profile, loading} = this.props;
        if (!loading && !profile) {
            return <WithoutSessionRoutes/>;
        }
        if (!loading && profile) {
            return <WithSessionRoutes/>;
        }
        return <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        profile: state.session.profile,
        loading: state.session.loading
    }),
    dispatch => ({
        requestSession: () => dispatch(requestSession())
    })
)(Main);
