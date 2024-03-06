// pages/index.js

// import LeafletMap from '@/components/LeafletMap';
import dynamic from 'next/dynamic';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
const DynamicLeafletMap = dynamic(
  () => import('@/components/LeafletMap'),
  { ssr: false } // This will disable server-side rendering for the LeafletMap component
);
import styles from './index.module.css';
import Head from 'next/head';
// import styles from './index.module.css';

export default function Home() {
  return (
    <div>
      {/* <div style={{display:'flex'}}>
        <button className={styles.navButton}>foo</button>
        <button className={styles.navButton}>foo</button>
        <button className={styles.navButton}>foo</button>
      </div> */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Trnavikon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <DynamicLeafletMap className={styles.map} />
    </div>
  );
}
