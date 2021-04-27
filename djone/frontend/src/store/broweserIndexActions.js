import { clear, createStore, del, entries, get, 
    getMany, keys, set, setMany, update, values } from 'idb-keyval';

export const basisDatenStore = createStore('DJONE-BASISDATA', 'BasisDaten');

export const BeruehrungsspannungStore = createStore('DJONE-TOUCH-Voltage', 'EarthingMeasurments');

export const voltageProfileStore = createStore('DJONE-VOLTAGE-PROFILE', 'voltageProfile');

export const updateOrSet = (store, measurement, identifier, data) => {
    if (measurement) {
        console.log('measurement found, updateing data in indexedDB store')
        let oldData;
        return get(identifier, store).then(val => {oldData = Object.assign(val, data); set(identifier, oldData, store)})
    } else {
        console.log('new measurement, saving data in indexedDB store')

        return set(identifier, data, store);
    }
}

export const getValue = (key, store) => {
    get(key, store).then(val => { return val });
}

export const getAllEntries = (store) => {
    return entries(store).then(entries => { return entries });; 
}

export const getAllIdentifiers = (store) => {
      keys(store).then(keys => { return keys });
}
// examples:
  // const basicDataStore = createStore('DJONE-DB', 'basic-Data-STORE');
  // set('foo', 'bar', basicDataStore);
  // const MeasurementStore = createStore('newMeasurement-db', 'newMeasurement-Store');
  // set('foo', 'bar', MeasurementStore);


  // ========= working with the broweser's data base =============
  // ======================== add a value ========================

      // set('hello', 'world')
      // .then(() => console.log('It worked!'))
      // .catch((err) => console.log('It failed!', err));
  // =============================================================

  // ====================== add many values ======================
  // setMany([
  //   [123, 456],
  //   ['hello', 'world'],
  // ])
  //   .then(() => console.log('It worked!'))
  //   .catch((err) => console.log('It failed!', err));
  // =============================================================

  // ======================== get a value ========================
  // if the key is not in the database val will be undefined
  // get('hello').then((val) => console.log(val));
  // =============================================================

  // ====================== get many values ======================
  // getMany([123, 'hello']).then(([firstVal, secondVal]) =>
  //   console.log(firstVal, secondVal),
  // );
  // =============================================================

  // ====================== update a value =======================
  // update('counter', (val) => (val || 0) + 1);
  // =============================================================

  // ====================== delete a value =======================
  // del('hello');
  // =============================================================

  // ===================== clear all values ======================
  // clear();
  // =============================================================

  // ======= get all entries [key, value], [key, value] .. =======
  // entries().then((entries) => console.log(entries));
  // =============================================================

  // ============= get all keys [key, key, ...] ==================
  // keys().then((keys) => console.log(keys));
  // =============================================================

  // =============== get all values [key, value] ================
  // values().then((values) => console.log(values));
  // =============================================================

