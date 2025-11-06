import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";

function Home() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/items?search=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100 p-3">
            <FaShoppingBag size={50} className="mb-3" />
            <h1 className="mb-4">Bazar Universal</h1>

            <Form
                onSubmit={handleSearch}
                className="w-100"
                style={{ maxWidth: "400px" }}
            >
                <FormControl
                    type="search"
                    placeholder="Q search"
                    className="mb-3"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                        Buscar
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default Home;
