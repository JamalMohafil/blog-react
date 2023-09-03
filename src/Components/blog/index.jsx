import React, { useContext, useEffect, useRef } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { PostsContext } from "../../context/PostsContext";
import PostCard from "./PostCard";

const MainBlog = () => {
  const { fetch, loading, error, data,fetchNext,fetching } = useContext(PostsContext);

  const isMount = useRef(false);
  const blogObserverRef = useRef(null);
  useEffect(() => {
    if (!isMount.current) {
      fetch();
      isMount.current = true;
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log(entries);
      const blogObserver = entries[0]
      if(blogObserver.isIntersecting){
        // fetch next data

        fetchNext()
      } 
    }, {});
    if (blogObserverRef.current) {
      observer.observe(blogObserverRef.current);
    }
    return ()=>{
      
    if (blogObserverRef.current) {
      observer.unobserve(blogObserverRef.current);
    }
    }
  }, [data,blogObserverRef,fetchNext]);

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-5">اخر الاخبار</h2>
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
          <Row xs="1" md="2" lg="3" className="g-4">
            {data.map((post) => (
              <Col key={post.id}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        ) : null}
        {fetching ? (   <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">يتم التحميل...</span>
            </Spinner>
          </div> ): ''}
        <div className="blog-observer" ref={blogObserverRef}></div>
      </Container>
    </section>
  );
};

export default MainBlog;
