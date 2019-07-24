import React from 'react'
import CartItem from './CartItem'

export default function CartList({value}) {
    /* si value no esta en corchetas da error*/ 
    const {cart} = value;

    return (
        <div className="container-fluid">
        {cart.map(item =>{
            return <CartItem key={item.id} item={item} value={value}/>  
        })}
            
        </div>
    )
}
