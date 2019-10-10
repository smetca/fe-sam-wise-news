import React from 'react';

const EndpointError = (props) => {
  console.dir(props);
  return (
    <p>404 {props.uri} not found!</p>
  );
}
 
export default EndpointError;