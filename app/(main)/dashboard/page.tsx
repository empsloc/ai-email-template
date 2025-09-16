"use client"
import { useUserDetail } from '@/app/provider'
import EmailTemplateList from '@/components/custom/EmailTemplateList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Dashboard() {
  const { userDetail } = useUserDetail()

  return (
    <div>
      <div className="p-4 sm:p-6 md:px-16 lg:px-28 xl:px-40 mt-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-bold text-2xl sm:text-3xl text-center sm:text-left">
            Hello, {userDetail?.name}
          </h2>
          <Link href="/dashboard/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto cursor-pointer">
              + Create New Email Template
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          <EmailTemplateList />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
