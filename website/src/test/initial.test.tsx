import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Simple dummy component for testing setup
const Dummy = () => <div>ServiceCore</div>;

describe('Initial Setup Test', () => {
  it('should render correctly', () => {
    render(<Dummy />);
    expect(screen.getByText('ServiceCore')).toBeDefined();
  });
});
