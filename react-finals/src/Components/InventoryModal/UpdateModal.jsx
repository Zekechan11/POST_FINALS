import React from "react";
import { Modal, Form, Button } from 'react-bootstrap';

export default function UpdateModal({
  isOpen,
  toggleModal,
  updateUsers,
  setAddProducts,
  product,
}) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddProducts(prevProduct => ({
      ...prevProduct,
      [id]: value
    }));
  };

  return (
    <Modal show={isOpen} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateUsers}>
        <Form.Group controlId="Name" className="mt-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={product.Name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="sku" className="mt-3">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              value={product.sku}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="price" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={product.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="quantity" className="mt-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              value={product.quantity}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={toggleModal}>
          Cancel
        </Button>
        <Button variant="success  " type="submit" form="updateForm" onClick={updateUsers}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
