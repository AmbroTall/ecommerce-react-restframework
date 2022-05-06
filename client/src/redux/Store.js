// Combine Reducer is used to persist two or more reducers
import {configureStore} from '@reduxjs/toolkit'
// import {configureStore, combineReducers} from '@reduxjs/toolkit'
import productReducer from './ProductSlice'
// import userLogin from './userLogin'



// persit
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage' 

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

// const rootReducer = combineReducers({user: userLogin, cart: cartReducer})
  
const persistedReducer = persistReducer(persistConfig, productReducer)
  


export const store = configureStore({
    reducer:persistedReducer,

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)