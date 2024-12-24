import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/landing"
import AboutUsPage from "../pages/about-us/about-us.page";
import AllProductGridPage from "../pages/products/all-products.page";
import HomePageLayout from "../pages/layout/home-layout.page";
import UserLayoutPage from "../pages/layout/user-layout.page";
import AdminDashboardPage from "../pages/dashboard/admin-dashboard.page";
import CategoryWiseProductList from "../pages/category/category-product-list.page";
import NotFoundPage from "../pages/errors/not-found.page";
import LoginPage from "../pages/auth/login/login.page";
import RegisterPage from "../pages/auth/register/register.page";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";


const router = createBrowserRouter([
    {
        path:"/",
        element: <HomePageLayout />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: "about-us",
                element: <AboutUsPage />
            },
            {
                path: "products",
                element: <AllProductGridPage />
            },
            {
                path: "category/:slug",
                element: <CategoryWiseProductList />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    },
    {
        path:"/admin",
        element: <UserLayoutPage role="admin" />,
        children:[
            {
                index: true, 
                element: <AdminDashboardPage />
            },
            {
                path: "*",
                element: <NotFoundPage link="/admin"/>
            }
        ]
    },
    {
        path:"/seller",
        element: <UserLayoutPage role="seller" />,
        children:[
            {
                index: true, 
                element: <AdminDashboardPage />
            },
            {
                path: "*",
                element: <NotFoundPage link="/seller"/>
            }
        ]
    }
])

const Routing = () => {
    return (<>
        <AuthProvider>
            <ToastContainer 
                theme="colored"
            />
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
    </>)
}

export default Routing;