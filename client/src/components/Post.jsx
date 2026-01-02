import React, { useState } from "react";
import TopOfPost from "./TopOfPost";
import Tags from "./Tags";
import Description from "./Description";
import PrimaryBtn from "./PrimaryBtn";
import PostCard from "./PostCard";
import TagContainer from "./TagContainer";
import PostMenu from "./PostMenu";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PasswordCard from "./PasswordCard";

const validationSchema = Yup.object({
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

  color: Yup.string().trim().notRequired(),

  password: Yup.string()
    .min(4, "كلمة السر غير صحيحة")
    .required("كلمة المرور مطلوبة"),

  image: Yup.mixed().notRequired(),

  description: Yup.string()
    .max(500, "الوصف يجب ألا يزيد عن 500 حرف")
    .required("الوصف مطلوب")
    .trim(),

  city: Yup.string().required("المدينة مطلوبة").trim(),

  area: Yup.string().required("المنطقة مطلوبة").trim(),
});

export default function Post({
  id,
  userName,
  userPhone,
  createdAt,
  name,
  image,
  category,
  description,
  color,
  city,
  area,
  type,
  password,
}) {
  let isOpen = image ? false : true;
  const [openDesc, setOpenDesc] = useState(isOpen);
  const [openMenu, setMenu] = useState(false);
  const [isChecking, setChecking] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(null);

  const initialValues = {
    userPhone: userPhone,
    name: name,
    type: type,
    category: category,
    color: color || null,
    description: description,
    city: city,
    area: area,
  };

  const onClickDesc = () => {
    setOpenDesc(!openDesc);
  };

  const onClickThreeDots = () => {
    setMenu(!openMenu);
  };

  const onEdit = () => {
    setChecking(true);
  };

  const handleDelete = () => {};

  if (isChecking) return <PasswordCard id={id} setPassword={setPasswordChecked}/>;

  if (isEditing) return <></>;

  return (
    <PostCard>
      <div>
        <TopOfPost
          userName={userName}
          createdAt={createdAt}
          onClickMenu={onClickThreeDots}
        />
        <PostMenu isVisible={openMenu} onEdit={onEdit} />
        <TagContainer>
          <Tags title={name} />
          <Tags title={category} />
          <Tags title={city} />
          <Tags title={area} />
          {color && <Tags title={color} />}
          <Tags title={type} green />
        </TagContainer>
        <Description
          open={openDesc}
          onClick={onClickDesc}
          description={description}
        />
      </div>
      <div className="imageAndBtn">
        {image && <img className="itemImage" alt="" />}
        <PrimaryBtn />
      </div>
    </PostCard>
  );
}
