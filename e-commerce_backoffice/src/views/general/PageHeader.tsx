import React, { FC } from 'react'
import { HeaderProps } from '../../models/HeaderProps'
import { SelectProps } from '../../models/SelectProps'
import MapOptions from './MapOptions'


const PageHeader: React.FC<HeaderProps> = ({ title, link, isButton, buttonTitle, isSelect, optionsList }) => {
  return (
    <div className='pageHeader'>
        <h1>{title}</h1>
        {isButton ? <a href={link.toString()} className='button create_button'>{buttonTitle}</a> : null}
        {isSelect ? <select className='chooseView'>
          <MapOptions list={optionsList}/>
        </select> : null}
    </div>
  )
}

export default PageHeader