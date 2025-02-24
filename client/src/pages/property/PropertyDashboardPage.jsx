import React from 'react'
import DashboardHeader from '../../components/Property/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Property/Layout/DashboardSideBar'
import DashboardHero from '../../components/Property/Layout/DashboardHero'

const PropertyDashboardPage = () => {
  return (
    <div>
        <DashboardHeader />

        <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
                <DashboardSideBar />
            </div>
            <DashboardHero />
        </div>
    </div>
  )
}

export default PropertyDashboardPage