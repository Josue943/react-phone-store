import React, { Component } from 'react'
import Title from '../Title';
import CartColumns from './CartColumns'
import EmptyCart from './EmptyCart'
import {ProductConsumer} from '../../context'
import CartList from './CartList';
import CartTotals from './CartTotals';
export default class Cart extends Component {
    /*se creo el packagejson para poder poner la carpeta en app.js como main
    y despues se reinicio el server
    aqui le pasamos los datos a cart list
    */

    render() {
        return (
         
            <section>
                   <ProductConsumer>
                {value =>{
                   const {cart} = value;
                   if(cart.length > 0){
                   return ( 
                    <React.Fragment>
                    <Title name="your" title="cart"/>
                    <CartColumns/>
                    <CartList value={value}/>
                    <CartTotals value={value}/>
                    </React.Fragment>
                   )   
                } else{
                return   (
                <EmptyCart/>        
                )  
                }
                }}
                 </ProductConsumer>
                
                </section>
           
        )
    }
}
