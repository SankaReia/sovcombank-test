import { FC } from "react";
import {TextField, TextFieldProps} from '../ui/TextField'
import {DaDataSuggestion, DaDataFio} from '../../types/types'

interface AutocompleteProps extends TextFieldProps {
    options: DaDataSuggestion<DaDataFio>[]
}

export const Autocomplete: FC<AutocompleteProps> = ({ options, ...rest }) => {
    return (
        <>
            <TextField
                {...rest}
            />
            {options.map((option) => <div key={option.value}>{option.value}</div>)}
        </>
    );
};
