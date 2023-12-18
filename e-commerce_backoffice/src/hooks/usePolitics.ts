import React from 'react'
import policies from '../data/json/policies.json'
import { Policies } from '../models/settings/Policies'
import { Policy } from '../models/settings/Policy';

export default new class usePolitics{
    async getPolitics(){
        const data: Policies = {
            "legal_notice": await this.getLegalNotice() as Policy,
            "privacy_policy": await this.getPrivacyPolicy() as Policy,
            "terms_of_sale": await this.getTermsOfSales() as Policy,
            "refund_policy": await this.getReturnPolicy() as Policy,
            "shipping_policy": await this.getShippingPolicy() as Policy,
            "cookies_policy": await this.getCookiePolicy() as Policy,
        };
        return data

    }
    async getLegalNotice(){
        const data = policies;
        let politic: Policy = {"handle": "","content": ""};
        data.forEach((policy: any) => {
            if (policy?.legal_notice){
                politic = policy?.legal_notice as Policy;
            }
        })
        if (politic !== undefined){
           return politic as Policy
        }
    }
    async getTermsOfSales(){
        const data = policies;
        let politic: Policy = {"handle": "","content": ""};
        data.forEach((policy: any) => {
            if (policy?.terms_of_sale){
                politic = policy?.terms_of_sale as Policy;
            }
        })
        if (politic !== undefined){
           return politic as Policy
        }
    }
    
    async getPrivacyPolicy(){
        const data = policies;
        let politic: Policy = {"handle": "","content": ""};
        data.forEach((policy: any) => {
            if (policy?.privacy_policy){
                politic = policy?.privacy_policy as Policy;
            }
        })
        if (politic !== undefined){
           return politic as Policy
        }
    }
    async getCookiePolicy(){
        const data = policies;
        let politic: Policy = {"handle": "","content": ""};
        data.forEach((policy: any) => {
            if (policy?.cookies_policy){
                politic = policy?.cookies_policy as Policy;
            }
        })
        if (politic !== undefined){
           return politic as Policy
        }
  
    }
    async getReturnPolicy(){
        const data = policies;
        let politic: Policy = {"handle": "","content": ""};
        data.forEach((policy: any) => {
            if (policy?.refund_policy){
                politic = policy?.refund_policy as Policy;
            }
        })
        if (politic !== undefined){
           return politic as Policy
        }
  
    }
    async getShippingPolicy(){
        const data = policies;
        let politic: Policy = {"handle": "","content": ""};
        data.forEach((policy: any) => {
            if (policy?.shipping_policy){
                politic = policy?.shipping_policy as Policy;
            }
        })
        if (politic !== undefined){
           return politic as Policy
        }
  
    }
}
