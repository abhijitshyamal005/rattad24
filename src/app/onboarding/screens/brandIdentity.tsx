
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FormData } from "../types/formData";
import { Separator } from "@/components/ui/separator";

interface BrandIdentityProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    progress: number;
}


export const BrandIdentity: React.FC<BrandIdentityProps> = ({ formData, setFormData, setStage, progress }) => {

    const identities = [
        "Professional & Authoritative",
        "Casual & Friendly",
        "Innovative & Trendy",
        "Inspirational & Motivational",
        "Funny & Witty",
        "Educational & Informative",
    ];
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
    };

    const handleSubmit = () => {
        setStage(2);
    };

    return (
        <div className="flex items-center gap-5 w-full flex-col justify-start pt-5 h-full">
            <Image
                src="/logo.png"
                alt="simplecx logo"
                width={300}
                height={30}
                className="w-[150px] h-fit"
                />
            <Separator orientation="horizontal" />
            
            <p className="text-white lg:text-4xl text-2xl font-moranga">Brand Identity & Voice</p>

            <div className="flex items-center w-full lg:w-[70%] justify-center">
                <Button className="bg-transparent hover:bg-transparent shadow-none" onClick={() => setStage(0)}>
                    <ChevronLeft className="min-w-[30px] min-h-[30px]" />
                </Button>
                <Progress value={progress} className="h-[20px] rounded-xl" />
            </div>

            <div className="flex items-center gap-1.5 justify-center w-[90%]">
                <Image src="/mascot/mascot-ft.png" className="-ml-10" width={200} height={400} alt="Mascot" priority />
                <div className="-ml-10 lg:rounded-full rounded-2xl p-5 bg-gradient-to-r from-red to-purple">
                    <TypingAnimation className="text-white font-inter" duration={30}>Almost done, how do you want your brand to sound?</TypingAnimation>
                </div>
            </div>

            <div className="flex lg:max-w-[50%] w-full flex-col gap-5 items-center justify-center">
                {/* business industry */}
                <div className="flex flex-col w-fit items-center justify-center gap-1.5">
                    <p className="text-white font-inter text-lg">Select your brand identity/voice</p>
                    <ToggleGroup
                        type="single"
                        className="flex flex-wrap lg:w-[60%] gap-3"
                        value={formData.brandIdentity}
                        onValueChange={(value) => {
                            setFormData(prevState => ({
                                ...prevState,
                                brandIdentity: value,
                            }));
                        }}>
                        {
                            identities.map((identity, index) => (
                                <ToggleGroupItem key={index} value={identity} className="bg-primary text-white" aria-label="Toggle bold">
                                    {identity}
                                </ToggleGroupItem>
                            ))
                        }
                    </ToggleGroup>
                </div>

                <div className="flex flex-col lg:w-[50%] w-full gap-5 items-center justify-center">   
                    {/* brand guidelines */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="lname" className="text-white font-inter">Upload Your Brand Guidelines (Optional but Recommended)</label>
                        <Input
                            className="rounded-lg h-[54px] w-[90%] lg:max-w-sm text-white"
                            type="text"
                            placeholder="What's your business name?"
                            value={formData.brandGuidelines}
                            name="brandGuidelines"
                            onChange={handleChange} />
                    </div>


                </div>
                
            </div>
            
            <div className="flex w-[90%] lg:max-w-[50%] items-center justify-end">
                <Button className="text-white rounded-full shadow-2xl h-[54px] px-1 bg-gradient-to-r from-red to-purple" onClick={handleSubmit}>
                    <div className="bg-black rounded-full h-[50px] flex items-center p-5">
                        Continue
                    </div>
                </Button>
            </div>
        </div>
    );
}