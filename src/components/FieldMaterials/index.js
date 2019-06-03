import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {PageHeader} from '@indec/react-commons';

import {requestFetchFieldMaterials} from '../../actions/fieldMaterials';
import GeneralTable from './GeneralTable';

class FieldMaterials extends PureComponent {
    static propTypes = {
        requestFetchFieldMaterials: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.requestFetchFieldMaterials();
    }

    render() {
        return (
            <Fragment>
                <PageHeader title="Composición de la Muestra"/>
                <GeneralTable/>
            </Fragment>
        );
    }
}

export default connect(
    null,
    dispatch => ({
        requestFetchFieldMaterials: () => dispatch(requestFetchFieldMaterials())
    })
)(FieldMaterials);
