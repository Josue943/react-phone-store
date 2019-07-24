import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from "../context";
import {storeProducts} from '../data'
export default class ProductList extends Component {
  state={
      products:storeProducts
  }

    render() {
        
        return (    
            
            <React.Fragment>
            <div className="py-5 container">
            <Title name="our" title="products"/>
            <div className="row">
            <ProductConsumer>
                 {hello=> {  /* la funcion se puede llamar como sea aqui simplemente tomaremos el value que se mando que fueron 3 cosas acedemos al dato  */
                   return  hello.products.map(
                       
                       product=>{
                    return <Product key={product.id} product={product}/>
                       })
            
                    }}
            </ProductConsumer> 
          
            </div>
            </div>
            </React.Fragment>
        )
    }
}
