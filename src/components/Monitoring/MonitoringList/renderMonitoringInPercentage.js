import React from 'react';
import {sumBy} from 'lodash';

import {getPercentage} from '../../../util';

const renderMonitoringInPercentage = generalMonitoring => (
    <tbody>
        {generalMonitoring.map(monitoring => (
            <tr key={monitoring._id.state}>
                <td colSpan="2">
                    {monitoring._id.stateName}
                </td>
                <td>
                        100 %
                </td>
                <td>
                    {getPercentage(monitoring.open, monitoring.total)}
                        &nbsp;%
                </td>
                <td>
                    {getPercentage(monitoring.unassigned, monitoring.total)}
                        &nbsp;%
                </td>
                <td>
                    {getPercentage(monitoring.assigned, monitoring.total)}
                        &nbsp;%
                </td>
                <td>
                    {getPercentage(monitoring.inProgress, monitoring.total)}
                        &nbsp;%
                </td>
                <td>
                    {getPercentage(monitoring.close, monitoring.total)}
                        &nbsp;%
                </td>
                <td>
                    {getPercentage(monitoring.supervision, monitoring.total)}
                        &nbsp;%
                </td>
                <td>
                    {getPercentage(monitoring.supervised, monitoring.total)}
                        &nbsp;%
                </td>
                <td>
                    {getPercentage(monitoring.approved, monitoring.total)}
                        &nbsp;%
                </td>
                <td>
                    {getPercentage(monitoring.done, monitoring.total)}
                        &nbsp;%
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
                        100 %
                </b>
            </td>
            <td>
                <b>
                    {getPercentage(
                        sumBy(generalMonitoring, monitoring => monitoring.open),
                        sumBy(generalMonitoring, monitoring => monitoring.total),
                        2
                    )}
                        &nbsp;%
                </b>
            </td>
            <td>
                <b>
                    {getPercentage(
                        sumBy(generalMonitoring, monitoring => monitoring.unassigned),
                        sumBy(generalMonitoring, monitoring => monitoring.total),
                        2
                    )}
                        &nbsp;%
                </b>
            </td>
            <td>
                <b>
                    {getPercentage(
                        sumBy(generalMonitoring, monitoring => monitoring.assigned),
                        sumBy(generalMonitoring, monitoring => monitoring.total),
                        2
                    )}
                        &nbsp;%
                </b>
            </td>
            <td>
                <b>
                    {getPercentage(
                        sumBy(generalMonitoring, monitoring => monitoring.inProgress),
                        sumBy(generalMonitoring, monitoring => monitoring.total),
                        2
                    )}
                        &nbsp;%
                </b>
            </td>
            <td>
                <b>
                    {getPercentage(
                        sumBy(generalMonitoring, monitoring => monitoring.close),
                        sumBy(generalMonitoring, monitoring => monitoring.total),
                        2
                    )}
                        &nbsp;%
                </b>
            </td>
            <td>
                <b>
                    {getPercentage(
                        sumBy(generalMonitoring, monitoring => monitoring.supervision),
                        sumBy(generalMonitoring, monitoring => monitoring.total),
                        2
                    )}
                        &nbsp;%
                </b>
            </td>
            <td>
                <b>
                    {getPercentage(
                        sumBy(generalMonitoring, monitoring => monitoring.supervised),
                        sumBy(generalMonitoring, monitoring => monitoring.total),
                        2
                    )}
                        &nbsp;%
                </b>
            </td>
            <td>
                <b>
                    {getPercentage(
                        sumBy(generalMonitoring, monitoring => monitoring.approved),
                        sumBy(generalMonitoring, monitoring => monitoring.total),
                        2
                    )}
                        &nbsp;%
                </b>
            </td>
            <td>
                <b>
                    {getPercentage(
                        sumBy(generalMonitoring, monitoring => monitoring.done),
                        sumBy(generalMonitoring, monitoring => monitoring.total),
                        2
                    )}
                        &nbsp;%
                </b>
            </td>
        </tr>
    </tbody>
);

export default renderMonitoringInPercentage;
