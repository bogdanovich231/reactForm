import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Forms from '../Forms/Forms';
import '@testing-library/jest-dom';

describe('Forms component', () => {
  it('should update selectedOption on radio button change', () => {
    render(<Forms onSubmit={jest.fn()} card={{}} />);
    const maleRadioBtn = screen.getByLabelText('Male') as HTMLInputElement;
    const femaleRadioBtn = screen.getByLabelText('Female') as HTMLInputElement;
    fireEvent.click(femaleRadioBtn);
    expect(maleRadioBtn.checked).toBeFalsy();
    expect(femaleRadioBtn.checked).toBeTruthy();
  });

  it('should update state on text change', () => {
    const { getByLabelText } = render(<Forms onSubmit={jest.fn()} card={{}} />);
    const input = getByLabelText('Name:');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  it('should update state on date change', () => {
    const { getByLabelText } = render(<Forms onSubmit={jest.fn()} card={{}} />);
    const input = getByLabelText('Your birthday:');
    fireEvent.change(input, { target: { value: '2022-01-01' } });
    expect(input).toHaveValue('2022-01-01');
  });

  it('should update state on file change', () => {
    const { container } = render(<Forms onSubmit={jest.fn()} card={{}} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files?.[0]).toBe(file);
  });
});
