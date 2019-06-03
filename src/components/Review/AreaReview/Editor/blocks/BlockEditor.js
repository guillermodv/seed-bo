import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {
    Alert, FormGroup, Checkbox, Button
} from 'react-bootstrap';
import {NumberField} from '@indec/react-commons';

class BlockEditor extends PureComponent {
    static propTypes = {
        validateBlockNumberAvailability: PropTypes.func.isRequired,
        onAccept: PropTypes.func.isRequired,
        blockToEdit: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            idArea: PropTypes.string.isRequired
        }).isRequired,
        isBlockNumberUnavailable: PropTypes.bool
    };

    static defaultProps = {
        isBlockNumberUnavailable: false
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            newValue: ''
        };
    }

    handleCheck(e) {
        this.setState(() => ({checked: e.checked}));
    }

    handleChange({target: {value, id}}) {
        this.setState(() => ({[id]: value, checked: false}));
    }

    checkBlockNumberAvailability() {
        this.props.validateBlockNumberAvailability(this.props.blockToEdit._id, this.state.newValue);
    }

    handleAccept() {
        if (this.state.newValue && !this.props.isBlockNumberUnavailable) {
            this.props.onAccept({number: this.state.newValue, _id: this.props.blockToEdit._id});
        }
    }

    render() {
        const {blockToEdit, isBlockNumberUnavailable} = this.props;
        const {checked, newValue} = this.state;
        return (
            <Fragment>
                <h4>
                    Número anterior de Manzana&nbsp;
                    {blockToEdit.number}
                </h4>
                <hr/>
                <NumberField
                    label="N° de Manzana"
                    value={newValue}
                    onChange={e => this.handleChange(e)}
                    minLength={1}
                    maxLength={3}
                    control="newValue"
                    pattern={/^[1-9]\d*$/gm}
                    onBlur={() => this.checkBlockNumberAvailability()}
                />
                {newValue && isBlockNumberUnavailable && (
                    <Alert bsStyle="warning">El N° de Manzana ya se encuentra utilizado dentro de esta area</Alert>
                )}
                <FormGroup>
                    <Checkbox
                        onClick={e => this.handleCheck(e.target)}
                        disabled={!newValue || isBlockNumberUnavailable}
                    >
                        Confirme Edición
                    </Checkbox>
                    <Button
                        onClick={() => this.handleAccept()}
                        disabled={!checked || isBlockNumberUnavailable}
                    >
                        Guardar
                    </Button>
                </FormGroup>
            </Fragment>
        );
    }
}

export default BlockEditor;
