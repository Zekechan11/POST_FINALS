import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddModal({
  isOpen,
  addProducts,
  setAddProducts,
  product,
  toggleModal,
}) {
  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addProducts}>
          <Form.Group controlId="formName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={product.Name}
              onChange={(e) =>
                setAddProducts({ ...product, Name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formSku" className="mt-3">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              value={product.sku}
              onChange={(e) =>
                setAddProducts({ ...product, sku: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formPrice" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={product.price}
              onChange={(e) =>
                setAddProducts({ ...product, price: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formQuantity" className="mt-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              value={product.quantity}
              onChange={(e) =>
                setAddProducts({ ...product, quantity: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={toggleModal}>
          Cancel
        </Button>
        <Button variant="success" onClick={addProducts}>
          Add Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
