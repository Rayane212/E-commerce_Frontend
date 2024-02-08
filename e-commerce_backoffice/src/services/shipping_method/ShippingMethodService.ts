import GetAllShippingsMethod  from "../get_data/GetAllShippingsMethod"
import { ShippingMethod } from "../../models/ShippingMethod"

class ShippingMethodService{
    async getShippingMethodsInfos(){
        const shippingMethodsInfos = await GetAllShippingsMethod()
        return shippingMethodsInfos as ShippingMethod[]
    }
    getShippingMethodById(id: string){
        const shippingMethodsInfos = this.getShippingMethodsInfos()
        shippingMethodsInfos.then((shippingMethodsInfos: ShippingMethod[]) => {
            const result = shippingMethodsInfos.find((shippingMethod: ShippingMethod) => shippingMethod?.id === id)
            return result as ShippingMethod
        })
    }
    async getShippingMethodByHandle(handle: string): Promise<ShippingMethod[]>{
        const shippingMethodsInfos = await this.getShippingMethodsInfos()
        const result = shippingMethodsInfos.filter((shippingMethod: ShippingMethod) => shippingMethod?.handle === handle)
        return result as ShippingMethod[]
    }
}


export default new ShippingMethodService()