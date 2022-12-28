import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { SignIn } from "../container/SignIn/SignIn";
import { SignUp } from "../container/SignUp/SignUp";
import { DetailBook } from "../container/Book/DetailBook";
import { AddBook } from "../container/Book/AddBook";
import { Cart } from "../container/Cart/Cart";
import { HomePageUser } from "../container/HomePage/HomePageUser";
import { HomePageAdmin } from "../container/HomePage/HomePageAdmin";
import { DetailBookUser } from "../container/Book/DetailBookUser";

const AuthWrapper = () => {
  const userAccessToken = useSelector((state) => state.userReducer.accessToken);
  if (userAccessToken) {
    return <Outlet />;
  }
  return <Navigate to={"/sign-in"} replace />;
};

export const Router = () => {
  const role = useSelector((state) => state.userReducer.role);
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<AuthWrapper />}>
          <Route
            path="/"
            element={role === "admin" ? <HomePageAdmin /> : <HomePageUser />}
          />
          <Route
            path="/detail/:id"
            element={role === "admin" ? <DetailBook /> : <DetailBookUser />}
          />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
};
