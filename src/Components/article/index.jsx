import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import useFetchDocParam from "../../hooks/useFetchDocParam";
import { Alert, Card, Container, Row, Col, Spinner } from "react-bootstrap";
import "./Article.css";
import { User, Clock } from "react-feather";
import LatestPosts from "./LatestPostsSide";

const MainArticle = () => {
  const params = useParams();
  const { getData, data, loading, error } = useFetchDocParam(
    "posts",
    params.slug
  );
  const isMount = useRef(false);
  const getDate = (postTime) => {
    const date = new Date(postTime);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    if (!isMount.current) {
      getData();

      isMount.current = true;
    }
  }, []);

  if (loading){
    return (
      <div className="text-center center-loading">
        <Spinner animation="border"  role="status">
          <span className="visually-hidden">يتم التحميل...</span>
        </Spinner>
      </div>
    );
  }
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!data) return null;
  console.log(data.slug);
  return (
    <article className="article">
      <Container>
        <Row className="post_card_single">
          <Col md="8">
            <Card>
              <Card.Body>
                <div className="pos">
                  <Card.Img src={data.image}></Card.Img>
                  <Card.Subtitle className="mt-2 text-muted subCard">
                    <small>
                      {" "}
                      <User />
                      بواسطة : {data.user}
                    </small>
                    <small>
                      <Clock />
                      {getDate(data.createdAt)}{" "}
                    </small>
                  </Card.Subtitle>
                </div>
                <Card.Title className="single_post_card_title">
                  {data.title}
                </Card.Title>
                <h6>شبكة اخبار جمال محفل العالمية</h6>
                <div
                  className="mt-5"
                  dangerouslySetInnerHTML={{ __html: data.body }}
                ></div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <LatestPosts xsCol="1" mdCol="2" lgCol="1" slu={data.slug} />
          </Col>
        </Row>
      </Container>
    </article>
  );
};

export default MainArticle;
