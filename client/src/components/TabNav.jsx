import React, { useState } from "react";

export default function TabNav({ activeTab = "lost", onTabChange }) {
  return (
    <div className="tab">
      <div
        onClick={onTabChange}
        className={
          activeTab === "lost" ? "tabBtn activeTab" : "tabBtn nonactiveTab"
        }
        style={{
          borderTopRightRadius: ".5rem",
          borderBottomRightRadius: ".5rem",
        }}
      >
        مفقودات
      </div>
      <div
        onClick={onTabChange}
        className={
          activeTab === "found" ? "tabBtn activeTab" : "tabBtn nonactiveTab"
        }
        style={{
          borderBottomLeftRadius: ".5rem",
          borderTopLeftRadius: ".5rem",
        }}
      >
        موجودات
      </div>
    </div>
  );
}
