import React from 'react'
import Product from '@/types/Product'
// import { useClientStore, useProductAPIStore } from '@/store'
import type { IClient, IProduct } from 'types/interface'
// import { computed } from 'vue'
// import { useRecoilValue, useRecoilState ,useRecoilStateLoadable} from 'recoil'
// import { productList } from '@/store/client'
// import { getProduct } from '@/store/api/product'
// import { clientList } from '@/store/api/client'


export default class Client {
  id: string
  productIds: string[] | []
  subProductIds: string[] | []
  products: Product[] | null
  // fetchAllProduct: () => Promise<void>
  constructor(client: IClient) {
    this.id = client._id
    this.productIds = client.productIds
    this.subProductIds = client.subProductIds
    this.products = client.products
  }
  //  fetchAllProduct = async () => {
  //   console.log('fetch product')

  //   const res : IProduct[] = await getProduct(this.id)
  //   console.log(this)
  //   console.log(Object.defineProperty)
  //   return {
  //     [this.id] : res,
  //   }
    
  // }

}
