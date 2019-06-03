import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid} from 'react-bootstrap';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons';
import {PageHeader} from '@indec/react-commons';

import {
    requestFetchAreasToUnlock, setSearchParams, requestOpenArea, requestOpenAreas, clearUnlock
} from '../../actions/unlock';
import {ConfirmModal, SearchParams} from '../common';
import AreasTable from './AreasTable';

class Unlock extends PureComponent {
    state = {
        showConfirmModal: false
    };

    static propTypes = {
        requestFetchAreasToUnlock: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        requestOpenArea: PropTypes.func.isRequired,
        requestOpenAreas: PropTypes.func.isRequired,
        clearUnlock: PropTypes.func.isRequired,
        areas: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                ups: PropTypes.number,
                area: PropTypes.number,
                blocks: PropTypes.number,
                sides: PropTypes.number,
                dwellingCount: PropTypes.number
            })
        ),
        searchParams: PropTypes.shape({
            state: PropTypes.number,
            ups: PropTypes.number,
            area: PropTypes.number
        })
    };

    static defaultProps = {
        areas: [],
        searchParams: {}
    };

    componentWillUnmount() {
        this.props.clearUnlock();
    }

    handleSearchParamsState({target: {id, value}}) {
        this.props.onChange({
            ...this.props.searchParams, [id]: value, ups: null, area: null
        });
    }

    handleSearchParamsUps({target: {id, value}}) {
        this.props.onChange({...this.props.searchParams, [id]: value, area: null});
    }

    handleSearchParamsArea({target: {id, value}}) {
        this.props.onChange({...this.props.searchParams, [id]: value});
    }

    handleSubmit() {
        this.props.requestFetchAreasToUnlock(this.props.searchParams);
    }

    handleShowModal(idArea, area) {
        this.setState(() => ({showConfirmModal: true, idArea, area}));
    }

    handleSaveAssigns() {
        const {idArea} = this.state;
        const {state, ups} = this.props.searchParams;
        if (idArea) {
            this.props.requestOpenArea(idArea);
        } else {
            this.props.requestOpenAreas(state, ups);
        }
        this.setState(() => ({showConfirmModal: false}));
    }

    render() {
        const {areas, searchParams} = this.props;
        const {area, showConfirmModal} = this.state;
        return (
            <Grid fluid>
                <PageHeader title="Apertura de Areas" icon={faUnlockAlt}/>
                <SearchParams
                    searchParams={searchParams}
                    onChangeState={e => this.handleSearchParamsState(e)}
                    onChangeUps={e => this.handleSearchParamsUps(e)}
                    onChangeArea={e => this.handleSearchParamsArea(e)}
                    onSubmit={() => this.handleSubmit()}
                    onOpenAreasByUps={() => this.handleShowModal()}
                />
                <br/>
                <AreasTable
                    areas={areas}
                    onOpenArea={(idArea, areaNumber) => this.handleShowModal(idArea, areaNumber)}
                />
                {showConfirmModal && (
                    <ConfirmModal
                        title="Confirmacion de apertura"
                        message={`Confirme la apertura ${area ? `del area ${area}` : 'de  las areas'}`}
                        onAccept={() => this.handleSaveAssigns()}
                        onDismiss={() => this.setState(() => ({showConfirmModal: false}))}
                    />
                )}
            </Grid>
        );
    }
}

export default connect(
    state => ({
        areas: state.unlock.areas,
        searchParams: state.unlock.searchParams
    }),
    dispatch => ({
        requestFetchAreasToUnlock: searchParams => dispatch(requestFetchAreasToUnlock(searchParams)),
        onChange: searchParams => dispatch(setSearchParams(searchParams)),
        requestOpenArea: id => dispatch(requestOpenArea(id)),
        requestOpenAreas: (state, ups) => dispatch(requestOpenAreas(state, ups)),
        clearUnlock: () => dispatch(clearUnlock())
    })
)(Unlock);
