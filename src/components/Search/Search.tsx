import React from "react";
import {
    Autocomplete,
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import style from "./Search.module.scss";
import store from "../../state/store";

type SearchFormType = {
    search: string;
    type: string;
};

const Search = () => {
    const { register, handleSubmit, watch } = useForm<SearchFormType>();
    // const [autoCompleteOptions, setAutocompleteOptions] = useState<string[]>(); //TODO

    function onSubmit({ search, type }: SearchFormType) {
        store.searchPost(search, type);
    }

    return (
        <div className={style.wrapper}>
            <Box
                component="form"
                sx={{ m: "auto", width: "80%" }}
                noValidate
                className={style.post__inputs}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={[]}
                    className={style.post__inputs__title}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={`Search by ${watch("type")}`}
                            {...register("search")}
                        />
                    )}
                />
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    {...register("type", { required: true })}
                    label="Age"
                    defaultValue={"all"}
                >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"title"}>Title</MenuItem>
                    <MenuItem value={"content"}>Content</MenuItem>
                    <MenuItem value={"tags"}>Tags</MenuItem>
                </Select>
                <Button variant="contained" type="submit">
                    Search
                </Button>
            </Box>
        </div>
    );
};

export default Search;
