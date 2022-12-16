import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { SignIn } from "../container/SignIn/SignIn";
import { SignUp } from "../container/SignUp/SignUp";
import HomePage from "../container/HomePage/index";
import { DetailBook } from "../container/Book/DetailBook";
import { AddBook } from "../container/Book/AddBook";
import { Cart } from "../container/Cart/Cart";
import helper from "../common/helper/helper";

const AuthWrapper = () => {
  const user = helper.getUserInfor();
  if (user) {
    if (user.firstLogin) {
      localStorage.removeItem("user");
      return <Navigate to={"/sign-in"} replace />;
    }
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
        {/* <Route element={<AuthWrapper />}> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailBook />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/cart" element={<Cart />} />
        {/* </Route> */}
      </Routes>
    </>
  );
};
