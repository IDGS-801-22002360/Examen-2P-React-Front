import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Form, FormControl, Row, Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search") || "";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = `${API_BASE_URL}/items?q=${encodeURIComponent(
                    query
                )}`;
                const response = await fetch(url);
                const data = await response.json();
                setProducts(data);
            } catch (e) {
                console.error("Error fetching products:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [query]);

    return (
        <Container className="p-3">
            <Form className="mb-3">
                <FormControl
                    type="search"
                    placeholder="Q search"
                    defaultValue={query}
                />
            </Form>

            <h5 className="mb-3">
                Resultados de la búsqueda de "{query}":{" "}
                {loading ? "..." : products.length}
            </h5>

            {loading ? (
                <p>Cargando resultados...</p>
            ) : (
                <Row>
                    {products.map((p) => (
                        <Col xs={12} key={p.id} className="mb-3">
                            <Card
                                onClick={() =>
                                    (window.location.href = `/item/${p.id}`)
                                }
                                style={{ cursor: "pointer" }}
                            >
                                <Row className="g-0">
                                    <Col xs={4} className="p-2"></Col>
                                    <Col xs={8}>
                                        <Card.Body className="p-2">
                                            <Card.Title className="h6 mb-1">
                                                {p.title}{" "}
                                                <small className="text-muted">
                                                    Smartphone
                                                </small>
                                            </Card.Title>
                                            <Card.Text className="text-muted small mb-1">
                                                {p.snippet}
                                            </Card.Text>
                                            <Card.Text className="fw-bold mb-1">
                                                ${p.price}
                                            </Card.Text>
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

export default SearchResults;
