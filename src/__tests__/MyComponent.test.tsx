import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Forms from "../Forms/Forms";

describe("Forms", () => {
  test("should submit form and save data", () => {
    const { getByLabelText, getByText } = render(<Forms />);

    const nameInput = getByLabelText("Name:");
    const dateInput = getByLabelText("Your birthday:");
    const maleRadio = getByLabelText("Male") as HTMLInputElement;
    const countrySelect = getByLabelText(
      "Select a country:"
    ) as HTMLSelectElement;
    const consentCheckboxYes = getByLabelText("Yes") as HTMLInputElement;
    const fileInput = getByLabelText("Profile photo:") as HTMLInputElement;
    const submitButton = getByText("Отправить");

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(dateInput, { target: { value: "1990-01-01" } });
    fireEvent.click(maleRadio);
    fireEvent.change(countrySelect, { target: { value: "Germany" } });
    fireEvent.click(consentCheckboxYes);
    fireEvent.change(fileInput, {
      target: {
        files: [new File([""], "example.jpg", { type: "image/jpeg" })],
      },
    });
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("Data successfully saved.");
  });

  test("should show alert if not all fields are filled", () => {
    const { getByText } = render(<Forms />);

    const submitButton = getByText("Отправить");

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields.");
  });

  test("should select a country from dropdown", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => [
        { name: { common: "Germany" } },
        { name: { common: "Russia" } },
        { name: { common: "USA" } },
      ],
    } as Response);

    const { getByLabelText, findByText } = render(<Forms />);

    const countrySelect = getByLabelText(
      "Select a country:"
    ) as HTMLSelectElement;
    fireEvent.change(countrySelect, { target: { value: "Russia" } });

    const selectedCountry = await findByText("Country: Russia");
    expect(selectedCountry).toBeInTheDocument();
  });

  test("should select multiple checkboxes", () => {
    const { getByLabelText } = render(<Forms />);

    const consentCheckboxYes = getByLabelText("Yes") as HTMLInputElement;
    const consentCheckboxNo = getByLabelText("No") as HTMLInputElement;

    fireEvent.click(consentCheckboxYes);
    fireEvent.click(consentCheckboxNo);

    expect(consentCheckboxYes).toBeChecked();
    expect(consentCheckboxNo).toBeChecked();
  });
});
