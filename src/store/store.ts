import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import currencyReducer from '../redux/currency-reducer';

const combinedReducer = combineReducers({
	currency: currencyReducer,
});

const rootReducer = (state: any, action: any) => {
	return combinedReducer(state, action);
};

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>;
