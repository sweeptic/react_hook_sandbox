import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  // const setState = useState(globalState)[1];

  //minden renderelodeskor a globalState initbol kap erteket, és a setstate csak a ujra rendeledeshez kell?
  //a ?? jelzett komponens state nincs ! (üres)

  const [, /* ?? */ setState] = useState(globalState);

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
