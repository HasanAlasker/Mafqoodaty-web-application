import React from "react";
import PostGrid from "./PostGrid";
import LoadingPost from "./LoadingPost";

export default function LoadingPostGrid() {
  return (
    <PostGrid>
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
    </PostGrid>
  );
}
