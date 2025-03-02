import React from 'react' // ✅ Import React for better clarity
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react";  // ✅ Correct import
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider> {/* ✅ ChakraProvider should wrap everything */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
