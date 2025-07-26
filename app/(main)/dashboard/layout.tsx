import Header from '@/components/custom/Header'
import React from 'react'

function DashboardLayout({children}:any) {
  return (
    <div>
         <Header/>
        {children}</div>
  )
}

export default DashboardLayout