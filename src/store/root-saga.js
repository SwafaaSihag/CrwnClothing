//this file is for incapsulating all different saga
import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga'

//function* is a generator function (study generator functions)
export function* rootSaga() {
    yield all([call(categoriesSaga)]);
}