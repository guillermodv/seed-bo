import {flatten, map} from 'lodash';

const getBlocks = radios => flatten(map(radios, radio => radio.blocks));

export default getBlocks;
