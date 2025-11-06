// src/pages/ProductList.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Form, FormControl, Row, Col, Card } from "react-bootstrap";
import { FaStar, FaShoppingBag } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

function ProductList() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const urlQuery = searchParams.get("search") || "";

    const [query, setQuery] = useState(urlQuery);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (query.trim() && query !== urlQuery) {
            navigate(`/items?search=${encodeURIComponent(query.trim())}`);
        }
    };

    useEffect(() => {
        if (!urlQuery) {
            setLoading(false);
            setProducts([]);
            return;
        }

        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                // Consumir el endpoint /api/items?q=:query
                const url = `${API_BASE_URL}/items?q=${encodeURIComponent(
                    urlQuery
                )}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Fallo la conexión con el API.");
                }

                const data = await response.json();
                setProducts(data);
            } catch (e) {
                console.error("Error fetching products:", e);
                setError("Error al cargar resultados.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [urlQuery]); // Se re-ejecuta cuando cambia la query en la URL

    return (
        <Container className="p-3">
            {/* 1. Barra de Búsqueda */}
            <Form onSubmit={handleFormSubmit} className="mb-3">
                <FormControl
                    type="search"
                    placeholder="Q search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </Form>

            {/* 2. Encabezado de Resultados */}
            <h5 className="mb-3">
                Resultados de la búsqueda de "{urlQuery}":{" "}
                {loading ? "..." : products.length}
            </h5>

            {/* 3. Lista de Resultados */}
            {loading ? (
                <p>Cargando resultados...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : products.length === 0 ? (
                <p>No se encontraron productos.</p>
            ) : (
                <Row>
                    {products.map((p) => (
                        <Col xs={12} key={p.id} className="mb-3">
                            <Card
                                onClick={() => navigate(`/item/${p.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <Row className="g-0">
                                    {/* Espacio para la Imagen - COLUMNA 1 */}
                                    <Col
                                        xs={4}
                                        className="d-flex justify-content-center align-items-center bg-light p-2 rounded-start"
                                    >
                                        <FaShoppingBag
                                            size={30}
                                            className="text-secondary"
                                        />
                                    </Col>
                                    {/* La etiqueta de cierre </Col> debe estar aquí */}

                                    {/* Detalles del Producto - COLUMNA 2 */}
                                    <Col xs={8}>
                                        <Card.Body className="p-2">
                                            <Card.Title className="h6 mb-1">
                                                {p.title}{" "}
                                                <small className="text-muted">
                                                    {p.category}
                                                </small>
                                            </Card.Title>
                                            <Card.Text
                                                className="text-muted small mb-1 overflow-hidden"
                                                style={{ maxHeight: "3em" }}
                                            >
                                                {p.snippet}
                                            </Card.Text>
                                            <Card.Text className="fw-bold mb-1 text-success">
                                                ${p.price}
                                            </Card.Text>
                                            {/* Puntuación */}
                                            <div>
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        color={
                                                            i < 4
                                                                ? "gold"
                                                                : "gray"
                                                        }
                                                        size={14}
                                                    />
                                                ))}
                                            </div>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default ProductList;
