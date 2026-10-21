import {createContext,useContext,useMemo,useState} from 'react';
import {demoData} from '../data/demoData';
export const PortalContext=createContext(null);
export function PortalProvider({children}){const [selectedCart,setSelectedCart]=useState(null);const data=demoData;const selectCart=(source,lots,quantities)=>{const ticketCount=quantities.reduce((a,b)=>a+b,0);const totalPrice=ticketCount*data.ticketPrice;setSelectedCart({source,ticketCount,totalPrice,walletBefore:data.customer.walletBalance,canAfford:totalPrice<=data.customer.walletBalance,topUpRequired:Math.max(0,totalPrice-data.customer.walletBalance),lotteryItems:lots.map((l,i)=>({lottery:l.name,quantity:quantities[i]})).filter(l=>l.quantity>0)});};const value=useMemo(()=>({data,selectedCart,selectCart,clearCart:()=>setSelectedCart(null)}),[selectedCart]);return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>}
export const usePortal=()=>useContext(PortalContext);
