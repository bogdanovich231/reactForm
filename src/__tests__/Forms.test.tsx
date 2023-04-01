import Forms from '../Components/Forms';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("Forms component", () => {
  it("should render the form correctly", () => {
    render(<Forms />);
    const nameInput = screen.getByLabelText("Name:");
    expect(nameInput).toBeVisible();
    const dateInput = screen.getByLabelText("Your birthday:");
    expect(dateInput).toBeVisible();
    const maleRadio = screen.getByLabelText("Male");
    expect(maleRadio).toBeVisible();
    const femaleRadio = screen.getByLabelText("Female");
    expect(femaleRadio).toBeVisible();
    const countrySelect = screen.getByLabelText("Select a country:");
    expect(countrySelect).toBeVisible();
    const checkbox = screen.getByLabelText("Yes");
    expect(checkbox).toBeVisible();
    const fileInput = screen.getByLabelText("Profile photo:");
    expect(fileInput).toBeVisible();
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeVisible();
  });

  it("should alert if any field is missing", async () => {
    const spy = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<Forms />);
    const submitButton = await screen.findByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);
    expect(spy).toHaveBeenCalledWith("Please fill in all fields.");
    spy.mockRestore();
  });
  it('should render correctly', () => {
    render(<Forms />);
    const headerElement = screen.getByText(/Fill out your information/i);
    expect(headerElement).toBeInTheDocument();
  });
  it('should update state on file change', () => {
    const { container } = render(<Forms />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files?.[0]).toBe(file);
  });
  it('should update selectedOption on radio button change', () => {
    render(<Forms />);
    const maleRadioBtn = screen.getByLabelText('Male') as HTMLInputElement;
    const femaleRadioBtn = screen.getByLabelText('Female') as HTMLInputElement;
    fireEvent.click(femaleRadioBtn);
    expect(maleRadioBtn.checked).toBeFalsy();
    expect(femaleRadioBtn.checked).toBeTruthy();
  });
  it('should update state on text change', () => {
    const { getByLabelText } = render(<Forms />);
    const input = getByLabelText('Name:');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });
  
  it('should update state on date change', () => {
    const { getByLabelText } = render(<Forms />);
    const input = getByLabelText('Your birthday:');
    fireEvent.change(input, { target: { value: '2022-01-01' } });
    expect(input).toHaveValue('2022-01-01');
  });
  
  it('should update the consent checkbox value correctly', () => {
    const { getByLabelText } = render(<Forms />);
    const consentCheckbox = getByLabelText('Yes');
    fireEvent.click(consentCheckbox);
    expect(consentCheckbox).toBeChecked();
});

  it('should render "Choose a country" option in the country select input', () => {
    const { getByLabelText } = render(<Forms />);
    const countrySelect = getByLabelText('Select a country:');
    expect(countrySelect).toContainHTML('<option value="">Choose a country</option>');
});

  });

