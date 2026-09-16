import {useEffect, useMemo, useState} from 'react'
import {CartContext} from './cart-context.js'

export function CartProvider({children}) {

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

    async function addProduct(product){
        const response = await fetch("http://localhost:3000/foods", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error("Failed to create product");
        }
        const created = await response.json();
        setFoods(foods => [...foods, {...created, inCart: 0}]);
        return created;
    }

    const total = useMemo(
        () => foods.reduce((sum, food) => sum + food.inCart * food.price, 0),
        [foods]
    );

    const value = {
        foods,
        isLoading,
        error,
        total,
        agregarEnCarrito,
        quitarEnCarrito,
        eliminarElementoCarrito,
        addProduct
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
