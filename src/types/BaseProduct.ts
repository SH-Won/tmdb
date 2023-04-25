import type SubProduct from '@/types/SubProduct'
import { ISubProduct } from 'types/interface'

export interface BaseProduct {
  id: string
  imageUrl?: string
  label: string
  productId?: string
  subProductId?: string
  subProducts?: SubProduct[] | ISubProduct[]
  clientId? : string
  getKey(): string
  // hideProduct(): Promise<void>
  // addProduct(): Promise<boolean>
  // setLabel(label: string): Promise<void>
}
