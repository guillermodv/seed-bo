import React from 'react';
import PropTypes from 'prop-types';
import {PageHeader} from '@indec/react-commons';

const BackToFieldMaterials = ({title, state, ups}) => (
    <PageHeader
        path={`/fieldMaterials/state/${state}/ups/${ups}`}
        title={title}
    />
);

BackToFieldMaterials.propTypes = {
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    ups: PropTypes.string.isRequired
};

export default BackToFieldMaterials;
