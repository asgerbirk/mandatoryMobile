import {Text} from "react-native";
import {ExpensesOutput} from "../components/expensesOutput/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../util/date";
import {fetchExpenses} from "../util/http";

export const RecentExpenses = () => {

  const expensesCtx =   useContext(ExpensesContext);



  useEffect(() => {
      async function getExpenses(){
          const expenses = await fetchExpenses()
          expensesCtx.setExpenses(expenses);
      }
     getExpenses()
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today,7);

      return expense.date > date7DaysAgo;

  })
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText="No expenses for the last 7 days"/>
}