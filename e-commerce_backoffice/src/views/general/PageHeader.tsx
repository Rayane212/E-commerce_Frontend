import React, { FC } from 'react'
import { HeaderProps } from '../../models/HeaderProps'

const PageHeader: React.FC<HeaderProps> = ({ title, link, isButton, buttonTitle }) => {
  return (
    <div className='pageHeader'>
        <h1>{title}</h1>
        {isButton ? <a href={link.toString()} className='button create_button'>{buttonTitle}</a> : null}
    </div>
  )
}

export default PageHeader