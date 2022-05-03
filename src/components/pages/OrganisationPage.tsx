import React from 'react';
import { useParams } from 'react-router-dom';
import { OrganisationPageContainer } from '../organisms/Organisation/logic/OrganisationPageContainer.tsx';
import { Organisation } from '../organisms/Organisation/ui/Organisation.tsx';

export const OrganisationPage = () => {
  let { login } = useParams();
  return (
    <OrganisationPageContainer
      organisationName={login}
      render={(args) => <Organisation {...args} />}
      renderLoading={() => <Organisation.Skeleton />}
    />
  );
};
