import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table, Card,
} from "react-bootstrap";
import { fetchData } from "./utilities";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Components/Dashboard/Table/Products";
import Topbar from "./layout/Topbar";
import "./assets/css/Dashboard.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const GET_URL = "http://localhost:5012/api/Product/GetProducts";
  const ORDER_URL = "http://localhost:5012/api/Order";
  const CHECK_OUT_URL = "http://localhost:5012/api/Order/Checkout";
  
  const formatCurrency = (value) => {
    return value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
};

  const getProducts = async () => {
    setLoading(true);
    try {
      const result = await fetchData(GET_URL);
      setProducts(result);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToSelectedProducts = (product) => {
    if (product.quantity <= 0) return;

    setSelectedProducts((prevSelected) => {
      const existingProduct = prevSelected.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevSelected.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevSelected, { ...product, quantity: 1 }];
      }
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const incrementQuantity = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product.quantity <= 0) return;

    setSelectedProducts((prevSelected) =>
      prevSelected.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const decrementQuantity = (productId) => {
    const selectedProduct = selectedProducts.find((p) => p.id === productId);
    if (selectedProduct && selectedProduct.quantity > 1) {
      setSelectedProducts((prevSelected) =>
        prevSelected.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
      );

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((p) => p.id !== productId)
      );

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    }
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    if (selectedProducts.length === 0) {
      alert("No products selected for checkout.");
      return;
    }

    try {
      const response = await fetch(CHECK_OUT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProducts),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order.");
      }

      const data = await response.json();
      console.log("Order ID:", data.OrderId);

      setSelectedProducts([]);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <>
      <Topbar />
      <Container className="mt-5">
        <Row>
          <Col md={8} lg={9}>
            <Card className="shadow-sm" style={{ marginTop: "5rem" }}>
              <Card.Header>
                <h1 className="mb-0">Products</h1>
              </Card.Header>
              <Card.Body>
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="mb-4"
                />

                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>SKU</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => addToSelectedProducts(product)}
                        >
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} lg={3}>
      <Card
        className=" shadow-sm"
        style={{ marginTop: "5rem", width: "25rem" }}
      >
        <Card.Header >
          <h1 className="mb-4">Selected Products</h1>
        </Card.Header>
        <Card.Body>
          {selectedProducts.length === 0 ? (
            <p>No products selected</p>
          ) : (
            <>
              {selectedProducts.map((product) => (
                <Products
                  key={product.id}
                  product={product}
                  decrementQuantity={() => decrementQuantity(product.id)}
                  incrementQuantity={() => incrementQuantity(product.id)}
                  formatCurrency={() => formatCurrency(product.price)}
                />
              ))}
              <div className="mt-4 font-weight-bold">
                <h5>Total Price: {calculateTotalPrice().toFixed(2)}</h5>
              </div>
              <Button
                className="mt-3 w-100"
                variant="success"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
        </Row>
      </Container>
    </>
  );
}
