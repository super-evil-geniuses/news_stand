import React from 'react';
import PropTypes from 'prop-types';

const SourceCheckBox = (props) => (
  <div>
    <input type="checkbox" id={props.source.id} name="subscribe" value={props.source.label}
    checked={props.source.selected} 
    onChange={(e) => {
      let checked = document.getElementById(props.source.id).checked
      props.onSourceClick(props.source.id, checked)}} />
    <label>{props.source.label}</label> 
  </div>
)

export default SourceCheckBox;