import {useCart} from '../context/useCart.js'
import CartItem from './CartItem.jsx'

function CartList(){

    const {foods, total} = useCart();

    return (
        <div className="carrito">
            <h2>Cuenta:</h2>
            {foods.map((item) => (
                <CartItem key={item.id} cartItem={item} />
            ))}
            <h2>Total: {total}</h2>
        </div>
    )
}

export default CartList
