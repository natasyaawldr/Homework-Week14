import { AuthProvider } from "@/modules/context/userContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>

  );
}
