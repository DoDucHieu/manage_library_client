import { Routes, Route } from "react-router-dom";
import HomePage from "../container/HomePage/index";
import { DetailBook } from "../container/Book/DetailBook";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailBook />} />
      </Routes>
    </>
  );
};
