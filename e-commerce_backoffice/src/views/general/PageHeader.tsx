import React, { FC } from 'react'
import { HeaderProps } from '../../models/HeaderProps'
import { SelectProps } from '../../models/SelectProps'
import MapOptionsRecord from './MapOptionsRecord'
import MapOptionsSettingsOptions from './MapOptionsSettingsOptions'
import { SettingsOptions } from '../../models/settings/SettingsOptions'


const PageHeader: React.FC<HeaderProps> = ({ title, link, isButton, buttonTitle, isSelect, isRecord, optionsList }) => {
  return (
    <div className='pageHeader'>
        <h1>{title}</h1>
        {isButton ? <a href={link.toString()} className='button create_button'>{buttonTitle}</a> : null}
        {isSelect ? <select className='chooseView'>
          {isRecord ? <MapOptionsRecord list={optionsList as Record<string,string>}/> : 
          <MapOptionsSettingsOptions list={optionsList as SettingsOptions}/>}
        </select> : null}
    </div>
  )
}

export default PageHeader