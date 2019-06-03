import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Treebeard, decorators} from 'react-treebeard';
import {assign, isEqual} from 'lodash';

import NodeViewer from './NodeViewer';

class Tree extends PureComponent {
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
        }
        assign(node, {active: true});
        if (node.children) {
            assign(node, {toggled});
        }
        if (node.side) {
            this.props.fetchSurvey(node._id);
        }
        this.setState({cursor: node, data: assign({}, data)});
    }

    static getDerivedStateFromProps(props, state) {
        if (!isEqual(props.data, state.data)) {
            return {data: props.data};
        }
        return null;
    }

    render() {
        const {data: stateData, cursor} = this.state;
        const decoration = {
            Header: props => {
                const activeColor = props.node.haveDifference ? '#eb3d3d' : '#9da5ab';
                return (
                    <div style={props.style.base}>
                        <div id={props.node.id} style={{color: activeColor}}>
                            {props.node.name}
                        </div>
                    </div>
                );
            }
        };
        return (
            <Fragment>
                <Treebeard
                    data={stateData}
                    decorators={{
                        ...decorators,
                        Header: decoration.Header
                    }}
                    onToggle={(node, toggled) => this.onToggle(node, toggled)}
                />
                <NodeViewer
                    node={cursor}
                />
            </Fragment>
        );
    }
}

export default Tree;
