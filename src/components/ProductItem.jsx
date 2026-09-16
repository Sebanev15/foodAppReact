function ProductItem({product, agregarEnCarrito, quitarEnCarrito}){

    return (
        <div className={`producto ${product.quantity===0 ? "sinStock": ""}`}>
            <span className={`emoji ${product.quantity===0 ? "sinStock": ""}`} role="img" aria-label={product.name}>{product.icon}</span>
            <h2 className={`sinStockTitulo ${product.quantity===0 ? "sinStock": ""}`}>Sin stock</h2>
            <div className="productoInfo">
                <div className="contenedorBotones">
                    <button className={product.quantity===0 ? "botonSinStock": ""} onClick={() => agregarEnCarrito(product.id)}>+1</button>
                    <button className={product.quantity===0 ? "botonSinStock": ""} onClick={() => quitarEnCarrito(product.id)}>-1</button>
                </div>
                <h4>{product.quantity}</h4>

            </div>
        </div>
    )
}

export default ProductItem
