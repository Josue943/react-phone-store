import React from 'react';
import {Switch,Route} from 'react-router-dom'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar'
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/cart'
import Default from './components/Default'
import Modal from './components/Modal';


function App() {
  /*modal va por fuera pq no tiene ruta*/
  return (
        <React.Fragment>
        <Navbar/> {/*  para que este en todo se excluye del switch */}
        <Switch >
          <Route exact path="/" component={ProductList}/>
          <Route path="/details" component={Details}/>
          <Route path="/cart" component={Cart}/>
          <Route component={Default}/>
        </Switch>
        <Modal/>
        </React.Fragment>
  );
}

export default App;
