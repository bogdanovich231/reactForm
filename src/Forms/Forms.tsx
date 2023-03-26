import React, { useState, useEffect } from "react";
import axios from "axios";

function Forms() {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [checkboxes, setCheckboxes] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [cards, setCards] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckboxes([...checkboxes, value]);
    } else {
      setCheckboxes(checkboxes.filter((item) => item !== value));
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !text ||
      !date ||
      !selectedOption ||
      !file ||
      !selectedCountry ||
      checkboxes.length === 0 ||
      (selectedCountry && !selectedCountry.trim())
    ) {
      alert("Please fill in all fields.");
      return;
    } else {
      alert("Data successfully saved.");
    }

    const newCard = {
      text,
      date,
      selectedOption,
      checkboxes,
      file,
    };

    setCards([...cards, newCard]);
    setText("");
    setDate("");
    setSelectedOption("");
    setCheckboxes([]);
    setFile(null);
  };
  return (
    <section>
      <div className="form">
        <h1>Fill out your information</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputName">
            <label>
              Name:
              <input type="text" value={text} onChange={handleTextChange} />
            </label>
          </div>
          <div className="inputDate">
            <label>
              Your birthday:
              <input type="date" value={date} onChange={handleDateChange} />
            </label>
          </div>
          <div className="inputSex">
            <p>Sex:</p>
            <div className="inputSexLabel">
              <div>
                <label>
                  <input
                    type="radio"
                    value="Male"
                    checked={selectedOption === "Male"}
                    onChange={handleOptionChange}
                  />
                  Male
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    checked={selectedOption === "Female"}
                    onChange={handleOptionChange}
                  />
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="selectCountry">
            <label className="country-select" htmlFor="country-select">
              Select a country:
            </label>
            <select
              id="country-select"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Choose a country</option>
              {countries.map((country) => (
                <option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>
          <div className="inputPersonal">
            <p>I consent to my personal data</p>
            <label>
              <input
                type="checkbox"
                name="checkbox"
                value="Yes"
                checked={checkboxes.includes("Yes")}
                onChange={handleCheckboxChange}
              />
              Yes
            </label>
            <label>
              <input
                type="checkbox"
                name="checkbox"
                value="No"
                checked={checkboxes.includes("No")}
                onChange={handleCheckboxChange}
              />
              No
            </label>
          </div>
          <div className="inputFile">
            <label>
              Profile photo:
              <input type="file" onChange={handleFileChange} />
            </label>
          </div>
          <div className="submit">
            <button type="submit">Отправить</button>
          </div>
        </form>
      </div>
      <div>
        {cards.length > 0 ? (
          <div>
            <h2>Information cards</h2>
            {cards.map((card, index) => (
              <div className="card" key={index}>
                <h3>Card {index + 1}</h3>
                <div className="card_info">
                  <p>Name: {card.text}</p>
                  <p>Your birthday: {card.date}</p>
                  <p>Sex: {card.selectedOption}</p>
                  <p>I consent to my personal data: {card.checkboxes}</p>
                  {selectedCountry && (
                    <div>
                      <p>
                        Country: {countries.find(country => country.name.common === selectedCountry).name.common}
                      </p>
                    </div>
                  )}
                  {card.file && (
                    <div>
                      <h4>Profile photo:</h4>
                      <img
                        src={URL.createObjectURL(card.file)}
                        alt="profile"
                        style={{ width: "250px" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2>Information cards</h2>
            <p>No data to display.</p>
          </div>
        )}
      </div>
    </section>
  );
}
export default Forms;
