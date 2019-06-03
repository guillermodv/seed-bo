import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';
import {size} from 'lodash';

import {Pagination} from '../common';
import DwellingWarningsModal from '../Review/AreaReview/Editor/Dwellings/DwellingWarningsModal';
import DwellingsHead from '../Review/AreaReview/Editor/Dwellings/DwellingsHead';
import DwellingsBody from '../Review/AreaReview/Editor/Dwellings/DwellingsBody';

class Dwellings extends PureComponent {
    static propTypes = {
        dwellings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        dwellingTotal: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            current: 0
        };
    }

    handlePagination(current) {
        this.setState(() => ({current}));
    }

    handleCloseModal() {
        this.setState(() => ({showModal: false, warnings: []}));
    }

    handleShowModal(warnings) {
        this.setState(() => ({showModal: true, warnings}));
    }

    render() {
        const {current, showModal, warnings} = this.state;
        const {dwellings, dwellingTotal} = this.props;
        return (
            <Fragment>
                {showModal && (
                    <DwellingWarningsModal
                        onDismiss={() => this.handleCloseModal()}
                        warnings={warnings}
                    />
                )}
                <Table responsive striped condensed bordered>
                    <thead>
                        <DwellingsHead/>
                    </thead>
                    <tbody>
                        <DwellingsBody
                            dwellings={dwellings}
                            current={current}
                            onShowModal={dwellingsWarnings => this.handleShowModal(dwellingsWarnings)}
                        />
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={10}>
                                <Pagination
                                    current={current}
                                    onClick={i => this.handlePagination(i)}
                                    size={size(dwellings || 0)}
                                    total={dwellingTotal}
                                />
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Fragment>
        );
    }
}

export default Dwellings;
