import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const subscriptionPlans = [
  {
    id: "monthly",
    title: "Monthly Plan",
    price: 2000,
    benefits: ["Full platform access", "Priority support"],
    duration: "1 month",
  },
  {
    id: "yearly",
    title: "Yearly Plan",
    price: 20000,
    benefits: [
      "Full platform access",
      "24/7 priority support",
      "+1 months afterwards",
    ],
    duration: "1 year + 1 month",
  },
];

export default function subscription() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0]);

  const handlePayment = () => {
    Alert.alert(
      "Proceeding to Payment",
      `You have selected the ${selectedPlan.title} for ₦${selectedPlan.price}. Are you sure you? Click Okay to complete your payment using Paystack`
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#ddd" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Renew Subscription</Text>
        </View>

        <ScrollView style={styles.mainContent}>
          <Text style={styles.subHeaderText}>Choose Your Plan</Text>
          <Text style={styles.introText}>
            Select a subscription plan to get full access to the recycling
            network.
          </Text>

          {subscriptionPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan.id === plan.id && styles.selectedPlan,
              ]}
              onPress={() => setSelectedPlan(plan)}
            >
              <View>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planPrice}>
                  ₦{plan.price.toLocaleString()} / {plan.duration}
                </Text>
                <View style={styles.benefitsContainer}>
                  {plan.benefits.map((benefit, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        columnGap: 4,
                      }}
                    >
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={14}
                        style={{ marginTop: 3 }}
                        color="#0f7f0f"
                      />
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedPlan && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Selected Plan:</Text>
              <Text style={styles.summaryValue}>{selectedPlan.title}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Total Amount:</Text>
              <Text style={styles.summaryValue}>
                ₦{selectedPlan.price.toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#0f7f0f",
                paddingHorizontal: 20,
                borderRadius: 50,
                alignItems: "center",
                paddingVertical: 16,
                width: "100%",
              }}
              onPress={handlePayment}
            >
              <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04432c",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#ddd",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  subHeaderText: {
    color: "#ddd",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  introText: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  planCard: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "transparent",
  },
  selectedPlan: {
    borderColor: "#0f7f0f",
    backgroundColor: "#ddfadd",
  },
  planTitle: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
  },
  planPrice: {
    color: "#0f7f0f",
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
  },
  benefitsContainer: {
    marginTop: 15,
  },
  benefitText: {
    color: "#333",
    fontSize: 14,
    marginBottom: 5,
  },
  summaryContainer: {
    backgroundColor: "#ddd",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryText: {
    color: "#333",
    fontSize: 16,
  },
  summaryValue: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentButton: {
    backgroundColor: "#0f7f0f",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  paymentButtonText: {
    color: "#ddd",
    fontWeight: "600",
    fontSize: 14,
  },
});
