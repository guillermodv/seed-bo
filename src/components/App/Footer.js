import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Grid, Row, Col, Image
} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faIdCard} from '@fortawesome/free-solid-svg-icons';
import {isEmpty} from 'lodash';


import {getRoleName} from '../../constants';
import logo from '../../images/logo-footer.png';
import {User} from '../../model';

const Footer = ({profile}) => {
    if (profile && !isEmpty(profile._id)) {
        return (
            <footer className="hidden-print">
                <Grid>
                    <Row>
                        <Col sm={2} className="text-left">
                            <div className="text-small">
                                <small className="texts">
                                    MMUVRA
                                </small>
                            </div>
                            <div className="version">
                                Version&nbsp;
                                {VERSION}
                            </div>
                        </Col>
                        {profile && (
                            <Col sm={2}>
                                <div className="texts">
                                    <FontAwesomeIcon icon={faIdCard}/>
                                    &nbsp;
                                    {profile.surname}
                                    ,
                                    &nbsp;
                                    {profile.name}
                                </div>
                                <div className="version">
                                    {getRoleName(profile)}
                                </div>
                            </Col>
                        )}
                        <Col sm={4} className="text-center">
                            <a href="https://jira.indec.gob.ar/servicedesk/customer/portal">
                                Mesa de ayuda
                            </a>
                            <br/>
                            <span className="texts">
                                De lunes a viernes hábiles (011) 5031 4630
                            </span>
                        </Col>
                        <Col sm={4} className="text-right">
                            <Image src={logo}/>
                        </Col>
                    </Row>
                </Grid>
            </footer>
        );
    }

    return (
        <footer className="hidden-print">
            <Grid>
                <Row>
                    <Col sm={6}>
                        <span className="texts">
                            Muestra Maestra Urbana de Viviendas de la Republica Argentina
                        </span>
                        <div className="version">
                            Version&nbsp;
                            {VERSION}
                        </div>
                    </Col>
                    <Col sm={6} className="text-right">
                        <Image src={logo} className="logo-footer"/>
                    </Col>
                </Row>
            </Grid>
        </footer>
    );
};

Footer.propTypes = {
    profile: PropTypes.instanceOf(User)
};

Footer.defaultProps = {
    profile: null
};

export default connect(state => state.session)(Footer);
