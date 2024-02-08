import React from 'react'
import { MapSettingsProps } from '../../../models/settings/MapSettingsProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

export default function MapUsersSettings({ list, dicoText, dicoIcon }: MapSettingsProps) {
    return(
        <>
            {list.map((data: [string, any]) => {
                const dataArray = data[1];
                return(
                    <div className="flex_column" key={data[0]}>
                        <div className='admin_head flex_row '>
                            <div className='icon'>
                                <FontAwesomeIcon icon={['fas', dicoIcon['name'] as IconName]} />
                            </div>
                            <div className='admin_name'>
                                <p key={data[0] + '_name'}>{dataArray.name}</p>
                            </div>
                        </div>
                        
                        {/* <div className='admins_list_container'>
                            <div className='admin_info_row flex_row'>
                                <div className='icon'>
                                    <FontAwesomeIcon icon={['fas', dicoIcon['username'] as IconName]} />
                                </div>
                                <div className='admin_username admin_row_text'>
                                    
                                    <p key={data[0] + '_username'}>{dataArray.username}</p>
                                </div>
                            </div>
                            <div className='admin_info_row flex_row'>
                                <div className='icon'>
                                    <FontAwesomeIcon icon={['fas', dicoIcon['mail'] as IconName]} />
                                </div>
                                <div className='admin_mail admin_row_text'>
                                    
                                    <p key={data[0] + '_mail'}>{dataArray.mail}</p>
                                </div>
                            </div>
                            <div className='admin_info_row flex_row'>
                                <div className='icon'>
                                    <FontAwesomeIcon icon={['fas', dicoIcon['phone'] as IconName]} />
                                </div>
                                <div className='admin_phone admin_row_text'>
                                    
                                    <p key={data[0] + '_phone'}>{dataArray.phone}</p>
                                </div>
                            </div>
                            
                            
                        </div> */}
                    </div>
                )
            })}
        </>
    )
}
