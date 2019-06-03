import React from 'react';
import PropTypes from 'prop-types';
import {includes} from 'lodash';

import {areaStatus} from '../../constants';
import Editor from '../Review/AreaReview/Editor';

const RadioEditor = ({area, geographic}) => (
    <Editor
        hasSupervision={area.hasSupervision}
        disabledEdit={!includes([areaStatus.CLOSED, areaStatus.SUPERVISED], area.status)}
        enableSupervision={areaStatus.CLOSED === area.status}
        area={area._id}
        state={geographic.stateId}
    />
);

RadioEditor.propTypes = {
    area: PropTypes.shape({
        _id: PropTypes.string,
        status: PropTypes.number,
        hasSupervision: PropTypes.bool
    }).isRequired,
    geographic: PropTypes.shape({
        stateId: PropTypes.number
    }).isRequired
};

export default RadioEditor;
