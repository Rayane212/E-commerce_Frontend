import React, { useEffect, useState } from 'react';

export default function PopUpSortOrders() {
    const [selectedOption, setSelectedOption] = useState('');
    
    useEffect(() => {
        if (selectedOption === ''){
            setSelectedOption('id_asc');
        }
    }, [selectedOption]);
    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };
  return (
    <fieldset className='pop_up_sort sort_fiels_container'>
        <select value={selectedOption} onChange={handleOptionChange} id='sort_select'>
            <option value="id_asc"> Par ID Croissant</option>
            <option value="id_desc"> Par ID Décroissant</option>
            <option value="name_asc"> Par Nom (A-Z)</option>
            <option value="name_desc"> Par Nom (Z-A)</option>
            <option value="price_asc"> Par Prix Croissant</option>
            <option value="price_desc"> Par Prix Décroissant</option>
            <option value="date_asc"> Par Date Chronologique </option>
            <option value="date_desc"> Par Date Antéchronologique</option>
        </select>
    </fieldset>
  )
}
