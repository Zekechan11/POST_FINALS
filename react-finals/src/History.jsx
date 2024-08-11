import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import Topbar from './layout/Topbar';
import { fetchData } from './utilities/index';
import { FaEye } from 'react-icons/fa';

export default function Historys() {
  const [historys, setHistory] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const HISTORY_URL = "http://localhost:5012/api/Order/AllHistory";
  const VIEW_HISTORY_URL = "http://localhost:5012/api/Order/ViewOrder";

  const formatCurrency = (value) => {
    return value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
};

  const getHistory = async () => {
    const response = await fetch(
        HISTORY_URL
    );
    const result = await response.json()
    setHistory(result)
}

const viewOrder = async (orderId) => {
  try {
    
    const response = await fetch(`${VIEW_HISTORY_URL}/${orderId}`);
  
    const result = await response.json();
    
    setSelectedOrderDetails(result);
    setIsModalOpen(true);
  } catch (error) {
    console.error('Error fetching order details:', error);
  }
};

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderDetails(null);
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <Topbar />

      <Container className="mt-4" >
        <Row className="justify-content-center" style={{marginTop:"6rem"}}>
          <Col md={10}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {historys.map((history) => (
                  <tr key={history.OrderId}>
                    <td>{history.OrderId}</td>
                    <td>{history.OrderDate}</td>
                    <td>{formatCurrency(history.TotalAmount)}</td>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => viewOrder(history.OrderId)}
                      >
                        <FaEye />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Modal show={isModalOpen} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrderDetails && selectedOrderDetails.map((item, index) => (
                <tr key={index}>
                  <td>{item.ProductName}</td>
                  <td>{item.Quantity}</td>
                  <td>{formatCurrency(item.Price)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
