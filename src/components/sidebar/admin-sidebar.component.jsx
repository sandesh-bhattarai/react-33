import "flowbite";
import { OverViewIcon } from "../icons/icons.component";
// import { Sidebar } from "flowbite-react";
// import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import logo from "../../assets/images/logo.svg";
import { useContext } from "react";
import AuthContext from "../../context/auth.context";
import {
  FaDollarSign,
  FaImage,
  FaShoppingBag,
  FaShoppingCart,
  FaSitemap,
} from "react-icons/fa";
import { FaB, FaMessage, FaUsers } from "react-icons/fa6";
const adminUrl = [
  {
    name: "Dashboard",
    url: "/admin",
    icon: <OverViewIcon width={5} height={5} />,
  },
  {
    name: "Banner Management",
    url: "/admin/banner",
    icon: <FaImage className="w-5 h-5 me-1" />,
  },
  {
    name: "Brand Management",
    url: "/admin/brand",
    icon: <FaB className="w-5 h-5 me-1" />,
  },
  {
    name: "Category Management",
    url: "/admin/category",
    icon: <FaSitemap className="w-5 h-5 me-1" />,
  },
  {
    name: "User Management",
    url: "/admin/user",
    icon: <FaUsers className="w-5 h-5 me-1" />,
  },
  {
    name: "Product Management",
    url: "/admin/products",
    icon: <FaShoppingBag className="w-5 h-5 me-1" />,
  },
  {
    name: "Orders Management",
    url: "/admin/orders",
    icon: <FaShoppingCart className="w-5 h-5 me-1" />,
  },
  {
    name: "Transactions Management",
    url: "/admin/paymnets",
    icon: <FaDollarSign className="w-5 h-5 me-1" />,
  },
  {
    name: "Chat Management",
    url: "/admin/chat",
    icon: <FaMessage className="w-5 h-5 me-1" />,
  },
];

const SidebarItem = ({ menu }) => {
  return (
    <>
      {menu.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.url}
            className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </NavLink>
        </li>
      ))}
    </>
  );
};

const AdminSidebar = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <NavLink
              to="/admin"
              className="flex items-center justify-between mr-4"
              style={{ textDecoration: "none" }}
            >
              <Avatar img={logo} alt="Logo" className="mr-3 h-8" />

              <span className="self-center text-black text-2xl font-semibold whitespace-nowrap">
                Admin Panel
              </span>
            </NavLink>
          </div>
          <div className="flex items-center lg:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={user.image} rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <li>
                <NavLink
                  href="#"
                  className="no-underline block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                >
                  My profile
                </NavLink>
              </li>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </nav>

      <aside
        className="
                fixed 
                top-0 
                left-0 
                z-40 
                w-64 
                h-screen 
                pt-14 
                transition-transform 
                -translate-x-full 
                bg-white 
                border-r 
                border-gray-200 
                md:translate-x-0 
                dark:bg-gray-800 
                dark:border-gray-700"
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
          <ul className="space-y-2">
            <SidebarItem menu={adminUrl} />
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
