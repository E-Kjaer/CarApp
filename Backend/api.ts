import axios from "axios";

import Constants from "expo-constants";
import { Platform } from "react-native";

function getBaseURL() {
  // Prefer an env var (works in web builds + EAS)
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) return envUrl;

  if (Platform.OS === "web") {
    // Use whatever host the web app is served from
    const protocol = window.location.protocol === "https:" ? "https" : "http";
    const host = window.location.hostname; // e.g. localhost or 192.168.x.x or yourdomain.com
    const port = "3000"; // change if your API uses a different port
    return `${protocol}://${host}:${port}`;
  }

  // Native fallback (iOS sim / Android emulator)
  const hostUri =
    (Constants.expoConfig as any)?.hostUri ||
    (Constants as any)?.manifest?.debuggerHost;
  const host = hostUri ? hostUri.split(":")[0] : (Platform.OS === "android" ? "10.0.2.2" : "localhost");
  return `http://${host}:3000`;
}

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 8000,
});

export default api;
