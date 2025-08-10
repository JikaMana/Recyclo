import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

function RouteGuard({ children }) {
  const router = useRouter();
  const isAuth = true; //leave you in auth groups
  // later get from auth
  const role = "collector";
  // const role = "user";

  useEffect(() => {
    if (isAuth) {
      if (role === "collector") {
        router.replace("/(tabs)/(collector)/dashboard");
      } else {
        router.replace("/(tabs)/(user)/(home)");
      }
    } else {
      router.replace("/register");
    }
  });

  return <>{children}</>;
}

export default function AuthLayout() {
  return (
    <RouteGuard>
      <Stack>
        <Stack.Screen
          name="register"
          options={{ title: "Sign Up", headerShown: false }}
        />
        <Stack.Screen
          name="login"
          options={{ title: "Welcome Back", headerShown: false }}
        />
      </Stack>
    </RouteGuard>
  );
}
