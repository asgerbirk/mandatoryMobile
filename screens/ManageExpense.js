import {Text, View, StyleSheet, TextInput} from "react-native";
import {useContext, useLayoutEffect} from "react";
import {IconButton} from "../UI/IconButton";
import {GlobalStyles} from "../constant/styles";
import {Button} from "../UI/Button";
import expensesContext, {ExpensesContext} from "../store/expenses-context";
import {ExpenseForm} from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpense, updateExpense} from "../util/http";

export const ManageExpense = ({route, navigation}) => {

   const expenseCtx =  useContext(ExpensesContext);
const editedExpenseId = route.params?.expenseId;
//convert a value into a boolean, convert falsy value into false and true into true.
const isEditing = !!editedExpenseId;

const selectedExpense = expenseCtx.expenses.find((expense) => expense.id === editedExpenseId);

useLayoutEffect(() => {
    navigation.setOptions({
        title: isEditing ? "Edit expense" : "Add expense"
    })
}, [navigation, isEditing])

    async function deleteExpenseFunction(){
    await deleteExpense(editedExpenseId)
    expenseCtx.deleteExpense(editedExpenseId)
        navigation.goBack();
    }

    function cancelHandler(){
    navigation.goBack();
    }

    async function confirmHandler(expenseData){
    if (isEditing){
        expenseCtx.updateExpense(editedExpenseId, expenseData)
        await updateExpense(editedExpenseId, expenseData)
    }else {
        const id = await storeExpense(expenseData)
        expenseCtx.addExpense({...expenseData, id: id});
    }
    navigation.goBack();

    }

    return(
        <View style={styles.container}>
            <ExpenseForm
                submitButtonLabel={isEditing ? "update" : "Add"}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />

            {isEditing && (
                <View style={styles.deleteContainer}>
           <IconButton
               icon="trash"
               color={GlobalStyles.colors.error500}
               size={36} onPress={deleteExpenseFunction}
           />
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    deleteContainer: {
        margin:16,
        padding:8,
        borderTopWidth:2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center"
        
    },
    container: {
        flex:1,
        padding:24,
        backgroundColor: GlobalStyles.colors.primary800
    },
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

