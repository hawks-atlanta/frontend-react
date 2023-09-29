interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export function Pagination({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage
}: PaginationProps) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex flex-wrap gap-1">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`rounded-lg border px-1 py-1 font-bold text-black hover:bg-blue-700 ${
              page == currentPage ? "bg-blue-500" : "bg-white-500"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
