import type { BaseProduct } from './BaseProduct'
// import { useClientAPIStore, useSubProductAPIStore } from '@/store'
import type { ISubProduct } from 'types/interface'

export default class SubProduct implements BaseProduct {
  label: string
  description?: string
  imageUrl?: string
  category?: number
  id: string
  clientId: string
  productId: string
  subProductId: string

  constructor(product: ISubProduct) {
    this.id = product._id
    this.label = product.label
    this.description = product.description
    this.imageUrl = product.imageUrl
    this.category = product.category
    this.clientId = product.clientId
    this.productId = product.productId
    this.subProductId = product.subProductId
  }
  public getKey() {
    return 'subProduct_' + this.subProductId
  }

  // addProduct = async () => {
  //   const clientAPIStore = useClientAPIStore()
  //   const subProductAPIStore = useSubProductAPIStore()
  //   const clientId = this.clientId ?? clientAPIStore.id
  //   const res = (await subProductAPIStore.addProduct({
  //     clientId,
  //     subProductId: this.subProductId,
  //   })) as boolean
  //   return res
  // }
  // hideProduct = async () => {
  //   const subProductAPIStore = useSubProductAPIStore()
  //   await subProductAPIStore.hideProduct({
  //     subProductId: this.subProductId,
  //     productId: this.productId,
  //     clientId: this.clientId,
  //   })
  // }
  // setLabel = async (label: string) => {
  //   const subProductAPIStore = useSubProductAPIStore()
  //   await subProductAPIStore.updateProduct({
  //     subProductId: this.subProductId,
  //     clientId: this.clientId,
  //     label,
  //   })
  // }
}
