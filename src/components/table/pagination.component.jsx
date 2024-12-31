import { PreviousIcon, NextIcon } from "../icons/icons.component"
const TablePagination = ({
    pagination, 
    loadData,
    dataLen
}) => {
    return (<>
        <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
            >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 px-1 dark:text-white">
                {
                    pagination.page === 1 ? 1 : (
                    ((pagination.page - 1) * pagination.limit + 1 )
                    )
                }
                - 
                {
                    pagination.page === 1 && pagination.page === pagination.toNoOfPages ? dataLen : (
                    pagination.page === pagination.toNoOfPages ? pagination.total : (pagination.page * pagination.limit)
                    )
                }
                </span>
                of
                <span className="font-semibold text-gray-900 px-1 dark:text-white">
                {pagination.total}
                </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
                {
                pagination.page !== 1 ? <li>
                    <a
                        href="#"
                        onClick={(e) => {
                        e.preventDefault()
                        loadData({page: pagination.page - 1})
                        }}
                        className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Previous</span>
                        <PreviousIcon />
                    </a> </li>: <></>
                }
                
                {
                    [...Array(pagination.toNoOfPages)].map((_,i) => (
                    <li key={i}>
                        <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            loadData({page: i+1})
                        }}
                        className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                        {i+1}
                        </a>
                    </li>
                    ))
                }
                {
                pagination.toNoOfPages === pagination.page ? <></> : <li>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        loadData({page: pagination.page + 1})
                    }}
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <span className="sr-only">Next</span>
                    <NextIcon />
                </a>
                </li>
                }
            </ul>
            </nav>
    </>)
}
export default TablePagination;