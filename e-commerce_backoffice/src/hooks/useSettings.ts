import React from 'react'
import GetGeneralInfos from '../services/get_data/GetGeneralInfos'
import GetContactInfos from '../services/get_data/GetContactInfos'
import GetNotificationsInfos from '../services/get_data/GetNotificationsInfos'
import GetDicoText from '../services/get_data/GetDicoText'
import GetDicoIcon from '../services/get_data/GetDicoIcon'
import GetAllEmployees from '../services/get_data/GetAllEmployees'
import GetAllAdmins from '../services/get_data/GetAllAdmins'
import GetAllPaymentsProcessorSettings from '../services/get_data/GetAllPaymentsProcessorSettings'
import GetAllCheckoutFormSettings from '../services/get_data/GetAllCheckoutFormSettings'
import GetAllPaymentLegalInfos from '../services/get_data/GetAllPaymentLegalInfos'
import GetCheckoutAvailability from '../services/get_data/GetCheckoutAvailability'
import GetAllShippingsMethod from '../services/get_data/GetAllShippingsMethod'



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
  
}

export default new useSettings()