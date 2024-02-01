import {
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";

interface PaginationProps {
  totalPages: number;
  totalRepos: number;
  currentPage: number;
  changePage: (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => void;
  prevPage: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  prevFirstPage: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  nextPage: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  nextLastPage: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  existNext: boolean;
  existPrev: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  totalRepos,
  currentPage,
  changePage,
  prevPage,
  prevFirstPage,
  nextPage,
  nextLastPage,
  existNext,
  existPrev,
}) => {
  const maxPageNumbersToShow = 5;
  const pageNumbers = [];

  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  if (endPage - startPage + 1 < maxPageNumbersToShow) {
    startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((page) => (
    <a
      key={page}
      onClick={(e) => changePage(e, page)}
      href="#"
      aria-current={page === currentPage ? "page" : undefined}
      className={`${
        page === currentPage ? "bg-blue-500 text-white" : "bg-gray-100"
      } border-t border-gray-200 text-black px-4 py-1 sm:px-6 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {page}
    </a>
  ));

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          onClick={prevPage}
          style={existPrev ? {} : { pointerEvents: "none", cursor: "default" }}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Anterior
        </a>
        <a
          href="#"
          onClick={nextPage}
          style={existNext ? {} : { pointerEvents: "none", cursor: "default" }}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Próximo
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">{totalRepos}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                prevFirstPage(e);
              }}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !existPrev ? "pointer-events-none cursor-default" : ""
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                prevPage(e);
              }}
              className={`relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !existPrev ? "pointer-events-none cursor-default" : ""
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {renderPageNumbers}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                nextPage(e);
              }}
              className={`relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !existNext ? "pointer-events-none cursor-default" : ""
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                nextLastPage(e);
              }}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                !existNext ? "pointer-events-none cursor-default" : ""
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
