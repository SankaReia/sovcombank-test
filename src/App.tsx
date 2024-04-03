import { useEffect, useState } from "react";
import { Select } from "./components/ui/Select";
import { TextField } from "./components/ui/TextField";
import { SelectOptionI } from "./types/types";

const options: SelectOptionI[] = [
  {
    label: 'тест1',
    value: 'test1'
  },
  {
    label: 'тест2',
    value: 'test2'
  },
  {
    label: 'тест3',
    value: 'test3'
  }
]

function App() {
  const [group, setGroup] = useState<string[] | string>([]);
  const [doctor, setDoctor] = useState<string | string[]>('');

  useEffect(()=> {
    console.log("group",group)
    console.log("doctor", doctor)

  }, [doctor, group])

  return (
    <div>
      <br/>
      <TextField 
        id="name"
        type="text"
        label="ФИО"
        required
        fullWidth={false}
        helperText={''}
      />
      <br/>
      <TextField 
        id="phone"
        type="tel"
        label="Телефон"
        required
        fullWidth={false}
        helperText={''}
        autoComplete="tel"
      />
      <Select 
        id="group" 
        label="Группа клиентов" 
        options={options} 
        multiple
        required
        value={group}
        setValue={setGroup}
      />
      <Select 
        id="doctor"
        label="Лечащий врач" 
        options={options}
        value={doctor}
        setValue={setDoctor}
      />
    </div>
  );
}

export default App;
