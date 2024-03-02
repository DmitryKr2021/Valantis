import React from 'react';
import Product from './components/Product.jsx';
import Slider from './components/Slider.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import Filter from './components/Filter.jsx';
import runLoader from './utils/loader';
import './App.css';
import logoSvg from './svg/logo-svg.svg';

runLoader('brand');
runLoader('allIds');
runLoader('allItems');

const App = () => (
  <div className="wrapper ps-4 pe-4">
    <div className="app">
      <div className="p-3 h-auto">
        <a
          aria-label="на главную"
          target="blank"
          className="headerTopLogo"
          href="https://juvelirnyj-lombard.ru/catalog/"
        >
          <img className="svg" src={logoSvg} />
        </a>
        <header className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="fs-1">Valantis</h1>
          <h2 className="fs-3">Список товаров</h2>
        </header>
      </div>
      <div className="d-flex p-2">
        <div className="d-flex flex-column w-25">
          <div className="w25 shadow position-relative">
            <Filter />
          </div>
          <div className="w25 shadow position-relative mt-4">
            <Slider />
          </div>
        </div>
        <div className="w-75">
          <Product />
        </div>
      </div>
    </div>
  </div>
);

export default App;
