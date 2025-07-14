'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { createStore, AppStore } from './store';
//initialize data
//import { initializeCount } from '../lib/features/counter/counterSlice'

// import  store  from '../lib/store/store'


export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = createStore();
    // storeRef.current.dispatch(initializeCount(count));
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
// export default ({children}:{children: React.ReactNode}) => {

//   return(<Provider store={store}>
//     {children}
//     </Provider>
//     );
// }