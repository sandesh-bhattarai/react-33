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
import bannerSvc from "./banner.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PageLoading } from "../../components/loading/loading.component";

const BannerEditPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const params = useParams();

  const bannerEditDto = Yup.object({
    title: Yup.string()
      .min(3, "Title Should have atleast 3 characters")
      .max(100)
      .required("Title is required."),
    link: Yup.string().url().required(),
    description: Yup.string().nullable(),
    startDate: Yup.date().required(),
    endDate: Yup.date().min(Yup.ref("startDate")).required(),
    status: Yup.string()
      .matches(/^(active|inactive)$/)
      .required(),
    image: Yup.mixed().required(),
  });

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bannerEditDto),
  });

  const submitEvent = async (data) => {
    setLoading(true);
    try {
      if (typeof data.image === "string") {
        delete data.image;
      }
      const response = await bannerSvc.editBannerById(params.id, data);
      toast.success("Banner Editd Successfully");
      navigate("/admin/banner");
    } catch (exception) {
      toast.error("Banner cannot be edited at this moment");
      if (exception.status === 400) {
        showError(exception, setError);
      }
    } finally {
      setLoading(false);
    }
  };

  const getBannerDetail = async () => {
    try {
      const {
        data: { data },
      } = await bannerSvc.getBannerById(params.id);
      setValue("title", data.title);
      setValue("link", data.link);
      setValue("status", data.status);
      setValue("description", data.description);
      let startDate = data.startDate
        ? new Date(data.startDate).toISOString().split("T").shift()
        : null;
      let endDate = data.endDate
        ? new Date(data.endDate).toISOString().split("T").shift()
        : null;
      setValue("startDate", startDate);
      setValue("endDate", endDate);

      setValue("image", data.image);
      setPageLoading(false);
    } catch (exception) {
      console.log(exception);
      toast.error("Banner Cannot be fetched at this moment");
      setPageLoading(false);
      navigate("/admin/banner");
    }
  };

  useEffect(() => {
    getBannerDetail();
  }, []);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto  px-4 lg:px-12">
          <div className="flex flex-row justify-between bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden my-5 p-5">
            <h1 className="text-primary-900 pt-1 text-lg font-semibold dark:text-primary-50">
              Banner Edit Page
            </h1>
          </div>

          <div className="overflow-x-auto">
            <section className="bg-white dark:bg-gray-900">
              <div className="py-8 px-4 mx-auto lg:py-16">
                {pageLoading ? (
                  <>
                    <div className="flex justify-center items-center h-full">
                      <PageLoading />
                    </div>
                  </>
                ) : (
                  <>
                    <form action="#" onSubmit={handleSubmit(submitEvent)}>
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                          <InputLabel field={"title"} labelTxt={"Title"} />
                          <TextInputField
                            control={control}
                            name={"title"}
                            errMsg={errors?.title?.message}
                            placeholder="Enter banner title"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <InputLabel field={"link"} labelTxt={"Link(URL)"} />
                          <TextInputField
                            control={control}
                            type="url"
                            name={"link"}
                            errMsg={errors?.link?.message}
                            placeholder="Enter banner link"
                          />
                        </div>

                        <div className="flex justify-between gap-4 sm:col-span-2">
                          <div className="w-full">
                            <InputLabel
                              field={"startDate"}
                              labelTxt={"StartDate"}
                            />
                            <TextInputField
                              control={control}
                              type="date"
                              name={"startDate"}
                              errMsg={errors?.startDate?.message}
                              placeholder="Enter banner startDate"
                            />
                          </div>
                          <div className="w-full">
                            <InputLabel
                              field={"endDate"}
                              labelTxt={"End Date"}
                            />
                            <TextInputField
                              control={control}
                              type="date"
                              name={"endDate"}
                              errMsg={errors?.endDate?.message}
                              placeholder="Enter banner endDate"
                            />
                          </div>
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
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerEditPage;
