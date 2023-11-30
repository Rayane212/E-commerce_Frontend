import React, {useState, useEffect, useCallback } from 'react'
import { Customer } from '../../../models/Customer';
import GetAllCustomers from '../../../services/customers/GetAllCustomers';
import FilterCustomers from '../../../services/customers/FilterCustomers';
import CustomerSort from '../../../services/customers/CustomerSort';
import CustomersResearch from '../../../services/customers/CustomersResearch';


class useCustomersTable{
    async GetCustomers() {
        const data = GetAllCustomers();
        return data;
    }

    async asyncFilterCustomers(){
        const data = await this.GetCustomers();
        const filter_data = FilterCustomers(data);
        return filter_data;
    }

    async customerSearch(e: React.ChangeEvent<HTMLInputElement>){
        const searchValue = e.target.value;
        const allCustomers = await this.GetCustomers();
        if (searchValue !== '') {
            const result_list = CustomersResearch(allCustomers, searchValue);
            return result_list;
        }
        else{
            return allCustomers;
        }
    }

    async customerSort(e: React.ChangeEvent<HTMLSelectElement>){
        const selectedOption = e.target.value;
        const allCustomers = await this.GetCustomers();
        if (selectedOption !== ''){
            const index_for_slice = selectedOption.indexOf('_');
            if (index_for_slice !== undefined) {
                const sort_type = selectedOption.slice(0, index_for_slice);
                const sort_order = selectedOption.slice(index_for_slice + 1);
                const response_sort = CustomerSort(allCustomers, sort_type, sort_order); 
                console.log(response_sort);
            }
        }
    }

}

// function useCustomersTable() {
//     // State Declarations
//     const [state, setState] = useState<CustomerState>();
//     const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
    


//     // Change searchValue 
//     const handleInputChange = (event: Event) => {
//         const inputElement = event.target as HTMLInputElement;
//         const inputValue = inputElement.value;
//         if (inputElement.id === "sort_select") {
//             setState({
//                 customers: state?.customers as Customer[],
//                 searchValue: state?.searchValue as string,
//                 selectedOption: inputValue,
//                 showList: state?.showList as boolean
//             })
//         }
//         else{
//             setState({
//                 customers: state?.customers as Customer[],
//                 searchValue: inputValue,
//                 selectedOption: 'id_asc',
//                 showList: state?.showList ?? false
//             })
//         }
//     };

//     // Tri des clients 
//     useEffect(() => {
//         if (state?.selectedOption === '') {
//             setState({
//                 customers: state?.customers as Customer[],
//                 searchValue: '',
//                 selectedOption: 'id_asc',
//                 showList: state?.showList ?? false
//             })
//         }
//         else{
//             const index_for_slice = state?.selectedOption.indexOf('_');
//             if (index_for_slice !== undefined) {
//                 const sort_type = state?.selectedOption.slice(0, index_for_slice);
//                 const sort_order = state?.selectedOption.slice(index_for_slice + 1);
//                 const response_sort = CustomerSort(state?.customers as Customer[], sort_type as string, sort_order as string); 
//                 if (response_sort !== undefined) {
//                     setState({
//                         customers: response_sort,
//                         searchValue: state?.searchValue ? state?.searchValue : '',
//                         selectedOption: state?.selectedOption ?? 'id_asc',
//                         showList: state?.showList ?? false
//                     })
//                 }
//                 else{
//                     setState({
//                         customers: [],
//                         searchValue: state?.searchValue ?? '',
//                         selectedOption: state?.selectedOption ?? 'id_asc',
//                         showList: state?.showList ?? false
//                     })
//                 }
//             }
            
            
//         }
//     }, [state?.selectedOption]);

//     // Event Listener Input Change
//     useEffect(() => {
//         test()
//     }, []);

