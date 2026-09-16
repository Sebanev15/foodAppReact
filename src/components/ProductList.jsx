import ProductItem from './ProductItem.jsx'

function ProductList({products, agregarEnCarrito, quitarEnCarrito}){

    return (
        <div className="contenedorProductos">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} agregarEnCarrito={agregarEnCarrito} quitarEnCarrito={quitarEnCarrito} />
            ))}
        </div>

    )

}

export default ProductList
