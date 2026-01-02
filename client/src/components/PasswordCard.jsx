import React from "react";
import PostCard from "./PostCard";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { verifyPassword } from "../api/posts";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(4, "كلمة السر غير صحيحة")
    .required("كلمة المرور مطلوبة"),
});

export default function PasswordCard({
  id,
  setPassword,
  setChecking,
  setEditing,
  onChecked,
}) {
  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      const result = await verifyPassword(id, values);

      if (result?.ok) {
        setPassword(values.password);
        setChecking(false);
        setEditing(true)
        resetForm();
      } else {
        setErrors({
          submit: "كلمة السر غير صحيحة",
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
        initialValues={{ password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="formInput">
              <label htmlFor="password">ادخل كلمة السر</label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="كلمة السر"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {errors.submit && <div className="error">{errors.submit}</div>}

            <button
              className="formBtn small"
              type="submit"
              disabled={isSubmitting}
              style={{ marginBottom: "1rem" }}
            >
              {isSubmitting ? "جاري التحقق..." : "تحقق"}
            </button>
          </Form>
        )}
      </Formik>
    </PostCard>
  );
}
