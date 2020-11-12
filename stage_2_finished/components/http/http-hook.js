import { useCallback, useReducer } from 'react';

const initialState = {
  error: null,
  loading: false,
  data: null,
  reqData: null,
  typeOfReq: null,
};

const httpStateReducer = (currentState, action) => {
  switch (action.type) {
    case 'SEND': {
      return {
        ...currentState,
        loading: true,
        typeOfReq: action.typeOfReq,
      };
    }
    case 'RESPONSE': {
      return {
        ...currentState,
        loading: false,
        data: action.data,
        reqData: action.reqData,
      };
    }
    case 'ERROR': {
      return { ...currentState, error: action.error, loading: false };
    }
    case 'CLEAR': {
      return { ...currentState, error: null };
    }
    default: {
      console.log('Should not get there');
    }
  }
};

const useHttp = () => {
  const [httpState, dispatchHttpState] = useReducer(
    httpStateReducer,
    initialState
  );
  // url, method, body, headers
  const requestHandler = useCallback((url, method, body, typeOfReq) => {
    dispatchHttpState({ type: 'SEND', typeOfReq: typeOfReq });

    fetch(url, {
      method,
      body: JSON.stringify(body),
      'Content-type': 'application/json',
    })
      .then(res => res.json())
      .then(data => {
        dispatchHttpState({ type: 'RESPONSE', reqData: body, data: data });
      })
      .catch(err =>
        dispatchHttpState({ type: 'ERROR', error: 'Something went wrong!' })
      );
  }, []);

  const clearError = () => {
    dispatchHttpState({ type: 'CLEAR' });
  };

  return {
    data: httpState.data,
    requestHandler: requestHandler,
    loading: httpState.loading,
    error: httpState.error,
    clearError: clearError,
    reqData: httpState.reqData,
    typeOfReq: httpState.typeOfReq,
  };
};

export default useHttp;
