/* global window */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import Select from 'react-select';
import {IconButton} from '@indec/react-commons';
import {faPrint} from '@fortawesome/free-solid-svg-icons';

import {dwellingReportTypes} from '../../../constants';

const Filters = ({
    block, blocks, dwellingType, dwellingTypes, dwellingReportType, onSelectFilter, onSelectType, side, sides
}) => (
    <Row className="print-button-row">
        {dwellingReportType ? (
            <Fragment>
                <Col sm={2}>
                    <Select
                        value={dwellingReportType}
                        options={dwellingReportTypes}
                        name="dwellingReportType"
                        onChange={onSelectType}
                        placeholder="Filtro..."
                        isClearable
                    />
                </Col>
                <Col sm={2}>
                    <Select
                        value={block}
                        options={blocks}
                        name="block"
                        onChange={onSelectFilter}
                        placeholder="Manzana..."
                        isClearable
                    />
                </Col>
                <Col sm={2}>
                    <Select
                        value={side}
                        options={sides}
                        name="side"
                        onChange={onSelectFilter}
                        placeholder="Lado..."
                        isClearable
                    />
                </Col>
                <Col sm={2}>
                    <Select
                        value={dwellingType}
                        options={dwellingTypes}
                        name="dwellingType"
                        onChange={onSelectFilter}
                        placeholder="Tipo..."
                        isClearable
                    />
                </Col>
                <Col sm={2}>
                    <IconButton onClick={() => window.print()} icon={faPrint}>
                        Imprimir /s Exportar a PDF
                    </IconButton>
                </Col>
            </Fragment>
        ) : (
            <Fragment>
                <Col sm={2}>
                    <Select
                        value={dwellingReportType}
                        options={dwellingReportTypes}
                        name="dwellingReportType"
                        onChange={onSelectType}
                        placeholder="Filtro..."
                        isClearable
                    />
                </Col>
                <Col smOffset={8} sm={2}>
                    <IconButton onClick={() => window.print()} icon={faPrint}>
                        Imprimir /s Exportar a PDF
                    </IconButton>
                </Col>
            </Fragment>
        )}
    </Row>
);

Filters.propTypes = {
    onSelectFilter: PropTypes.func.isRequired,
    onSelectType: PropTypes.func.isRequired,
    blocks: PropTypes.arrayOf(PropTypes.shape({})),
    dwellingTypes: PropTypes.arrayOf(PropTypes.shape({})),
    sides: PropTypes.arrayOf(PropTypes.shape({})),
    block: PropTypes.shape({}),
    dwellingType: PropTypes.shape({}),
    dwellingReportType: PropTypes.shape({}),
    side: PropTypes.shape({})
};

Filters.defaultProps = {
    blocks: [],
    sides: [],
    dwellingTypes: [],
    block: null,
    dwellingType: null,
    dwellingReportType: null,
    side: null
};

export default Filters;
