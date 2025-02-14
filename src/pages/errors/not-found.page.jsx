import { NavLink } from "react-router-dom";

const NotFoundPage = ({ link = "/", text = "Go Back" }) => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 my-5">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-950 dark:text-primary-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <NavLink
              to={link}
              className="inline-flex text-white bg-red-900 hover:bg-red-950 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >
              {text}
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
