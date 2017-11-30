import React from 'react';
import PropTypes from 'prop-types';
import SourceItem from './SourceItem';

const SelectedSources = (props) => {
  const sources = props.selectedSources.map((source, index) => (
    <SourceItem
      key={source.id}
      source={source.label}
      index={index}
      onRemoval={props.onRemoval}
    />
  ));
  return (
    <div className="selectedSourcesContainer">
      <input type="checkbox" id="CNN" name="subscribe" value="CNN" />
      <label for="subscribeNews">CNN</label>
      <br />
      <input type="checkbox" id="BLOOMBERG" name="subscribe" value="CNN" />
      <label for="subscribeNews">BLOOMBERG</label>
      <br />
      <input type="checkbox" id="ABC" name="subscribe" value="CNN" />
      <label for="subscribeNews">ABC</label>
      <br />
      <input type="checkbox" id="TECH CRUNCH" name="subscribe" value="CNN" />
      <label for="subscribeNews">TECH CRUNCH</label>
      <br />
      <input type="checkbox" id="ASSOCIATED PRESS" name="subscribe" value="CNN" />
      <label for="subscribeNews">ASSOCIATED PRESS</label>

    </div>
  );
};

SelectedSources.propTypes = {
  selectedSources: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoval: PropTypes.func.isRequired,
};

export default SelectedSources;
