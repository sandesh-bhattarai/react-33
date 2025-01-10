import { NavLink } from "react-router-dom";
import { PlusIcon, SearchIcon } from "../../components/icons/icons.component";
import { RowSkeleton } from "../../components/table/skeleton.component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaPen, FaTrash } from "react-icons/fa6";
import TablePagination from "../../components/table/pagination.component";
const CategoryListPage = () => {
  // const [loading, setLoading] = useState(true);
  const { data, pagination } = useSelector((root) => {
    // console.log(root);
    // setLoading(false);
    return {
      data: root?.category?.allCatList,
      pagination: root?.category?.pagination,
    };
  });

  // useEffect(() => {
  //   setLoading(false);
  // }, [data]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto  px-4 lg:px-12">
          <div className="flex flex-row justify-between bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden my-5 p-5">
            <h1 className="text-primary-900 pt-1 text-lg font-semibold dark:text-primary-50">
              Category List Page
            </h1>
            <div>
              <NavLink
                to="/admin/category/create"
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <PlusIcon />
                Add Category
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
                        // setSearch(e.target.value);
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
                  {/* {loading ? (
                    <>
                      <RowSkeleton rows={10} columns={5} />
                    </>
                  ) : ( */}
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
                              href={
                                import.meta.env.VITE_APP_URL +
                                "/brand/" +
                                row.slug
                              }
                              target="_brand"
                              className="text-teal-700 hover:underline hover:cursor-pointer"
                            >
                              {row.slug}
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
                              {row.status === "active"
                                ? "Publish"
                                : "Un-Publish"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <img src={row.image} alt="" className="w-20" />
                          </td>
                          <td className="px-4 py-3 flex items-center justify-end">
                            <NavLink
                              to={"/admin/brand/" + row._id}
                              className={
                                "bg-teal-800 w-10 h-10 flex items-center justify-center rounded-full hover:bg-teal-700 me-3"
                              }
                            >
                              <FaPen className="text-white" />
                            </NavLink>

                            <NavLink
                              to={"/admin/brand/" + row._id}
                              onClick={(e) => {
                                e.preventDefault();
                                deleteBrand(row._id);
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
                  {/* )} */}
                </tbody>
              </table>
            </div>

            {pagination && (
              <>
                <TablePagination
                  pagination={pagination}
                  dataLen={data?.length || 0}
                  loadData={() => {}}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryListPage;
