import React, { ChangeEvent, FC, useEffect } from 'react'
import { HeaderProps } from '../../../models/HeaderProps'
import MapOptionsRecord from '../MapOptionsRecord'
import MapOptionsSettingsOptions from '../MapOptionsSettingsOptions'
import { SettingsOptions } from '../../../models/settings/SettingsOptions'
import './page_header.css'

const PageHeader: React.FC<HeaderProps> = ({ title, link, isButton, buttonTitle, isSelect, isRecord, optionsList }) => {
  const redirectTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const linkToRedirect = (optionsList[e.target.value] as { link: string }).link;
    const titleNewPage = (optionsList[e.target.value] as { title: string }).title;
    window.location.href = '/settings' + linkToRedirect;
  }
  const changeSelectValue = (newValue:string) => {
    const select = document.querySelector('.chooseView') as HTMLSelectElement | null;
    if (select){
      select.value = newValue;
    }
  }
  const windowLocation = window.location.pathname;

  useEffect(() => {
    if (windowLocation.includes('/settings')) {
      const slicedPath = windowLocation.slice(10);
      // if(slicedPath === '') {
      //   window.location.href = '/settings/general';
      // }
      // else{
      //   changeSelectValue(slicedPath);
      // }
      changeSelectValue(slicedPath);
      
    }
  })
  
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