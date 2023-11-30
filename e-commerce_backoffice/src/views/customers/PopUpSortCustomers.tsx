import React, { useEffect, useState } from 'react';
import useCustomersTable from '../../assets/tsx/customers/useCustomersTable';

export default function PopUpSortCustomers() {
  return (
    <fieldset className='pop_up_sort sort_fiels_container'>
        <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => useCustomersTable.customerSort(e)} id='sort_select'>
            <option value="id_asc"> Par ID Croissant</option>
            <option value="id_desc"> Par ID Décroissant</option>
            <option value="name_asc"> Par Nom (A-Z)</option>
            <option value="name_desc"> Par Nom (Z-A)</option>
            <option value="total_asc"> Par Total Croissant</option>
            <option value="total_desc"> Par Total Décroissant</option>
            <option value="articles_asc"> Par Nombre d'articles Croissant </option>
            <option value="articles_desc"> Par Nombre d'articles Décroissant</option>
            <option value="orders_asc"> Par Nombre de Commande Croissant </option>
            <option value="orders_desc"> Par Nombre d'articles Décroissant</option>
        </select>
    </fieldset>
  )
}
