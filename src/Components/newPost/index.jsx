import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useContext, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { FirebaseContext } from "../../context/FirebaseContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";
import { PostsContext } from "../../context/PostsContext";
const MainNewPost = () => {
  const navigate = useNavigate()
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const { db } = useContext(FirebaseContext);
  const { refetch } = useContext(PostsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.title.value);
    const title = e.target.title.value;
    const excert = e.target.excert.value;
    const image = e.target.image.value;
    const slug = title.split(" ").join("-") + "-" + new Date().getTime();
    console.log({ title, excert, slug, image, body });
    setLoading(true);
    try {
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        title,
        excert,
        slug,
        image,
        body,
        user: "جمال محفل",
        createdAt:serverTimestamp()
      });
      e.target.reset()
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setBody('')
    refetch()
    navigate('/blog/' + slug);
    };
  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col md="8" lg="6" className="mx-auto">
            <h2 className="mb-4">Add New Post</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>العنوان</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  placeholder="ادخل العنوان"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formExcert">
                <Form.Label>مقتطفات المقال</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="excert"
                  placeholder="ادخل مقتطفات المقال"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>صورة المقال</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  placeholder="ادخل رابط الصورة"
                />
              </Form.Group>
              <ReactQuill
                theme="snow"
                value={body}
                modules={MainNewPost.modules}
                formats={MainNewPost.formats}
                onChange={setBody}
              />
              
              <Button type="submit" className="mt-4 w-100" disabled={loading}>
                نشر {loading? '...':''}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MainNewPost;

MainNewPost.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "itlaic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bulllet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};
MainNewPost.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];
