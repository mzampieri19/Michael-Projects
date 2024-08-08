import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'regenerator-runtime/runtime';


const storage = new Storage({
  size: 1000, // maximum capacity, default 1000 key-ids
  storageBackend: AsyncStorage, // AsyncStorage for mobile
  defaultExpires: null, // data never expires
  enableCache: true, // enable cache by default
});

export default storage;