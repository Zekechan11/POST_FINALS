import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Button, ListGroup } from "react-bootstrap";

export default function Products({ product, decrementQuantity, incrementQuantity, formatCurrency }) {
  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center"
      style={{ borderRadius: '0.375rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}
    >
      <span>
        {product.name} - {formatCurrency(product.price)} x {product.quantity}
      </span>
      <div className="d-flex gap-2">
        <Button
          variant="outline-secondary"
          onClick={decrementQuantity}
          style={{ padding: '0.5rem', borderRadius: '50%' }}
        >
          <FaMinus />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={incrementQuantity}
          style={{ padding: '0.5rem', borderRadius: '50%' }}
        >
          <FaPlus />
        </Button>
      </div>
    </ListGroup.Item>
  );
}
