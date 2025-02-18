'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { type PricingPlan, pricingData } from './pricingData';
import { type TabId, tabData } from './tabData';
import { createCheckoutSession } from '../../../../../stripe/createCheckoutSession';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type PlanTypes = "dynamicFree" | "dynamicMonthlyStarter" | "dynamicMonthlyPro" | "dynamicYearlyStarter" | "dynamicYearlyPro" |
                  "bundleFree" | "bundleMonthlyUnicorn" | "bundleMonthlySuperUnicorn" | "bundleYearlyUnicorn" | "bundleYearlySuperUnicorn" |
                  "creditFree" | "creditMonthlyUnique" | "creditMonthlyUnicorn" | "creditMonthlyCustom" | "creditYearlyUnique" | "creditYearlyUnicorn" |
                  "freelanceFree" | "freelanceMonthlyPro" | "freelanceYearlyStarter" | "freelanceYearlyPro";

interface PricingProps {
  uid?: string;
};

const Pricing: React.FC<PricingProps> = ({uid}) => {
  const [activeTab, setActiveTab] = useState<TabId>('bundle');
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const router = useRouter();

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId)
  }

  const plans = isYearly
    ? pricingData[activeTab].yearlyPlans
    : pricingData[activeTab].monthlyPlans

  const handleUpgrade = (planType: PlanTypes) => {
    console.log("UID: ", uid);
    if (uid !== "" && uid !== undefined) {
      createCheckoutSession(uid || '', planType);
    } else {
      router.push("/login");
    }
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-black w-full text-white py-12'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-moranga'>
          <span className='bg-gradient-to-r from-[#ea0022] to-[#754de8] bg-clip-text text-transparent'>
            Select the Plan that Works Best for You
          </span>
        </h1>
      </div>

      {/* Tabs */}
      <div className='flex justify-center w-[90%] space-x-6 pt-16 mb-10'>
        {tabData.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`text-xs pb-2 relative ${
              activeTab === tab.id ? 'text-white' : 'text-white'
            }`}
          >
            {tab.label.toUpperCase()}
            {activeTab === tab.id && (
              <span className='absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-[#EA0022] to-[#754DE8]' />
            )}
          </button>
        ))}
      </div>

      {/* Toggle Monthly/Yearly */}
      <div className='flex justify-center font-light mb-2 w-[90%]'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => setIsYearly(false)}
            className={`px-4 py-2 text-sm relative text-white`}
          >
            BILLED MONTHLY
            {!isYearly && (
              <span className='absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-[#EA0022] to-[#754DE8]' />
            )}
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-4 py-2 text-sm relative text-white`}
          >
            BILLED ANNUALLY{' '}
            <span className='font-semibold bg-gradient-to-r from-[#ea0022] to-[#754de8] bg-clip-text text-transparent'>
              (Save 20%)
            </span>
            {isYearly && (
              <span className='absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-[#EA0022] to-[#754DE8]' />
            )}
          </button>
        </div>
      </div>
      <div className='text-center mb-5 mt-5 font-light text-2xl'>
        Lock in 10-20% discount for future upgrades!
      </div>

      {/* Disclaimer */}
      <div className='text-center whitespace-normal w-[90%] lg:w-full text-gray-400 mb-10 font-light italic text-xs lg:text-sm'>
        *By signing up, you consent to abide by our Terms of Service and Privacy
        Policy.
      </div>

      {/* Pricing Cards */}
      <div className='flex justify-center gap-8 flex-wrap'>
        {plans.map((plan: PricingPlan, index: number) => (
            plan.planType.includes('dynamic') || plan.planType.includes("freelance") ? (
          <div key={index} className='bg-[#0c0c0c] rounded-3xl p-6 w-72 h-96 shadow-lg relative'>
            <p className='font-moranga'>Coming Soon...</p>
          </div>
            ) : (
          <div
            key={index}
            className='bg-[#0c0c0c] rounded-3xl p-6 w-72 h-fit shadow-lg relative'
          >
            {plan.badge && (
              <span className='absolute top-6 right-3 transform -translate-y-1/2 -translate-x-1/2 text-xs bg-gradient-to-r from-[#ea0022] to-[#754de8] text-white px-2 py-1 rounded-full'>
                {plan.badge}
              </span>
            )}
            <h3 className='text-sm font-moranga'>{plan.title}</h3>
            <p className='text-xl font-light'>{plan.price}</p>
            <div
              role='link'
              className='button button-as-link button-primary mt-7 w-full button-xs p-[1px]'
            >
              <Button
                onClick={() => handleUpgrade(plan.planType as PlanTypes)}
                disabled={plan.planType.includes("dynamicFree") || plan.planType.includes("creditFree") || plan.planType.includes("bundleFree")}
                className='flex h-full whitespace-normal w-full bg-[#111111] rounded-full justify-center items-center text-center px-6 py-3 text-xs font-medium hover:bg-purple-500 text-white'
              >
                {plan.button}{' '}
              </Button>
            </div>
            <p className='ml-2 text-xs text-center mt-3 mb-5'>
              {plan.buttonNextText}
            </p>
            <ul className='text-sm text-white font-light mt-10 space-y-2'>
              {plan.features.map((feature, i) => (
                <li key={i} className='flex items-center gap-2'>
                  <span className='w-2 h-2 bg-gradient-to-r from-[#ea0022] to-[#754de8] rounded-full'></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
            )

        ))}
      </div>
    </div>
  )
}

export default Pricing
