function CartItem({cartItem, eliminarElementoCarrito}){

    return (
        <div className={`carritoItem ${cartItem.inCart===0 ? "invisible": ""}`}>
            <span className="emojiCarrito" role="img" aria-label={cartItem.name}>{cartItem.icon}</span>
            <h4>x {cartItem.inCart}</h4>
            <h4>${cartItem.inCart*cartItem.price}</h4>
            <button className="eliminar" onClick={() => eliminarElementoCarrito(cartItem.id)}>X</button>
        </div>
    )
}

export default CartItem
