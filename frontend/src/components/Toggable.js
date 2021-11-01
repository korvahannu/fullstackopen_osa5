import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Toggable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false);

  const defaultShow = { display : visible ? 'none' : '' };
  const defaultHidden = { display : visible ? '' : 'none' };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisible
    };
  });

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

});

Toggable.displayName = 'Toggable';

Toggable.propTypes = {
  labelShow: PropTypes.string.isRequired,
  labelHide: PropTypes.string.isRequired
};

export default Toggable;