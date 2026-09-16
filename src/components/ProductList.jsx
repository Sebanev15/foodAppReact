import ProductItem from './ProductItem.jsx'

function ProductList({products}){

    return (
        <div className="contenedorProductos">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>

    )

}

export default ProductList
