import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (err) {
    console.error('Failed to remove token from storage', err);
    throw err;
  }
};
