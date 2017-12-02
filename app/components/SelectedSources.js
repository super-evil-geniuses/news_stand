import React from 'react';
import PropTypes from 'prop-types';
import SourceItem from './SourceItem';


class SelectedSources extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div className="selectedSourcesContainer">
      <br />
      <h4>Choose your sources</h4>
      <br />
        <input type="checkbox" id="cnn" name="subscribe" value="CNN"
        checked={this.props.sources.cnn.selected} 
        onChange={(e) => {
          let checked = document.getElementById('cnn').checked
          this.props.onSourceClick('cnn', checked)}} />
        <label>CNN</label>
        <br />
        <input type="checkbox" id="bloomberg" name="subscribe" value="BLOOMBERG" 
        checked={this.props.sources.bloomberg.selected}
        onChange={(e) => {
          let checked = document.getElementById('bloomberg').checked
          this.props.onSourceClick('bloomberg', checked)}} />
        <label>BLOOMBERG</label>
        <br />
        <input type="checkbox" id="abc" name="subscribe" value="ABC" 
        checked={this.props.sources.abc.selected}
        onChange={(e) => {
          let checked = document.getElementById('abc').checked
          this.props.onSourceClick('abc', checked)}} />
        <label>ABC</label>
        <br />
        <input type="checkbox" id="techCrunch" name="subscribe" value="TECH CRUNCH" 
        checked={this.props.sources.techCrunch.selected}
        onChange={(e) => {
          let checked = document.getElementById('techCrunch').checked
          this.props.onSourceClick('techCrunch',checked)}} />
        <label>TECH CRUNCH</label>
        <br />
        <input type="checkbox" id="associatedPress" name="subscribe" value="ASSOCIATED PRESS"
        checked={this.props.sources.associatedPress.selected} 
        onChange={(e) => {
          let checked = document.getElementById('associatedPress').checked
          this.props.onSourceClick('associatedPress', checked)}} />
        <label>ASSOCIATED PRESS</label>

      </div>
    );
  }
};

SelectedSources.propTypes = {
  onSourceClick: PropTypes.func.isRequired,
};

export default SelectedSources;
