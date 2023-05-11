import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import Messages from "../../pages/messages/Messages";

export const Main = () => {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Messages />} path="/messages" />
      </Routes>
    </>
  );
};
