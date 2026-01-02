import React, { useState } from "react";
import Nav from "../components/Nav";
import HomeCard from "../components/HomeCard";
import Screen from "../components/Screen";
import TabNav from "../components/TabNav";
import Post from "../components/Post";
import { usePost } from "../context/postContext";
import PostGrid from "../components/PostGrid";

export default function Home() {
  const [activeTab, setActiveTab] = useState("lost");
  const { lost, found, loading } = usePost();

  const onTabChange = () => {
    let tab = activeTab === "lost" ? "found" : "lost";
    setActiveTab(tab);
  };

  const foundList = found?.map((post) => (
    <Post
      key={post._id}
      id={post._id}
      userName={post.userName}
      userPhone={post.userPhone}
      createdAt={post.createdAt}
      area={post.area}
      city={post.city}
      name={post.name}
      category={post.category}
      color={post?.color}
      description={post.description}
      image={post?.image}
      password={post.password}
      type={post.type}
    />
  ));

  const lostList = lost?.map((post) => (
    <Post
      key={post._id}
      id={post._id}
      userName={post.userName}
      userPhone={post.userPhone}
      createdAt={post.createdAt}
      area={post.area}
      city={post.city}
      name={post.name}
      category={post.category}
      color={post?.color}
      description={post.description}
      image={post?.image}
      password={post.password}
      type={post.type}
    />
  ));

  return (
    <Screen>
      <Nav />
      <HomeCard />
      <TabNav activeTab={activeTab} onTabChange={onTabChange} />
      <PostGrid>{activeTab === "found" ? foundList : lostList}</PostGrid>
    </Screen>
  );
}
