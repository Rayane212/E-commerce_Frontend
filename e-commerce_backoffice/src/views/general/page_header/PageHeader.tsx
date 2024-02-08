import React from 'react'
import { HeaderProps } from '../../../models/HeaderProps'
import MapOptionsRecord from '../MapOptionsRecord'
import MapOptionsSettingsOptions from '../MapOptionsSettingsOptions'
import { SettingsOptions } from '../../../models/settings/SettingsOptions'
import './page_header.css'
import { useNavigate } from 'react-router-dom'

const PageHeader: React.FC<HeaderProps> = ({ title, link, isButton, buttonTitle, isSelect, isRecord, optionsList }) => {
  const settings_navigation = useNavigate();
  const redirectTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const linkToRedirect = '/settings' + (optionsList[e.target.value] as { link: string }).link;
    settings_navigation(linkToRedirect);
  }

  return (
    <div className='pageHeader'>
        <h1>{title}</h1>
        {isButton ? <a href={link.toString()} className='button create_button'>{buttonTitle}</a> : null}
        {isSelect ? <select className='chooseView' onChange={(e:React.ChangeEvent<HTMLSelectElement>) => redirectTo(e)}>
          {isRecord ? <MapOptionsRecord list={optionsList as Record<string,string>}/> : 
          <MapOptionsSettingsOptions list={optionsList as SettingsOptions}/>}
        </select> : null}
    </div>
  )
}

export default PageHeader