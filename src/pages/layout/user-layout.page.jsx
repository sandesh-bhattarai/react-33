import { useContext, useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/auth.context";
import { toast } from "react-toastify";
import { OverViewIcon } from "../../components/icons/icons.component";
import AdminSidebar from "../../components/sidebar/admin-sidebar.component";

const UserLayoutComponent = ({  user }) => {
	return (
		<>
			<div className="antialiased bg-gray-50 ">
				{
					user && user.role === 'admin' ? <>
						<AdminSidebar />
					</> : 
					(
						user && user.role ==='seller' ? <>
						
						</> : <>
						
						</>
					)
				}

				<main className="p-4 md:ml-64 h-auto pt-20">
					<Outlet />
				</main>
			</div>
		</>
	);
};

const UserLayoutPage = ({ role }) => {
	const { user } = useContext(AuthContext);

	if (user) {
		return <UserLayoutComponent user={user} />;
	} else {
		toast.error("Please Login First");
		return <Navigate to="/login" />;
	}
	return <></>;
};

export default UserLayoutPage;
