import React, { useRef, useState } from "react";
import Nav from "../components/Nav";
import Screen from "../components/Screen";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePost } from "../context/postContext";
import ImagePrev from "../components/ImagePrev";

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
    .oneOf(["موجود", "مفقود"], "النوع يجب أن يكون إما مفقود أو موجود")
    .required("النوع مطلوب"),

  category: Yup.string()
    .oneOf(
      [
        "هاتف",
        "مفاتيح",
        "محفظة",
        "حيوان أليف",
        "حقيبة",
        "وثائق",
        "مجوهرات",
        "أخرى",
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
    .trim()
    .notRequired(),

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
  image: "",
  description: "",
  city: "",
  area: "",
};

export default function AddPost() {
  const { addPost, errMsg, status, error, loading, isConnected } = usePost();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("يرجى اختيار صورة صالحة");
        return;
      }

      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
        return;
      }

      // Set the file in Formik
      setFieldValue("image", file);
      setSelectedFileName(file.name);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (setFieldValue) => {
    setFieldValue("image", null);
    setImagePreview(null);
    setSelectedFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Append all form fields
      Object.keys(values).forEach((key) => {
        if (values[key] !== null && values[key] !== "") {
          formData.append(key, values[key]);
        }
      });

      const result = await addPost(formData);

      if (result) {
        resetForm();
        setImagePreview(null);
        setSelectedFileName("");
        alert("تم النشر بنجاح!");
      } else {
        setErrors({ submit: errMsg });
      }
    } catch (error) {
      setErrors({ submit: "حدث خطأ غير متوقع" });
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
        {({ isSubmitting, errors, setFieldValue }) => (
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
                    <option value="موجود">موجود</option>
                    <option value="مفقود">مفقود</option>
                  </Field>
                  <ErrorMessage name="type" component="div" className="error" />
                </div>

                <div className="formInput">
                  <label htmlFor="category">الفئة</label>
                  <Field as="select" name="category" id="category">
                    <option value="">اختر الفئة</option>
                    <option value="هاتف">هاتف</option>
                    <option value="مفاتيح">مفاتيح</option>
                    <option value="محفظة">محفظة</option>
                    <option value="حقيبة">حقيبة</option>
                    <option value="حيوان أليف">حيوان أليف</option>
                    <option value="وثائق">وثائق</option>
                    <option value="مجوهرات">مجوهرات</option>
                    <option value="أخرى">أخرى</option>
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

            <div className="formInput">
              <label>الصورة (اختياري)</label>

              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />

              <button
                className="formBtn small"
                type="button"
                disabled={isSubmitting || !isConnected}
                style={{
                  margin: 0,
                  background: "white",
                  color: "#0bd064",
                  border: "#0bd064 solid 2px",
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedFileName || "اختيار صورة"}
              </button>

              {imagePreview && (
                <ImagePrev
                  imageSrc={imagePreview}
                  onRemove={() => removeImage(setFieldValue)}
                />
              )}
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
