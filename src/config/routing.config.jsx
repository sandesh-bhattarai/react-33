import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/landing";
import AboutUsPage from "../pages/about-us/about-us.page";
import AllProductGridPage from "../pages/products/all-products.page";
import HomePageLayout from "../pages/layout/home-layout.page";
import UserLayoutPage from "../pages/layout/user-layout.page";
import AdminDashboardPage from "../pages/dashboard/admin-dashboard.page";
import CategoryWiseProductList from "../pages/category/category-product-list.page";
import NotFoundPage from "../pages/errors/not-found.page";
// import LoginPage from "../pages/auth/login/login.page";
// import RegisterPage from "../pages/auth/register/register.page";
import Auth from "../pages/auth/";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";

import BannerListPage from "../pages/banner/banner-list.page";
import BannerCreatePage from "../pages/banner/banner-create.page";
import BannerEditPage from "../pages/banner/banner-edit.page";

import BrandListPage from "../pages/brand/brand-list.page";
import BrandCreatePage from "../pages/brand/brand-create.page";
import BrandEditPage from "../pages/brand/brand-edit.page";

import { useDispatch } from "react-redux";
import { catListAll, hello } from "../reducers/category.reducer";

import CategoryListPage from "../pages/category/category-list.page";
import CategoryCreatePage from "../pages/category/category-create.page";
import ChatListPage from "../pages/chat/chat-list.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "products",
        element: <AllProductGridPage />,
      },
      {
        path: "category/:slug",
        element: <CategoryWiseProductList />,
      },
      {
        path: "/login",
        element: <Auth.LoginPage />,
      },
      {
        path: "/register",
        element: <Auth.RegisterPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <UserLayoutPage role="admin" />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: "banner",
        element: <BannerListPage />,
      },
      {
        path: "banner/create",
        element: <BannerCreatePage />,
      },
      {
        path: "banner/:id",
        element: <BannerEditPage />,
      },
      {
        path: "brand",
        element: <BrandListPage />,
      },
      {
        path: "brand/create",
        element: <BrandCreatePage />,
      },
      {
        path: "brand/:id",
        element: <BrandEditPage />,
      },

      {
        path: "category",
        element: <CategoryListPage />,
      },
      {
        path: "category/create",
        element: <CategoryCreatePage />,
      },

      {
        path: "chat",
        element: <ChatListPage />,
      },
      {
        path: "*",
        element: <NotFoundPage link="/admin" />,
      },
    ],
  },
  {
    path: "customer",
    element: <ChatListPage />,
  },
  {
    path: "/seller",
    element: <UserLayoutPage role="seller" />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: "*",
        element: <NotFoundPage link="/seller" />,
      },
    ],
  },
]);

const Routing = () => {
  // category=> hello()
  const dispatch = useDispatch();
  dispatch(catListAll({ page: 1 }));
  // dispatch(hello("I am there"));
  return (
    <>
      <AuthProvider>
        <ToastContainer theme="colored" />
        <RouterProvider router={router} />
        {/* <BrowserRouter>
                <Routes>
                
                    <Route path="/" element={<HomePageLayout />}>
                        <Route index element={<LandingPage />} ></Route>
                        <Route path='about-us' element={<AboutUsPage />}></Route>
                        <Route path="products" element={<AllProductGridPage />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter> */}
      </AuthProvider>
    </>
  );
};

export default Routing;
