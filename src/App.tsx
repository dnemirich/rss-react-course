import { Header } from './components/Header.tsx';
import { Main } from './components/Main.tsx';
import { Component } from 'react';
import { fetchCharacters } from './api/characters-api.ts';
import type { Character } from './types/types.ts';
import { Loader } from './components/Loader.tsx';

type AppState = {
  searchTerm: string;
  isLoading: boolean;
  results: Character[];
  shouldThrow: boolean;
  hasError: boolean;
  error: string | null;
};

type AppProps = {};

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('dnemirich-searchTerm') || '',
      isLoading: false,
      results: [],
      shouldThrow: false,
      hasError: false,
      error: null
    };
  }

  triggerError = () => {
    this.setState({shouldThrow: true})
  }

  async componentDidMount() {
    await this.fetchAndSetCharacters(this.state.searchTerm);
  }

  fetchAndSetCharacters = async (searchTerm: string) => {
    this.setState({ isLoading: true });
    try {
      const data = await fetchCharacters(searchTerm);
      this.setState({ results: data ?? [] });
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }

      this.setState({ hasError: true, error: errorMessage });

    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChange = (value: string) => {
    this.setState({ searchTerm: value.trim() });
  };

  handleSearch = () => {
    localStorage.setItem('dnemirich-searchTerm', this.state.searchTerm);
    this.fetchAndSetCharacters(this.state.searchTerm);
  };

  render() {
    return (
      <div className={'flex flex-col items-center gap-10'}>
        <Header
          value={this.state.searchTerm}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
        />
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading && this.state.hasError && <p className={'text-red-500 font-bold text-2xl flex items-center min-h-80'}>{this.state.error}</p>}
        {!this.state.isLoading && !this.state.hasError &&
          <Main
            data={this.state.results}
            shouldThrow={this.state.shouldThrow}
            onRequestError={this.triggerError}
          />
        }
      </div>
    );
  }
}
