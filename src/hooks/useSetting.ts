import { useState } from "react"

const useSetting = () => {
  const [productLayout, setProductLayout] = useState<string>(localStorage.getItem('layout') as string)
  
  const setLayOut = (layout : string) => {
    localStorage.setItem('layout',layout)
    setProductLayout(layout)
  }
  
  return {
    productLayout,
    setLayOut,
  }

}
export {useSetting}