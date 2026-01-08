import React, { useCallback, useState } from 'react'

const [length,setLength]=useState(8);
const [numberAllowed,setNumber]=useState(false);
const [charAllowed,seCharacter]=useState(false);
const [password,setPassword]=useState("");

const passwordGenerator=useCallback(()=>{
    let password=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str +="0123456789"
    if(charAllowed) str+="@#$%^&*(){}[]";


},[length,numberAllowed,charAllowed,setPassword])
function Practice() {
  return (
    <div>
      
    </div>
  )
}

export default Practice
