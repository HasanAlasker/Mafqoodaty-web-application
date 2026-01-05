import { RiEyeCloseLine, RiEyeLine } from "@remixicon/react";

export default function Description({ description, open, onClick }) {
  return (
    <div className="padding row desc" onClick={onClick}>
      {!open ? <RiEyeLine color="gray" className="eye" /> : <RiEyeCloseLine color="gray" className="eye"/>}
      <p className="mid">{open ? description : "الوصف"}</p>
    </div>
  );
}
