import React from 'react';
import { Spinner } from '@blueprintjs/core';

function Loader() {
  return (
    <div
      style={{
        width: '100px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner size={Spinner.SIZE_SMALL} />
    </div>
  );
}

export default Loader;