//     // Recherche des clients
//     useEffect(() => {
    //     if (state?.searchValue === '') {
    //         setState({
    //             customers: allCustomers as Customer[],
    //             searchValue: state?.searchValue,
    //             selectedOption: state?.selectedOption,
    //             showList: true, 
    //         })
    //     }
    //     else{
    //         const response = CustomersResearch(allCustomers, state?.searchValue as string);
    //         if (response !== undefined) {
    //             setState({
    //                 customers: response,
    //                 searchValue: state?.searchValue ?? '',
    //                 selectedOption: state?.selectedOption ?? 'id_asc',
    //                 showList: true, 
    //             })
    //         }
    //         else{
    //             setState({
    //                 customers: [],
    //                 searchValue: state?.searchValue ?? '',
    //                 selectedOption: state?.selectedOption ?? 'id_asc',
    //                 showList: false, 
    //             })
    //         }
    // }
//     }, [state?.searchValue]);

//     // Traitement des filtres (toutes, abonnés...)
//     useEffect(() => {
//         const all_customers__btn = document.getElementById("all_customers__btn");
//         const buy_customers__btn = document.getElementById("buy_customers__btn");
//         const suscribers_customers__btn = document.getElementById("suscribers_customers__btn");
//         const unsuscribers_customers__btn = document.getElementById("unsuscribers_customers__btn");
//         const request = asyncFilterCustomers();

//         function resetInput() {
//             const search_text_input = document.getElementById("customer_research") as HTMLInputElement;
//             search_text_input.value = '';
//         }

//         function handleAllCustomersClick() {
//             setState({
//                 customers: allCustomers,
//                 searchValue: '',
//                 selectedOption: 'id_asc',
//                 showList: true
//             })
//             resetInput();
//         }

//         function handleBuyCustomersClick() {
//             request.then((data) => {
//                 setState({
//                     customers: data ? data.buyCustomers : [],
//                     searchValue: '',
//                     selectedOption: 'id_asc',
//                     showList: true
//                 })
//             })
//             resetInput();
//         }

//         function handleSuscribedCustomersClick() {
//             request.then((data) => {
//                 setState({
//                     customers: data ? data.suscribedCustomers : [],
//                     searchValue: '',
//                     selectedOption: 'id_asc',
//                     showList: true
//                 })
//             })
//             resetInput();
//         }

//         function handleUnsuscribedCustomersClick() {
//             request.then((data) => {
//                 setState({
//                     customers: data ? data.unsuscribedCustomers : [],
//                     searchValue: '',
//                     selectedOption: 'id_asc',
//                     showList: true
//                 })
//             })
//             resetInput();
//         }

//         all_customers__btn?.addEventListener('click', handleAllCustomersClick);
//         buy_customers__btn?.addEventListener('click', handleBuyCustomersClick);
//         suscribers_customers__btn?.addEventListener('click', handleSuscribedCustomersClick);
//         unsuscribers_customers__btn?.addEventListener('click', handleUnsuscribedCustomersClick);

//         return () => {
//         all_customers__btn?.removeEventListener('click', handleAllCustomersClick);
//         buy_customers__btn?.removeEventListener('click', handleBuyCustomersClick);
//         suscribers_customers__btn?.removeEventListener('click', handleSuscribedCustomersClick);
//         unsuscribers_customers__btn?.removeEventListener('click', handleUnsuscribedCustomersClick);
        
//         };
//     }, [allCustomers]);

//     async function init(){
//         const data = await GetCustomers();
//         if (data === undefined) {
//             setState({
//                 customers: [],
//                 searchValue: '',
//                 selectedOption: 'id_asc',
//                 showList: false
//             })
//         }
//         else{
//             setState({
//                 customers: data  as Customer[],
//                 searchValue: '',
//                 selectedOption: 'id_asc',
//                 showList: true
//             })
//         }
        
//     }
//     useEffect(() => {
//        init();
//     },[])
    
//   return {
//     state
//   }
// }


export default new useCustomersTable();
