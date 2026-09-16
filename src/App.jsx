import {useEffect, useState} from 'react'

import './App.css'


function App() {

    const [foods, setFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/foods")
            .then((response) => {
                if (!response.ok) {
                    setError("Failed to fetch foods");
                } else {
                    response.json().then((data) => {
                        const foodsConCarrito = data.map(food => ({
                            ...food,
                            inCart: 0
                        }));
                        setFoods(foodsConCarrito);
                    });
                }
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    function agregarEnCarrito(id){
        setFoods(foods => foods.map(food =>
            food.id === id && food.quantity > 0
                ? { ...food, quantity: food.quantity - 1, inCart: food.inCart + 1 }
                : food
        ));
    }

    function quitarEnCarrito(id){
        setFoods(foods => foods.map(food =>
            food.id === id && food.inCart > 0
                ? { ...food, quantity: food.quantity + 1, inCart: food.inCart - 1 }
                : food
        ));
    }

    function eliminarElementoCarrito(id){
        setFoods(foods => foods.map(food =>
            food.id === id
                ? { ...food, quantity: food.quantity + food.inCart, inCart: 0 }
                : food
        ));
    }
    return (
      <>
          <h2 className="titulo">Food app</h2>
          <div className="contenedorApp">
              <ProductList products={foods} agregarEnCarrito={agregarEnCarrito} quitarEnCarrito={quitarEnCarrito} />
              <CartList cartItems={foods} eliminarElementoCarrito={eliminarElementoCarrito}/>
          </div>

      </>
  )
}
function ProductList({products, agregarEnCarrito, quitarEnCarrito}){

    return (
      <div className="contenedorProductos">
          {products.map((product) => (
            <ProductItem product={product} agregarEnCarrito={agregarEnCarrito} quitarEnCarrito={quitarEnCarrito} />
          ))}
      </div>

  )

}

function ProductItem({product, agregarEnCarrito, quitarEnCarrito}){

  return (
      <div className={`producto ${product.quantity===0 ? "sinStock": ""}`}>
          <img src={product.link} className={product.quantity===0 ? "sinStock": ""} alt={product.icon}/>
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

function CartList({cartItems, eliminarElementoCarrito}){

    let total = 0;
    cartItems.map((item) =>{
        total +=(item.inCart*item.price)
    })
    return (
      <div className="carrito">
          <h2>Cuenta:</h2>
          {cartItems.map((item) => (
              <CartItem cartItem={item} eliminarElementoCarrito={eliminarElementoCarrito}/>
          ))}
          <h2>Total: {total}</h2>
      </div>
  )
}

function CartItem({cartItem, eliminarElementoCarrito}){

    return (
        <div key={cartItem.id} className={`carritoItem ${cartItem.inCart===0 ? "invisible": ""}`}>
            <img src={cartItem.link} alt={cartItem.icon}/>
            <h4>x {cartItem.inCart}</h4>
            <h4>${cartItem.inCart*cartItem.price}</h4>
            <button className="eliminar" onClick={() => eliminarElementoCarrito(cartItem.id)}>X</button>
        </div>
    )
}
export default App
