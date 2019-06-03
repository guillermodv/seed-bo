import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Dropdown, PageHeader} from '@indec/react-commons';

import SurveyTreebeard from './SurveyTreebeard';
import Dwellings from './Dwellings';
import {fetchSurveyWithTypeRequested, fetchDwellingsWithTypeRequested, cleanSurveys} from '../../actions/compare';
import {sampleType} from '../../constants';

class Compare extends PureComponent {
    static propTypes = {
        cleanSurveys: PropTypes.func.isRequired,
        fetchSurveyWithTypeRequested: PropTypes.func.isRequired,
        fetchDwellingsWithTypeRequested: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string.isRequired,
                area: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        surveyA: PropTypes.shape({}),
        surveyB: PropTypes.shape({}),
        dwellingsA: PropTypes.shape({}),
        dwellingsB: PropTypes.shape({})
    };

    static defaultProps = {
        surveyA: null,
        surveyB: null,
        dwellingsA: null,
        dwellingsB: null
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillUnmount() {
        this.props.cleanSurveys();
    }

    requestSurveyBySample({target: {id, value}}, sample) {
        this.setState(() => ({[id]: value}));
        this.props.fetchSurveyWithTypeRequested(this.props.match.params.id, value, sample);
    }

    requestDwellingBySample(sample, type, side) {
        this.props.fetchDwellingsWithTypeRequested(side, sample, type);
    }

    render() {
        const {
            surveyA,
            surveyB,
            dwellingsA,
            dwellingsB
        } = this.props;
        const {selectA, selectB} = this.state;
        const {area, id} = this.props.match.params;
        return (
            <Fragment>
                <PageHeader path={`/review/${id}`} title={`Modulo de comparación - Area ${area}`}/>
                <hr/>
                <Row>
                    <Col sm={6}>
                        <Dropdown
                            label="Base A"
                            control="selectA"
                            value={selectA}
                            onChange={e => this.requestSurveyBySample(e, 'A')}
                            options={sampleType}
                            getOptionLabel={option => option.label}
                        />
                    </Col>
                    <Col sm={6}>
                        <Dropdown
                            label="Base B"
                            control="selectB"
                            value={selectB}
                            onChange={e => this.requestSurveyBySample(e, 'B')}
                            options={sampleType}
                            getOptionLabel={option => option.label}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        {surveyA && (
                            <SurveyTreebeard
                                data={surveyA.treeBeard}
                                fetchSurvey={side => this.requestDwellingBySample('A', selectA, side)}
                            />
                        )}
                    </Col>
                    <Col sm={6}>
                        {surveyB && (
                            <SurveyTreebeard
                                data={surveyB.treeBeard}
                                fetchSurvey={side => this.requestDwellingBySample('B', selectB, side)}
                            />
                        )}
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col sm={6}>
                        {dwellingsA && (
                            <Dwellings
                                dwellings={dwellingsA.dwellings}
                                dwellingTotal={dwellingsA.dwellingTotal}
                            />
                        )}
                    </Col>
                    <Col sm={6}>
                        {dwellingsB && (
                            <Dwellings
                                dwellings={dwellingsB.dwellings}
                                dwellingTotal={dwellingsB.dwellingTotal}
                            />
                        )}
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        surveyA: state.compare.surveyA,
        surveyB: state.compare.surveyB,
        dwellingsA: state.compare.dwellingsA,
        dwellingsB: state.compare.dwellingsB,
        loading: state.compare.loading
    }),
    dispatch => ({
        fetchSurveyWithTypeRequested: (id, collectionType, sample) => dispatch(
            fetchSurveyWithTypeRequested(id, collectionType, sample)
        ),
        fetchDwellingsWithTypeRequested: (id, sample, type) => dispatch(
            fetchDwellingsWithTypeRequested(id, sample, type)
        ),
        cleanSurveys: () => dispatch(cleanSurveys())
    })
)(Compare);
