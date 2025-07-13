import { Header } from './components/Header.tsx';
import { Main } from './components/Main.tsx';
import { Component } from 'react';
import { fetchCharacters } from './api/characters-api.ts';
import type { Character } from './types/types.ts';

type AppState = {
  searchTerm: string;
  isLoading: boolean;
  results: Character[];
};

type AppProps = {};

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      isLoading: false,
      results: [],
    };
  }

  async componentDidMount() {
    await this.fetchAndSetCharacters(this.state.searchTerm);
  }

  fetchAndSetCharacters = async (searchTerm: string) => {
    this.setState({ isLoading: true });
    try {
      const data = await fetchCharacters(searchTerm);
      console.log(data);
      this.setState({ results: data ?? [] });
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChange = (value: string) => {
    this.setState({ searchTerm: value.trim() });
  };

  handleSearch = () => {
    localStorage.setItem('searchTerm', this.state.searchTerm);
    this.fetchAndSetCharacters(this.state.searchTerm);
  };

  render() {
    return (
      <div className={'flex flex-col items-center gap-20'}>
        <Header
          value={this.state.searchTerm}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
        />
        <Main data={this.state.results} />
      </div>
    );
  }
}
