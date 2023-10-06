import { render, screen } from '@testing-library/react';
import LabelChart from "./LabelChart";

test('renders learn react link', () => {
  render(<LabelChart />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
