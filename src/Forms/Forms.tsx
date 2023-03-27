interface FormsState {
  checkboxes: string[];
  text: string;
  date: string;
  selectedOption: string;
  file: string;
  cards: any[]; // Replace "any" with the type of the "cards" array
  countries: any[]; // Replace "any" with the type of the "countries" array
  selectedCountry: string;
}

class Forms extends React.Component<FormsProps, FormsState> {
  constructor(props: FormsProps) {
    super(props);
    this.state = {
      checkboxes: [],
      text: "",
      date: "",
      selectedOption: "",
      file: "",
      cards: [], // Initialize the "cards" array to an empty array
      countries: [], // Initialize the "countries" array to an empty array
      selectedCountry: "",
    };
  }

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const { checkboxes } = this.state;
    this.setState({
      checkboxes: checked
        ? [...checkboxes, value]
        : checkboxes.filter((item: string) => item !== value), // Define the type of the "item" parameter as a string
    });
  };

  handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: event.target.value });
  };

  handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ date: event.target.value });
  };

  handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedOption: event.target.value });
  };

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      this.setState({ file: file.name });
    }
  };

  handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedCountry: event.target.value });
  };

  handleAddCard = () => {
    const { text, date, checkboxes, file, selectedOption } = this.state;
    const newCard = {
      text,
      date,
      checkboxes,
      file,
      selectedOption,
    };
    this.setState((prevState) => ({
      cards: [...prevState.cards, newCard],
      text: "",
      date: "",
      checkboxes: [],
      file: "",
      selectedOption: "",
    }));
  };
