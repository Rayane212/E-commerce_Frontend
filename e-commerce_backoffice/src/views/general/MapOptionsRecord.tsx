import React from 'react';
import { SelectProps } from '../../models/SelectProps';

const MapOptionsRecord: React.FC<SelectProps> = ({ list }) => {
  return (
    <>
    {Object.keys(list).map((item: string) => (
        <option value={item} key={item}> {list[item]}</option>
    ))}
    </>
  );
};

export default MapOptionsRecord;
