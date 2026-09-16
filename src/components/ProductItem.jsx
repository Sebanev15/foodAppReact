import {Link} from 'react-router-dom'
import {useCart} from '../context/useCart.js'

function ProductItem({product}){

    const {agregarEnCarrito, quitarEnCarrito} = useCart();

    return (
        <div className={`producto ${product.quantity===0 ? "sinStock": ""}`}>
            <span className={`emoji ${product.quantity===0 ? "sinStock": ""}`} role="img" aria-label={product.name}>{product.icon}</span>
            <h2 className={`sinStockTitulo ${product.quantity===0 ? "sinStock": ""}`}>Sin stock</h2>
            <div className="productoTop">
                <Link to={`/productos/${product.id}`} className="lupaBoton" aria-label={`Ver detalle de ${product.name}`}>🔍</Link>
                <span className="precioBadge">${product.price}</span>
            </div>
            <div className="productoInfo">
                <span className="productoNombre">{product.name}</span>
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
