import React from "react";
import PostCard from "./PostCard";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { editPost } from "../api/posts";
import { usePost } from "../context/postContext";

const validationSchema = Yup.object({
  userPhone: Yup.string()
    .required("رقم الهاتف مطلوب")
    .matches(/^[0-9+\-\s()]+$/, "صيغة رقم الهاتف غير صحيحة")
    .trim(),

  name: Yup.string()
    .max(100, "اسم الشيء يجب ألا يزيد عن 100 حرف")
    .required("اسم الشيء مطلوب")
    .trim(),

  color: Yup.string().trim().notRequired(),

  description: Yup.string()
    .max(500, "الوصف يجب ألا يزيد عن 500 حرف")
    .trim().notRequired(),

  city: Yup.string().required("المدينة مطلوبة").trim(),

  area: Yup.string().required("المنطقة مطلوبة").trim(),
});

export default function EditCard({
  id,
  initialValues,
  passwordChecked,
  setEditing,
}) {

  const { updatePost } = usePost();

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      // Create proper post data object with password
      const postData = {
        ...values,
        password: passwordChecked,
      };

      const result = await updatePost(id, postData);

      if (result?.ok) {
        setEditing(false);
        resetForm();
        alert("تم التعديل بنجاح!");
      } else {
        setErrors({
          submit: result?.error || "فشل التعديل",
        });
      }
    } catch (error) {
      setErrors({
        submit: error.message || "حدث خطأ غير متوقع",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PostCard style={{ padding: "1rem" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="formInput">
              <label htmlFor="userPhone">رقم الهاتف</label>
              <Field
                type="tel"
                name="userPhone"
                id="userPhone"
                placeholder="رقم الهاتف"
                style={{ direction: "rtl" }}
              />
              <ErrorMessage
                name="userPhone"
                component="div"
                className="error"
              />
            </div>

            <div className="formInput">
              <label htmlFor="name">اسم الشيء</label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="اسم الشيء"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="formInput">
              <label htmlFor="color">اللون (اختياري)</label>
              <Field type="text" name="color" id="color" placeholder="اللون" />
              <ErrorMessage name="color" component="div" className="error" />
            </div>

            <div className="formInput">
              <label htmlFor="city">المدينة</label>
              <Field type="text" name="city" id="city" placeholder="المدينة" />
              <ErrorMessage name="city" component="div" className="error" />
            </div>

            <div className="formInput">
              <label htmlFor="area">المنطقة</label>
              <Field type="text" name="area" id="area" placeholder="المنطقة" />
              <ErrorMessage name="area" component="div" className="error" />
            </div>

            <div className="formInput">
              <label htmlFor="description">الوصف (اختياري)</label>
              <Field
                as="textarea"
                name="description"
                id="description"
                placeholder="الوصف"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>

            {errors.submit && <div className="error">{errors.submit}</div>}

            <button
              className="formBtn"
              type="submit"
              disabled={isSubmitting}
              style={{ marginBottom: "1rem" }}
            >
              {isSubmitting ? "جاري التعديل..." : "حفظ التعديلات"}
            </button>

            <button
              className="formBtn"
              type="button"
              disabled={isSubmitting}
              style={{ margin: "0", background: "red" }}
              onClick={() => setEditing(false)}
            >
              إلغاء
            </button>
          </Form>
        )}
      </Formik>
    </PostCard>
  );
}
