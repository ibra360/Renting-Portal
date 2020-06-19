

import React from 'react';
import { Spinner } from 'reactstrap';

const Example = (props) => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <Spinner type="grow" color="primary" />
      <Spinner type="grow" color="secondary" />
      <Spinner type="grow" color="success" />
      <Spinner type="grow" color="danger" />
      <Spinner type="grow" color="warning" />
      <Spinner type="grow" color="info" />
      <Spinner type="grow" color="light" />
      <Spinner type="grow" color="dark" />
    </div>
  );
}

export default Example;

// ye css class dalne se bhi overlay nhy hrha
// className={`${props.asOverlay && 'loading-spinner__overlay'}`}