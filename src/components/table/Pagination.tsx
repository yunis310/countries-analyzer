interface Props {
    total: number;
    currentPage: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (size: number) => void;
}

const Pagination = ({
    total,
    currentPage,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
}: Props) => {
    const totalPages = Math.ceil(total / rowsPerPage);

    return (
        <div className="pagination">
            <div className="pagination-controls">
                <label>
                    Rows per page:
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            onRowsPerPageChange(Number(e.target.value));
                            onPageChange(1); // Reset to first page on size change
                        }}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </label>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <div>
                    <button
                        onClick={() =>
                            onPageChange(Math.max(currentPage - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        ◀ Prev
                    </button>
                    <button
                        onClick={() =>
                            onPageChange(Math.min(currentPage + 1, totalPages))
                        }
                        disabled={currentPage >= totalPages}
                    >
                        Next ▶
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
