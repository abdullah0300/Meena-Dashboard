import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import MainPage from "./Sub_Component/Dashboard/MainPage";
import AddCategory from "./Sub_Component/Dashboard/AddCategory";
import AddProduct from "./Sub_Component/Dashboard/AddProduct";
import AddFilter from "./Sub_Component/Dashboard/AddFilter";
import Orders from "./Sub_Component/Dashboard/Orders";
import AllProducts from "./Sub_Component/Dashboard/AllProducts";
import AllCategory from "./Sub_Component/Dashboard/AllCategory";
import AddFlavour from "./Sub_Component/Dashboard/AddFlavour";
import EditCategory from "./Sub_Component/Dashboard/EditCategory";
import EditProduct from "./Sub_Component/Dashboard/EditProduct";
import AllFilters from "./Sub_Component/Dashboard/AllFilters";
import EditFilter from "./Sub_Component/Dashboard/EditFilter";
import AllFlavours from "./Sub_Component/Dashboard/AllFlavours";
import EditFlavour from "./Sub_Component/Dashboard/EditFlavour";

import ProfilePage from "./Sub_Component/Dashboard/ProfilePage";
import Register from "./Main_Component/Register";
import Login from "./Main_Component/Login";

import { AuthProvider } from "./utils/auth";
import { RequireAuth } from "./utils/RequireAuth";
import AddOffer from "./Sub_Component/Dashboard/AddOffer";
import AllOffers from "./Sub_Component/Dashboard/AllOffers";
import EditOffer from "./Sub_Component/Dashboard/EditOffer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop>
            <Routes>
              <Route path="/signup" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <MainPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <MainPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/addCategory"
                element={
                  <RequireAuth>
                    <AddCategory />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/editCategory/:catId"
                element={
                  <RequireAuth>
                    <EditCategory />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/editProduct/:catId/:catName/:prodId"
                element={
                  <RequireAuth>
                    <EditProduct />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/all_category"
                element={
                  <RequireAuth>
                    <AllCategory />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/addProduct"
                element={
                  <RequireAuth>
                    <AddProduct />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/allFlavours"
                element={
                  <RequireAuth>
                    <AllFlavours />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/addFlavour"
                element={
                  <RequireAuth>
                    <AddFlavour />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/editFlavour/:flavId"
                element={
                  <RequireAuth>
                    <EditFlavour />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/allFilters"
                element={
                  <RequireAuth>
                    <AllFilters />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/addFilter"
                element={
                  <RequireAuth>
                    <AddFilter />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/editFilter/:catId/:catName/:filId"
                element={
                  <RequireAuth>
                    <EditFilter />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/all_product"
                element={
                  <RequireAuth>
                    <AllProducts />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/addOffer"
                element={
                  <RequireAuth>
                    <AddOffer />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/allOffers"
                element={
                  <RequireAuth>
                    <AllOffers />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/editOffer/:offerId"
                element={
                  <RequireAuth>
                    <EditOffer />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/orders"
                element={
                  <RequireAuth>
                    <Orders />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/profile"
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />
            </Routes>
          </ScrollToTop>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
