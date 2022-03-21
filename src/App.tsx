import React from 'react';
import './style/App.css';

import { Title } from './title';
import { Grid } from './grid';

export const App: React.FunctionComponent = () => {
  console.log("App rendering");
  
  return (
    <div className={'appContainer'} >
      <Title />
      <Grid />
    </div>
  );
}
