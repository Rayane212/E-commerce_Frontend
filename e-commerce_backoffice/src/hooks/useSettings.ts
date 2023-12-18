import React from 'react'
import GetGeneralInfos from '../services/settings/GetGeneralInfos'
import GetContactInfos from '../services/settings/GetContactInfos'
import GetNotificationsInfos from '../services/settings/GetNotificationsInfos'
import GetDicoText from '../services/settings/GetDicoText'
import GetDicoIcon from '../services/settings/GetDicoIcon'
import GetAllEmployees from '../services/settings/GetAllEmployees'
import GetAllAdmins from '../services/settings/GetAllAdmins'
import GetAllPaymentsProcessorSettings from '../services/settings/GetAllPaymentsProcessorSettings'
import GetAllCheckoutFormSettings from '../services/settings/GetAllCheckoutFormSettings'
import GetAllPaymentLegalInfos from '../services/settings/GetAllPaymentLegalInfos'
import GetCheckoutAvailability from '../services/settings/GetCheckoutAvailability'
import GetAllShippingsMethod from '../services/settings/GetAllShippingsMethod'



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
  async getEmployeesInfos(){
    const employeesInfos = await GetAllEmployees();
    return employeesInfos
  }
  async getAdminsInfos(){
    const adminsInfos = await GetAllAdmins();
    return adminsInfos
  }
  async getWorkers(){
    const employeesInfos = await this.getEmployeesInfos()
    const adminsInfos = await this.getAdminsInfos()
    const workers = {
      employeesInfos,
      adminsInfos
    }
    return workers
  }

  async getPaymentSettings(){
    const paymentsProcessorSettings = await this.getPaymentsProcessorSettings()
    const paymentsCheckoutFormSettings = await this.getPaymentsCheckoutFormSettings()
    const paymentsLegalInfos = await this.getPaymentsLegalInfos()
    const checkout_availability = await this.getPaymentCheckoutAvailability()
    const paymentSettings = {
      paymentsProcessorSettings,
      checkout_availability,
      paymentsCheckoutFormSettings,
      paymentsLegalInfos
    }
    return paymentSettings
  }
  async getPaymentCheckoutAvailability(){
    const checkout_availability = await GetCheckoutAvailability()
    return checkout_availability
  }
  async getPaymentsProcessorSettings(){
    const paymentsProcessorSettings = await GetAllPaymentsProcessorSettings()
    return paymentsProcessorSettings
  }
  async getPaymentsCheckoutFormSettings(){
    const paymentsCheckoutFormSettings = await GetAllCheckoutFormSettings()
    return paymentsCheckoutFormSettings

  }
  async getPaymentsLegalInfos(){
    const paymentsLegalInfos = await GetAllPaymentLegalInfos()
    return paymentsLegalInfos
  }
  async getShippingMethodsInfos(){
    const shippingMethodsInfos = await GetAllShippingsMethod()
    return shippingMethodsInfos
  }

}

export default new useSettings()