import React from 'react';
import { renderWithReduxAndStyles } from '../../../utils/utils';
import NetworkStatusSingle from './NetworkStatusSingle';
import { SUCCESS } from '../../../store/actions/network/network.constants';

describe('Test NetworkStatusSingle component', () => {
  it('should render correctly', () => {
    const networkTitleText = 'test network title text';
    const { container, getByText, getByAltText } = renderWithReduxAndStyles(
      <NetworkStatusSingle
        networkStatus="test"
        networkTitle={networkTitleText}
      />
    );

    const loader = getByAltText('loader');

    expect(loader.src).toContain('loader.svg');
    expect(getByText(networkTitleText)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly when network status is success', () => {
    const networkTitleText = 'test network title text';
    const { container, getByText, getByAltText } = renderWithReduxAndStyles(
      <NetworkStatusSingle
        networkStatus={SUCCESS}
        networkTitle={networkTitleText}
      />
    );

    const loader = getByAltText('loader');

    expect(loader.src).toContain('success.svg');
    expect(getByText(networkTitleText)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
