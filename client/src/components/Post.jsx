import React, { useState } from "react";
import TopOfPost from "./TopOfPost";
import Tags from "./Tags";
import Description from "./Description";
import PrimaryBtn from "./PrimaryBtn";
import PostCard from "./PostCard";
import TagContainer from "./TagContainer";
import PostMenu from "./PostMenu";
import PasswordCard from "./PasswordCard";
import EditCard from "./EditCard";

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
  let [isDelete, setDelete] = useState(false);

  const initialValues = {
    userPhone: userPhone,
    name: name,
    color: color || "",
    description: description,
    city: city,
    area: area,
    type: type,
  };

  const onClickDesc = () => {
    setOpenDesc(!openDesc);
  };

  const onClickThreeDots = () => {
    setMenu(!openMenu);
  };

  const onEdit = () => {
    setMenu(false);
    setChecking(true);
  };

  const handleDelete = () => {
    setMenu(false);
    setChecking(true);
    setDelete(true);
  };

  if (isChecking)
    return (
      <PasswordCard
        id={id}
        setPassword={setPasswordChecked}
        setChecking={setChecking}
        setEditing={setEditing}
        isDelete={isDelete}
        type={type}
      />
    );

  if (isEditing)
    return (
      <EditCard
        id={id}
        initialValues={initialValues}
        passwordChecked={passwordChecked}
        setEditing={setEditing}
      />
    );

  return (
    <PostCard>
      <div>
        <TopOfPost
          userName={userName}
          createdAt={createdAt}
          onClickMenu={onClickThreeDots}
        />
        <PostMenu
          isVisible={openMenu}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
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
        <PrimaryBtn userPhone={userPhone} />
      </div>
    </PostCard>
  );
}
