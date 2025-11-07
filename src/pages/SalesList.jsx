import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import { API_BASE_URL } from "../config/api";

function SalesList() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/sales`);
                const data = await response.json();
                setSales(data);
            } catch (e) {
                console.error("Error fetching sales:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchSales();
    }, []);

    //
    return (
        <Container className="p-3">
            <h2 className="mb-4">Compras Registradas</h2>

            {loading ? (
                <p>Cargando historial de compras...</p>
            ) : sales.length === 0 ? (
                <p>Aún no hay compras registradas en Firestore.</p>
            ) : (
                <ListGroup>
                    {sales.map((sale) => (
                        <ListGroup.Item
                            key={sale.id}
                            className="mb-2 shadow-sm"
                        >
                            <div className="fw-bold">{sale.productName}</div>
                            <small className="text-muted">
                                ID: {sale.productId}
                            </small>
                            <div className="mt-1">
                                Precio:{" "}
                                <span className="text-success fw-bold">
                                    ${sale.price.toFixed(2)}
                                </span>
                            </div>
                            <small className="text-info">
                                Fecha:{" "}
                                {new Date(sale.date).toLocaleDateString()}
                            </small>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            <div className="d-grid gap-2 mt-4">
                <Button
                    variant="secondary"
                    onClick={() => window.history.back()}
                >
                    Salir
                </Button>
            </div>
        </Container>
    );
}

export default SalesList;
