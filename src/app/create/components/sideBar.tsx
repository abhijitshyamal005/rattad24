import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderOpenDot, Link2Icon, LucideUsers, Menu, MenuIcon, MessageSquareTextIcon, MessageSquareWarning, PanelLeft, Plus, Telescope, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FormData } from "../types/formData";
import { UserMenu } from "./userMenu";

interface SideBarProps {
    isSideBarOpen: boolean;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
  
export const SideBar: React.FC<SideBarProps> = ({ isSideBarOpen, setIsSideBarOpen, formData, setFormData }) => {
    const router = useRouter();
    
    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    const handleSubmitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const db = getFirestore();
    
          const userDocRef = doc(db, "feedback", formData.userUid);
          await setDoc(userDocRef, {
            firstName: formData.firstName,
            email: formData.email,
            feedback: formData.feedback,
          });
    
            router.push("/create");  
        } catch (error: any) {
          const errorMessage = error.message || "An error occurred, please try again.";
          console.error('Error submitting feedback:', error);
    
          console.log("Error:", errorMessage);
        } finally {
          setFormData(
            prevState => ({
                ...prevState,
                feedback: '',
            }
          ));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
    };

    
    return (
        <div className="bg-primary h-[100vh]">
            {/* sidebar */}
            <div className={`${isSideBarOpen ? 'flex' : 'hidden'} absolute left-0 top-0 z-50 flex flex-col justify-between h-[100vh] lg:h-full lg:max-w-[350px] bg-primary border-r-2 border-r-primary w-[85%]`}>
                <div className="flex flex-col items-center justify-center">
                    {/* logo and create */}
                    <div className="w-full px-2.5 flex items-center mt-5 justify-between">
                        <Image
                            src="/logo.png"
                            alt="simplecx name logo"
                            width={300}
                            height={30}
                            className="w-[150px] h-fit"
                            />
                        
                        {/* <Link href="/create">
                            <Button className="w-[40px] h-[40px] bg-gradient-to-r from-red to-purple rounded-full px-0 shadow-none hover:bg-transparent">
                                <Plus className="min-w-[22px] min-h-[22px]" />
                            </Button>
                        </Link> */}

                        <Button className="lg:flex hidden bg-transparent shadow-none hover:bg-transparent" onClick={toggleSideBar}>
                            <PanelLeft className="min-w-[22px] min-h-[22px]" />
                        </Button>
                    </div>

                    {/* about and templates */}
                    <div className={`flex mt-10 flex-col items-start gap-3 justify-center w-[90%]`}>
                        <Link href="/about" className="w-full">
                            <Button className="w-full shadow-none rounded-xl hover:bg-primary flex items-center justify-start">
                                <Image
                                    src="/dark.png"
                                    alt="simplecx name logo"
                                    width={300}
                                    height={30}
                                    className="w-[22px] h-fit"
                                    />
                                About simplecx
                            </Button>
                        </Link>

                        <Link href="/templates" className="w-full">
                            <Button className="w-full shadow-none rounded-xl hover:bg-primary flex items-center justify-start">
                                <Telescope className="min-w-[20px] min-h-[20px] text-muted-foreground" />
                                Explore prompt templates
                            </Button>
                        </Link>

                        <p className="text-white text-sm mt-5">Today</p>
                        <p className="mt-2 text-muted-foreground text-xs">You have not created any project today.</p>

                    </div>
                </div>

                {/* miscellaneous */}
                <div className="flex flex-col items-center justify-center w-full">
                    <Separator orientation="horizontal" className="w-[90%] bg-muted-foreground my-5" />

                    <Link href="/socials" className="w-full">
                        <Button  disabled className="mt-5 w-full shadow-none rounded-xl hover:bg-primary flex items-center justify-start">
                            <Link2Icon className="min-w-[20px] min-h-[20px] text-muted-foreground" />
                            Connect socials
                        </Button>
                    </Link>

                    <Link href="/create" className="w-full">
                        <Button disabled className="w-full shadow-none rounded-xl hover:bg-primary flex items-center justify-start">
                            <FolderOpenDot className="min-w-[20px] min-h-[20px] text-muted-foreground" />
                            Resources
                        </Button>
                    </Link>

                    <Link href="https://chat.whatsapp.com/Fekr73l3efXG2KiB9jGUTU" className="w-full">
                        <Button className="w-full shadow-none rounded-xl hover:bg-primary flex items-center justify-start">
                            <LucideUsers className="min-w-[20px] min-h-[20px] text-muted-foreground" />
                            Join community
                        </Button>
                    </Link>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full shadow-none rounded-xl hover:bg-primary flex items-center justify-start">
                                <MessageSquareWarning className="min-w-[20px] min-h-[20px] text-muted-foreground" />
                                Send Feeback
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] text-white bg-primary border-none">
                        <form onSubmit={handleSubmitFeedback}>
                            <DialogHeader>
                            <DialogTitle className="text-white font-moranga">Send Feedback</DialogTitle>
                            <DialogDescription>
                                Tell us what the issue is, so we can serve you better
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-start gap-4">
                                <label htmlFor="username" className="text-right text-white">
                                Your Feedback
                                </label>
                                <Textarea id="feedback" name="feedback"
                                    value={formData.feedback}
                                    onChange={handleChange}
                                    className="h-[64px] col-span-3 " />
                            </div>
                            </div>
                            <DialogFooter>
                            <DialogClose asChild>
                                <Button disabled={formData.feedback === ''} type="submit" className="py-5 bg-gradient-to-r from-red to-purple rounded-full">Submit!</Button>
                            </DialogClose>
                            </DialogFooter>
                        </form>
                        </DialogContent>
                    </Dialog>

                    <Separator orientation="horizontal" className="w-[90%] bg-muted-foreground my-5" />

                    <div className="hidden lg:flex w-[90%] flex-col gap-1.5 justify-center items-center">
                        <div className="flex w-full justify-between items-center">
                            <p className="text-sm text-white">Free</p>
                            <p className="text-sm text-muted-foreground">Credits</p>
                        </div>
                        <div className="flex w-full justify-between items-center">
                            <p className="text-xs text-muted-foreground">Current plan</p>
                            <p className="text-xs text-muted-foreground">{formData.credits}/500</p>
                        </div>
                    </div>

                    <Link href="/upgrade" className="hidden lg:flex w-full p-5 flex-col mt-5 bg-black gap-1.5 justify-center items-center">
                        <div className="flex flex-col w-full justify-center items-start">
                            <p className="text-sm text-white">Upgrade to Paid</p>
                            <p className="text-sm text-muted-foreground">Get 15-60% off & best features</p>
                        </div>
                    </Link>

                    <UserMenu formData={formData} setFormData={setFormData} className="w-full lg:hidden" />

                </div>                  
            </div>
        </div>
    );
};
