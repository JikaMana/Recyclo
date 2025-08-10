import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function AppLayout() {
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
        name="dashboard"
        options={{
          title: "Dashboard",
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
        name="(pickup)"
        options={{
          title: "Pickup Request",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              size={28}
              color={focused ? color : "#fff"}
              name="package-variant"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              size={24}
              color={focused ? color : "#fff"}
              name="enviromento"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6
              size={20}
              color={focused ? color : "#fff"}
              name="user"
            />
          ),
        }}
      />
    </Tabs>
  );
}
