// src/App.jsx (o donde configures tus rutas)

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import SalesList from "./pages/SalesList";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* 1. Home con Caja de Búsqueda [cite: 48] */}
                    <Route path="/" element={<Home />} />

                    {/* 2. Resultados de búsqueda: /items?search=  */}
                    <Route path="/items" element={<ProductList />} />

                    {/* 3. Detalle de producto: /item/:id [cite: 57] */}
                    <Route path="/item/:id" element={<ProductDetail />} />

                    {/* 4. Compras Registradas: /sales [cite: 60] */}
                    <Route path="/sales" element={<SalesList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
