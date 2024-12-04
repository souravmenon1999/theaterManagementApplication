'use client'

import { Context } from '@/app/contextProvider'
import { useContext } from 'react'
import 'remixicon/fonts/remixicon.css'
import Component1 from './mainSection/component1'




export default function SideBar() {

    const {component1, component2, component1Click, component2Click} = useContext(Context)


    return (

        <>

        <div className="upperSection flex">
        <i className="ri-mail-line"></i>
        </div>

        <div className="bodySection">
            <ul>
                <li><button onClick={component1Click}>Theater</button></li>
                <li><button onClick={component2Click}>bookings</button></li>  
            </ul>
        </div>




        </>

    )
  }