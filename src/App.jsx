import {useEffect, useState} from 'react'

import './App.css'
import ProductList from './components/ProductList.jsx'
import CartList from './components/CartList.jsx'


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

export default App
