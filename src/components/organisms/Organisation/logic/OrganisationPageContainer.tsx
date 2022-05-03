import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { CONSTANTS, useAppContext } from '../../AppContextProvider/AppContextProvider.tsx';

export const OrganisationPageContainer = ({
  render,
  renderLoading,
  organisationName,
}: IOrganisationPageContainer) => {
  const { state, dispatch } = useAppContext();

  const onCheck = (orgLogin) => {
    dispatch({ type: CONSTANTS.TOGGLE_CHECKED_ITEM, orgLogin });
  };

  const ORGANISATION = gql`
    query getOrganization($login: String!) {
      organization(login: $login) {
        login
        createdAt
        avatarUrl
        description
        websiteUrl
        repositories(first: 100) {
          edges {
            cursor
            node {
              id
              description
              name
              nameWithOwner
            }
          }
          totalCount
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(ORGANISATION, {
    variables: { login: organisationName },
  });

  if (loading) return renderLoading();
  if (error || !data) return <p>Error :(</p>;
  return render({ data: data?.organization, checkedList: state.checkedList, onCheck });
};

interface IOrganisationPageContainer {
  organisationName: string;
  render: (args: IOrganisation) => JSX.Element;
  renderLoading: () => JSX.Element;
}

export interface IOrganisation {
  checkedList: object;
  data: any;
  onCheck: (value: string) => void;
}
