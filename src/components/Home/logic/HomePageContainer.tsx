import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import {
  CONSTANTS,
  useAppContext,
} from '../../organisms/AppContextProvider/AppContextProvider.tsx';

export const ORGANISATIONS = gql`
  query getOrganisations($pageSize: Int, $after: String) {
    search(query: "is:public type:org", type: USER, first: $pageSize, after: $after) {
      userCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Organization {
            login
            url
            avatarUrl
          }
        }
      }
    }
  }
`;

export const encodeCursor = (page, pageSize) => {
  const encoded = `cursor:${(page - 1) * pageSize}`;
  return btoa(unescape(encodeURIComponent(encoded)));
};

export const HomePageContainer = ({ render, renderLoading }: IHomePageContainer) => {
  const { state, dispatch } = useAppContext();
  const { pageNumber, pageSize, checkedList } = state;

  const { loading, error, data } = useQuery(ORGANISATIONS, {
    variables: { pageSize: state.pageSize, after: encodeCursor(state?.pageNumber, state.pageSize) },
  });

  const onPageSizeChange = (value: number) => {
    dispatch({ type: CONSTANTS.CHANGE_PAGE_SIZE, pageSize: value });
  };

  const onPageChange = (value: number) => {
    dispatch({ type: CONSTANTS.CHANGE_PAGE_NUMBER, pageNumber: value });
  };

  if (loading) return renderLoading();
  if (error || !data) return <p>Error :(</p>;

  return render({
    data: data?.search,
    onPageSizeChange,
    onPageChange,
    pageNumber,
    pageSize,
    checkedList,
  });
};

interface IHomePageContainer {
  render: (args: IHome) => JSX.Element;
  renderLoading: () => JSX.Element;
}

export interface IHome {
  checkedList: object;
  data: any;
  onPageChange: (value: number) => void;
  onPageSizeChange: (value: number) => void;
  pageNumber: number;
  pageSize: number;
}
