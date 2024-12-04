'use client'

import { useContext } from "react"
import Component1 from "./mainSection/component1"
import Component2 from "./mainSection/component2"
import { Context } from "@/app/contextProvider"



export default function MainSection() {

    const {component1, component2, component1Click, component2Click} = useContext(Context)

    

  



    return (

        <>


       
            {component1 ? <Component1 /> : <Component2 />}
            
           



        </>

    )
  }