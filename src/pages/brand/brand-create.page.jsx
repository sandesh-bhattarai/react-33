import { useForm } from "react-hook-form";
import {
  FileUploadField,
  InputLabel,
  SelectOptionField,
  TextAreaField,
  TextInputField,
} from "../../components/form/input.component";
import { FormSubmitButtons } from "../../components/buttons/button.component";
import { FaPaperPlane, FaTrash } from "react-icons/fa6";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { showError } from "../../utilities/helpers";
import brandSvc from "./brand.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BrandCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const brandCreateDto = Yup.object({
    title: Yup.string()
      .min(3, "Title Should have atleast 3 characters")
      .max(100)
      .required("Title is required."),
    description: Yup.string().nullable(),
    status: Yup.string()
      .matches(/^(active|inactive)$/)
      .required(),
    image: Yup.mixed().required(),
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(brandCreateDto),
  });

  const submitEvent = async (data) => {
    setLoading(true);
    try {
      const response = await brandSvc.createBrand(data);
      toast.success("Brand Created Successfully");
      navigate("/admin/brand");
    } catch (exception) {
      toast.error("Brand cannot be created at this moment");
      if (exception.status === 400) {
        showError(exception, setError);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto  px-4 lg:px-12">
          <div className="flex flex-row justify-between bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden my-5 p-5">
            <h1 className="text-primary-900 pt-1 text-lg font-semibold dark:text-primary-50">
              Brand Create Page
            </h1>
          </div>

          <div className="overflow-x-auto">
            <section className="bg-white dark:bg-gray-900">
              <div className="py-8 px-4 mx-auto lg:py-16">
                <form action="#" onSubmit={handleSubmit(submitEvent)}>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                      <InputLabel field={"title"} labelTxt={"Title"} />
                      <TextInputField
                        control={control}
                        name={"title"}
                        errMsg={errors?.title?.message}
                        placeholder="Enter brand title"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <InputLabel field={"status"} labelTxt={"Status"} />
                      <SelectOptionField
                        control={control}
                        name={"status"}
                        errMsg={errors?.status?.message}
                        options={[
                          { label: "Publish", value: "active" },
                          { label: "UnPublish", value: "inactive" },
                        ]}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <InputLabel
                        field={"description"}
                        labelTxt={"Description"}
                      />
                      <TextAreaField
                        control={control}
                        name={"description"}
                        errMsg={errors?.description?.message}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 mt-5">
                    <InputLabel field={"image"} labelTxt={"Image"} />
                    <FileUploadField
                      control={control}
                      name="image"
                      errMsg={errors?.image?.message}
                      setError={setError}
                    />
                  </div>

                  <FormSubmitButtons
                    loading={loading}
                    showCancelBtn={true}
                    submitButtonTxt={
                      <>
                        <FaPaperPlane className="me-2 w-4 h-4 pt-[2px]" />{" "}
                        Submit
                      </>
                    }
                    resetButtonTxt={
                      <>
                        <FaTrash className="me-2 w-4 h-4 pt-[2px]" /> Cancel
                      </>
                    }
                  />
                </form>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandCreatePage;
