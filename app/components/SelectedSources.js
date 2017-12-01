import React from 'react';
import PropTypes from 'prop-types';
import SourceItem from './SourceItem';


class SelectedSources extends React.Component{
  constructor(props) {
    super(props);
  }

  // setSwitches() {
  //   let sources = this.props.sources;
  //   console.log(JSON.stringify(sources));
  //   for (const source in sources) {
  //     console.log('inside of for loop', sources[source])
  //     console.log(source, sources[source].selected)
  //     document.getElementById(source).checked = sources[source].selected
  //   }
  // }

  // componentDidMount() {
  //   this.setSwitches();
  // }

  
  render () {
    return (
      <div className="selectedSourcesContainer">
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
