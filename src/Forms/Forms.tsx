import React, { Component } from 'react';
import axios from 'axios';
import { Country } from '../types';

interface IState {
  text: string;
  date: string;
  checkboxes: string[];
  selectedOption: string | undefined;
  file: File | null;
  cards: Array<
    | {
        title: string;
        description: string;
      }
    | {
        text: string;
        date: string;
        selectedOption: string | undefined;
        checkboxes: string[];
        file: File | null;
      }
  >;
  countries: Country[];
  selectedCountry: string;
}
interface ICard {
  title?: string;
  description?: string;
  text?: string;
  date?: string;
  selectedOption?: string;
  checkboxes?: string[];
  file?: File | null;
}
interface IProps {
  onSubmit: (card: ICard) => void;
  card: ICard;
}
export default class Forms extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      text: '',
      date: '',
      checkboxes: [], // инициализируем пустым массивом
      selectedOption: '',
      file: null,
      cards: [],
      countries: [],
      selectedCountry: '',
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get<Country[]>('https://restcountries.com/v3.1/all')
      .then((response) => {
        this.setState({ countries: response.data });
      })
      .catch((error) => console.log(error));
  }

  handleOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ selectedOption: event.target.value });
  }

  handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value });
  }

  handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ date: event.target.value });
  }

  handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length) {
      this.setState({ file: event.target.files[0] });
    } else {
      this.setState({ file: null });
    }
  }

  handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const isChecked = event.target.checked;
    const { checkboxes } = this.state;
    if (isChecked) {
      this.setState({ checkboxes: [...checkboxes, value] });
    } else {
      this.setState({
        checkboxes: checkboxes.filter((item) => item !== value),
      });
    }
  }

  handleCountryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ selectedCountry: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { text, date, selectedOption, file, selectedCountry, checkboxes, cards } = this.state;
    if (
      !text ||
      !date ||
      !selectedOption ||
      !file ||
      !selectedCountry ||
      checkboxes.length === 0 ||
      (selectedCountry && !selectedCountry.trim())
    ) {
      window.alert('Please fill in all fields');
      return;
    } else {
      window.alert('Data successfully saved.');
    }
    const newCard = {
      text,
      date,
      selectedOption,
      checkboxes,
      file,
      selectedCountry,
    };
    this.setState({
      cards: [...cards, newCard],
      text: '',
      date: '',
      selectedOption: '',
      checkboxes: [],
      file: null,
      selectedCountry: '',
    });
  }

  render() {
    const { text, date, checkboxes, selectedOption, cards, countries, selectedCountry } =
      this.state;

    return (
      <section>
        <div className="form">
          <h1>Fill out your information</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="inputName">
              <label>
                Name:
                <input type="text" value={text} onChange={this.handleTextChange} />
              </label>
            </div>
            <div className="inputDate">
              <label>
                Your birthday:
                <input type="date" value={date} onChange={this.handleDateChange} />
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
                      checked={selectedOption === 'Male'}
                      onChange={this.handleOptionChange}
                    />
                    Male
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Female"
                      checked={selectedOption === 'Female'}
                      onChange={this.handleOptionChange}
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
                onChange={this.handleCountryChange}
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
                  defaultChecked={checkboxes.includes('Yes')}
                  onChange={this.handleCheckboxChange}
                />
                Yes
              </label>
            </div>
            <div className="inputFile">
              <label>
                Profile photo:
                <input type="file" onChange={this.handleFileChange} />
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
                    {'text' in card && <p>Name: {card.text}</p>}
                    {'date' in card && <p>Your birthday: {card.date}</p>}
                    {'selectedOption' in card && <p>Sex: {card.selectedOption}</p>}
                    {'selectedCountry' && <p>Country: {selectedCountry}</p>}
                    {'checkboxes' in card && (
                      <p>I consent to my personal data: {card.checkboxes?.join(', ')}</p>
                    )}
                    {'file' in card && card.file && (
                      <img className="img" src={URL.createObjectURL(card.file)} alt="file" />
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
}
