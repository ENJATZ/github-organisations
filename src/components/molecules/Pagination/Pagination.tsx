import React from 'react';
import { Button } from '../../atoms/Button/Button.tsx';

export const Pagination = ({
  count,
  pageSize,
  currentPage,
  onPageChange,
}: IPagination): JSX.Element => {
  const PAGES_TO_SHOW = 6;

  const getPagesToShow = () => {
    let start = Math.ceil((((currentPage - 1) / PAGES_TO_SHOW) * PAGES_TO_SHOW) / 2);
    return new Array(PAGES_TO_SHOW).fill().map((_, index) => start + index + 1);
  };

  const changePage = (page: number) => {
    onPageChange(page);
  };
  return (
    <div className="flex justify-center space-x-1">
      <Button onClick={() => changePage(currentPage - 1)}>«</Button>
      {getPagesToShow().map((item, index) => (
        <Button
          key={index}
          variant={`${currentPage === item ? 'primary' : 'secondary'}`}
          onClick={() => changePage(item)}
        >
          <span>{item}</span>
        </Button>
      ))}

      <Button onClick={() => changePage(currentPage + 1)}>»</Button>
    </div>
  );
};

interface IPagination {
  count: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
