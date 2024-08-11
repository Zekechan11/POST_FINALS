import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Topbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed='top'>
        <Container>
        <img src="./public/layout/imgs/logo.png" alt="" style={{ width: "100px", height: "auto", marginLeft: "-10rem",marginTop:"-0.5rem", color:"white"}}   />
          <Nav className="me-auto">
            <Nav.Link href="/">Inventory</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/history">Transaction History</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default Topbar;