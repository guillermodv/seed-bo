
import {sumBy, filter} from 'lodash';

export default (state, province, responses) => {
    const filteredProvince = filter(province, p => (state ? p._id.state === state : true));
    const unassigned = sumBy(filteredProvince, p => p.unassigned);
    const assigned = sumBy(filteredProvince, p => p.assigned);
    const inProgress = sumBy(filteredProvince, p => p.inProgress);
    const closed = sumBy(filteredProvince, p => p.closed);
    const resolved = sumBy(filteredProvince, p => p.resolved);
    const total = sumBy(filteredProvince, p => p.total);

    const filterResponse = filter(responses, r => (state ? r._id.state === state : true));

    const provinceData = {
        labels: [
            'Sin asignar',
            'Asignadas',
            'En campo',
            'Cerradas',
            'Aprobadas'
        ],
        datasets: [{
            backgroundColor: [
                '#018bc9',
                '#222983',
                '#dc0068',
                '#000',
                '#58565a'
            ],
            data: [
                unassigned,
                assigned,
                inProgress,
                closed,
                resolved
            ]
        }],
        text: total
    };

    const labelResponse = [
        'Respuesta',
        'No Respuesta'
    ];

    const dwellingResponse = {
        labels: labelResponse,
        datasets: [{
            backgroundColor: [
                '#00639a',
                '#028dc8'
            ],
            data: [
                sumBy(filterResponse, p => p.response),
                sumBy(filterResponse, p => p.noResponse)
            ]
        }],
        text: sumBy(filterResponse, p => p.total)
    };

    const dwellingNoResponseCause = {
        labels: [
            '1) Deshabitada (en venta, alquiler, etcétera)',
            '2) Demolida, en demolición',
            '3) Fin de semana o temporada',
            '4 ECR',
            '5 VUE',
            '6 LCV',
            '7 DNE',
            '8 AIN'
        ],
        datasets: [{
            backgroundColor: [
                '#01507c',
                '#036398',
                '#006da9',
                '#0079bd',
                '#008cdb',
                '#029bf0',
                '#3e94c3',
                '#46aee7'
            ],
            data: [
                sumBy(filterResponse, p => p.firstCause),
                sumBy(filterResponse, p => p.secondCause),
                sumBy(filterResponse, p => p.thirdCause),
                sumBy(filterResponse, p => p.fourthCause),
                sumBy(filterResponse, p => p.fifthCause),
                sumBy(filterResponse, p => p.sixthCause),
                sumBy(filterResponse, p => p.seventhCause),
                sumBy(filterResponse, p => p.eigthCause)
            ]
        }],
        text: sumBy(filterResponse, p => p.noResponse)
    };

    const householdResponse = {
        labels: labelResponse,
        datasets: [{
            backgroundColor: [
                '#502f5e',
                '#b07cc6'
            ],
            data: [
                sumBy(filterResponse, p => p.householdResponse),
                sumBy(filterResponse, p => p.householdNoResponse)
            ]
        }],
        text: sumBy(filterResponse, p => p.householdTotal)
    };

    const householdNoResponseCause = {
        labels: [
            '1 AUS',
            '2 REC',
            '3 OTROS'
        ],
        datasets: [{
            backgroundColor: [
                '#502f5e',
                '#77458a',
                '#b07fc0'
            ],
            data: [
                sumBy(filterResponse, p => p.householdFirstCause),
                sumBy(filterResponse, p => p.householdSecondCause),
                sumBy(filterResponse, p => p.householdThirdCause)
            ]
        }],
        text: sumBy(filterResponse, p => p.householdNoResponse)
    };

    const membersResponse = {
        labels: labelResponse,
        datasets: [{
            backgroundColor: [
                '#434947',
                '#bfc9ca'
            ],
            data: [
                sumBy(filterResponse, p => p.membersResponse),
                sumBy(filterResponse, p => p.membersNoResponse)
            ]
        }],
        text: sumBy(filterResponse, p => p.membersTotal)
    };

    const membersNoResponseCause = {
        labels: [
            '1 AUS',
            '2 REC',
            '3 OTROS'
        ],
        datasets: [{
            backgroundColor: [
                '#61696b',
                '#818b8d',
                '#bdc7c8'
            ],
            data: [
                sumBy(filterResponse, p => p.membersFirstCause),
                sumBy(filterResponse, p => p.membersSecondCause),
                sumBy(filterResponse, p => p.membersThirdCause)
            ]
        }],
        text: sumBy(filterResponse, p => p.membersNoResponse)
    };

    return {
        provinceData,
        dwellingResponse,
        dwellingNoResponseCause,
        householdResponse,
        householdNoResponseCause,
        membersResponse,
        membersNoResponseCause
    };
};

