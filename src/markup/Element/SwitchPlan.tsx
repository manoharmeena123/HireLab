"use client";
import React from 'react'
import MembershipPlans from './MembershipPlan'

const SwitchPlan = () => {
  return (
    <div className="section-full content-inner-2 overlay-white-middle">
    <div className="container">
      <div className="section-head text-black text-center">
        <h2 style={{ fontWeight: "600" }} className="m-b0">
          Membership Plans
        </h2>
        <p>"Empowering Careers: CTC-BasedTiers,Your Path to Success."</p>
      </div>
      <MembershipPlans/>
    </div>
  </div>
  )
}

export default SwitchPlan