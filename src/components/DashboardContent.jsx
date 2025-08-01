import React from 'react'
import PageOne from './PageOne'
import TopCustomers from './TopCustomers'
import VechicleInfo from './VechicleInfo'
import DriverVechiles from './DriverVechiles'
import Staff from './Staff'

const DashboardContent = () => {
  return (
    <div>
    <PageOne/>
    <TopCustomers/>
    <VechicleInfo/>
    <DriverVechiles/>
    <Staff/>
    </div>
  )
}

export default DashboardContent
