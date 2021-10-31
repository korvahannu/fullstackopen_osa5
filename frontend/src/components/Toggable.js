import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Toggable = (props) => {

  const [visible, setVisible] = useState(false);

  const defaultShow = { display : visible ? 'none' : '' };
  const defaultHidden = { display : visible ? '' : 'none' };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return(
    <div className="Toggable">
      <div style={defaultShow}>
        <button className="Toggable_Button" onClick={toggleVisible}>{props.labelShow}</button>
      </div>

      <div style={defaultHidden}>
        <button className='Toggable_Button' onClick={toggleVisible}>{props.labelHide}</button>
        {props.children}
      </div>
    </div>
  );

};

Toggable.propTypes = {
  labelShow: PropTypes.string.isRequired,
  labelHide: PropTypes.string.isRequired
};

export default Toggable;