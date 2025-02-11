import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import { Theme } from "@chakra-ui/react"
import Header from "./components/Header";
import SearchForm from "./components/SearchForm.tsx";

function App() {

  return (
    <ChakraProvider value={defaultSystem}>
        <Theme appearance="light">  
          <Header />
          <SearchForm />
        </Theme>      
    </ChakraProvider>
  )
}

export default App;
