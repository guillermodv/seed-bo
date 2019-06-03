import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import {geoMercator, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import {includes} from 'lodash';

import ArgentinaMap from '../../data/topoJson/argentina.json';
import {GBA, CABA} from './Util';

const projection = () => geoMercator().scale(100);

const getColor = (province, state, availableStates) => {
    if (province.state === state) {
        return 'rgba(27, 83, 120, 1)';
    }

    if (includes(availableStates, province.state)) {
        return 'rgba(2, 141, 200, 1)';
    }
    return 'rgba(0, 0, 0, 0.1)';
};

const renderPopover = state => (
    <Popover
        id="stateName"
        className="text-center"
        title={(
            <span>
                <FontAwesomeIcon icon={faMapMarkerAlt}/>
                {state.state}
            </span>
        )}
    >
        {state.name}
    </Popover>
);


const Argentina = ({
    availableStates, province, handleClick
}) => (
    <Fragment>
        <svg
            width={440}
            height={700}
            viewBox="350 287 45 80"
            stroke="#fff"
            strokeWidth={0.08}
            style={{
                marginLeft: '-3.5em'
            }}
        >
            <g className="countries">
                {feature(ArgentinaMap, ArgentinaMap.objects.argentina).features.map(d => (
                    <OverlayTrigger
                        trigger={['focus', 'hover']}
                        placement="bottom"
                        rootClose
                        overlay={
                            renderPopover(d.properties)
                        }
                    >
                        <path
                            key={d.id}
                            d={geoPath().projection(projection())(d)}
                            fill={
                                getColor(
                                    d.properties,
                                    province.state,
                                    availableStates
                                )
                            }
                            onClick={() => handleClick(d)}
                            onTouchStart={() => handleClick(d)}
                        />
                    </OverlayTrigger>
                ))
                }
            </g>
        </svg>
        <svg
            width={200}
            height={200}
            viewBox="95 25 200 222"
            style={{
                position: 'absolute',
                zIndex: 999,
                bottom: '7em',
                left: '8em'
            }}
            stroke="#000"
            strokeWidth={0.1}
        >
            <g transform="translate(0,292) scale(0.1,-0.1)">
                <OverlayTrigger
                    trigger={['focus', 'hover']}
                    placement="bottom"
                    rootClose
                    overlay={
                        renderPopover({state: 4, name: 'GBA Partidos'})
                    }
                >
                    <path
                        d={GBA}
                        fill={
                            getColor(
                                {state: 4},
                                province.state,
                                availableStates
                            )
                        }
                        onClick={() => handleClick({
                            properties: {state: 4, name: 'GBA Partidos'}
                        })}
                        onTouchStart={() => handleClick({
                            properties: {state: 4, name: 'GBA Partidos'}
                        })}
                    />
                </OverlayTrigger>
                <OverlayTrigger
                    trigger={['focus', 'hover']}
                    placement="bottom"
                    rootClose
                    overlay={
                        renderPopover({state: 2, name: 'CABA'})
                    }
                >
                    <path
                        d={CABA}
                        fill={
                            getColor(
                                {state: 2},
                                province.state,
                                availableStates
                            )
                        }
                        onClick={() => handleClick({
                            properties: {state: 2, name: 'CABA'}
                        })}
                        onTouchStart={() => handleClick({
                            properties: {state: 2, name: 'CABA'}
                        })}
                    />
                </OverlayTrigger>
            </g>
        </svg>
    </Fragment>
);

Argentina.propTypes = {
    availableStates: PropTypes.arrayOf(PropTypes.number),
    province: PropTypes.shape({}),
    handleClick: PropTypes.func.isRequired
};

Argentina.defaultProps = {
    availableStates: null,
    province: {
        state: null,
        name: null
    }
};

export default Argentina;
