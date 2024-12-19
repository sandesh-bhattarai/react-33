export const FormSubmitButtons = ({loading = false}) => {
    return (<>
        <button disabled={loading} type="submit" className="disabled:cursor-not-allowed disabled:hover:bg-teal-400 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Register</button>
    </>)
}