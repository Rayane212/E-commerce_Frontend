import React from 'react';

interface SortOptionsProps {
  list: Record<string, string>;
}

const SortOptions: React.FC<SortOptionsProps> = ({ list }) => {

  return (
    <>
    {Object.keys(list).map((item: string) => (
        <option value={item} key={item}> {list[item]}</option>
    ))}
    </>
  );
};

export default SortOptions;
