import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
const LoginForm = () => {
  const { isAuth } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("الرجاء ادخال الايميل")
        .email("الايميل مطلوب"),
      password: Yup.string()
        .min(6, "كلمة المرور يجب ان تكون اكبر من 6 احرف")
        .required("الحقل مطلوب"),
    }),
    onSubmit: async (values) => {
      if (formik.isValid) {
        setLoading(true);
        try {
          await login({ email: values.email, password: values.password });
          navigate('/blog',{replace:true})
        } catch (error) {
          let errorMessage = "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.";

          switch (error.code) {
            case "auth/invalid-email":
              errorMessage = "الرجاء إدخال بريد إلكتروني صالح.";
              break;
            case "auth/user-not-found":
              errorMessage = "المستخدم غير موجود.";
              break;
            case "auth/wrong-password":
              errorMessage = "كلمة المرور غير صحيحة.";
              break;
            case "auth/too-many-requests":
              errorMessage = "من فضلك انتظر قليلا ثم حاول مرة أخرى.";
              break;
            case "auth/network-request-failed":
              errorMessage = "عذرًا، هناك مشكلة في الاتصال بالإنترنت.";
              break;
            case "auth/operation-not-allowed":
              errorMessage = "عملية تسجيل الدخول غير مسموح بها.";
              break;
            case "auth/user-disabled":
              errorMessage = "هذا الحساب تم تعطيله.";
              break;
            case "auth/requires-recent-login":
              errorMessage = "الرجاء تسجيل الدخول مرة أخرى.";
              break;
            case "auth/unauthorized-continue-uri":
              errorMessage = "هناك مشكلة. الرجاء المحاولة لاحقًا.";
              break;
            case "auth/id-token-expired":
              errorMessage = "انتهت صلاحية رمز الهوية.";
              break;
            case "auth/id-token-revoked":
              errorMessage = "تم إلغاء رمز الهوية.";
              break;
            default:
              errorMessage = "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.";
              break;
          }
        
          setError(errorMessage);
        }
        setLoading(false); // تعيين loading بعد الانتهاء من العملية
      }
    },
  });
  console.log(formik);
  if(isAuth){
    return
  }
  return (
    <>
      <Card className="p-4 ">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>الايميل</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              placeholder="ادخل الايميل"
              name="email"
              isInvalid={formik.errors.email && formik.touched.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <Form.Text className="text-danger">
                {formik.errors.email}
              </Form.Text>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>كلمة المرور</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              placeholder="Password"
              name="password"
              isInvalid={formik.errors.password && formik.touched.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <Form.Text className="text-danger">
                {formik.errors.password}
              </Form.Text>
            ) : null}
          </Form.Group>
          {error ? <p className='error-text'>{error}</p> : null}
          <Button
            disabled={loading ? true : false}
            variant="primary"
            className="w-100"
            type="submit"
          >
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">يتم التحميل...</span>
              </Spinner>
            ) : (
              "تسجيل الدخول"
            )}
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default LoginForm;
