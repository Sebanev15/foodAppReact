import CartItem from './CartItem.jsx'

function CartList({cartItems, eliminarElementoCarrito}){

    let total = 0;
    cartItems.map((item) =>{
        total +=(item.inCart*item.price)
    })
    return (
        <div className="carrito">
            <h2>Cuenta:</h2>
            {cartItems.map((item) => (
                <CartItem key={item.id} cartItem={item} eliminarElementoCarrito={eliminarElementoCarrito}/>
            ))}
            <h2>Total: {total}</h2>
        </div>
    )
}

export default CartList
