export interface PaymentCheckoutForm {
    isLastNameOnly : boolean;
    isCompletName : boolean;
    isBusinessNameIncluded : boolean;
    isBusinessNameRequired : boolean;
    isSecondAddressLineIncluded : boolean;
    isSecondAddressLineRequired : boolean;
    isPhoneNumberIncluded : boolean;
    isPhoneNumberRequired : boolean;
    isMarketingMailOptInIncluded : boolean;
    isMaketingMailOptInPreSelected : boolean;
    isMarketingSMSOptInIncluded : boolean;
    isMarketingSMSOptInPreSelected : boolean;
    useShippingAddressAsBillingAddress : boolean;
}