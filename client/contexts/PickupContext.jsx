import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

const PickupContext = createContext();

export const PickupProvider = ({ children }) => {
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  const [pickupRequests, setPickupRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPickupRequests = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/pickups`);
        const data = await response.json();

        if (response.ok) {
          setPickupRequests(data);
        } else {
          Alert.alert(
            'Error',
            data.message || 'Failed to fetch pickup requests.'
          );
        }
      } catch (err) {
        Alert.alert('Error', 'Something went wrong, please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPickupRequests();
  }, [pickupRequests, BASE_URL]);

  return (
    <PickupContext.Provider
      value={{ pickupRequests, setPickupRequests, isLoading, setIsLoading }}>
      {children}
    </PickupContext.Provider>
  );
};

export const usePickup = () => useContext(PickupContext);
