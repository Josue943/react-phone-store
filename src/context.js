import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data';


const ProductContext = React.createContext();
//Provider
//COnsumer

/* nota el proyecto modifica tanto los datos del carrito como los productos que recibimos data.js*/

 class ProductProvider extends Component {
    //datos iniciales productos y datos iniciados en 0
    state ={
        products:storeProducts,
        detailProduct:detailProduct,
        cart:[],
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubTotal:0,
        cartTaxes:0,
        cartTotal:0
    }
    componentDidMount(){
        this.setProducts();
    }

    setProducts=()=>{
        //necesario pq si se asigna los productos al principio daria error al agregar los archivos al carro
        let products=[];
        storeProducts.forEach(item=>{
            const singleItem = {...item};
            products = [...products,singleItem]
        })
        this.setState({
            products
        })
    }
    //optenemos el producto
    getItem = id =>{
        const product = this.state.products.find(
            item=> item.id ===id)
            
            return product;
    }
    //llamamos el producto y lo guardamos en el state detail 
    handleDetail = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })
    }

    addToCart= id =>{
        //se modifica los datos del producto  y se agrega al carro
        //vemos los productos
        let tempProducts = [...this.state.products]
        //optenemos el index del que necesitamos
        const index = tempProducts.indexOf(this.getItem(id))
        //guardamos el producto
        const product = tempProducts[index]
        //cambiamos las propiedades de ese producto
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        //los actualizamos
        this.setState(()=>{
            return { products:tempProducts, cart:[...this.state.cart,
            product]

            }
        },
        ()=>{
            /* para que cada vez que se agregue algo se haga*/ 
            this.addTotals()
        }
        )
    }

   openModal = id =>{
       const product = this.getItem(id)
       this.setState(()=>{
           //aqui guardaremos el state con el id del producto
         return{modalProduct:product,modalOpen:true}  
       })
   }
   
   closeModal = () =>{

       this.setState(()=>{
           return {modalOpen:false}
       })
   }

   //cart eventos
   increment = id =>{
       //buscamos el dato
    let tempCart = [...this.state.cart]
    const selectedProduct = tempCart.find(item => item.id ===id)
    //lo selleccionamos
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index]
    //cambiamos los atributos 
    product.count += 1;
    product.total = product.count * product.price;
    //devolvemos el cart y los datos actualizados
    this.setState( 
    ()=>{
        return {cart:[...tempCart]};
    },
    ()=>{
        this.addTotals();
    })
}


   decrement = id =>{
         //buscamos el dato
         let tempCart = [...this.state.cart]
         const selectedProduct = tempCart.find(item => item.id ===id)
         //lo selleccionamos
         const index = tempCart.indexOf(selectedProduct);
         const product = tempCart[index]
         //cambiamos los atributos 
         product.count -= 1;
            if(product.count===0){
                this.removeItem(id); //si es 0 llamamos la funcion y lo borramos
            }else{

                product.total = product.count * product.price;
                //devolvemos el cart y los datos actualizados
                this.setState( 
                ()=>{
                    return {cart:[...tempCart]};
                },
                ()=>{
                    this.addTotals();
                })

            }
         
        
   }
   removeItem = (id) =>{
       //optenemos datos
    let tempProducts = [...this.state.products]
    let tempCart = [...this.state.cart]
    //sacamos del carro el que no queremos
    tempCart = tempCart.filter(item => item.id !== id)
    //optenemos su posicion en los prodctos
    const index = tempProducts.indexOf(this.getItem(id))
    //seleccionamos el producto que ocupamos
    let removedProduct = tempProducts[index];
    //cambiamos los atri que se cambiaron cuando se agregaron al carro
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    //actualizamos
    this.setState(()=>{
        return{
            cart:[...tempCart],
             products:[...tempProducts]   /*dato actualizado*/
            }
    }, ()=>{
        //para que se actualize los totales
        this.addTotals();
    })

    }
    clearCart = () =>{
        this.setState(()=>{
     return  {cart:[]}
        }, ()=>{
           /* es necesario o los valores no se reinician 
           solo llamamos a la funcion inicial y se resetea todo*/
           this.setProducts(); 
           this.addTotals();
        })
    }
    //aqui se crea y se llama arriba para que se haga cada vez que se agrega algo
    addTotals = () =>{
        let subTotal = 0;
        //este total sale del product.total que se hizo arriba en el cual total=price
        this.state.cart.map(item =>(subTotal += item.total))
        const tempTax = subTotal * 0.13;
        const tax = parseFloat(tempTax.toFixed(2)) /* para dejarlo en 2 decimales*/
        const total = subTotal + tax
        
        this.setState(()=>{
            return {
                cartSubTotal:subTotal,
                cartTaxes:tax,
                cartTotal:total
            }
        }
        )
    }


    render() {
        /*abajo se definen los datos que enviaremos*/
        return (
            <ProductContext.Provider value={{
           ...this.state,
               handleDetail:this.handleDetail,
               addToCart:this.addToCart,
               openModal:this.openModal,
               closeModal:this.closeModal,
               increment:this.increment,
               decrement:this.decrement,
               removeItem:this.removeItem,
               clearCart:this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }

}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider,ProductConsumer};
