import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';

class Firestore {
  doc = {
    VERSION: 'version',
    MODULES: 'modules',
  };

  constructor() {
    this.collection = firestore().collection(Config.MODE_ACTIVE);
  }

  onSnapshot(doc, callback) {
    this.collection.doc(doc).onSnapshot(snapshot => {
      callback(snapshot || null);
    });
  }
}

export default Firestore;
