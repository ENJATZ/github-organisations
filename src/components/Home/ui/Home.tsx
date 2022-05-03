import React from 'react';
import { Button } from '../../atoms/Button/Button.tsx';
import { OrganisationItem } from '../../molecules/OrganisationItem/OrganisationItem.tsx';
import { Pagination } from '../../molecules/Pagination/Pagination.tsx';
import { IHome } from '../logic/HomePageContainer.tsx';

export const Home = ({
  data,
  pageNumber,
  pageSize,
  onPageSizeChange,
  onPageChange,
  checkedList,
}: IHome) => {
  const { edges: organisations, userCount: count } = data;
  const pageSizeOptions: IPageSizeOptions[] = [
    {
      value: 50,
      active: pageSize === 50,
    },
    {
      value: 100,
      active: pageSize === 100,
    },
  ];

  return (
    <div className="p-10">
      <div className="flex justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold mb-5">All organisations found</h2>
          <span className="text-sm" data-testid="total-count">
            Showing items {+((pageNumber - 1) * pageSize) + 1} - {pageNumber * pageSize} out of{' '}
            {count.toLocaleString('en-US') ?? 0}
          </span>
        </div>
        <div className="space-x-1">
          Items per page:
          {pageSizeOptions.map((pageSize: IPageSizeOptions) => (
            <Button
              key={pageSize.value}
              size="small"
              variant={`${pageSize.active ? 'primary' : 'secondary'}`}
              onClick={() => onPageSizeChange(pageSize.value)}
            >
              {pageSize.value}
            </Button>
          ))}
        </div>
      </div>
      {organisations.map((org: any, index: number) => (
        <OrganisationItem key={`${index}-${checkedList[org?.node.login]}`} info={org} />
      ))}
      <Pagination
        count={count}
        pageSize={pageSize}
        currentPage={pageNumber}
        onPageChange={onPageChange}
      />
    </div>
  );
};

Home.Skeleton = () => {
  return <div className="p-10">Loading..</div>;
};

interface IPageSizeOptions {
  value: number;
  active: boolean;
}
