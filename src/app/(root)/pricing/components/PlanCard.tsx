import { PaymentType, Plan } from '@/app/types';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { tick } from '@/assets';

const PlanCard = ({
  plan,
}: {
  plan: { id: string; planDescriptions: Plan[]; type: PaymentType };
}) => {
  return (
    <>
      {plan.planDescriptions.map((item, i) => (
        <Card
          className="text-white bg-transparent gap-4 border-none max-sm:grid-cols-1 grid grid-cols-4"
          key={i + 10}
        >
          {item.planDescription.map((sub) => (
            <div className="bg-[#121212] shadow shadow-white/30 rounded-lg flex flex-col items-start  ">
              <CardHeader className="w-full ">
                <CardTitle className=" flex flex-col items-start gap-5">
                  <p className="text-white text-[14p] font-moranga font-extralight">
                    {sub.planTitle}
                  </p>
                  <p className="text-[22px] text-white font-extralight font-inter brightness-75">
                    {sub.price}
                  </p>
                  <p>{sub.subscribedUsers}</p>
                </CardTitle>
                <div
                  role="link"
                  className="  button button-as-link button-primary h-[20px]  button-lg p-[1px]  "
                >
                  <Link
                    href="/#early-access"
                    className="flex h-full   bg-[#111111] rounded-[2500rem] p-4 text-[14px] max-sm:text-[12px] max-sm:px-0  w-full justify-center items-center "
                  >
                    {sub.CTO}
                  </Link>
                </div>
                <p className="self-center text-[12px] font-inter font-extralight brightness-75">
                  {sub.CTODescription}
                </p>
              </CardHeader>

              <CardContent>
                <CardDescription className=" sapce-y-3">
                  {sub.planPoint.map((desc, i) => (
                    <div key={i + 1} className="flex gap-3">
                      <Image
                        src={tick}
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority
                        alt="Tick"
                        className="self-start"
                      />
                      <p>{desc}</p>
                    </div>
                  ))}
                </CardDescription>
              </CardContent>
            </div>
          ))}
        </Card>
      ))}
    </>
  );
};

export default PlanCard;
