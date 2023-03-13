import axios from "axios";

const URL = "https://react-native-course-37df1-default-rtdb.europe-west1.firebasedatabase.app"

export async function storeExpense(expenseData){
  const respone = await axios.post(URL + "/expenses.json", expenseData);
  const id = respone.data.name;
  return id;
}

export async function fetchExpenses(){
  const response =  await axios.get(URL + "/expenses.json")

    const expenses = [];
  console.log(response.data)
  for (const key in response.data){
      const expenseObject = {
          id: key,
          amount: response.data[key].amount,
          date: new Date(response.data[key].date),
          description: response.data[key].description
      };
      expenses.push(expenseObject);
  }
  return expenses;
}

export  function updateExpense(id, expenseData){
   return  axios.put(URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id){
    return axios.delete(URL + `/expenses/${id}.json`)
}