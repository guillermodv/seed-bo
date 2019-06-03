import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col, ButtonGroup} from 'react-bootstrap';
import {
    castArray, filter, head, isEmpty, map, omit, find, get, pick, flatten
} from 'lodash';

import {
    addDwellingForSupervision,
    fetchDwellings,
    requestFetchSides,
    requestSaveBlocks,
    requestSaveSides,
    requestSaveStreets,
    requestValidateBlockNumberAvailability,
    requestValidateStreetCodeAvailability
} from '../../../../actions/review';
import {dwellingModal} from '../../../../constants';
import {ModalConfirm} from '../../../common';
import {getBlocks} from '../../../../util';
import {setNewBlockValues, setNewSideValues} from '../../../../services/utils';
import {BlockEditor, BlocksList} from './blocks';
import {Sides, SideEdition} from './sides';
import AreaDescription from './AreaDescription';
import Dwellings from './Dwellings';

const getBlocksByRadio = (radios, radio) => flatten(map(filter(radios, r => r.number === radio), r => r.blocks));

class AreaEditor extends PureComponent {
    static propTypes = {
        requestSaveBlocks: PropTypes.func.isRequired,
        requestSaveSides: PropTypes.func.isRequired,
        requestFetchSides: PropTypes.func.isRequired,
        fetchDwellings: PropTypes.func.isRequired,
        requestSaveStreets: PropTypes.func.isRequired,
        requestValidateBlockNumberAvailability: PropTypes.func.isRequired,
        requestValidateStreetCodeAvailability: PropTypes.func.isRequired,
        addDwellingForSupervision: PropTypes.func.isRequired,
        setNewBlockValues: PropTypes.func.isRequired,
        radios: PropTypes.arrayOf(PropTypes.shape({})),
        sides: PropTypes.arrayOf(PropTypes.shape({})),
        dwellings: PropTypes.arrayOf(PropTypes.shape({})),
        filterParams: PropTypes.shape({}).isRequired,
        area: PropTypes.string.isRequired,
        isBlockNumberUnavailable: PropTypes.bool,
        isStreetCodeUnavailable: PropTypes.bool,
        disabledEdit: PropTypes.bool,
        enableSupervision: PropTypes.bool,
        hasSupervision: PropTypes.bool,
        loadingBlocks: PropTypes.bool
    };

    static defaultProps = {
        disabledEdit: false,
        enableSupervision: false,
        hasSupervision: false,
        isBlockNumberUnavailable: false,
        isStreetCodeUnavailable: false,
        loadingBlocks: false,
        radios: [],
        sides: [],
        dwellings: []
    };

    constructor(props) {
        super(props);
        this.state = {
            objectToEdit: null,
            modal: null,
            selectedBlock: null,
            selectedSide: null
        };
    }

    handleCloseModal() {
        this.setState(() => ({
            modal: null, objectToEdit: null
        }));
    }

    handleConfirm(newValues) {
        const {objectToEdit, modal} = this.state;
        const {area} = this.props;
        if (modal === dwellingModal.EDIT_BLOCK) {
            this.props.requestSaveBlocks(area, castArray(setNewBlockValues(objectToEdit, newValues)));
        }
        if (modal === dwellingModal.EDIT_SIDE) {
            const newSides = setNewSideValues(this.props.sides, objectToEdit, newValues);
            const editedSides = map(
                filter(
                    newSides, side => side.modified
                ),
                side => omit(side, 'street')
            );
            const editedStreets = map(
                filter(
                    newSides, side => side.street && side.street.modified
                ), side => side.street
            );

            if (!isEmpty(editedSides)) {
                this.props.requestSaveSides(area, head(newSides).block._id, editedSides);
            }
            if (!isEmpty(editedStreets)) {
                this.props.requestSaveStreets(area, head(newSides).block._id, editedStreets);
            }
        }
        this.handleCloseModal();
    }

    handleClickMenu(radio, objectToEdit, modal) {
        this.setState(() => ({radio, objectToEdit, modal}));
    }

    addDwellingForSupervision(id, selected) {
        this.props.addDwellingForSupervision(id, selected);
    }

    handleBlock(block, radio) {
        const blocks = getBlocks(this.props.radios);
        this.setState(() => ({
            selectedRadio: radio,
            selectedBlock: get(find(blocks, b => b._id === block), 'number'),
            selectedSide: null
        }));
        this.props.requestFetchSides(this.props.area, block);
    }

