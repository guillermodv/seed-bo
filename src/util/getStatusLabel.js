import {find} from 'lodash';

import {areaStateTranslate} from '../constants';

const getStatusLabel = status => find(areaStateTranslate, area => area._id === status)?.description;

export default getStatusLabel;
