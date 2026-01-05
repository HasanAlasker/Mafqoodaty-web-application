import React from "react";

export default function PostMenu({ onEdit, onDelete, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="postMenu">
      <div className="mid more" onClick={onEdit}>
        تعديل
      </div>
      <hr />
      <div className="mid more" onClick={onDelete} style={{ color: "red" }}>
        حذف
      </div>
    </div>
  );
}
