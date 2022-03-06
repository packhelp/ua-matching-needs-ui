import ReactPaginate from "react-paginate"
import React, { useCallback } from "react"
import { useRouter } from "next/router"
import { Ticket } from "../../utils/types"

type PaginationProps = {
  ticketsData?: {
    tickets: Ticket[]
    meta: {
      filter_count: number
      page_count: number
    }
  }
  selectedPage: number
}

export const Pagination = (props: PaginationProps) => {
  const { ticketsData, selectedPage } = props
  const router = useRouter()

  const onPageClick = useCallback(
    (page: number) => {
      router.query.page = page.toString()
      router.push(router)
    },
    [router]
  )

  if (!ticketsData) {
    return <></>
  }

  return (
    <div className="flex justify-center mt-5">
      <ReactPaginate
        breakLabel="..."
        previousLabel={
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        }
        nextLabel={
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        }
        forcePage={selectedPage - 1}
        onPageChange={(page) => onPageClick(page.selected + 1)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={ticketsData.meta.page_count}
        containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        breakLinkClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        pageLinkClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        activeLinkClassName="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        previousLinkClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        nextLinkClassName="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      />
    </div>
  )
}
