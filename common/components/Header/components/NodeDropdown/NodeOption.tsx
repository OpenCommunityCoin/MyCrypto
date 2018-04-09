import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { TRemoveCustomNode, removeCustomNode } from 'actions/config';
import { NodeConfig } from 'types/node';
import './NodeOption.scss';

interface OwnProps {
  node: NodeConfig;
  isSelected: boolean;
  select(node: NodeConfig): void;
}

interface DispatchProps {
  removeCustomNode: TRemoveCustomNode;
}

type Props = OwnProps & DispatchProps;

class NodeOption extends React.PureComponent<Props> {
  public render() {
    const { node, isSelected } = this.props;
    return (
      <div className="NodeOption" key={node.service}>
        <div
          className={classnames('NodeOption-name', isSelected && 'is-selected')}
          onClick={this.handleSelect}
        >
          {node.service}
        </div>
        {node.isCustom && (
          <button className="NodeOption-remove" onClick={this.handleRemove}>
            <i className="fa fa-times-circle" />
          </button>
        )}
      </div>
    );
  }

  private handleSelect = () => {
    this.props.select(this.props.node);
  };

  private handleRemove = () => {
    if (this.props.node.isCustom) {
      this.props.removeCustomNode({ id: this.props.node.id });
    }
  };
}

export default connect(undefined, { removeCustomNode })(NodeOption);