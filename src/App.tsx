import { useEffect, useState } from "react";
import { Select } from "./components/ui/Select";
import { TextField } from "./components/ui/TextField";
import { FormI, SelectOptionI, SelectValueType } from "./types/types";
import { DatePicker } from "./components/ui/DatePicker";
import { Checkbox } from "./components/ui/Checkbox";
import { Radio } from "./components/ui/Radio";

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
  const [form, setForm] = useState<FormI>({
    full_name: "",
    birth_date: "",
    phone: "",
    gender: "",
    customer_group: [],
    attending_physician: "",
    sms: false,
  })

  useEffect(()=> {
    console.log(form)
  }, [form])

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    let value: string | boolean = e.target.value;
    if (name == 'sms') value = e.target.checked
    setForm(prev => ({...prev, [name]: value}))
  }

  return (
    <div>
      <br/>
      <TextField 
        id="full_name"
        name="full_name"
        type="text"
        label="ФИО"
        required
        value={form.full_name}
        onChange={inputChangeHandler}
        fullWidth={false}
        helperText={''}
      />
      <br/>
      <TextField 
        id="phone"
        name="phone"
        type="tel"
        label="Номер телефона"
        required
        value={form.phone}
        onChange={inputChangeHandler}
        fullWidth={false}
        helperText={''}
        autoComplete="tel"
      />
      <br/>
      <DatePicker
        id="birth_date"
        name="birth_date"
        label="Дата рождения"
        required
        value={form.birth_date}
        onChange={inputChangeHandler}
        helperText={''}
      />
      <Select 
        id="customer_group" 
        label="Группа клиентов" 
        options={options} 
        multiple
        required
        helperText={''}
        value={form.customer_group}
        setValue={
          (value) => setForm(prev => ({...prev, ['customer_group']:value}))
        }
      />
      <br/>
      <Select 
        id="attending_physician"
        label="Лечащий врач" 
        options={options}
        value={form.attending_physician}
        setValue={
          (value) => setForm(prev => ({...prev, ['attending_physician']:value}))
        }
      />
      <br />

      <br />
      <Checkbox
        id="sms"
        name="sms"
        label="Не отправлять СМС"
        checked={form.sms}
        onChange={inputChangeHandler}
      />
      <br />
      <Radio
        id="male"
        name="gender"
        label="Муж"
        value='male'
        onChange={inputChangeHandler}
      />
      <Radio
        id="female"
        name="gender"
        label="Жен"
        value='female'
        onChange={inputChangeHandler}
      /> 
    </div>
  );
}

export default App;
