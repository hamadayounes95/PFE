import React, {  useContext, useState } from "react";
import axios from "axios";
const BASE_URL = "https://expensetracker-ynoh.onrender.com/api/v1/";

const GlobalContext = React.createContext()


export const GlobalProvider =({children})=>{
    const [incomes,setIncomes]=useState([])
const [expenses,setExpenses]=useState([])
const [error,setError]=useState(null)

//calculate Income
const addIncome=async(income)=>{
   try {
    const response = await axios.post(`${BASE_URL}add-income`, income)
    console.log(response)
    getIncome()
   } catch (error) {
   setError(error.response.data.message)
   }
    
}
const getIncome = async()=>{
    const response = await axios.get(`${BASE_URL}get-income`)
    setIncomes(response.data)
    console.log(response.data)
}
const deleteIncome =async(id)=>{
    try {
        const res =await axios.delete(`${BASE_URL}delete-income/${id}`)
        console.log(res)
        getIncome()
    } catch (error) {
        console.log(error)
    
    }
}
const totalIncome =()=>{
    let totalIncome = 0;
    incomes.forEach((income) => {
        totalIncome = totalIncome + income.amount
    });
    return totalIncome;
}

//calculate Expense
const addExpense=async(income)=>{
    try {
    const response = await axios.post(`${BASE_URL}add-expense`, income)
    console.log(response)
    getExpense()
    } catch (error) {
      setError(error.response.data.message)    
    }
    
}
const getExpense = async()=>{
    const response = await axios.get(`${BASE_URL}get-expense`)
    setExpenses(response.data)
    console.log(response.data)
}
const deleteExpense =async(id)=>{
    try {
        const res =await axios.delete(`${BASE_URL}delete-expense/${id}`)
        console.log(res)
        getExpense()
    } catch (error) {
        setError(error)
    
    }
}
const totalExpense =()=>{
    let totalExpense = 0;
    expenses.forEach((income) => {
        totalExpense = totalExpense + income.amount
    });
    return totalExpense;
}
const totalBalance = () => {
    return totalIncome() - totalExpense()
}
const transactionHistory = () => {
    const history = [...incomes, ...expenses]
    history.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return history.slice(0,3)
}


    return(
        <GlobalContext.Provider value={{addIncome, getIncome ,deleteIncome, incomes, totalIncome,
                                        addExpense,getExpense,deleteExpense,expenses,totalExpense,
                                        totalBalance, transactionHistory , error,setError}}>
            {children}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext =()=>{
    return useContext(GlobalContext)
}