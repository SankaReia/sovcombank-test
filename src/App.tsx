import { TextField } from "./components/ui/TextField";

function App() {
  return (
    <div>
      <br />
      <br />
      <br />
      <TextField 
        id="name" 
        type="text" 
        label="Name" 
        required={true} 
        fullWidth={false}
        helperText={'Обязательное поле'}/>
    </div>
  );
}

export default App;
