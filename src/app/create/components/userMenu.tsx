
import { firebaseAuth } from "@/app/utils/firebaseConfig";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { signOut } from "firebase/auth";
import { LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { FormData } from "../types/formData";

interface UserMenuProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    className?: string;
}

  
export const UserMenu: React.FC<UserMenuProps> = ({ formData, setFormData, className }) => {
    const router = useRouter();
    const setPrompt = (prompt: string) => {
        setFormData(prevState => ({
            ...prevState,
            prompt: prompt,
        }));
    };

    const handleSignOut = () => {
        signOut(firebaseAuth).then(() => {
            router.push("/login");
          }).catch((error) => {
            console.error("Could not sign out", error);
          });
    };

    return (
        <div className={cn(
            '',
            className
          )}>
            {/* User Info and Plan */}
            <div className="w-full mt-5 p-3 flex flex-col items-start gap-5 rounded-2xl justify-center">
              <div className="flex items-center gap-3 justify-center">
                <Avatar className="border-2 w-[40px] h-[40px]">
                  <AvatarImage src="/guy.png" />
                  <AvatarFallback>{formData.firstName.charAt(0).concat(formData.lastName.charAt(0))}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-start justify-center">
                  <p className="text-white font-medium text-sm">{formData.firstName} {formData.lastName}</p>
                  <p className="text-white text-xs">{formData.email}</p>
                </div>
              </div>

              <div className="w-full flex flex-col items-center justify-between">
                <div className="flex w-full items-center justify-between py-2">
                    <p className="text-white font-medium text-sm px-5 rounded-full">Free Plan</p>
                    <p className="text-white text-xs bg-black p-1 rounded-full px-3">{formData.accountType}</p>
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                    <Progress value={formData.credits} className="w-full" />
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-white font-medium text-xs">{formData.credits} Credits Left</p>
                        <Link href="/upgrade" className="text-red text-xs">Upgrade plan</Link>
                    </div>
                </div>

                <Link href="/account" className="w-full">
                    <Button disabled className="mt-5 w-full shadow-none rounded-xl hover:bg-primary flex items-center justify-start">
                        <User className="min-w-[20px] min-h-[20px] text-muted-foreground" />
                        Account
                    </Button>
                </Link>

                <Link href="/settings" className="w-full">
                    <Button disabled className="w-full shadow-none rounded-xl hover:bg-primary flex items-center justify-start">
                        <Settings className="min-w-[20px] min-h-[20px] text-muted-foreground" />
                        Settings
                    </Button>
                </Link>

                <Separator orientation="horizontal" className="my-2 mt-5" />



                {/* sign out */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="flex text-red rounded-none bg-transparent hover:bg-transparent gap-1.5 items-center justify-center">
                            <LogOut size={30} className="text-red" />
                            Sign Out
                        </Button>

                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[90%] bg-primary border-none lg:w-full rounded-2xl">
                        <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Are you really sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-white">
                            Are you sure you really want to sign out?
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel className="py-5 rounded-full bg-black border-black text-white"><b>No</b></AlertDialogCancel>
                        <AlertDialogAction className="py-5 bg-gradient-to-r from-red to-purple rounded-full" onClick={handleSignOut}><b>Yeah!</b></AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            </div>
        </div>
);
};
