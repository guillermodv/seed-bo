import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {faAlignJustify} from '@fortawesome/free-solid-svg-icons';
import {PageHeader} from '@indec/react-commons';
import {DwellingsList} from '@indec/react-address-commons';

import {requestFetchGeographic} from '../../actions/fieldMaterials';
import Geographic from './Geographic';

class Dwellings extends PureComponent {
    static propTypes = {
        requestFetchGeographic: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                state: PropTypes.string.isRequired,
                ups: PropTypes.string.isRequired,
                area: PropTypes.string.isRequired
            })
        }).isRequired
    };

    componentDidMount() {
        const {state, ups, area} = this.props.match.params;
        this.props.requestFetchGeographic(state, ups, area);
    }

    render() {
        const {state, ups} = this.props.match.params;
        return (
            <Fragment>
                <PageHeader
                    path={`/fieldMaterials/state/${state}/ups/${ups}`}
                    icon={faAlignJustify}
                    title="Muestra - Listado de viviendas"
                />
                <Geographic/>
                <DwellingsList match={{params: this.props.match.params}}/>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        radios: state.fieldMaterials.radios
    }),
    dispatch => ({
        requestFetchGeographic: (state, ups, area) => dispatch(requestFetchGeographic(state, ups, area))
    })
)(Dwellings);
