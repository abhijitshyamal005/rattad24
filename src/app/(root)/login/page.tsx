"use client";

import { Button } from "@/components/ui/button";
import React from 'react';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import handleSubmit from "./submitLoginForm";
import { Input } from "@/components/ui/input";
import validatePasswordStrength from "@/app/utils/validatePasswordStrength";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import validateReferralCode from "@/app/utils/validateReferralCode";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    accountType: '',
    lastName: '',
    profileComplete: false,
    referralCode: '',
  });
  const [isSignInButtonDisabled, setIsSignInButtonDisabled] = useState(true);
  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [referralStatus, setReferralStatus] = useState<"valid" | "invalid" | null>(null);
  


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const getStrengthLabel = () => {
    switch (strength) {
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Medium";
      case 4:
        return "Strong";
      case 5:
        return "Very Strong";
      default:
        return "Enter a password";
    }
  };

  useEffect(() => {
    const areAllLoginFieldsFilled = formData.email !== '' && formData.password !== '';

    setIsSignInButtonDisabled(!areAllLoginFieldsFilled || isSubmitting);

    const areAllSignupFieldsFilled = formData.email !== '' &&
    formData.password !== '' &&
    formData.firstName !== '' &&
    formData.lastName !== '' &&
    formData.accountType !== '' &&
    formData.email !== '' &&
    formData.password !== '';

    setIsSignUpButtonDisabled(!areAllSignupFieldsFilled || isSubmitting || strength < 5);
  }, [formData, isSubmitting]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'password' && !isLoggingIn) {
      setStrength(validatePasswordStrength(value));
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleSubmit({
      router,
      isLoggingIn,
      formData,
      setFormData,
      setIsSubmitting,
    });
  };



  return (
    <div className="grid min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex items-center sm:flex-col">
        <div className="flex w-full">
          <div className="relative z-10 h-[100vh] flex flex-col gap-5 lg:gap-10 lg:w-full w-[100%] px-5 lg:px-0 items-center justify-start lg:gap-10">
            <div className="relative lg:max-w-[500px] lg:bg-primary w-full px-5 pb-5 lg:p-10 rounded-2xl">
              <div className={`absolute flex lg:bg-primary opacity-50 h-full top-0 left-0 rounded-2xl w-full lg:max-w-[500px]`}></div>
              { isLoggingIn ? (
                <form className="z-50 mt-20" onSubmit={handleFormSubmit}>
                  <div className="flex flex-col items-center gap-6">
                    <div className="z-50 flex flex-col items-center gap-2">
                      <p className="lg:text-[40px] font-moranga text-[30px] text-white font-bold">Sign In</p>
                      <p className="lg:text-lg whitespace-wrap text-center font-inter text-lg text-white">Welcome back, Creator! It&apos;s time to create different!</p>
                    </div>

                    <Alert variant="destructive" className={error == "" ? 'hidden my-2 w-[90%]': 'my-2 w-[90%]'}>
                      <TriangleAlert className="h-4 w-4" />
                      <AlertTitle>An error occurred!</AlertTitle>
                      <AlertDescription>
                      {error}
                      </AlertDescription>
                    </Alert>

                    <div className="z-50 grid w-full items-center gap-1.5">
                      <label htmlFor="email" className="text-white font-inter">Email Address</label>
                      <Input
                        className="h-[56px] text-white"
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange} />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                      <label htmlFor="password" className="text-white font-inter">Password</label>
                      <div className="relative flex items-center justify-center">
                        <Input
                          className="h-[56px] text-white"
                          type={showPassword ? 'text': 'password'}
                          id="password"
                          name="password"
                          placeholder="•••••••••••••••"
                          value={formData.password}
                          onChange={handleChange} />
                        <Button className="absolute right-0 bg-transparent hover:bg-transparent shadow-none" type="button" onClick={toggleShowPassword}>
                          {
                            showPassword ? (
                              <Eye className="min-w-[30px] min-h-[20px] text-blue"/>
                            ) : (
                              <EyeOff className="min-w-[30px] min-h-[20px] text-blue"/>
                            )
                          }
                        </Button>
                      </div>
                    </div>

                    <Button
                      className="z-50 bg-gradient-to-r from-red to-purple lg:text-lg font-moranga rounded-full h-[52px] w-full"
                      disabled={isSignInButtonDisabled || isSubmitting}
                      type="submit">
                      {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </div>
                </form>) : 
                (
                  <form className="z-50 mt-20" onSubmit={handleFormSubmit}>
                    <div className="flex flex-col items-center gap-6">
                      <p className="z-50 lg:text-[40px] font-moranga text-[30px] text-white font-bold">Sign Up</p>

                      <Alert variant="destructive" className={error == "" ? 'hidden my-2 w-[90%]': 'my-2 w-[90%]'}>
                        <TriangleAlert className="h-4 w-4" />
                        <AlertTitle>An error occurred!</AlertTitle>
                        <AlertDescription>
                        {error}
                        </AlertDescription>
                      </Alert>
                      <div className="z-50 flex flex-col items-center gap-3 lg:gap-6">
                        <div className="flex gap-3">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label htmlFor="fname" className="text-white font-inter">First Name</label>
                            <Input
                              className="h-[56px] text-white"
                              type="fname"
                              id="fname"
                              name="firstName"
                              placeholder="James"
                              value={formData.firstName}
                              onChange={handleChange} />
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label htmlFor="lname" className="text-white font-inter">Last Name</label>
                            <Input
                              className="h-[56px] text-white"
                              type="lname"
                              id="lname"
                              name="lastName"
                              placeholder="Bond"
                              value={formData.lastName}
                              onChange={handleChange} />
                          </div>
                        </div>
    
                        <div className="grid w-full items-center gap-1.5">
                          <label htmlFor="email" className="text-white font-inter">Email Address</label>
                          <Input
                            className="h-[56px] text-white"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange} />
                        </div>
    
                        <div className="grid w-full items-center gap-1.5">
                          <label htmlFor="password" className="text-white font-inter">Password</label>
                          <div className="relative flex items-center justify-center">
                            <Input
                              className="h-[56px] text-white"
                              type={showPassword ? 'text': 'password'}
                              id="password"
                              name="password"
                              placeholder="•••••••••••••••"
                              value={formData.password}
                              onChange={handleChange} />
                            <Button className="absolute right-0 bg-transparent hover:bg-transparent shadow-none" type="button" onClick={toggleShowPassword}>
                              {
                                showPassword ? (
                                  <Eye className="min-w-[30px] min-h-[20px] text-blue"/>
                                ) : (
                                  <EyeOff className="min-w-[30px] min-h-[20px] text-blue"/>
                                )
                              }
                            </Button>
                          </div>
                          <Progress value={(strength / 5) * 100} className="w-full h-2" />
                            <p className={`text-sm ${strength > 4 ? "text-green-600" : "text-red"}`}>
                              {getStrengthLabel()}
                            </p>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                          <label htmlFor="bname" className="text-white font-inter">Do you own or represent a business?</label>
                          <RadioGroup
                            onValueChange={(value) => {
                              setFormData(prevState => ({
                                ...prevState,
                                accountType: value,
                              }));
                            }}
                            defaultValue={formData.accountType}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center justify-start gap-1.5">
                              <RadioGroupItem value="business" id="business" className="bg-white text-white"></RadioGroupItem>
                              <label htmlFor="business" className="text-white">Yes</label>
                            </div>
                            <div className="flex items-center justify-start gap-1.5">
                              <RadioGroupItem value="creator" id="creator" className="bg-white text-white"></RadioGroupItem>
                              <label htmlFor="creator" className="text-white">No, I&apos;m an individual creator</label>
                            </div>
                          </RadioGroup>
                        </div>


                        <div className="grid w-full items-center gap-1.5">
                          <label htmlFor="rcode" className="text-white font-inter">Referral Code (Optional)</label>
                          <Input
                            className="h-[56px] text-white"
                            type="rcode"
                            id="rcode"
                            name="referralCode"
                            placeholder="scx-AAAAAA"
                            value={formData.referralCode}
                            onChange={(e) => {
                              handleChange(e);
                              if (e.target.value.length === 10) {
                                validateReferralCode(e.target.value, setReferralStatus);
                              }
                            }} />
                        </div>
                        {referralStatus === "valid" && <p style={{ color: "green" }}>Valid referral code!</p>}
                        {referralStatus === "invalid" && <p style={{ color: "red" }}>Invalid referral code.</p>}
                      </div>
    
                      <Button
                        type="submit"
                        className="z-50 bg-gradient-to-r from-red to-purple lg:text-lg font-moranga rounded-full h-[52px] w-full"
                        disabled={isSignUpButtonDisabled || isSubmitting}>
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                      </Button>
    
                    </div>
                  </form>
                )
              }
            </div>

            { isLoggingIn ? (
              <div className="flex my-2.5 gap-1.5 items-center justify-center">
                <p className="text-white text-sm lg:text-lg font-moranga">Don&apos;t have an account? </p>
                <Button className="text-white px-1 bg-transparent hover:bg-transparent shadow-none font-moranga" onClick={() => setIsLoggingIn(false)}><p className="text-white font-bold text-sm lg:text-lg">Sign Up</p></Button>
              </div>
            ) : (
              <div className="flex -mt-5 mb-20 gap-1.5 items-center justify-center">
                <p className="text-white text-sm lg:text-lg font-moranga">Already have an account? </p>
                <Button className="text-white px-1 bg-transparent hover:bg-transparent shadow-none font-moranga" onClick={() => setIsLoggingIn(true)}><p className="text-white font-bold text-sm lg:text-lg">Login</p></Button>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
