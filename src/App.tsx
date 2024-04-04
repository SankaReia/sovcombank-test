import { Toaster } from "sonner";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Form/>
      <Toaster
        position='top-right'
        duration={3000}
        expand={true}
        richColors
      />
    </>
  )
  
}

export default App;
