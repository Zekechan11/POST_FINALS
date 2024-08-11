import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Container, Row, Col, Form, Button, Table, Modal, Spinner } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateModal from "./Components/InventoryModal//UpdateModal";
import DeleteModal from "./Components/InventoryModal/DeleteModal";
import AddModal from "./Components/InventoryModal/AddModal";

import Topbar from "./layout/Topbar";

import './assets/css/App.css'

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [modals, setModals] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [product, setAddProducts] = useState({
    Name: "",
    sku: "",
    price: "",
    quantity: "",
  });


  const formatCurrency = (value) => {
    return value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
};

  const GET_URL = "http://localhost:5012/api/Product/GetProducts";
  const ADD_URL = "http://localhost:5012/api/Product/SaveProduct";
  const UPDATE_URL = "http://localhost:5012/api/Product/UpdateProduct?id=";
  const DELETE_URL = "  http://localhost:5012/api/Product/DeleteProduct?id=";

  const addProducts = async () => {
    const dataToSend = {
        id: 0,
        name: product.Name, 
        sku: product.sku,
        price: product.price,
        quantity: product.quantity
    };

    try {
        const response = await fetch(ADD_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        await getProducts();
        toggleModal("add");
    } catch (error) {
        console.error("Failed to add user:", error);
    }
};

const updateUsers = async () => {
  const dataToSend = {
    id: currentItem.id,
    name: product.Name,
    sku: product.sku,
    price: product.price,
    quantity: product.quantity,
  };

  try {
    const response = await fetch(UPDATE_URL + currentItem.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    await getProducts();
    toggleModal("update");
  } catch (error) {
    console.error("Failed to update user:", error);
  }
};

const getProducts = async () => {
  const response = await fetch(
      GET_URL
  );
  const result = await response.json()
  setProducts(result)
  setLoading(false);
}

const handleDeleteProduct = async (id) => {

  const response = await fetch(
      DELETE_URL + currentItem.id,
      {
          method: "DELETE",
      }
  );
  getProducts();
  location.reload();
}

  
  const toggleModal = (modalType, item = null) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalType]: !prevModals[modalType],
    }));
    setCurrentItem(item);

    if (modalType === "update" && item) {
      setAddProducts({
        Name: item.name,
        sku: item.sku,
        price: item.price,
        quantity: item.quantity,
      });
    } else if (modalType === "add") {
      setAddProducts({ Name: "", sku: "", price: "", quantity: "" });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Topbar />
      <Container className="mt-5" style={{background:"grey", position:"relative",top:"150px", borderRadius:"10px"}}>
        <Row className="mb-2">
          <Col md={8}>
            <Form.Control
            style={{marginTop:"2rem"}}
              type="text"
              placeholder="Search for Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />
          </Col>
          <Col md={4} className="text-end">
            <Button
                style={{marginTop:"2rem"}}
              variant="primary"
              onClick={() => toggleModal("add")}
              className="d-flex align-items-center"
            >
              <FaPlus className="me-2" /> Add Product
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
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
                    <td>{product.sku}</td>
                    <td>{formatCurrency(product.price)}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => toggleModal("update", product)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        className="ms-2"
                        onClick={() => toggleModal("delete", product)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <DeleteModal
        isOpen={modals.delete}
        toggleModal={() => toggleModal("delete")}
        handleDeleteProduct={handleDeleteProduct}
      />

      <AddModal
        isOpen={modals.add}
        addProducts={addProducts}
        setAddProducts={setAddProducts}
        product={product}
        toggleModal={() => toggleModal("add")}
      />

      <UpdateModal
        isOpen={modals.update}
        toggleModal={() => toggleModal("update")}
        updateUsers={updateUsers}
        setAddProducts={setAddProducts}
        product={product}
      />
    </>
  );
}
