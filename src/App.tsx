import { useEffect, useState } from "react";
import { Select } from "./components/ui/Select";
import { TextField } from "./components/ui/TextField";
import { SelectOptionI, SelectValueType } from "./types/types";
import { DatePicker } from "./components/ui/DatePicker";

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
  const [group, setGroup] = useState<SelectValueType>([]);
  const [doctor, setDoctor] = useState<SelectValueType>('');
  const [date, setDate] = useState<string>('');


  useEffect(()=> {
    // console.log("group",group)
    // console.log("doctor", doctor)
    console.log(date)
  }, [doctor, group, date])

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
        helperText={'123'}
        autoComplete="tel"
      />
      <br/>
      <Select 
        id="group" 
        label="Группа клиентов" 
        options={options} 
        multiple
        required
        helperText={''}
        value={group}
        setValue={setGroup}
      />
      <br/>
      <Select 
        id="doctor"
        label="Лечащий врач" 
        options={options}
        value={doctor}
        setValue={setDoctor}
      />
      <br />
      <DatePicker
        value={date}
        id="date" 
        label="Дата рождения"
        required
        helperText={''}
        setValue={setDate}
      />
    </div>
  );
}

export default App;
