import React from 'react';
import Calculator from './Calculator';

export default {
  path: '/',
  async action() {
    return (
      <Calculator />
    );
  }
};
