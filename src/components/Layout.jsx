import {Outlet} from 'react-router-dom'
import {useCart} from '../context/useCart.js'

function Layout(){

    const {total} = useCart();

    return (
        <>
            <div className="appHeader">
                <h2 className="titulo">Food app</h2>
                <span className="cuentaBadge">Cuenta: ${total}</span>
            </div>
            <Outlet />
        </>
    )
}

export default Layout
