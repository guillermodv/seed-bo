import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {isEmpty, random} from 'lodash';

const TypesTable = ({types}) => (
    <div key={Date.now()} className="page-break">
        <table className="table-width">
            <tbody>
                {isEmpty(types) ? (
                    <tr>
                        <td className="column-sm">Sin tipos</td>
                    </tr>
                ) : (
                    <Fragment>
                        <tr>
                            {types.map(type => (
                                <td key={random(10, true)} className="column-sm">{type.name}</td>
                            ))}
                        </tr>
                        <tr>
                            {types.map(type => (
                                <td key={random(10, true)} className="column-sm">{type.value}</td>
                            ))}
                        </tr>
                    </Fragment>
                )}
            </tbody>
        </table>
    </div>
);

TypesTable.propTypes = {
    types: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
    })).isRequired
};

export default TypesTable;
