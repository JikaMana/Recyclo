import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedTextInput from '../../../components/ThemedTextInput';
import MapPickerSheet from '../../../components/MapPickerSheet';
import { useEffect, useRef, useState } from 'react';
import { Portal } from '@gorhom/portal';

import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../../../contexts/UserContext';

const ALL_RECYCLABLES = [
  'Plastic',
  'Aluminium Cans',
  'Tin Cans',
  'Metal',
  'Glass',
  'Paper',
  'Cardboard',
  'Tetra Pak',
  'Textiles',
  'Others',
];

export default function Pickup() {
  const navigation = useNavigation();
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  const { user } = useUser();
  const sheetRef = useRef(null);

  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const cloudName = 'deid1vy94';

  useEffect(() => {
    if (address.trim() && selectedTypes.length > 0 && uploadedImageUrl) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [address, selectedTypes, uploadedImageUrl]);

  const handleOpenMap = () => {
    if (sheetRef.current) {
      sheetRef.current.snapToIndex(0);
    } else {
      console.log('SheetRef is null - check the ref connection');
    }
  };

  const handleMapConfirm = async (coord) => {
    console.log(coord);
    setLocation(coord);
    if (coord) {
      // Ask permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission denied',
          'Location access is required to select location.'
        );
        return;
      }

      const [place] = await Location.reverseGeocodeAsync(coord);
      console.log(place);
      // const addressText = `${place.name || ''}, ${place.city || ''}, ${
      //   place.region || ''
      // }`;
      const addressText = `${place.formattedAddress}`;
      setAddress(addressText);
      console.log('Selected location:', addressText);
    }
  };

  // 2. Function to add a recyclable type
  const addRecyclable = (type) => {
    if (!selectedTypes.includes(type)) {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  // 3. Function to remove a recyclable type
  const removeRecyclable = (typeToRemove) => {
    setSelectedTypes(selectedTypes.filter((type) => type !== typeToRemove));
  };

  const pickImage = async () => {
    //  Ask for permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      mediaTypes: ['images'],
      allowsEditing: true, // allow cropping
      // aspect: [1, 1], // square aspect ratio
      quality: 1, // full quality
    });

    //  If user didn’t cancel, save image URI
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadToCloudinary(result.assets[0].uri);
    }
  };

  const uploadToCloudinary = async (imageUri) => {
    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'pickup.jpg',
    });
    data.append('upload_preset', 'recyclo_unsigned'); // your unsigned preset

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );

      const result = await res.json();
      console.log('Uploaded Image URL:', result.secure_url);

      if (result.secure_url) {
        setUploadedImageUrl(result.secure_url);
        Alert.alert('Upload successful', 'Image uploaded');
        setIsLoading(false);
      } else {
        console.error('Upload failed:', result);
      }
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  const handleSubmit = async () => {
    if (isDisabled) {
      Alert.alert('Fill all informations');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Line 167: ', user);
      console.log('Line 168: ', user?._id);
      const requestData = {
        user: user?._id,
        address,
        selectedTypes,
        location,
        imageUrl: uploadedImageUrl || null,
      };

      // backend call
      await fetch(`${BASE_URL}/api/pickups/new-request/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      Alert.alert('Request Submitted', 'Your pickup request has been sent.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('history'),
        },
      ]);

      setImage(null);
      setAddress('');
      setLocation('');
      setUploadedImageUrl(null);
      setSelectedTypes([]);

      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Something went wrong, please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#04432c' }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.leftArrow}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#ddd"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pickup Request</Text>
        </View>

        {/* Bottom Sheet */}
        <Portal>
          <MapPickerSheet
            sheetRef={sheetRef}
            onConfirm={handleMapConfirm}
          />
        </Portal>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.mainContainer}>
            {/* Location Input */}
            <View style={styles.searchContainer}>
              <ThemedTextInput
                placeholder="Enter your pickup address as on Maps"
                style={styles.input}
                value={address}
                onChangeText={setAddress}
              />
              <Ionicons
                name="location-outline"
                size={20}
                color="#aaa"
                style={styles.searchIcon}
              />
            </View>

            <Text style={styles.orText}>OR</Text>

            <TouchableOpacity
              style={styles.mapButton}
              onPress={handleOpenMap}>
              <Ionicons
                name="map-outline"
                size={18}
                color="#fff"
              />
              <Text style={styles.mapButtonText}>Select on Map</Text>
            </TouchableOpacity>

            {/* Type of Recyclable */}
            <View>
              <Text style={styles.subHeaderText}>Type of Recyclable</Text>
              <View style={styles.buttonContainer}>
                {ALL_RECYCLABLES.map((type, i) => {
                  const isSelected = selectedTypes.includes(type);
                  return (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.button,
                        isSelected && {
                          backgroundColor: '#4a8d6f',
                          borderColor: '#4a8d6f',
                        },
                      ]}
                      onPress={() => addRecyclable(type)}
                      disabled={isSelected}>
                      <Text style={styles.buttonText}>{type}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Selected Choices */}
              <View>
                {selectedTypes.length > 0 && (
                  <Text style={styles.subHeaderText}>Selected choices</Text>
                )}

                <View style={styles.buttonContainer}>
                  {selectedTypes.map((type, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.button,
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          columnGap: 4,
                          backgroundColor: '#2a5c45',
                          borderColor: '#4a8d6f',
                        },
                      ]}
                      // 4. Call removeRecyclable on press
                      onPress={() => removeRecyclable(type)}>
                      <Text style={styles.buttonText}>{type}</Text>
                      <Ionicons
                        name="close-circle"
                        size={18}
                        color="#ff6961"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Photo Upload */}
            <Text style={styles.subHeaderText}>Photo</Text>
            <TouchableOpacity
              style={styles.photoUpload}
              onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
              ) : (
                <View style={styles.photoInner}>
                  <Ionicons
                    name="camera-outline"
                    size={36}
                    color="#ccc"
                  />
                  <Text style={styles.uploadTitle}>Upload Photo</Text>
                  <Text style={styles.uploadSubtitle}>
                    Add a photo of your recyclables for better assessment.
                  </Text>
                  <TouchableOpacity style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Choose File</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>

            {/* Submit */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                (isDisabled || isLoading) && { backgroundColor: '#04432c' },
              ]}
              onPress={handleSubmit}
              disabled={isDisabled || !uploadedImageUrl || isLoading}>
              <Text style={styles.submitText}>
                {isLoading ? 'Submitting...' : 'Submit Request'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    color: '#ddd',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leftArrow: {
    position: 'absolute',
    left: 20,
    padding: 5,
  },
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    paddingLeft: 40,
    paddingVertical: 12,
    borderColor: '#2a5c45',
    borderWidth: 1.2,
    color: '#fff',
    fontSize: 14,
    backgroundColor: '#05593e',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 13,
  },
  orText: {
    textAlign: 'center',
    color: '#ccc',
    marginVertical: 6,
    fontSize: 13,
  },
  mapButton: {
    flexDirection: 'row',
    backgroundColor: '#05593e',
    borderRadius: 16,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 6,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  subHeaderText: {
    color: '#ddd',
    lineHeight: 23,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 8,
  },
  button: {
    backgroundColor: '#05593e',
    borderColor: '#1b7252',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 1,
  },
  buttonText: {
    color: '#eee',
    fontWeight: '600',
    fontSize: 14,
  },
  photoUpload: {
    borderWidth: 1.5,
    borderColor: '#4a8d6f',
    borderStyle: 'dashed',
    borderRadius: 14,
    height: 230,
    marginTop: 5,
  },
  photoInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  uploadTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#ddd',
    marginTop: 10,
  },
  uploadSubtitle: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 13,
    marginTop: 5,
  },
  uploadButton: {
    backgroundColor: '#05593e',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 15,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#05593e',
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
    marginVertical: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
