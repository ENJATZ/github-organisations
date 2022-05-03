import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import OrganisationData from '../../../mocks/OrganizationsResponse.data.json';
import { OrganisationItem } from './OrganisationItem.tsx';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('OrganisationItem', () => {
  it('renders correct avatar', () => {
    render(<OrganisationItem info={OrganisationData.search.edges[0]} />, container);
    const formattedTotalCount = screen.queryByTestId('avatar');
    expect(formattedTotalCount).toHaveAttribute(
      'src',
      OrganisationData.search.edges[0].node.avatarUrl
    );
  });
});
