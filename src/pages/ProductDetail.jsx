import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function ProductDetail() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const registerSale = async (saleData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/addSale`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(saleData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert("¡Compra registrada con éxito!");
            } else {
                throw new Error(
                    result.message || "Fallo al registrar la venta"
                );
            }
        } catch (error) {
            console.error("Error al registrar venta:", error);
            alert(`Error: ${error.message}. Verifica la consola.`);
        }
    };

    const handleBuyClick = (product) => {
        const salePayload = {
            productId: product.id.toString(),
            productName: product.title,
            price: Number(product.price),
        };

        registerSale(salePayload);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const url = `${API_BASE_URL}/items/${id}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Producto con ID ${id} no encontrado.`);
                }

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.error("Error al obtener detalle:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) return <p>Cargando detalles del producto...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!product) return <p>Producto no encontrado.</p>;

    return (
        <div>
            <h2>{product.title}</h2>

            <p>
                <strong>Precio:</strong> ${product.price}
            </p>
            <p>
                <strong>Categoría:</strong> {product.category}
            </p>
            <p>
                <strong>Descripción:</strong> {product.description}
            </p>

            <button
                onClick={() => handleBuyClick(product)}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "green",
                    color: "white",
                }}
            >
                Registrar Compra
            </button>

            <button>Compartir Producto</button>
        </div>
    );
}

export default ProductDetail;
