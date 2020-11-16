import { /*useEffect,*/ useState } from 'react';

let actions = {};
let globalStore = {};
let listeners;
let listenerId = [];

const useStore = (shouldListen = true, lid = 'default') => {
  console.log('render useStore', shouldListen);

  const [, setState] = useState(globalStore);

  console.log('listeners: ', listenerId);

  const dispatch = payload => {
    //  actions[payload.type];

    const updatedStore = actions[payload.type](globalStore, payload.id);
    globalStore = { ...globalStore, ...updatedStore };
    //  console.log(listeners);

    //  for (const iterator of listeners) {
    //    iterator(globalStore);
    //  }
    listeners(globalStore);
  };

  //   useEffect(
  //     () => {
  //       //  console.log('useEffect run. shouldlisten: ', shouldListen);
  //       if (shouldListen) {
  listeners = setState;
  //         //   listenerId.push(lid);
  //       }

  //       // return () => {
  //       //   if (shouldListen) {
  //       //     //  listeners = listeners.filter(li => li !== setState);
  //       //   }
  //       // };
  //     },
  //     //  []
  //     [shouldListen]
  //   );

  return [globalStore, dispatch];
};

export const initStore = (userActions, initialState) => {
  globalStore = { ...globalStore, ...initialState };
  actions = { ...actions, ...userActions };
};

export default useStore;
