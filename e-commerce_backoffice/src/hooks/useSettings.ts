import React from 'react'
import GetGeneralInfos from '../services/settings/GetGeneralInfos'
import GetContactInfos from '../services/settings/GetContactInfos'
import GetNotificationsInfos from '../services/settings/GetNotificationsInfos'
import GetDicoText from '../services/settings/GetDicoText'
import GetDicoIcon from '../services/settings/GetDicoIcon'

class useSettings{
  async getGeneralShopInfos(){
    const generalInfos = await GetGeneralInfos() 
    return generalInfos
  }
  async getContactShopInfos(){
    const contactInfos = await GetContactInfos() 
    return contactInfos
  }
  async getNotificationsShopInfos(){
    const notificationsInfos = await GetNotificationsInfos() 
    return notificationsInfos
  }
  async getShopInfos(){
    const generalInfos = await this.getGeneralShopInfos()
    const contactInfos = await this.getContactShopInfos()
    const notificationsInfos = await this.getNotificationsShopInfos()
    const shopInfos = {
      generalInfos,
      contactInfos,
      notificationsInfos
    }
    return shopInfos
  }
  getDicoText(){
    const dicoText = GetDicoText()
    return dicoText
  }
  getDicoIcon(){
    const dicoIcon = GetDicoIcon()
    if (dicoIcon !== undefined){
      return dicoIcon
    }
  }
}

export default new useSettings()