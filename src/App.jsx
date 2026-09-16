import {Route, Routes} from 'react-router-dom'

import './App.css'
import {CartProvider} from './context/CartContext.jsx'
import Layout from './components/Layout.jsx'
import ProductListPage from './pages/ProductListPage.jsx'
import NewProductPage from './pages/NewProductPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<ProductListPage />} />
                    <Route path="/productos/nuevo" element={<NewProductPage />} />
                    <Route path="/productos/:id" element={<ProductDetailPage />} />
                </Route>
            </Routes>
        </CartProvider>
    )
}

export default App
