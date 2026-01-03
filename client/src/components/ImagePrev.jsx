import React from "react";
import { RiCloseLine } from "@remixicon/react";

export default function ImagePrev({ imageSrc, onRemove }) {
  if (!imageSrc) return null;

  return (
    <div className="imagePreviewContainer">
      <img src={imageSrc} alt="Preview" className="imagePreview" />
      <button
        type="button"
        onClick={onRemove}
        className="removeImageBtn"
        aria-label="Remove image"
      >
        <RiCloseLine size={20} />
      </button>
    </div>
  );
}
