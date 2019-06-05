/* global AUTH_ENDPOINT */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Grid, Row, Col, Button, Form, FormGroup, FormControl, Alert
} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronCircleRight, faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {isEmpty, includes} from 'lodash';
import {LoginService, TokenService} from '@indec/heimdall/client';

import {requestSession} from '../../actions';
import UserService from '../../services/user';
import {roles as sessionRoles} from '../../constants';

class SignIn extends Component {
    static propTypes = {
        requestSession: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func
        }).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: null
        };
    }

    componentDidMount() {
        TokenService.clear();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {username, password} = this.state;
        const token = await (new LoginService(TokenService, AUTH_ENDPOINT)).login(
            username, password
        );

        if (isEmpty(token)) {
            this.setState({
                errorMessage: 'Usuario o password no válidos.'
            });
        } else {
            const {_id, roles} = await UserService.profile();
            if (_id && !includes(roles, sessionRoles.POLLSTER)) {
                this.props.requestSession();
                this.props.history.push('/');
                return;
            }
            this.setState({
                errorMessage: 'Usuario o password no válidos.'
            });
            TokenService.clear();
        }
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        const {username, password, errorMessage} = this.state;
        const passRecoveryUrl = `${AUTH_ENDPOINT}/signIn?backUrl=%2F#/passwordRecovery`;
        return (
            <Grid>
                <Row>
                    <Col sm={4} smOffset={4}>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Row>
                                <Col sm={12}>
                                    <FormGroup>
                                        <h2>
                                            <FontAwesomeIcon icon={faChevronCircleRight}/>
                                            &nbsp;Iniciar sesión
                                        </h2>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="vertical-margin">
                                <Col sm={12}>
                                    <FormGroup controlId="username" className="form-group">
                                        <FormControl
                                            type="text"
                                            value={username}
                                            placeholder="Usuario"
                                            required
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="vertical-margin">
                                <Col sm={12}>
                                    <FormGroup controlId="password">
                                        <FormControl
                                            type="password"
                                            value={password}
                                            placeholder="Password"
                                            required
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <FormGroup>
                                        <Button type="submit" bsStyle="primary">
                                            <FontAwesomeIcon icon={faPowerOff}/>
                                            &nbsp;Ingresar
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="vertical-margin">
                                <Col sm={12}>
                                    <a href={passRecoveryUrl}>
                                        Recuperar contraseña
                                    </a>
                                </Col>
                            </Row>
                            <Row className="vertical-margin">
                                <Col sm={12}>
                                    {errorMessage && (
                                        <FormGroup>
                                            <Alert bsStyle="danger" className="text-center">
                                                {errorMessage}
                                            </Alert>
                                        </FormGroup>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default connect(
    null,
    dispatch => ({
        requestSession: () => dispatch(requestSession())
    })
)(SignIn);
