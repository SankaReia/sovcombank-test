import { FC, useEffect, useState } from "react";
import { FormErrorI, FormI, DaDataSuggestion, DaDataFio } from "../types/types";
import { TextField } from "./ui/TextField";
import { DatePicker } from "./ui/DatePicker";
import { Select } from "./ui/Select";
import { attendingPhysicianOptions, customerGroupOptions } from "../consts/options";
import { Checkbox } from "./ui/Checkbox";
import { Radio } from "./ui/Radio";
import style from "../assets/styles/Form.module.css";
import { toast } from "sonner";
import { Autocomplete } from "./ui/Autocomplete";

const options = (full_name: string) : RequestInit => {
    return {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + process.env.REACT_APP_TOKEN
        },
        body: JSON.stringify({query: full_name})
    }
}

const Form: FC = () => {
    const [form, setForm] = useState<FormI>({
        full_name: "",
        birth_date: "",
        phone: "",
        gender: "",
        customer_group: [],
        attending_physician: "",
        sms: false,
    });
    const [formError, setFormError] = useState<FormErrorI>({
        full_name: "",
        birth_date: "",
        phone: "",
        customer_group: "",
    });
    const [nameOptions, setNameOptions] = useState<DaDataSuggestion<DaDataFio>[]>([]);

    useEffect(() => {
        if (form.customer_group.length > 0) {
            setFormError((prev) => ({ ...prev, ["customer_group"]: "" }));
        }
    }, [form.customer_group]);

    const checkValidityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = e.target.name;
        setFormError((prev) => ({ ...prev, [name]: "Обязательное поле" }));
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = e.target.name;
        let value: string | boolean = e.target.value;
        if (name == "sms") value = e.target.checked;
        if (name == 'full_name') {
            fetch(process.env.REACT_APP_URL_API as string, options(value as string)).then(response => response.json())
            .then(result =>  setNameOptions(result.suggestions))
            .catch(error => console.log("error", error));
        }
        setForm((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));
    };

    const phoneValidator = () => {
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(form.phone)) {
            setFormError((prev) => ({ ...prev, phone: "Некорректный номер телефона" }));
            return true;
        }
        return false;
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!(e.target as HTMLFormElement).checkValidity() || form.customer_group.length == 0 || phoneValidator()) {
            if (form.customer_group.length == 0) setFormError((prev) => ({ ...prev, ["customer_group"]: "Обязательное поле" }));
            toast.warning("Заполните обязательные поля");
        } else {
            toast.success("Регистрация прошла успешно");
        }
    };
    return (
        <div className={style.container}>
            <form onSubmit={submitHandler} autoComplete="off" noValidate className={style.form}>
                <div className={style["form-left"]}>
                    <h2>Регистрация</h2>
                    <div className={style.contacts}>
                        <p>Возникли вопросы? Позвоните по телефону горячей линии</p>
                        <p className={style.phone}>+7 (999) 999-99-99</p>
                    </div>
                </div>
                <div className={style["form-right"]}>
                    <Autocomplete
                        id="full_name"
                        name="full_name"
                        type="text"
                        label="ФИО"
                        required
                        value={form.full_name}
                        onChange={inputChangeHandler}
                        fullWidth={true}
                        helperText={formError.full_name}
                        onInvalid={checkValidityHandler}
                        options={nameOptions}
                        setValue={(value) => setForm((prev) => ({ ...prev, full_name: value }))}
                    />

                    <div className={style["form-row"]}>
                        <DatePicker
                            id="birth_date"
                            name="birth_date"
                            label="Дата рождения"
                            required
                            value={form.birth_date}
                            onChange={inputChangeHandler}
                            helperText={formError.birth_date}
                            onInvalid={checkValidityHandler}
                        />

                        <TextField
                            id="phone"
                            name="phone"
                            type="tel"
                            label="Номер телефона"
                            required
                            value={form.phone}
                            onChange={inputChangeHandler}
                            fullWidth={true}
                            helperText={formError.phone}
                            autoComplete="tel"
                            onInvalid={checkValidityHandler}
                        />
                    </div>

                    <div className={style["radio-group"]}>
                        <Radio id="male" name="gender" label="Муж" value="male" onChange={inputChangeHandler} />
                        <Radio id="female" name="gender" label="Жен" value="female" onChange={inputChangeHandler} />
                    </div>

                    <Select
                        id="customer_group"
                        label="Группа клиентов"
                        options={customerGroupOptions}
                        multiple
                        required
                        helperText={formError.customer_group}
                        value={form.customer_group}
                        setValue={(value) => setForm((prev) => ({ ...prev, customer_group: value }))}
                    />

                    <Select
                        id="attending_physician"
                        label="Лечащий врач"
                        options={attendingPhysicianOptions}
                        value={form.attending_physician}
                        setValue={(value) => setForm((prev) => ({ ...prev, attending_physician: value }))}
                    />

                    <Checkbox id="sms" name="sms" label="Не отправлять СМС" checked={form.sms} onChange={inputChangeHandler} />

                    <button type="submit" className={style.btn}>
                        Отправить
                    </button>
                </div>
            </form>
        </div>
    );
};
export default Form;
