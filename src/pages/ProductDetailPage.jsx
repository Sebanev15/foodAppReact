import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const MESES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function ProductDetailPage(){
    const {id} = useParams();
    return <ProductDetail key={id} id={id} />
}

function ProductDetail({id}){

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/foods/${id}`)
            .then((response) => {
                if (!response.ok) {
                    setError("Failed to fetch product");
                } else {
                    response.json().then(setProduct);
                }
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <p>Cargando producto...</p>
    }

    if (error || !product) {
        return <p>Error: {error || "Producto no encontrado"}</p>
    }

    return (
        <div className="detalleProducto">
            <div className="detalleIcono">
                <span role="img" aria-label={product.name}>{product.icon}</span>
            </div>
            <div className="detalleInfo">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <h4 className="detalleDisponibleTitulo">Disponible en:</h4>
                <p>{product.availableMonths.map(mes => MESES[mes - 1]).join(", ")}</p>
            </div>
            <button className="botonVolver" onClick={() => navigate(-1)}>Volver</button>
        </div>
    )
}

export default ProductDetailPage
