import React from "react";
import Nav from "../components/Nav";
import Screen from "../components/Screen";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePost } from "../context/postContext";

const validationSchema = Yup.object({
  userName: Yup.string()
    .min(2, "اسم المستخدم يجب أن يكون حرفين على الأقل")
    .max(25, "اسم المستخدم يجب ألا يزيد عن 25 حرف")
    .required("اسم المستخدم مطلوب")
    .trim(),

  userPhone: Yup.string()
    .required("رقم الهاتف مطلوب")
    .matches(/^[0-9+\-\s()]+$/, "صيغة رقم الهاتف غير صحيحة")
    .trim(),

  name: Yup.string()
    .max(100, "اسم الشيء يجب ألا يزيد عن 100 حرف")
    .required("اسم الشيء مطلوب")
    .trim(),

  type: Yup.string()
    .oneOf(["found", "lost"], "النوع يجب أن يكون إما مفقود أو موجود")
    .required("النوع مطلوب"),

  category: Yup.string()
    .oneOf(
      [
        "phone",
        "keys",
        "wallet",
        "bag",
        "pet",
        "documents",
        "jewelry",
        "other",
      ],
      "الفئة غير صحيحة"
    )
    .required("الفئة مطلوبة"),

  color: Yup.string().trim().notRequired(),

  password: Yup.string()
    .min(4, "كلمة المرور يجب أن تكون 4 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),

  image: Yup.mixed().notRequired(),

  description: Yup.string()
    .max(500, "الوصف يجب ألا يزيد عن 500 حرف")
    .required("الوصف مطلوب")
    .trim(),

  city: Yup.string().required("المدينة مطلوبة").trim(),

  area: Yup.string().required("المنطقة مطلوبة").trim(),
});

const initialValues = {
  userName: "",
  userPhone: "",
  name: "",
  type: "",
  category: "",
  color: "",
  password: "",
  // image: null,
  description: "",
  city: "",
  area: "",
};

export default function AddPost() {
  const { addPost, errMsg, status, error, loading, isConnected } = usePost();

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      const result = await addPost(values);

      if (result) {
        resetForm();
        alert("تم النشر بنجاح!");
      } else {
        setErrors({ submit: errMsg });
      }
    } catch (error) {
      setErrors({ submit: "An unexpected error occurred" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <Nav />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="topForm">
              <div className="rightForm">
                <div className="formInput">
                  <label htmlFor="userName">اسم المستخدم</label>
                  <Field
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="اسم المستخدم"
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="error"
                  />
                </div>

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
                  <label htmlFor="type">النوع</label>
                  <Field as="select" name="type" id="type">
                    <option value="">اختر النوع</option>
                    <option value="found">موجود</option>
                    <option value="lost">مفقود</option>
                  </Field>
                  <ErrorMessage name="type" component="div" className="error" />
                </div>

                <div className="formInput">
                  <label htmlFor="category">الفئة</label>
                  <Field as="select" name="category" id="category">
                    <option value="">اختر الفئة</option>
                    <option value="phone">هاتف</option>
                    <option value="keys">مفاتيح</option>
                    <option value="wallet">محفظة</option>
                    <option value="bag">حقيبة</option>
                    <option value="pet">حيوان أليف</option>
                    <option value="documents">وثائق</option>
                    <option value="jewelry">مجوهرات</option>
                    <option value="other">أخرى</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="leftForm">
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
                  <Field
                    type="text"
                    name="color"
                    id="color"
                    placeholder="اللون"
                  />
                  <ErrorMessage
                    name="color"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="formInput">
                  <label htmlFor="city">المدينة</label>
                  <Field
                    type="text"
                    name="city"
                    id="city"
                    placeholder="المدينة"
                  />
                  <ErrorMessage name="city" component="div" className="error" />
                </div>

                <div className="formInput">
                  <label htmlFor="area">المنطقة</label>
                  <Field
                    type="text"
                    name="area"
                    id="area"
                    placeholder="المنطقة"
                  />
                  <ErrorMessage name="area" component="div" className="error" />
                </div>
              </div>
            </div>

            <div className="formInput">
              <label htmlFor="description">الوصف</label>
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

            <div className="formInput">
              <label htmlFor="password">كلمة السر (للتعديل/الحذف لاحقاً)</label>
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
              className="formBtn mid"
              type="submit"
              disabled={isSubmitting || !isConnected}
            >
              {!isConnected
                ? "جاري التحميل..."
                : isSubmitting
                ? "ينشر الآن..."
                : "نشر الإعلان"}
            </button>
          </Form>
        )}
      </Formik>
    </Screen>
  );
}
