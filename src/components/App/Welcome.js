import React from 'react';
import PropTypes from 'prop-types';
import {
    Col, Grid, Image, Row
} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {isEmpty} from 'lodash';
import {User} from '../../model';
import logo from '../../images/logo.png';

function Welcome({profile}) {
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
                        Muestra Maestra Urbana de Viviendas de la Republica Argentina
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col sm={12} className="text-center">
                    <h3>
                        MMUVRA
                    </h3>
                </Col>
            </Row>
            <hr className="margin-top-splash"/>
            <Row>
                <Col sm={12} className="text-center ">
                    <h4>
                        <Link to={profile && !isEmpty(profile._id) ? '' : '/login'}>
                            <FontAwesomeIcon icon={faLock}/>
                            &nbsp;Ingreso al sistema
                        </Link>
                    </h4>
                </Col>
            </Row>
        </Grid>
    );
}

Welcome.propTypes = {
    profile: PropTypes.instanceOf(User)
};

Welcome.defaultProps = {
    profile: null
};

export default connect(
    state => state.session
)(Welcome);
