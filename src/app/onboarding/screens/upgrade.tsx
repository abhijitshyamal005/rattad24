
import Pricing from "@/app/(root)/pricing/components";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export const Upgrade: React.FC = () => {
    const router = useRouter();

    const handleSkip = () => {
        router.push("/create");
    }

    return (
        <div className="relative flex items-center gap-5 w-full flex-col justify-start pt-5 h-full">

            <Button className="absolute top-0 right-2 bg-transparent hover:bg-transparent shadow-none" onClick={handleSkip}>
                <X className="text-white min-h-[35px] min-w-[35px]" />
            </Button>

            <div className="flex items-center gap-1.5 justify-center w-[90%] mt-10">
                <p className="text-white lg:text-4xl text-2xl text-center font-moranga">Be a Super Unicorn and Become Unstoppable. Upgrade to Premium and Create Without Stress.</p>
            </div>

            <div className="flex lg:w-[70%] items-center justify-center">
                <Pricing />
            </div>
        </div>
    );
}