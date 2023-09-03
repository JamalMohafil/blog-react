import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
const SignUpForm = () => {
    const [loading,setLoading]= useState(null)
    const {signup} = useContext(AuthContext)
    const [error,setError] = useState(null)
    const navigate = useNavigate()
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      approved:false,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("الاسم مطلوب"),
      email: Yup.string()
        .required("الايميل مطلوب")
        .email("يرجى اضافة ايميل صحيح"),
      password: Yup.string()
        .min(6, "الرجاء اضافة باسورد اكبر من 6 حروف")
        .required("الحقل مطلوب"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'),null],'يجب ان تتطابق كلمة المرور')
        .min(6, "الرجاء اضافة باسورد اكبر من 6 حروف")
        .required("الحقل مطلوب"),
        approved:Yup.boolean().oneOf([true],'الموافقة مطلوبة'),
    }),
   
    onSubmit: async (values) => {
        if (formik.isValid) {
          setLoading(true);
          try {
            await signup({ email: values.email, password: values.password });
            navigate('/blog',{replace:true})
          } catch (error) {
            let errorMessage = "حدث خطأ أثناء انشاء الحساب. يرجى المحاولة مرة أخرى.";

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
              errorMessage = "عملية انشاء الحساب غير مسموح بها.";
              break;
            case "auth/user-disabled":
              errorMessage = "هذا الحساب تم تعطيله.";
              break;
            case "auth/requires-recent-login":
              errorMessage = "الرجاء انشاء حساب مرة أخرى.";
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
              case "auth/email-already-in-use":
                errorMessage = "البريد الإلكتروني مستخدم مسبقًا. قد يكون لديك حساب بالفعل.";
                break;
            default:
              errorMessage = "حدث خطأ أثناء انشاء الحساب. يرجى المحاولة مرة أخرى.";
              break;
          }

          setError(errorMessage)
        }
          setLoading(false); // تعيين loading بعد الانتهاء من العملية
        }
      },
  });
  console.log(error)
  return (
    <>
      <Card className="p-4 ">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>الاسم</Form.Label>
            <Form.Control
              type="text"
              placeholder="ادخل الاسم"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.errors.username && formik.touched.username}
            />
            {formik.errors.username && formik.touched.username ? (
              <Form.Text className="text-danger">
                    {formik.errors.username}
            </Form.Text>
              ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>الايميل</Form.Label>
            <Form.Control
              type="email"
              placeholder="ادخل الايميل"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              type="password"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.errors.password && formik.touched.password}
            />
          {formik.errors.password && formik.touched.password ? (
              <Form.Text className="text-danger">
                    {formik.errors.password}
            </Form.Text>
              ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label> تاكيد كلمة المرور </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
            />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <Form.Text className="text-danger">
                    {formik.errors.confirmPassword}
            </Form.Text>
              ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              role="button"
              type="checkbox"
              label="لقد قرات الشروط والاحكام"
              name="approved"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.errors.approved && formik.touched.approved}
            />
              {formik.errors.approved && formik.touched.approved ? (
              <Form.Text className="text-danger">
                    {formik.errors.approved}
            </Form.Text>
              ) : null}
          </Form.Group>
          {error  ? (
            <p className='error-text'>{error}</p>
          ):null}
          <Button disabled={loading ? true : false}    variant="primary" className="w-100" type="submit">
            {loading ? (
                <Spinner animation="border" role="status">
                <span className="visually-hidden">يتم التحميل...</span>
              </Spinner>
            ): 'انشاء حساب'}
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default SignUpForm;
