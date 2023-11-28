import React, { useEffect, useState } from 'react';

export default function PopUpSortProducts() {
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
            <option value="name_asc"> Par Produit (A-Z)</option>
            <option value="name_desc"> Par Produit (Z-A)</option>
            <option value="price_asc"> Par Prix Croissant</option>
            <option value="price_desc"> Par Prix Décroissant</option>
            <option value="stock_asc"> Par Stock Croissant</option>
            <option value="stock_desc"> Par Stock Décroissant</option>
        </select>
    </fieldset>
  )
}
