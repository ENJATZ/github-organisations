import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import HC, { ORGANISATIONS, HomePageContainer, encodeCursor } from './HomePageContainer.tsx';
import OrganisationData from '../../../mocks/OrganizationsResponse.data.json';

const mocks = [
  {
    request: {
      query: ORGANISATIONS,
      variables: {
        first: 50,
        after: encodeCursor(1, 50),
      },
    },
    result: {
      data: {
        organizations: OrganisationData,
      },
    },
  },
];

describe('HomePageContainer', () => {
  it('matches the snapshot', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <HomePageContainer render={() => <div />} renderLoading={() => <div>Loading..</div>} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('encode the cursor to base64', async () => {
    const res = encodeCursor(1, 50);
    expect(res).toBe('Y3Vyc29yOjA=');
  });
  it('displays error on wrong query', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <HomePageContainer
          render={(args) => {
            return <div>{args.userCount}</div>;
          }}
          renderLoading={() => <div>Loading..</div>}
        />
      </MockedProvider>
    );
    await waitFor(() => new Promise((res) => setTimeout(res, 100)));

    expect(container.textContent).toBe('Error :(');
  });
});
