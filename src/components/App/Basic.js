import React from 'react';
import {
    Col, Grid, Image, Row
} from 'react-bootstrap';
import {connect} from 'react-redux';
import logo from '../../images/logo.png';
import {appLabel} from '../../constants';

function Welcome() {
    return (
        <Grid>
            <Row>
                <Col sm={12} className="text-center">
                    <Image src={logo}/>
                </Col>
            </Row>
            <Row>
                <Col sm={12} className="text-center margin-top-splash">
                    <h3>
                        {appLabel.APPDESCRIPTION}
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col sm={12} className="text-center">
                    <h3>
                        {appLabel.APPDESCRIPTION}
                    </h3>
                </Col>
            </Row>
        </Grid>
    );
}

export default connect(
    state => state.session
)(Welcome);
