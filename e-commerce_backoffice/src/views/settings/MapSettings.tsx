import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { MapSettingsProps } from '../../models/settings/MapSettingsProps';
import MapUsersSettings from './users/MapUsersSettings';

export default function MapSettings({ list, dicoText, dicoIcon, isArray }: MapSettingsProps) {
    return (
      <>
        {list.map((data: [string, any]) => {
            let infoTextAvailable = '';
            if (data[0] === 'shop_available'){
                infoTextAvailable = data[1] ? "Disponible" : "Indisponible";
            }
            if (typeof data[1] === 'boolean' && data[0] !== 'shop_available'){
                infoTextAvailable = data[1] ? "Oui" : "Non";
            } 
            if (!isArray){
                const divClassName = 'profil_infos_' + data[0];
                const textClassName = data[0] + ' shop_infos_read';
                const dataText = dicoText[data[0]];
                const dataIcon = dicoIcon[data[0]];
                return (
                    <div key={data[0]} className={divClassName}>
                        <div className='icon'>
                            <FontAwesomeIcon icon={['fas', dataIcon as IconName]} />
                        </div>
                        <div className='settings_text'> 
                            <p>{dataText}</p>
                            <p className={textClassName}>{infoTextAvailable !== '' ? infoTextAvailable : data[1]}</p>
                        </div>
                    </div>
                )
            }
            
            
        })}
      </>
    );
  }