import { useCallback, useReducer } from 'react';

const initialState = {
  loading: false,
  error: null,
  identifier: null,
  data: null,
  extra: null,
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND': {
      return {
        loading: true,
        error: null,
        identifier: action.identifier,
        extra: null,
        data: null,
      };
    }
    case 'RESPONSE': {
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    }
    case 'ERROR': {
      return { loading: false, error: action.errorMessage };
    }
    case 'CLEAR': {
      return { initialState };
    }
    default:
      throw new Error('should not get there');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = () => {
    dispatchHttp({ type: 'CLEAR' });
  };

  const sendRequest = useCallback(
    (url, method, body, reqExtra, reqIdentifier) => {
      dispatchHttp({ type: 'SEND', identifier: reqIdentifier });
      fetch(url, {
        method: method,
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          dispatchHttp({
            type: 'RESPONSE',
            extra: reqExtra,
            responseData: responseData,
          });
        })
        .catch(error => {
          dispatchHttp({
            type: 'ERROR',
            errorMessage: 'Something went wrong!',
          });
        });
    },

    []
  );

  return {
    isLoading: httpState.loading,
    error: httpState.error,
    data: httpState.data,
    clear: clear,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
  };
};

export default useHttp;
