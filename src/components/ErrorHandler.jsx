import React from 'react';

const ErrorHandler = ({status, msg}) => {
  return (
    <p>Error! {status} {msg}</p>
  );
}
 
export default ErrorHandler;