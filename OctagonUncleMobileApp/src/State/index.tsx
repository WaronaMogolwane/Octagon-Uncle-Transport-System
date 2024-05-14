import {createGlobalState} from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = createGlobalState({
  userId: '',
  role: 0,
  businessId: '',
});

export {useGlobalState, setGlobalState};
2;
