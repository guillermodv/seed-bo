import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ContextMenu, ContextMenuTrigger, MenuItem} from 'react-contextmenu';
import {Grid, Row, Col} from 'react-bootstrap';
import {Role} from '@indec/react-commons';
import {size} from 'lodash';

import {roles} from '../../../../../constants';
import BlockButton from './BlockButton';

const BlocksList = ({
    radios, disabledEdit, handleClickMenu, handleClick, sessionRoles
}) => radios.map(radio => (
    <Grid fluid className="radio-box" key={radio.number}>
        <Row>
            <Col sm={12}>
                <h4>
                    {`Radio ${radio.number}`}
                </h4>
                {radio.blocks.map(block => (
                    <div className="block-context">
                        <Fragment key={block._id}>
                            {block.added && (
                                <Role
                                    roles={[roles.NATIONAL_COORDINATOR, roles.SUB_COORDINATOR, roles.COORDINATOR]}
                                    sessionRoles={sessionRoles}
                                >
                                    <ContextMenu id={block._id}>
                                        <MenuItem data={block} onClick={() => handleClickMenu(radio.number, block)}>
                                            Editar
                                        </MenuItem>
                                    </ContextMenu>
                                </Role>
                            )}
                            <ContextMenuTrigger id={block._id} disable={disabledEdit}>
                                <BlockButton
                                    color={block.added ? 'red' : ''}
                                    onChange={bl => handleClick(bl, size(radios) > 1 ? radio.number : null)}
                                    block={block}
                                />
                            </ContextMenuTrigger>
                        </Fragment>
                    </div>
                ))}
            </Col>
        </Row>
    </Grid>
));

BlocksList.propTypes = {
    handleClickMenu: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    disabledEdit: PropTypes.bool.isRequired,
    loadingBlocks: PropTypes.bool.isRequired,
    radios: PropTypes.arrayOf(PropTypes.shape({})),
    sessionRoles: PropTypes.arrayOf(PropTypes.string)
};

BlocksList.defaultProps = {
    sessionRoles: [],
    blocks: []
};

export default connect(state => ({
    sessionRoles: state.session.profile.roles
}))(BlocksList);
