import React from 'react';
import {sumBy} from 'lodash';

const renderMonitoring = generalMonitoring => (
    <tbody>
        {generalMonitoring.map(monitoring => (
            <tr key={monitoring._id.state}>
                <td colSpan="2">
                    {monitoring._id.stateName}
                </td>
                <td>
                    {monitoring.total}
                </td>
                <td>
                    {monitoring.open}
                </td>
                <td>
                    {monitoring.unassigned}
                </td>
                <td>
                    {monitoring.assigned}
                </td>
                <td>
                    {monitoring.inProgress}
                </td>
                <td>
                    {monitoring.close}
                </td>
                <td>
                    {monitoring.supervision}
                </td>
                <td>
                    {monitoring.supervised}
                </td>
                <td>
                    {monitoring.approved}
                </td>
                <td>
                    {monitoring.done}
                </td>
            </tr>
        ))}
        <tr>
            <td colSpan="2">
                <b>
                    Totales
                </b>
            </td>
            <td>
                <b>
                    {sumBy(generalMonitoring, monitoring => monitoring.total)}
                </b>
            </td>
            <td>
                <b>
                    {sumBy(generalMonitoring, monitoring => monitoring.open)}
                </b>
            </td>
            <td>
                <b>
                    {sumBy(generalMonitoring, monitoring => monitoring.unassigned)}
                </b>
            </td>
            <td>
                <b>
                    {sumBy(generalMonitoring, monitoring => monitoring.assigned)}
                </b>
            </td>
            <td>
                <b>
                    {sumBy(generalMonitoring, monitoring => monitoring.inProgress)}
                </b>
            </td>
            <td>
                <b>
                    {sumBy(generalMonitoring, monitoring => monitoring.close)}
                </b>
            </td>
            <td>
                <b>
                    {sumBy(generalMonitoring, monitoring => monitoring.supervision)}
                </b>
            </td>
            <td>
                <b>
                    {sumBy(generalMonitoring, monitoring => monitoring.supervised)}
                </b>
            </td>
            <td>
                <b>
                    {sumBy(generalMonitoring, monitoring => monitoring.approved)}
                </b>
            </td>
            <td>
                <b>
                    {sumBy(generalMonitoring, monitoring => monitoring.done)}
                </b>
            </td>
        </tr>
    </tbody>
);

export default renderMonitoring;
