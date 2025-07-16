import { Component } from 'react';

import type { Character } from './types/types.ts';

import { fetchCharacters } from './api/characters-api';
import { Header } from './components/Header/Header.tsx';
import { Loader } from './components/Loader/Loader.tsx';
import { Main } from './components/Main/Main.tsx';
import { LS_KEY } from './constants/constants.ts';

type AppProps = object;

type AppState = {
  error: null | string;
  hasError: boolean;
  isLoading: boolean;
  results: Character[];
  searchTerm: string;
  shouldThrow: boolean;
};

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      error: null,
      hasError: false,
      isLoading: false,
      results: [],
      searchTerm: localStorage.getItem(LS_KEY) || '',
      shouldThrow: false,
    };
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

      this.setState({ error: errorMessage, hasError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChange = (value: string) => {
    this.setState({ searchTerm: value });
  };

  handleSearch = () => {
    const searchTerm = this.state.searchTerm.trim();
    localStorage.setItem(LS_KEY, searchTerm);
    this.fetchAndSetCharacters(searchTerm);
  };

  render() {
    return (
      <div className={'flex flex-col items-center gap-10'}>
        <Header
          onChange={this.handleChange}
          onSearch={this.handleSearch}
          value={this.state.searchTerm}
        />
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading && this.state.hasError && (
          <p
            className={
              'text-red-500 font-bold text-2xl flex items-center min-h-80'
            }
          >
            {this.state.error}
          </p>
        )}
        {!this.state.isLoading && !this.state.hasError && (
          <Main
            data={this.state.results}
            onRequestError={this.triggerError}
            shouldThrow={this.state.shouldThrow}
          />
        )}
      </div>
    );
  }

  triggerError = () => {
    this.setState({ shouldThrow: true });
  };
}
