import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Treebeard, decorators} from 'react-treebeard';
import {
    assign, find, head, includes, isEqual
} from 'lodash';

import Header from './Header';
import NodeViewer from './NodeViewer';

class SurveyTreebeard extends PureComponent {
    static propTypes = {
        fetchSurvey: PropTypes.func.isRequired,
        data: PropTypes.shape({})
    };

    static defaultProps = {
        data: null
    };

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    onToggle(node, toggled) {
        const {cursor, data} = this.state;

        if (cursor) {
            cursor.active = false;
            if (!includes(cursor.children, node)) {
                cursor.toggled = false;
            }
        }

        assign(node, {toggled, active: true});

        if (node.children) {
            assign(node, {toggled});
        }

        if (cursor && !cursor.children && node.children) {
            const cursorSide = find(head(data.children).children, side => includes(side.children, cursor));
            cursorSide.toggled = false;
        }

        if (node.side) {
            this.props.fetchSurvey(node._id);
        }

        this.setState(() => ({
            cursor: node,
            data: assign({}, data)
        }));
    }

    static getDerivedStateFromProps(props, state) {
        if (!isEqual(props.data, state.data)) {
            return {data: props.data};
        }
        return null;
    }

    render() {
        const {data: stateData, cursor} = this.state;
        return (
            <Fragment>
                <Treebeard
                    data={stateData}
                    decorators={{...decorators, Header}}
                    onToggle={(node, toggled) => this.onToggle(node, toggled)}
                />
                <NodeViewer node={cursor}/>
            </Fragment>
        );
    }
}

export default SurveyTreebeard;
