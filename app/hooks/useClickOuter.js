import { useEffect } from "react";
import { useRef } from "react";

export default function useClickOuter(callback){
   const dropdownRef = useRef(null);
   const buttonRef = useRef(null);

   function handleCLick(e){
      if(dropdownRef.current && buttonRef.current != e.target && !dropdownRef.current.contains(e.target)){
        callback()
      }
   }

   useEffect(()=>{
     document.addEventListener('click' , handleCLick);

     return ()=>{
        document.removeEventListener('click' , handleCLick);  
     }
   })

   return {dropdownRef , buttonRef}
}