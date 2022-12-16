import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { SignIn } from "../container/SignIn/SignIn";
import { SignUp } from "../container/SignUp/SignUp";
import HomePage from "../container/HomePage/index";
import { DetailBook } from "../container/Book/DetailBook";
import { AddBook } from "../container/Book/AddBook";
import { Cart } from "../container/Cart/Cart";


const AuthWrapper = () => {
  const userAccessToken = useSelector(
    (state) => state.userReducer.accessToken,
  );  
  if (userAccessToken) {
    return <Outlet />;
  }
  return <Navigate to={"/sign-in"} replace />;
};

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<AuthWrapper />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailBook />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
};
