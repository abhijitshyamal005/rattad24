import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PlanCard from './components/PlanCard';
import { Subscriptions } from './constant';
import { PLAN_NAME, PaymentType } from '@/app/types';
import Counter from '@/components/CounterWrapper';
function Page() {
  return (
    <div className="max-w-[1500px] px-6 sm:px-4 relative   w-full mx-auto py-12 flex flex-col">
      <div className=" absolute -right-[50px] -top-[200px] max-sm:hidden">
        <Counter />
      </div>
      {/* Header */}
      <div className="mx-auto">
        <h1 className="text-[33px] sm:text-[50px] font-moranga font-extralight text-center bg-gradient-to-r from-[#EA0022] to-[#754DE8] inline-block text-transparent bg-clip-text">
          Select the Plan that Works Best for You
        </h1>
      </div>
      <div className="flex-1 md:mt-16">
        <Tabs defaultValue={Subscriptions[0].id}>
          <TabsList className="bg-black font-inter text-[16px] flex-wrap space-y-1 mb-2">
            {Subscriptions.map((mainPlan) => (
              <TabsTrigger key={mainPlan.id} value={mainPlan.id}>
                {mainPlan.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {Subscriptions.map((mainPlan) => (
            <TabsContent key={mainPlan.id} value={mainPlan.id}>
              <Tabs defaultValue={mainPlan.subPlans[0].id}>
                <TabsList className="bg-black w-full mx-auto mt-5">
                  {mainPlan.subPlans.map((subPlan) => (
                    <TabsTrigger key={subPlan.id} value={subPlan.id}>
                      {subPlan.type}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div className="flex flex-col  items-center mt-5 font-inter">
                  <h2 className="text-white text-[20px] brightness-90 ">
                    Lock in 10-20% Discount for Future Upgrades!
                  </h2>
                  <p className="text-[14px] text-white brightness-50 font-inter italic">
                    *By signing up, you consent to abide by out Terms of Service
                    and Privacy Policy.
                  </p>
                </div>

                {mainPlan.subPlans.map((subPlan) => (
                  <TabsContent
                    className="mt-8"
                    key={subPlan.id}
                    value={subPlan.id}
                  >
                    <PlanCard plan={subPlan} />
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default Page;
