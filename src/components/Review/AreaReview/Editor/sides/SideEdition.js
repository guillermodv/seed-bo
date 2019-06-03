import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Form, FormGroup, Checkbox, Button, Alert, Row, Col
} from 'react-bootstrap';
import {TextField, Typeahead, NumberField} from '@indec/react-commons';
import {find} from 'lodash';

import {requestSearchStreet, requestClearStreets} from '../../../../../actions/review';
import SideEditionHeader from './SideEditionHeader';

const SideEdition = ({
    onAccept, sideToEdit, streets, areaData, isStreetCodeUnavailable, ...props
}) => {
    const [state, setState] = useState({
        checked: false,
        newCode: null,
        newName: null,
        newInitialNumber: null,
        newFinalNumber: null,
        newPostalCode: null,
        replyCodeToAllArea: null,
        street: []
    });

    useEffect(() => {
        props.requestClearStreets();
    }, []);

    const mergeState = newState => setState(previousState => ({
        ...previousState,
        ...newState
    }));

    const handleSelect = ({target: {id, value}}) => {
        const street = find(streets, s => s.value === value);
        const newCode = street.code;
        const newName = street.name;
        mergeState({
            [id]: value,
            newCode,
            newName,
            checked: true
        });
    };

    const handleChange = ({target: {value, id}}) => mergeState({[id]: value, checked: false});

    const handleCheck = ({target: {checked}}) => mergeState({checked});

    const handleApplyCodeToAllArea = ({target: {name, checked}}) => mergeState({[name]: checked ? Date.now() : null});

    const handleAccept = () => {
        const {
            newCode, newName, newInitialNumber, newFinalNumber, newPostalCode, replyCodeToAllArea
        } = state;
        onAccept({
            newCode,
            newName,
            newInitialNumber,
            newFinalNumber,
            newPostalCode,
            replyCodeToAllArea
        });
    };

    const handleChangeStreetCode = e => {
        handleChange(e);
        props.validateStreetCodeAvailability(
            sideToEdit.street._id, e.target.value
        );
    };

    return (
        <Fragment>
            <SideEditionHeader sideToEdit={sideToEdit}/>
            <hr/>
            <Form>
                <Row className="form-group">
                    <Col sm={12}>
                        <Typeahead
                            control="street"
                            label="Busqueda de Calles"
                            onLoadOptions={term => props.requestSearchStreet(areaData._id, term)}
                            options={streets || []}
                            value={state.street}
                            onChange={handleSelect}
                            getOptionValue={option => option.value}
                        />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col sm={6}>
                        <NumberField
                            label="Cod. Calle"
                            disabled={!sideToEdit?.street?.added}
                            value={state.newCode}
                            onChange={handleChangeStreetCode}
                            minLength={1}
                            control="newCode"
                        />
                    </Col>
                    <Col sm={6}>
                        <TextField
                            label="Nombre de calle"
                            control="newName"
                            minLength={3}
                            maxLength={50}
                            value={state.newName}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        {isStreetCodeUnavailable && (
                            <Alert bsStyle="danger">
                                El Cod. Calle ya se encuentra utilizado dentro de este radio
                            </Alert>
                        )}
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col sm={6}>
                        <NumberField
                            label="Altura Mínima"
                            value={state.newInitialNumber}
                            onChange={handleChange}
                            minLength={1}
                            maxLength={10}
                            control="newInitialNumber"
                        />
                    </Col>
                    <Col sm={6}>
                        <NumberField
                            label="Altura Máxima"
                            value={state.newFinalNumber}
                            onChange={handleChange}
                            minLength={1}
                            maxLength={10}
                            control="newFinalNumber"
                        />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col sm={6}>
                        <TextField
                            label="Código postal"
                            control="newPostalCode"
                            minLength={4}
                            maxLength={8}
                            value={state.newPostalCode}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col sm={6}>
                        <br/>
                        <Checkbox
                            name="replyCodeToAllArea"
                            checked={!!state.replyCodeToAllArea}
                            disabled={!state.newPostalCode}
                            onClick={handleApplyCodeToAllArea}
                        >
                            Aplicar a toda el área
                        </Checkbox>
                    </Col>
                </Row>
                <FormGroup className="form-inline text-right">
                    <Button disabled={!state.checked} onClick={handleAccept}>
                        Guardar
                    </Button>
                    &nbsp;&nbsp;
                    <Checkbox
                        disabled={isStreetCodeUnavailable}
                        checked={state.checked}
                        onClick={handleCheck}
                    >
                        Confirme Edición
                    </Checkbox>
                </FormGroup>
            </Form>
        </Fragment>
    );
};

SideEdition.propTypes = {
    requestClearStreets: PropTypes.func.isRequired,
    validateStreetCodeAvailability: PropTypes.func.isRequired,
    requestSearchStreet: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    streets: PropTypes.arrayOf(PropTypes.shape({})),
    sideToEdit: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        street: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            code: PropTypes.number.isRequired
        }).isRequired
    }).isRequired,
    areaData: PropTypes.shape({
        _id: PropTypes.string.isRequired
    }).isRequired,
    isStreetCodeUnavailable: PropTypes.bool
};

SideEdition.defaultProps = {
    streets: null,
    isStreetCodeUnavailable: false
};

export default connect(
    state => ({
        streets: state.review.streets,
        isStreetCodeUnavailable: state.review.isStreetCodeUnavailable,
        areaData: state.review.areaData
    }),
    dispatch => ({
        requestSearchStreet: (id, term) => dispatch(requestSearchStreet(id, term)),
        requestClearStreets: () => dispatch(requestClearStreets())
    })
)(SideEdition);
