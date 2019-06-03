import React from 'react';
import {Table} from 'react-bootstrap';
import {map} from 'lodash';

const getModalBodyDwellingTypes = dwellingTypes => (
    <Table responsive bordered condensed size="sm" className="monitoring">
        <thead>
            <tr>
                <th>Tipo</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            {map(dwellingTypes, (value, key) => (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default getModalBodyDwellingTypes;
