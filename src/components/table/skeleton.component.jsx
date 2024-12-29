export const ColumnSkeleton = () => {
    return (<>
        <div role="status" className="max-w-sm animate-pulse mt-3 px-3">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        </div>
    </>)
}

export const RowSkeleton = ({rows, columns}) => {
    return( <>
       {
        [...Array(rows)].map((_, i) => (
            <tr key={i} className="border-b dark:border-gray-700">
                {
                    [...Array(columns)].map((__, j) =>(
                        <td key={j}>
                            <ColumnSkeleton />
                        </td>
                    ))
                }
            </tr>
        ))
       }
    </>)
}