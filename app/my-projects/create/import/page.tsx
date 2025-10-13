
import React from 'react'
import SidebarLayout from '@/components/ui/sideBar'
import { PageHeader } from '@/components/ui/pageHeader'
import { ImportURL } from '@/components/layout/importUrl'

function page() {
  return (
    <SidebarLayout>
         <ImportURL/>
    </SidebarLayout>
  )
}

export default page