import React from 'react';
import { SelectProps } from '../../models/SelectProps';

const MapOptions: React.FC<SelectProps> = ({ list }) => {

  return (
    <>
    {Object.keys(list).map((item: string) => (
        <option value={item} key={item}> {list[item]}</option>
    ))}
    </>
  );
};

export default MapOptions;
