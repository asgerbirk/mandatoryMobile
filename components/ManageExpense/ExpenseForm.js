import {View, StyleSheet, Alert} from "react-native";
import {Input} from "./Input";
import {useState} from "react";
import {Button} from "../../UI/Button";
import {getFormattedDate} from "../../util/date";


export const ExpenseForm = ({onCancel, onSubmit, submitButtonLabel, defaultValues}) => {

    const [inputValues, setInputValues] = useState({
        // defaultValues er til at update, så når vi klikker på en expense, så henter den autmatisk dataen ellers
        // så er en empty, hvis man f.eks. skal en ny expense.

        amount: defaultValues ? defaultValues.amount.toString() : "",
        date: defaultValues ? getFormattedDate(defaultValues.date) : "",
        description: defaultValues ? defaultValues.description : "",

    });



    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues) => {
            return{
                ...curInputValues,
                [inputIdentifier]: enteredValue
            }
        });
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid date"
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid){
            Alert.alert("invalid input")
            return;
        }

        onSubmit(expenseData);


    }

    return(
        <View>
            <Input label="Amount" textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: inputChangeHandler.bind(this, "amount"),
                value: inputValues.amount
            }}/>
            <Input label="Date" textInputConfig={{
                placeholder: "YYYY-MM-DD",
                maxLength:"10",
                onChangeText: inputChangeHandler.bind(this, "date"),
                value: inputValues.date
            }}/>
            <Input label="Description" textInputConfig={{
                multiline: true,
                autoCapitalize: "Words",
                onChangeText: inputChangeHandler.bind(this, "description"),
                value: inputValues.description
            }}/>
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        minWidth:120,
        marginHorizontal: 8
    }
})