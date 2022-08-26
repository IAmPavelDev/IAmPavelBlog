import React from 'react';
import style from './App.module.scss';
import Head from './components/Head/Head';

function App() {
  return (
    <div className={style.app__wrapper}>
      <Head />
    </div>
  );
}

export default App;