// eslint-disable-next-line max-len
export const GBA = 'M1493 2529 c-33 -21 -43 -44 -23 -51 16 -5 -18 -66 -40 -73 -27 -8 -25 -19 10 -70 17 -24 30 -47 30 -52 0 -5 -13 -17 -30 -26 -16 -10 -37 -25 -46 -35 -9 -9 -27 -16 -40 -17 -12 0 -26 -3 -30 -7 -14 -15 -35 -8 -75 24 -21 17 -41 29 -43 27 -3 -3 0 -23 5 -46 10 -38 8 -47 -30 -129 -49 -103 -81 -148 -122 -169 -33 -17 -36 -35 -14 -69 23 -35 27 -68 9 -80 -25 -19 -9 -131 23 -156 20 -15 24 -27 21 -57 -3 -37 -2 -37 123 -132 117 -89 239 -197 239 -210 0 -3 -34 -17 -75 -30 -41 -14 -75 -27 -75 -30 0 -2 15 -17 32 -31 29 -24 31 -29 18 -44 -12 -16 -6 -25 61 -87 81 -76 103 -82 161 -39 15 11 29 20 32 20 2 0 17 -20 33 -45 15 -25 36 -48 46 -51 9 -3 24 -18 32 -33 13 -26 13 -30 -5 -46 -11 -10 -20 -21 -20 -24 0 -3 32 -35 71 -70 75 -68 89 -69 89 -9 0 26 30 68 48 68 4 0 26 18 47 40 21 22 44 40 50 40 6 0 24 -13 39 -29 28 -29 28 -32 21 -105 -4 -42 -3 -76 1 -76 4 0 26 15 49 34 23 19 55 38 71 42 33 8 60 33 66 60 2 10 12 20 23 23 11 2 46 20 79 41 54 35 61 37 72 22 7 -9 10 -20 8 -24 -3 -5 -1 -8 4 -8 5 0 17 -12 27 -26 13 -20 14 -28 4 -40 -9 -11 -8 -23 5 -57 28 -74 30 -74 73 -37 21 19 38 37 38 41 0 4 21 30 48 57 26 28 47 54 47 57 0 4 61 71 135 150 l135 142 0 132 c0 152 5 145 -116 157 -62 7 -69 10 -108 51 -22 24 -57 54 -76 67 -19 13 -75 50 -125 82 -49 33 -105 72 -124 89 -29 25 -35 27 -45 14 -19 -26 -90 -69 -113 -69 -13 0 -23 -5 -23 -11 0 -8 -5 -8 -15 1 -18 15 -39 1 -61 -41 -15 -30 -76 -54 -100 -41 -7 4 -43 34 -79 67 l-67 60 3 85 c2 47 9 94 16 106 7 11 20 44 28 72 14 47 21 55 65 77 48 24 48 25 43 67 -2 23 -9 50 -14 59 -5 10 -9 25 -9 34 0 27 -69 108 -115 135 -25 14 -55 35 -67 46 -13 11 -37 26 -55 33 -18 7 -38 19 -44 27 -6 8 -35 28 -65 44 -29 17 -74 49 -101 70 -26 22 -50 40 -53 40 -3 0 -20 -10 -37 -21z';
// eslint-disable-next-line max-len
export const CABA = 'M2019 1984 c-47 -28 -58 -40 -63 -68 -4 -19 -13 -47 -22 -64 -8 -17 -17 -66 -21 -109 l-6 -79 64 -58 c35 -32 71 -61 79 -66 23 -12 73 13 90 46 20 38 28 44 68 44 56 0 152 56 137 80 -3 4 2 10 10 14 21 8 19 37 -4 43 -15 4 -22 20 -30 66 -11 63 -24 80 -53 73 -16 -4 -32 6 -113 69 -46 35 -61 44 -70 44 -5 0 -35 -16 -66 -35z';
