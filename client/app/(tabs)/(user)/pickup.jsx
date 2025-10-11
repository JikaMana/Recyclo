import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedTextInput from '../../../components/ThemedTextInput';

export default function Pickup() {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#04432c' }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top', 'left', 'right']}>
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
          <Text style={styles.headerTitle}>Pickup </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.mainContainer}>
            <View>
              <View style={styles.searchContainer}>
                <ThemedTextInput
                  placeholder="Input address location"
                  style={styles.input}
                />
                <Ionicons
                  name="location-outline"
                  size={20}
                  color="#888"
                  style={styles.searchIcon}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#ddd',
                  marginBottom: 10,
                }}>
                OR
              </Text>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => router.push('/map-select')}>
                <Text style={styles.mapButtonText}>Select on Map</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.subHeaderText}>Type of Recyclable</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Plastic</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Paper</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Cardboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Metal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Glass</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>E-waste</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Aluminum Cans</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Tin Cans</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Tetra Pak</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Textiles</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.subHeaderText}>Photo (Optional)</Text>
              <TouchableOpacity
                style={styles.photoUpload}
                onPress={() => Alert.alert('Upload failed')}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#ddd',
                    }}>
                    Upload Photo
                  </Text>
                  <Text style={{ textAlign: 'center', color: '#ddd' }}>
                    Add a photo of your recyclables for better assessment.
                  </Text>
                  <View style={[styles.mapButton, { marginTop: 20 }]}>
                    <Text
                      style={{
                        color: '#ddd',
                        fontSize: 12,
                        fontWeight: '600',
                      }}>
                      Upload
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#0f7f0f',
                paddingHorizontal: 20,
                borderRadius: 50,
                alignItems: 'center',
                paddingVertical: 10,
                width: '100%',
                marginVertical: 20,
              }}>
              <Text style={styles.buttonText}>Submit Request</Text>
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
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 16,
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
  },
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    borderRadius: 8,
    paddingLeft: 40,
    paddingHorizontal: 18,
    borderColor: '#444',
    borderWidth: 1,
    color: '#ddd',
    fontSize: 14,
    paddingBlock: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 12,
  },
  mapButton: {
    backgroundColor: '#0f7f0f',
    borderRadius: 16,
    width: 130,
    height: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  mapButtonText: {
    color: '#ddd',
    fontSize: 12,
    fontWeight: '600',
  },
  subHeaderText: {
    color: '#ddd',
    lineHeight: 23,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 5,
  },
  button: {
    backgroundColor: '#04432c',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#ddd',
    fontWeight: '600',
    fontSize: 14,
  },
  photoUpload: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 12,
    height: 250,
  },
});
