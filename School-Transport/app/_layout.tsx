import { Slot, Stack } from "expo-router";
import { SessionProvider } from "../src/Services/AuthenticationService";
import { Theme } from "@gluestack-style/react";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { GluestackUIProvider, Button, ButtonText } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <GluestackUIProvider config={config}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </GluestackUIProvider>
  );
}
