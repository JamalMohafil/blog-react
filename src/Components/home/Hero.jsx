import React from "react";
import { Col, Container, Row,Button  } from "react-bootstrap";
import logoImg from "../../assets/images/logo.png";
import { useNavigate } from "react-router";
import styles from './Home.module.css'
const Hero = () => {
    const navigate = useNavigate()
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row>
          <Col sm="12" md="10" lg="8" className="mx-auto">
            <div className="d-flex flex-column align-items-center text-center">
              <img className={styles.hero_img} src={logoImg} alt="Logo" />
              <p>
                منصة جمال محفل للاخبار العالمية اضف اخبار العالم الجديدة من خلال منصتنا حصرياً مع دعم كامل ومجاني على مدار 24 ساعة
              </p>
              <div className="mt-4">
                <Button size="lg" variant="outline-info" onClick={()=>navigate('/blog/new')}>
                  اضف خبر جديد
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
