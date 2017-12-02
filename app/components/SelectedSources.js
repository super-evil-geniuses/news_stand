import React from 'react';
import PropTypes from 'prop-types';
import SourceCheckBox from './SourceCheckBox.js';

class SelectedSources extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div className="selectedSourcesContainer">
        <br />
        <h4>Choose your sources</h4>
        {(() => {
          let sourcesArr = [];
          for (const source in this.props.sources) {
            sourcesArr.push(this.props.sources[source]);  
          }
          return sourcesArr.map((e) => <SourceCheckBox key={e.id} source={e} onSourceClick={this.props.onSourceClick} />)
        })()
        }
      </div>
    );
  }
};

SelectedSources.propTypes = {
  onSourceClick: PropTypes.func.isRequired,
};

export default SelectedSources;
