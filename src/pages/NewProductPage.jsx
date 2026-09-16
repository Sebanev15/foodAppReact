import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useCart} from '../context/useCart.js'

const MESES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function NewProductPage(){

    const {addProduct} = useCart();
    const navigate = useNavigate();

    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [availableMonths, setAvailableMonths] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(false);

    function toggleMonth(month){
        setAvailableMonths(months =>
            months.includes(month)
                ? months.filter(m => m !== month)
                : [...months, month].sort((a, b) => a - b)
        );
    }

    function handleSubmit(event){
        event.preventDefault();
        setIsSubmitting(true);
        setError(false);
        addProduct({
            icon,
            name,
            description,
            price: Number(price),
            quantity: Number(quantity),
            availableMonths
        })
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                setError(err.message);
                setIsSubmitting(false);
            });
    }

    return (
        <div className="formNuevoProducto">
            <h2>Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Icono
                    <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} required />
                </label>
                <label>
                    Nombre
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Descripcion
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                    Precio
                    <input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </label>
                <label>
                    Cantidad
                    <input type="number" min="0" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </label>
                <fieldset className="mesesGrid">
                    <legend>Disponibilidad</legend>
                    {MESES.map((mes, index) => (
                        <label key={mes} className="mesCheckbox">
                            <input
                                type="checkbox"
                                checked={availableMonths.includes(index + 1)}
                                onChange={() => toggleMonth(index + 1)}
                            />
                            {mes}
                        </label>
                    ))}
                </fieldset>

                {error && <p className="errorProducto">Error: {error}</p>}

                <div className="accionesFormulario">
                    <Link to="/">Volver</Link>
                    <button type="submit" disabled={isSubmitting}>+ Crear Producto</button>
                </div>
            </form>
        </div>
    )
}

export default NewProductPage
