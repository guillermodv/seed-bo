import PropTypes from 'prop-types';

export default PropTypes.shape({
    stateName: PropTypes.string.isRequired,
    departmentName: PropTypes.string.isRequired,
    localityName: PropTypes.string.isRequired,
    ups: PropTypes.number.isRequired,
    area: PropTypes.number.isRequired
});
