import { useForm } from "react-hook-form";
import { InputLabel, TextInputField } from "../../../components/form/input.component";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { showError } from "../../../utilities/helpers";
import { toast } from "react-toastify";
import authSvc from "../auth.service";
import { useContext, useEffect } from "react";
import AuthContext from "../../../context/auth.context";

const LoginPage = () => {

	const navigate = useNavigate()	// route redirect
	const {user,setUser} = useContext(AuthContext)
	
	const loginDTO = Yup.object({
		email: Yup.string().email("Invalid Email Format").required("Email is compulsory"),
		password: Yup.string().required()
	});

	const {control, handleSubmit, setError,  formState: {errors}} = useForm({
		resolver: yupResolver(loginDTO)
	})
	

	const submitEvent = async(data) => {
		try {
			const response = await authSvc.loginUser(data);
			setUser(response)
			let first = response.name.split(" ").shift()
			toast.success(`Welcome ${first}! To ${response.role} panel!!`)
			navigate('/'+response.role)
		} catch(exception) {
			showError(exception, setError)
			toast.error("Error while logging in...")
		}
	}

	useEffect(() => {
		if(user) {
			navigate('/'+user.role)
		}
	}, [user])
	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
						<img
							className="w-8 h-8 mr-2"
							src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
							alt="logo"
						/>
						Ecommerce App
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>


							<form onSubmit={handleSubmit(submitEvent)} className="space-y-4 md:space-y-6" >
								<div>
									<InputLabel 
										field={'email'}
										labelTxt={'Your email'}
									/>
									
									<TextInputField 
										control={control}
										name={"email"}
										type="email"
										errMsg={errors?.email?.message}
										placeholder="Enter your email..."
									/>
								</div>

								<div>
									<InputLabel 
										field={'password'}
										labelTxt={'Password'}
									/>
									<TextInputField
										control={control}
										name={'password'}
										type="password"
										errMsg={errors?.password?.message}
										placeholder="Enter your password..."
									/>
									
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input
												id="remember"
												aria-describedby="remember"
												type="checkbox"
												className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											/>
										</div>
										<div className="ml-3 text-sm">
											<label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
												Remember me
											</label>
										</div>
									</div>
									<a
										href="#"
										className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Forgot password?
									</a>
								</div>
								<button
									type="submit"
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Sign in
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don’t have an account yet?{" "}
									<a
										href="#"
										className="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Sign up
									</a>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default LoginPage;
