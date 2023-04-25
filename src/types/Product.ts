import { ISubProduct } from './../../types/interface';
import type { BaseProduct } from './BaseProduct'
import type SubProduct from '@/types/SubProduct'
import type { IProduct } from 'types/interface'
// import { getSubProduct } from '@/store/api/subProduct';
// import { computed } from 'vue'

export default class Product implements BaseProduct {
  label: string
  description?: string
  imageUrl?: string
  category?: number
  id: string
  subProducts: SubProduct[] | ISubProduct[] | undefined
  clientId: string
  productId: string
  constructor(product: IProduct) {
    this.id = product._id
    this.productId = product.productId
    this.label = product.label
    this.description = product.description
    this.imageUrl = product.imageUrl
    this.category = product.category
    this.subProducts = product.subProducts
    this.clientId = product.clientId
  }
  public getKey() {
    return 'product_' + this.productId
  }
  // fetchAllSubProduct = async () => {
  //   const subProducts = await getSubProduct({
  //     clientId : this.clientId,
  //     productId : this.productId,
  //   })
  //   return {
  //     [this.productId] : subProducts 
  //   }
  // }
  // addProduct = async () => {
  //   const clientAPIStore = useClientAPIStore()
  //   const productAPIStore = useProductAPIStore()
  //   const clientId = this.clientId ?? clientAPIStore.id
  //   const res = (await productAPIStore.addProduct({
  //     clientId,
  //     productId: this.productId,
  //   })) as boolean
  //   return res
  // }
  // hideProduct = async () => {
  //   const productAPIStore = useProductAPIStore()
  //   await productAPIStore.hideProduct({
  //     productId: this.productId,
  //     clientId: this.clientId,
  //   })
  // }
  // setLabel = async (label: string) => {
  //   const productAPIStore = useProductAPIStore()
  //   await productAPIStore.updateProductLabel({
  //     clientId: this.clientId,
  //     productId: this.productId,
  //     label,
  //   })
  // }
}
