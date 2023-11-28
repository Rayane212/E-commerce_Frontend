import React, {useState, useEffect, useCallback } from 'react'
import { Customer } from '../../../models/Customer';
import GetAllCustomers from '../../../services/customers/GetAllCustomers';
import FilterCustomers from '../../../services/customers/FilterCustomers';

type CustomerState = {
    customers: Customer[];
    searchValue: string;
    selectedOption: string;
    showList: boolean;
}

export default function useCustomersTable() {
    // State Declarations
    const [state, setState] = useState<CustomerState>();
    


    async function GetCustomers() {
        const data = GetAllCustomers();
        return data;
    }

    async function asyncFilterCustomers(){
            const data = state?.customers;
            if (data === undefined) {
                return false
            }
            const filteredCustomers =  FilterCustomers(data);
            const buyCustomers = filteredCustomers.buyCustomers;
            const suscribedCustomers = filteredCustomers.suscribedCustomers;
            const unsuscribedCustomers = filteredCustomers.unsuscribedCustomers;
            return data;
            
        }

    // // Change view function
    // const changeView = useCallback((list: Customer[]) => {
    //     setCustomers(list);
    // }, []);

    // // Change searchValue 
    // const handleInputChange = (event: Event) => {
    //     const inputElement = event.target as HTMLInputElement;
    //     const inputValue = inputElement.value;
    //     if (inputElement.id === "sort_select") {
    //         setSelectedOption(inputValue);
    //     }
    //     else{
    //     setSearchValue(inputValue);
    //     }
    // };

    // // Tri des clients 
    // useEffect(() => {
    //     if (selectedOption === '') {
    //         setSelectedOption('id_asc');
    //     }
    //     else{
    //         const index_for_slice = selectedOption.indexOf('_');
    //         const sort_type = selectedOption.slice(0, index_for_slice);
    //         const sort_order = selectedOption.slice(index_for_slice + 1);
    //         const response_sort = CustomerSort(customers, sort_type, sort_order); 
    //         changeView(response_sort);
    //     }
    // }, [selectedOption]);

    // // Event Listener Input Change
    // useEffect(() => {
    //     const sort_select = document.getElementById("sort_select");
    //     const search_text_input = document.getElementById("customer_research");
        
    //     const inputEventListener = (event: Event) => {
    //     handleInputChange(event);
    //     };

    //     search_text_input?.addEventListener('input', inputEventListener);
    //     sort_select?.addEventListener('change', inputEventListener);

    //     return () => {
    //     search_text_input?.removeEventListener('input', inputEventListener);
    //     sort_select?.removeEventListener('change', inputEventListener);
    //     };
    // }, [searchValue]);

    // // Recherche des clients
    // useEffect(() => {
    //     if (searchValue === '') {
    //         changeView(allCustomers);
    //     }
    //     else{
    //         const response = CustomersResearch(allCustomers, searchValue);
    //         if (response !== undefined) {
    //             changeView(response);
    //         }
    //         else{
    //             changeView([]);
    //         }
    // }
    // }, [searchValue]);

    // // Traitement des filtres (toutes, abonnés...)
    // useEffect(() => {
    //     const all_customers__btn = document.getElementById("all_customers__btn");
    //     const buy_customers__btn = document.getElementById("buy_customers__btn");
    //     const suscribers_customers__btn = document.getElementById("suscribers_customers__btn");
    //     const unsuscribers_customers__btn = document.getElementById("unsuscribers_customers__btn");
        
    //     function resetInput() {
    //         const search_text_input = document.getElementById("customer_research") as HTMLInputElement;
    //         search_text_input.value = '';
    //     }

    //     function handleAllCustomersClick() {
    //         if (!showList){
    //             setShowList(true);
    //         }
    //         changeView(allCustomers);
    //         resetInput();
    //     }

    //     function handleBuyCustomersClick() {
    //         changeView(buyCustomers);
    //         setShowList(true);
    //         resetInput();
    //     }

    //     function handleSuscribedCustomersClick() {
    //         changeView(suscribedCustomers);
    //         resetInput();
    //     }

    //     function handleUnsuscribedCustomersClick() {
    //         changeView(unsuscribedCustomers);
    //         resetInput();
    //     }

    //     all_customers__btn?.addEventListener('click', handleAllCustomersClick);
    //     buy_customers__btn?.addEventListener('click', handleBuyCustomersClick);
    //     suscribers_customers__btn?.addEventListener('click', handleSuscribedCustomersClick);
    //     unsuscribers_customers__btn?.addEventListener('click', handleUnsuscribedCustomersClick);

    //     return () => {
    //     all_customers__btn?.removeEventListener('click', handleAllCustomersClick);
    //     buy_customers__btn?.removeEventListener('click', handleBuyCustomersClick);
    //     suscribers_customers__btn?.removeEventListener('click', handleSuscribedCustomersClick);
    //     unsuscribers_customers__btn?.removeEventListener('click', handleUnsuscribedCustomersClick);
        
    //     };
    // }, [allCustomers]);

    // // Affichage de la liste des commandes ou non
    // useEffect(() => {
    //     if (customers.length === 0) {
    //     setShowList(false);
    //     } else {
    //     setShowList(true);
    //     }
    // }, [customers]);

    async function init(){
        const data = await GetCustomers();
        setState({
            customers: data,
            searchValue: '',
            selectedOption: 'id_asc',
            showList: true
        })
    }
    useEffect(() => {
       init();
    },[])
    
  return {
    state
  }
}
