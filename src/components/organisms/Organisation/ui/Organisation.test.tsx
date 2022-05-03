import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import OrganisationData from '../../../../mocks/OrganizationsResponse.data.json';
import { Organisation } from './Organisation.tsx';

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

describe('renders learn react link', () => {
  it('renders the first element of the organization data', () => {
    render(<Organisation data={OrganisationData.search.edges[0].node} />, container);
    const loginName = screen.queryByTestId('login');
    expect(loginName.textContent).toBe('mueller-tech');
  });
});
