import React from "react";
import PostCard from "./PostCard";

export default function LoadingPost() {
  return (
    <PostCard>
      {/* Top section with avatar, name, date, and menu */}
      <div className="padding">
        <div className="topOfPost">
          <div className="picAndCont">
            <div className="avatar loading" style={{ width: '3rem', height: '3rem' , borderRadius:"50%"}}></div>
            <div className="nameDate">
              <div className="loading" style={{ height: '20px', width: '100px', marginBottom: '4px' }}></div>
              <div className="loading" style={{ height: '16px', width: '80px' }}></div>
            </div>
          </div>
          <div className="loading" style={{ height: '34px', width: '12px', borderRadius: '4px' }}></div>
        </div>

        {/* Tags */}
        <div className="tagCont">
          <div className="tag loading" style={{ width: '80px', height: '30px', borderRadius:'5rem', border:"none" }}></div>
          <div className="tag loading" style={{ width: '80px', height: '30px', borderRadius:'5rem', border:"none" }}></div>
          <div className="tag loading" style={{ width: '80px', height: '30px', borderRadius:'5rem', border:"none" }}></div>
          <div className="tag loading" style={{ width: '80px', height: '30px', borderRadius:'5rem', border:"none" }}></div>
          <div className="tag loading" style={{ width: '80px', height: '30px', borderRadius:'5rem', border:"none" }}></div>
        </div>

        {/* Description */}
        <div className="loading" style={{ width: '100%', marginBottom: '1rem', aspectRatio:'1' }}></div>
      </div>

      {/* Image and button */}

    </PostCard>
  );
}