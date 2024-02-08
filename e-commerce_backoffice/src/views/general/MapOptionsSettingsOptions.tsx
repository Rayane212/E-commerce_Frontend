import React from 'react';
import { SettingsOptionsProps } from '../../models/settings/SettingsOptionsProps';

const MapOptionsSettingsOptions: React.FC<SettingsOptionsProps> = ({ list }) => {
  return (
    <>
    {Object.entries(list).map(([key, value]) => (
      <option value={key} key={key}>{value.title}</option>
    ))}
    </>
  )
};

export default MapOptionsSettingsOptions;
