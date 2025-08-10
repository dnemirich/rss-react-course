import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const isFetchBaseQueryError = (err: unknown): err is FetchBaseQueryError => {
  return typeof err === 'object' && err !== null && 'status' in err;
};

const isSerializedError = (err: unknown): err is SerializedError => {
  return typeof err === 'object' && err !== null && 'message' in err;
};

export const handleError = (
  error: FetchBaseQueryError | SerializedError | unknown
): string => {
  if (isFetchBaseQueryError(error)) {
    const { status } = error;

    if (typeof status === 'number') {
      return `Request failed with status ${status}`;
    }

    if (status === 'FETCH_ERROR') return 'Network error';
    if (status === 'PARSING_ERROR') return 'Response parsing error';
    if (status === 'TIMEOUT_ERROR') return 'Request timeout';
    if (status === 'CUSTOM_ERROR') return 'Request error';

    return 'Unknown request error';
  }

  if (isSerializedError(error)) {
    return error.message || 'Unknown error';
  }

  if (typeof error === 'string') return error;

  return '';
};
