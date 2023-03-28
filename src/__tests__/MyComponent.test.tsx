import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Forms from '../Forms/Forms';

describe('Forms component', () => {
  it('should render without errors', () => {
    const { getByTestId } = render(<Forms onSubmit={jest.fn()} card={{}} />);
    expect(getByTestId('form')).toBeInTheDocument();
  });

  it('should update state on option change', () => {
    const { getByLabelText } = render(<Forms onSubmit={jest.fn()} card={{}} />);
    const radioBtn = getByLabelText('Option 1');
    fireEvent.change(radioBtn, { target: { value: 'option1' } });
    expect(radioBtn).toBeChecked();
  });

  it('should update state on text change', () => {
    const { getByLabelText } = render(<Forms onSubmit={jest.fn()} card={{}} />);
    const input = getByLabelText('Text Input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  it('should update state on date change', () => {
    const { getByLabelText } = render(<Forms onSubmit={jest.fn()} card={{}} />);
    const input = getByLabelText('Date Input');
    fireEvent.change(input, { target: { value: '2022-01-01' } });
    expect(input).toHaveValue('2022-01-01');
  });

  it('should update state on file change', () => {
    const { container } = render(<Forms onSubmit={jest.fn()} card={{}} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, {
      target: { files: [new File(['(⌐□_□)'], 'test.png', { type: 'image/png' })] },
    });
    expect(input.files![0].name).toBe('test.png');
  });

  it('should update state on checkbox change', () => {
    const { getByLabelText } = render(<Forms onSubmit={jest.fn()} card={{}} />);
    const checkbox1 = getByLabelText('Checkbox 1');
    const checkbox2 = getByLabelText('Checkbox 2');
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
  });

  it('should update state on country change', () => {
    const { getByLabelText } = render(<Forms onSubmit={jest.fn()} card={{}} />);
    const select = getByLabelText('Country Select');
    fireEvent.change(select, { target: { value: 'US' } });
    expect(select).toHaveValue('US');
  });

  it('should submit form when all fields are filled', () => {
    const { getByLabelText, getByText } = render(<Forms onSubmit={jest.fn()} card={{}} />);
    const input = getByLabelText('Text Input');
    const select = getByLabelText('Country Select');
    const checkbox1 = getByLabelText('Checkbox 1');
    const submitBtn = getByText('Submit');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(select, { target: { value: 'US' } });
    fireEvent.click(checkbox1);
    fireEvent.click(submitBtn);
  });
});
