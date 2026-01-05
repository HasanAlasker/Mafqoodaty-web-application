import React from "react";
import { RiMore2Line, RiUserLine } from "@remixicon/react";
import { formatDate } from "../functions/formatDate";

export default function TopOfPost({
  userName,
  createdAt,
  onClickMenu,
  skeleton,
}) {
  return (
    <div className="topOfPost padding" style={{ paddingLeft: ".5rem" }}>
      <div className={skeleton ? "loading" : "picAndCont"}>
        <div className="avatar">
          <RiUserLine className="avatarIcon" color="white" size={32} />
        </div>
        <div className="nameDate">
          <p className="mid bold">{userName}</p>
          <p className="small faded semiBold">{formatDate(createdAt)}</p>
        </div>
      </div>
      <RiMore2Line size={32} className="more" onClick={onClickMenu} />
    </div>
  );
}
