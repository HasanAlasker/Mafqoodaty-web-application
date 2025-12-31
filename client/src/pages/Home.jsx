import React from "react";
import Nav from "../components/Nav";
import HomeCard from "../components/HomeCard";
import Screen from "../components/Screen";

export default function Home() {
  return (
    <Screen>
      <Nav />
      <HomeCard />
    </Screen>
  );
}
