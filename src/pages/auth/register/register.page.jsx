import {
	FileUploadField,
	InputLabel,
	RadioInputField,
	SelectOptionField,
	TextAreaField,
	TextInputField,
} from "../../../components/form/input.component";
import { useForm } from "react-hook-form";
import { FormSubmitButtons } from "../../../components/buttons/button.component";
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import authSvc from "../auth.service";
import { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { toast } from "react-toastify";

const RegisterPage = () => {
	const [otpModel, setOtpModel] = useState(false);

	const userRegisterDTO = Yup.object({
		name: Yup.string().min(2).max(25).required(),
		email: Yup.string().email().required(),
		password: Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,25}$/, {message: "Password should contain at least one character, a number and a special character."}).required(),
		confirmPassword: Yup.string().oneOf([Yup.ref('password')]).required(),
		gender: Yup.string().matches(/^(male|female|other)$/).required(),
		role: Yup.string().matches(/^(customer|seller)$/).required(),
		phone: Yup.string().matches(/^(?:\+977[- ]?)?(98\d{8}|97\d{8}|96\d{8}|0[1-6][- ]?\d{6,7})$/, {message: "Phone number should start with 98 or .."}).required(),
		address: Yup.string().nullable().optional().default(null),
		image: Yup.mixed().required()
	});

	const [loading, setLoading] = useState(false);

	const { control, handleSubmit, setError, formState: { errors } } = useForm({
		resolver: yupResolver(userRegisterDTO)
	});

	const submitEvent = async(data) => {
		try{
			setLoading(true)
			const result = await authSvc.registerUser(data)
			setLoading(false)
			toast.success("Your account has been created. Please use the OTP code provided on your email")
			setOtpModel(true)
		} catch(exception) {
			let errData = exception?.data?.data || null;
			if(errData) {
				Object.keys(errData).map((key) => {
					setError(key, {message: errData[key]})
				})
			}
			setLoading(false);
		}
	};

	return (
		<>
			<div className="my-5 flex justify-center items-center min-h-screen bg-gray-100">
				<div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registration</h2>
					<form onSubmit={handleSubmit(submitEvent)}>
						{/* Name */}
						<div className="mb-4">
							<InputLabel field={"name"} labelTxt={"Name: "} />
							<TextInputField
								control={control}
								name={"name"}
								placeholder="Enter Your name..."
								errMsg={errors?.name?.message}
							/>
						</div>

						{/* Email */}
						<div className="mb-4">
							<InputLabel field={"email"} labelTxt={"Email(Username): "} />
							<TextInputField
								type="email"
								control={control}
								name={"email"}
								placeholder="Enter Your email..."
								errMsg={errors?.email?.message}
							/>
						</div>

						{/* Password */}
						<div className="mb-4">
							<InputLabel field={"password"} labelTxt={"Password: "} />
							<TextInputField
								control={control}
								name={"password"}
								type="password"
								placeholder="Enter Your Password..."
								errMsg={errors?.password?.message}
							/>
						</div>

						{/* Confirm Password */}
						<div className="mb-4">
							<InputLabel field={"confirmPassword"} labelTxt={"Re-Password: "} />
							<TextInputField
								control={control}
								name={"confirmPassword"}
								type="password"
								placeholder="Re-enter Your Password..."
								errMsg={errors?.confirmPassword?.message}
							/>
						</div>

						{/* Gender */}
						<div className="mb-4">
							<InputLabel field={"gender"} labelTxt={"Gender: "} />
							<div className="flex">
								<RadioInputField
									options={[
										{ label: "Male", value: "male" },
										{ label: "Female", value: "female" },
										{ label: "Other", value: "other" },
									]}
									name="gender"
									control={control}
									errMsg={errors?.gender?.message}
								/>
							</div>
						</div>

						{/* Role */}
						<div className="mb-4">
							<InputLabel field={"role"} labelTxt={"Role: "} />
							<SelectOptionField
								options={[
									{ label: "Buyer", value: "customer" },
									{ label: "Seller", value: "seller" },
								]}
								control={control}
								name={"role"}
								errMsg={errors?.role?.message}
							/>
						</div>

						{/* Phone */}
						<div className="mb-4">
							<InputLabel field={"phone"} labelTxt={"Phone: "} />
							<TextInputField
								control={control}
								name={"phone"}
								type="tel"
								errMsg={errors?.phone?.message}
							/>
						</div>

						{/* Address */}
						<div className="mb-4">
							<InputLabel field={"address"} labelTxt={"Address: "} />
							<TextAreaField name={"address"} control={control} errMsg={errors?.address?.message} />
						</div>

						{/* Image Upload */}
						<div className="mb-4">
							<InputLabel field={"image"} labelTxt={"Image: "} />
							<FileUploadField setError={setError} control={control} name={"image"} errMsg={errors?.image?.message} />
						</div>

						{/* Submit Button */}
						<FormSubmitButtons loading={loading} />
					</form>
				</div>
			</div>

			<Modal show={otpModel} onClose={() => setOtpModel(false)}>
				<Modal.Header>Terms of Service</Modal.Header>
				<Modal.Body>
				<div className="space-y-6">
					<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
					With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
					companies around the world are updating their terms of service agreements to comply.
					</p>
					<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
					The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
					to ensure a common set of data rights in the European Union. It requires organizations to notify users as
					soon as possible of high-risk data breaches that could personally affect them.
					</p>
				</div>
				</Modal.Body>
				<Modal.Footer>
				<Button onClick={() => setOtpModel(false)}>I accept</Button>
				<Button color="gray" onClick={() => setOtpModel(false)}>
					Decline
				</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default RegisterPage;
