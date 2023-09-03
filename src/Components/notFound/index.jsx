import React from "react";
import { Button, Container } from "react-bootstrap";
import notFoundImg from "../../assets/images/not-found.png";
import styles from "./NotFound.module.css";
import { useNavigate } from "react-router";
const MainNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.not_found}>
      <Container>
        <div className={styles.not_found_items}>
          <img src={notFoundImg} alt="not found" />
          <h1>Page Not Found</h1>
          <Button
            variant="outline-info"
            size={"lg"}
            className="px-5"
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default MainNotFound;