    handleSide(side) {
        this.setState(() => ({
            selectedSide: pick(find(this.props.sides, s => s._id === side), ['number', 'observations'])
        }));
        this.props.fetchDwellings(this.props.area, side);
    }

    render() {
        const {
            objectToEdit, modal, selectedBlock, selectedSide, selectedRadio, radio
        } = this.state;
        const {
            area,
            radios,
            disabledEdit,
            enableSupervision,
            hasSupervision,
            isBlockNumberUnavailable,
            sides,
            dwellings,
            loadingBlocks
        } = this.props;
        return (
            <Fragment>
                <Row className="form-group">
                    <Col sm={12} className="text-center">
                        <BlocksList
                            {...{radios, disabledEdit, loadingBlocks}}
                            handleClickMenu={(r, block) => this.handleClickMenu(r, block, dwellingModal.EDIT_BLOCK)}
                            handleClick={(block, r) => this.handleBlock(block, r)}
                        />
                    </Col>
                </Row>
                <AreaDescription {...{selectedBlock, selectedSide, selectedRadio}}/>
                <Row className="form-group">
                    <Col sm={3}>
                        <ButtonGroup vertical block className="side-context">
                            {!isEmpty(sides) && (
                                <Sides
                                    sides={sides}
                                    onClick={side => this.handleSide(side)}
                                    handleClickMenu={
                                        side => this.handleClickMenu(null, side, dwellingModal.EDIT_SIDE)
                                    }
                                    disable={disabledEdit}
                                />
                            )}
                        </ButtonGroup>
                    </Col>
                    <Col sm={9}>
                        {!isEmpty(dwellings) && (
                            <Dwellings
                                {...{
                                    dwellings, enableSupervision, hasSupervision, area
                                }}
                                onClick={(id, selected) => this.addDwellingForSupervision(id, selected)}
                            />
                        )}
                    </Col>
                </Row>
                {modal === dwellingModal.EDIT_BLOCK && (
                    <ModalConfirm
                        onDismiss={() => this.handleCloseModal()}
                        title="Edición de manzana"
                    >
                        <BlockEditor
                            blockToEdit={objectToEdit}
                            onAccept={e => this.handleConfirm(e)}
                            validateBlockNumberAvailability={
                                (blockId, newValue) => this.props.requestValidateBlockNumberAvailability(
                                    getBlocksByRadio(radios, radio), blockId, newValue
                                )
                            }
                            isBlockNumberUnavailable={isBlockNumberUnavailable}
                        />
                    </ModalConfirm>
                )}
                {modal === dwellingModal.EDIT_SIDE && (
                    <ModalConfirm
                        onDismiss={() => this.handleCloseModal()}
                        title="Edición de lado"
                    >
                        <SideEdition
                            sideToEdit={objectToEdit}
                            onAccept={e => this.handleConfirm(e)}
                            validateStreetCodeAvailability={
                                (sideId, newCode) => this.props.requestValidateStreetCodeAvailability(
                                    area, sideId, newCode
                                )
                            }
                        />
                    </ModalConfirm>
                )}
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        filterParams: state.review.filterParams,
        sides: state.review.sides,
        dwellings: state.review.dwellings,
        radios: state.review.radios,
        isBlockNumberUnavailable: state.review.isBlockNumberUnavailable,
        loadingBlocks: state.review.loadingBlocks
    }),
    dispatch => ({
        addDwellingForSupervision: (id, selected) => dispatch(addDwellingForSupervision(id, selected)),
        requestFetchSides: (area, block) => dispatch(requestFetchSides(area, block)),
        fetchDwellings: (side, hasSupervision) => dispatch(fetchDwellings(side, hasSupervision)),
        requestValidateBlockNumberAvailability: (blocks, blockId, value) => dispatch(
            requestValidateBlockNumberAvailability(blocks, blockId, value)
        ),
        requestValidateStreetCodeAvailability: (id, streetId, code) => dispatch(
            requestValidateStreetCodeAvailability(id, streetId, code)
        ),
        requestSaveBlocks: (idArea, editedBlocks) => dispatch(requestSaveBlocks(idArea, editedBlocks)),
        requestSaveSides: (idArea, idBlock, editedSides) => dispatch(requestSaveSides(idArea, idBlock, editedSides)),
        requestSaveStreets: (idArea, idBlock, streets) => dispatch(requestSaveStreets(idArea, idBlock, streets))
    })
)(AreaEditor);
