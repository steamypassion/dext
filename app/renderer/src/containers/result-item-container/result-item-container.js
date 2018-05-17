import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ResultItem from '../../components/result-item';
import { IPC_EXECUTE_ITEM } from '../../../../ipc';

export default class ResultItemContainer extends Component {
  static displayName = 'ResultItemContainer';

  isAltMod() {
    return (
      this.props.selected &&
      this.props.keys &&
      this.props.keys.indexOf('alt') > -1
    );
  }

  isSuperMod() {
    return (
      this.props.selected &&
      this.props.keys &&
      this.props.keys.indexOf('meta') > -1
    );
  }

  execute = () => {
    const { item } = this.props;
    const { action } = item;
    ipcRenderer.send(IPC_EXECUTE_ITEM, {
      action,
      item,
      isAltMod: this.isAltMod(),
      isSuperMod: this.isSuperMod(),
    });
  };

  render() {
    const { theme, item, selected, copiedToClipboard } = this.props;
    return (
      <ResultItem
        theme={theme}
        item={item}
        selected={selected}
        onDoubleClick={this.execute}
        isAltMod={this.isAltMod()}
        isSuperMod={this.isSuperMod()}
        copiedToClipboard={copiedToClipboard && selected}
      />
    );
  }
}

ResultItemContainer.defaultProps = {
  theme: {},
  item: {},
  selected: false,
  keys: [],
  copiedToClipboard: false,
};

ResultItemContainer.propTypes = {
  theme: PropTypes.object,
  // item prop should follow the Alfred workflow script filter JSON format
  // https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
  item: PropTypes.object,
  selected: PropTypes.bool,
  keys: PropTypes.arrayOf(PropTypes.string),
  copiedToClipboard: PropTypes.bool,
};
