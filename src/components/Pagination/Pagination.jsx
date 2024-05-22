import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_PAGE_BUTTONS = 5;
  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Попередня
        </button>
      )}

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      ).map((page) => (
        <button
          key={page}
          className={`${styles.pageButton} ${
            page === currentPage ? styles.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Наступна
        </button>
      )}
    </div>
  );
};

export default Pagination;
