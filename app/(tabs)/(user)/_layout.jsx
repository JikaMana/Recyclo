import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function UserLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0f7f0f",
        tabBarStyle: {
          height: 80,
          paddingTop: 10,
          backgroundColor: "#04432c",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6
              size={20}
              color={focused ? color : "#fff"}
              name="house"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pickup"
        options={{
          title: "Pickup",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              size={28}
              color={focused ? color : "#fff"}
              name="truck-delivery"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6
              size={20}
              color={focused ? color : "#fff"}
              name="clock-rotate-left"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6
              size={20}
              color={focused ? color : "#fff"}
              name="user-large"
            />
          ),
        }}
      />
    </Tabs>
  );
}
