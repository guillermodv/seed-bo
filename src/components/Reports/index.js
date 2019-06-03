/* global window */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Col, Grid, Row, Tab, Tabs
} from 'react-bootstrap';
import {IconButton, LoadingIndicator, PageHeader} from '@indec/react-commons';
import {faScroll, faPrint} from '@fortawesome/free-solid-svg-icons';
import {isNil} from 'lodash';

import BlockReport from './BlockReport';
import DwellingTab from './DwellingTab';
import Geographic from '../Review/AreaReview/Geographic';
import {RadioEditor} from '../common';
import {reportsTabs} from '../../constants';
import {requestFetchAreaData, requestFetchGeographicByArea, requestFetchRadiosByArea} from '../../actions/review';
import {requestBlockReports, requestDwellingReports} from '../../actions/reports';

class Result extends PureComponent {
    static propTypes = {
        requestFetchAreaData: PropTypes.func.isRequired,
        requestFetchGeographicByArea: PropTypes.func.isRequired,
        requestFetchRadiosByArea: PropTypes.func.isRequired,
        requestBlockReports: PropTypes.func.isRequired,
        requestDwellingReports: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string,
                area: PropTypes.string
            }).isRequired
        }).isRequired,
        areaData: PropTypes.shape({}),
        blocks: PropTypes.arrayOf(PropTypes.shape({})),
        geographic: PropTypes.shape({
            area: PropTypes.string,
            state: PropTypes.string,
            ups: PropTypes.string
        })
    };

    static defaultProps = {
        areaData: null,
        blocks: [],
        geographic: null
    };

    constructor(props) {
        super(props);
        this.state = {
            tabSelected: reportsTabs.PREVIEW
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.requestFetchAreaData(id);
        this.props.requestFetchGeographicByArea(id);
        this.props.requestFetchRadiosByArea(id);
    }

    handleSelect(key) {
        const {area, state, ups} = this.props.geographic;
        switch (key) {
            case reportsTabs.BLOCKS_AND_SIDES:
                this.props.requestBlockReports({area, state, ups});
                break;
            case reportsTabs.DWELLINGS:
                this.props.requestDwellingReports({area, state, ups});
                break;
            default:
                break;
        }
        this.setState(() => ({tabSelected: key}));
    }

    renderContent() {
        const {area, id} = this.props.match.params;
        const {areaData, geographic, blocks} = this.props;
        const {tabSelected} = this.state;
        return (
            <Grid fluid>
                <PageHeader
                    path={`/review/${id}/editor`}
                    title={`Reportes de Área: ${area}`}
                    icon={faScroll}
                    className="hidden-print"
                />
                <hr/>
                <Row>
                    <Col sm={12}>
                        <Geographic geographic={geographic}/>
                    </Col>
                </Row>
                <Tabs
                    id="tabs"
                    activeKey={tabSelected}
                    onSelect={key => this.handleSelect(key)}
                >
                    <Tab eventKey={reportsTabs.PREVIEW} title="Editor">
                        <RadioEditor area={areaData} geographic={geographic}/>
                    </Tab>
                    <Tab eventKey={reportsTabs.BLOCKS_AND_SIDES} title="Manzanas / Lados">
                        <Row className="print-button-row">
                            <Col smOffset={10} sm={2}>
                                <IconButton onClick={() => window.print()} icon={faPrint}>
                                    Imprimir / Exportar a PDF
                                </IconButton>
                            </Col>
                        </Row>
                        <Row>
                            {blocks.map(block => (
                                <BlockReport key={block.id} block={block}/>
                            ))}
                        </Row>
                    </Tab>
                    <Tab eventKey={reportsTabs.DWELLINGS} title="Viviendas">
                        <DwellingTab params={{area: geographic.area, state: geographic.state, ups: geographic.ups}}/>
                    </Tab>
                </Tabs>
            </Grid>
        );
    }

    render() {
        const {areaData, geographic} = this.props;
        return isNil(areaData) || isNil(geographic) ? <LoadingIndicator/> : this.renderContent();
    }
}

export default connect(
    state => ({
        areaData: state.review.areaData,
        blocks: state.reports.blocks,
        geographic: state.review.geographic
    }),
    dispatch => ({
        requestFetchAreaData: idArea => dispatch(requestFetchAreaData(idArea)),
        requestFetchGeographicByArea: id => dispatch(requestFetchGeographicByArea(id)),
        requestFetchRadiosByArea: idArea => dispatch(requestFetchRadiosByArea(idArea)),
        requestBlockReports: params => dispatch(requestBlockReports(params)),
        requestDwellingReports: params => dispatch(requestDwellingReports(params))
    })
)(Result);
