import { useState } from "react";

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const [selected, setSelected] = useState<number>(currentPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          onPageChange(currentPage - 1);
          setSelected((page) => page - 1);
        }}
        disabled={currentPage === 0}
        className="disabled:text-gray-400"
      >
        Previous
      </button>
      {pages.map((_, index) => (
        <button
          key={index}
          className={`${
            selected === index
              ? " font-bold border-b border-black"
              : "font-light"
          }`}
          onClick={() => {
            onPageChange(index);
            setSelected(index);
          }}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => {
          onPageChange(currentPage + 1);
          setSelected((page) => page + 1);
        }}
        disabled={currentPage === totalPages - 1}
        className="disabled:text-gray-400"
      >
        Next
      </button>
    </div>
  );
}
