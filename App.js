import { AuthProvider } from "./Context/AuthContext";
import { RootNavigator } from "./Navigation/Navigate";

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )
}
