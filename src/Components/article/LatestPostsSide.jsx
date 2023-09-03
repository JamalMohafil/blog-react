import React, { useContext, useEffect, useRef } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { PostsContext } from "../../context/PostsContext";
import PostCard from "../blog/PostCard";

const LatestPosts = ({ lgCol, xsCol, mdCol, slu }) => {
  const navigate = useNavigate();

  const { fetch, loading, error, data } = useContext(PostsContext);

  const isMount = useRef(false);

  useEffect(() => {
    if (!isMount.current) {
      fetch();
      isMount.current = true;
    }
  }, []);

  // استخدم filter لمسح العنصر الذي يحمل نفس الـ slug
  const filteredPosts = data ? data.filter((post) => post.slug !== slu) : [];

  const latestPosts = filteredPosts.slice(0, 4);

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-5">اخر المقالات</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">يتم التحميل...</span>
            </Spinner>
          </div>
        ) : null}
        {error ? (
          <div>
            <Alert variant={"danger"}>{error}</Alert>
          </div>
        ) : null}
        {(!error || !loading) && data ? (
          <Row xs={xsCol ? xsCol : ""} md={mdCol} lg={lgCol ? lgCol : ""} className="g-4">
            {latestPosts.map((post) => (
              <Col key={post.id} onClick={() => navigate("/blog/" + post.slug)}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        ) : null}
        <div className="mt-4 text-center">
          <Button variant={"outline-dark"} className="px-5" onClick={() => navigate("/blog")}>
            مشاهدة المزيد
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default LatestPosts;
