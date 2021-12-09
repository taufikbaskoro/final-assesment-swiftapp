import AsyncStorage from '@react-native-community/async-storage';
export const Storage = {
  name: {
    TOKEN: 'TOKEN',
    CART_ID: 'CART_ID',
    CART_ID_GUEST: 'CART_ID_GUEST',
    USER_TYPE: 'USER_TYPE',
    USER_LANGUAGE: 'USER_LANGUAGE',
    USER_FONT_SIZE: 'USER_FONT_SIZE',
  },
  set: (name, data) => {
    AsyncStorage.setItem(name, JSON.stringify(data));
  },
  get: async name => {
    let getItem = await AsyncStorage.getItem(name);
    if (getItem === null || getItem === undefined) {
      return null;
    } else {
      return JSON.parse(getItem);
    }
  },
  getWithPromise: name => {
    let getItem = AsyncStorage.getItem(name);
    return getItem;
  },
  del: async name => {
    await AsyncStorage.removeItem(name);
  },
  clear: async () => {
    await AsyncStorage.clear();
  },
};
