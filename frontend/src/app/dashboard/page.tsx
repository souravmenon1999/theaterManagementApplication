import MainSection from "@/components/dashBoard/mainSection"
import SideBar from "@/components/dashBoard/sidebar"

export default function Page() {
    return (

    <>

    <div className="flex flex-row">
        <div className=" w-80 sideBar  h-screen bg-slate-800">

            <SideBar/>

        </div>
        <div className=" w-full bg-gray-300">

            <MainSection/>

        </div> 
    </div>
        
        
       

            
            
            
        

    </>
        
    )
  }