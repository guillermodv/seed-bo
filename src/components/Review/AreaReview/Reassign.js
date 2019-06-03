import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Button, Col, Modal, Row, Checkbox
} from 'react-bootstrap';
import {find, isEmpty} from 'lodash';
import {Dropdown} from '@indec/react-commons';

import {requestFetchUsersByArea} from '../../../actions/user';

const getUser = (users, user) => find(users, u => u?._id === user)?._id;
const user = (pollster, users, area) => (!isEmpty(pollster) ? getUser(users, pollster) : getUser(users, area.user));

class AreaReassign extends PureComponent {
    static propTypes = {
        requestFetchUsersByArea: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        area: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            currentUser: PropTypes.string,
            user: PropTypes.string
        }).isRequired,
        pollster: PropTypes.shape({}),
        users: PropTypes.arrayOf(PropTypes.shape({}))
    };

    static defaultProps = {
        pollster: null,
        users: []
    };

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            checked: false
        };
    }

    componentDidMount() {
        this.props.requestFetchUsersByArea(this.props.area._id);
    }

    handleSubmit() {
        this.setState(() => ({show: false, checked: false}));
        this.props.onSubmit();
    }

    render() {
        const {
            area, users, onChange, pollster
        } = this.props;
        const {checked, show} = this.state;
        return (
            <Fragment>
                <Button onClick={() => this.setState(() => ({show: true}))}>Reasignar</Button>
                <Modal show={show}>
                    <Modal.Header>
                        <Modal.Title>Reasignación</Modal.Title>
                        {area.currentUser && (
                            <Fragment>
                            Actualmente se encuentra asignado a:
                                {' '}
                                {area.currentUser}
                            </Fragment>
                        )}
                    </Modal.Header>
                    <Modal.Body>
                        <Dropdown
                            value={user(pollster, users, area)}
                            options={users}
                            onChange={onChange}
                            control="pollster"
                            label="Usuario:"
                            getOptionLabel={option => `${option.name} ${option.surname} (${option.username})`}
                            isClearable
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col sm={4}>
                                <Checkbox
                                    value={checked}
                                    disabled={!user(pollster, users, area)}
                                    onClick={() => this.setState({checked: !checked})}
                                >
                                    Confirmar reasignación
                                </Checkbox>
                            </Col>
                            <Col sm={4}>
                                <Button onClick={() => this.setState({show: false, checked: false})}>
                                    Cancelar
                                </Button>
                            </Col>
                            <Col sm={4}>
                                <Button disabled={!checked} onClick={() => this.handleSubmit()} bsStyle="primary">
                                    Reasignar
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        users: state.user.users
    }),
    dispatch => ({
        requestFetchUsersByArea: area => dispatch(requestFetchUsersByArea(area))
    })
)(AreaReassign);
