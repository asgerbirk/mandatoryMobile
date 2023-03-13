import {Text} from "react-native";
import {ExpensesOutput} from "../components/expensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";

export const AllExpenses = () => {

    const expensesCtx = useContext(ExpensesContext)

    return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="total" fallbackText="No expenses found"/>

}