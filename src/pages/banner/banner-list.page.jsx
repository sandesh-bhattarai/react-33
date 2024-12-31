import { PlusIcon, SearchIcon } from "../../components/icons/icons.component";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { RowSkeleton } from "../../components/table/skeleton.component";
import { toast } from "react-toastify";
import bannerSvc from "./banner.service";
import { FaPen, FaTrash } from "react-icons/fa";
import TablePagination from "../../components/table/pagination.component";

import Swal from "sweetalert2";

const BannerListPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    toNoOfPages: 1,
  });
  const dataList = async ({ page = 1 }) => {
    try {
      let response = await bannerSvc.listAllBanners({
        limit: 10,
        page: page,
        keyword: search,
      });
      setData(response.data.data);
      setPagination({
        total: response.data.options.total,
        page: response.data.options.page,
        limit: response.data.options.limit,
        toNoOfPages: Math.ceil(
          response.data.options.total / response.data.options.limit
        ),
      });
    } catch (exception) {
      console.log(exception);
      toast.error("Error fetching banner data...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      dataList({ page: 1 });
    }, 1500);

    return () => clearTimeout(debounce);
  }, [search]);

  useEffect(() => {
    // api here
    dataList({ page: 1 });
  }, []);

  const deleteBanner = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        // detele banner api call
      }
    } catch (exception) {
      toast.error("Error while deleting...");
      console.log(exception);
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto  px-4 lg:px-12">
          <div className="flex flex-row justify-between bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden my-5 p-5">
            <h1 className="text-primary-900 pt-1 text-lg font-semibold dark:text-primary-50">
              Banner List Page
            </h1>
            <div>
              <NavLink
                to="/admin/banner/create"
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <PlusIcon />
                Add Banner
              </NavLink>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <div className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <SearchIcon />
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      onChange={(e) => {
                        e.preventDefault();
                        setSearch(e.target.value);
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs  uppercase bg-gray-700 text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Link
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <>
                      <RowSkeleton rows={10} columns={5} />
                    </>
                  ) : (
                    <>
                      {data && data.length > 0 ? (
                        data.map((row, index) => (
                          <tr
                            key={index}
                            className="border-b dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {row.title}
                            </th>
                            <td className="px-4 py-3">
                              <a
                                href={row.link}
                                target="_banner"
                                className="text-teal-700 hover:underline"
                              >
                                {row.link}
                              </a>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`${
                                  row.status === "active"
                                    ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                                    : "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                                }`}
                              >
                                {row.status === "acitve"
                                  ? "Publish"
                                  : "Un-Publish"}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <img src={row.image} alt="" className="w-20" />
                            </td>
                            <td className="px-4 py-3 flex items-center justify-end">
                              <NavLink
                                to={"/admin/banner/" + row._id}
                                className={
                                  "bg-teal-800 w-10 h-10 flex items-center justify-center rounded-full hover:bg-teal-700 me-3"
                                }
                              >
                                <FaPen className="text-white" />
                              </NavLink>

                              <NavLink
                                to={"/admin/banner/" + row._id}
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteBanner(row._id);
                                }}
                                className={
                                  "bg-red-800 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-700 me-3"
                                }
                              >
                                <FaTrash className="text-white" />
                              </NavLink>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {pagination && (
              <>
                <TablePagination
                  pagination={pagination}
                  dataLen={data?.length || 0}
                  loadData={setData}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerListPage;
