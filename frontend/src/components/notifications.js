import React from 'react';

const Notification = (props) => {

  if(props.text === '')
    return null;

  return (<div id="notification">{props.text}</div>);
};

const Warning = (props) => {

  if(props.text === '')
    return null;

  return (<div id="warning">{props.text}</div>);
};

export default Notification;
export { Warning };