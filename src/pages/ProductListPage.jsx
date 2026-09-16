import {Link} from 'react-router-dom'
import {useCart} from '../context/useCart.js'
import ProductList from '../components/ProductList.jsx'
import CartList from '../components/CartList.jsx'

function ProductListPage(){

    const {foods, isLoading, error} = useCart();

    if (isLoading) {
        return <p>Cargando productos...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div className="contenedorApp">
            <div className="listadoProductos">
                <ProductList products={foods} />
                <Link to="/productos/nuevo" className="botonAgregarProducto">Agregar Comida al menu</Link>
            </div>
            <CartList />
        </div>
    )
}

export default ProductListPage
