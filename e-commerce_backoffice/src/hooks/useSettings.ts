import React from 'react'
import GetGeneralInfos from '../services/settings/GetGeneralInfos'
import GetContactInfos from '../services/settings/GetContactInfos'
import GetNotificationsInfos from '../services/settings/GetNotificationsInfos'

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
}

export default new useSettings()