import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Request() {
  const navigation = useNavigation();

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
              size={22}
              color="#d1f5e1"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pickup Request</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContent}>
          <View style={styles.mainContainer}>
            {/* Request Details */}
            <Text style={styles.sectionTitle}>Request Details</Text>
            <View style={styles.detailsCard}>
              {[
                {
                  icon: (
                    <AntDesign
                      name="enviromento"
                      size={22}
                      color="#04432c"
                    />
                  ),
                  title: 'Address',
                  info: 'Opposite KST, Mini-Okoro',
                },
                {
                  icon: (
                    <Ionicons
                      name="call"
                      size={22}
                      color="#04432c"
                    />
                  ),
                  title: 'Contact',
                  info: '+234 9012345678',
                },
                {
                  icon: (
                    <FontAwesome5
                      name="recycle"
                      size={22}
                      color="#04432c"
                    />
                  ),
                  title: 'Waste Type',
                  info: 'Plastic bottles, paper, cardboard',
                },
              ].map((item, index) => (
                <View
                  key={index}
                  style={styles.detailRow}>
                  <View style={styles.iconWrapper}>{item.icon}</View>
                  <View>
                    <Text style={styles.detailTitle}>{item.title}</Text>
                    <Text style={styles.detailInfo}>{item.info}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Waste Photos */}
            <Text style={styles.sectionTitle}>Waste Photos</Text>
            <View style={styles.wastePhotosContainer}>
              <Image
                source={require('../../../../assets/images/plastic-bottle.png')}
                style={styles.wastePhoto}
              />
            </View>
          </View>
          {/* Action Buttons */}
          <View style={styles.actionBar}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.actionButton, styles.rejectButton]}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.actionButton, styles.acceptButton]}>
              <Text style={styles.buttonText}>Accept</Text>
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
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  leftArrow: {
    position: 'absolute',
    left: 16,
    padding: 4,
  },
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  sectionTitle: {
    color: '#d1f5e1',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
  },
  detailsCard: {
    backgroundColor: '#0a5c42',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 14,
  },
  iconWrapper: {
    backgroundColor: '#d1f5e1',
    padding: 10,
    borderRadius: 10,
  },
  detailTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  detailInfo: {
    color: '#9fd7b3',
    fontSize: 14,
    marginTop: 2,
  },
  wastePhotosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 80,
  },
  wastePhoto: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    backgroundColor: '#fff',
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 14,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 50,
  },
  rejectButton: {
    backgroundColor: '#d9534f',
  },
  acceptButton: {
    backgroundColor: '#0f7f0f',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
