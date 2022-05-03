import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import OrganisationData from '../../../mocks/OrganizationsResponse.data.json';
import { Home } from './Home.tsx';

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

describe('all organization component (Home)', () => {
  it('shows the formatted totalCount number', () => {
    render(
      <Home data={OrganisationData.search} pageNumber={1} pageSize={50} checkedList={{}} />,
      container
    );
    const formattedTotalCount = screen.queryByTestId('total-count');
    expect(formattedTotalCount).toHaveTextContent('4,493,504');
  });
  it('renders the skeleton', () => {
    render(<Home.Skeleton />, container);
    const loadingText = screen.getByText('Loading..');
    expect(loadingText).toBeInTheDocument();
  });
});
