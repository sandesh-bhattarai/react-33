export const FormSubmitButtons = ({loading = false,resetButtonTxt="Cancel",showCancelBtn=false, submitButtonTxt="Register"}) => {
    return (<>
        <div className="flex">
            <button disabled={loading} type="submit" className="flex me-3 disabled:cursor-not-allowed disabled:hover:bg-teal-400 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                {submitButtonTxt}
            </button>
            {
                showCancelBtn ? <>
                    <button disabled={loading} type="reset" className="flex disabled:cursor-not-allowed disabled:hover:bg-red-400 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        {resetButtonTxt}
                    </button>
                    </> : <></>

            }

        </div>
    </>)
}