"use client";
import { create } from "@/app/actions/home";
import { useActionState, useMemo, useState } from "react";
import { FormErrorMessage } from "./FormErrorMessage";
import { SubmitButton } from "./SubmitButton";
import { EmptyFormState } from "./types/EmptyFormState";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/app/utils/firebaseConfig";

const addToSelzy = async (userData: { email: string; firstName: string; lastName: string }) => {
    try {
      const response = await fetch("/api/addToSelzy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
    //   console.log(result);
    //   console.log("User added to Selzy successfully!");

    } catch (error) {
      console.error("Failed to add user to Selzy:", error);
    }
};

const Form = () => {
	const [formState, action] = useActionState(create, EmptyFormState);
	const [formData, setFormData] = useState({
		fullName: '',
		businessName: '',
		email: '',
		referralCode: '',
		receiveUpdates: true,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, checked, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const areAllFieldsFilled = useMemo(() => {
		return formData.businessName !== '' &&
			   formData.email !== '' &&
			   formData.fullName !== '';
	}, [formData]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log("join early access: ", formData);
		const enteredReferralCode = formData.referralCode.trim();
		const db = firestore;

		try {	
			if (enteredReferralCode) {
				const referralsQuery = query(
				collection(db, "referrals"),
				where("referralCode", "==", enteredReferralCode)
				);
				const querySnapshot = await getDocs(referralsQuery);
		
				if (querySnapshot.empty) {
				alert("Invalid referral code. But you joined early access.");
				return;
				} else {
				console.log("Referral code is valid.");
				}
			}
		} catch(error: any) {
			console.error(error);
		}
	
		try {
	
		  const visitorDocRef = collection(db, "early access");
		  await addDoc(visitorDocRef, {
			fullName: formData.fullName,
			email: formData.email,
			referralCodeUsed: formData.referralCode,
			receiveUpates: formData.receiveUpdates,
		  });
			const nameParts = formData.fullName.split(" ").filter(Boolean);

			const firstName = nameParts[0] || "";
			const lastName = nameParts.slice(1).join(" ") || "";

			// add to Selzy
			await addToSelzy({
				email: formData.email,
				firstName: firstName,
				lastName: lastName,
			});
		alert("Welcome to simplecx! You joined early access!");

		} catch (error: any) {
		  const errorMessage = error.message || "An error occurred, please try again.";
		  console.error('Error submitting feedback:', error);
	
		  console.log("Error:", errorMessage);
		} finally {
		  setFormData(
			{
			  fullName: '',
			  businessName: '',
			  email: '',
			  referralCode: '',
			  receiveUpdates: false,
			}
		  );
		}
	  }

	return (
		<form className="space-y-6" action={action} id="gain-early-access" onSubmit={handleSubmit}>
			<div className="ms-2">
				<input
					type="text"
					placeholder="Full Name"
					className="w-full p-3 bg-black text-white rounded-3xl border border-gray-600 text-sm placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
					name="fullName"
					value={formData.fullName}
					onChange={handleChange}
				/>
				<FormErrorMessage message={formState.message["fullName"]?.[0]} />
			</div>
			<div className="ms-2">
				<input
					type="text"
					placeholder="Business Name"
					className="w-full p-3 bg-black text-white rounded-3xl border border-gray-600 text-sm placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
					name="businessName"
					value={formData.businessName}
					onChange={handleChange}
				/>
				<FormErrorMessage message={formState.message["businessName"]?.[0]} />
			</div>
			<div className="ms-2">
				<input
					type="email"
					placeholder="Email"
					className="w-full p-3 bg-black text-white rounded-3xl border border-gray-600 text-sm placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
					name="email"
					value={formData.email}
					onChange={handleChange}
				/>
				<FormErrorMessage message={formState.message["email"]?.[0]} />
			</div>
			<div className="ms-2">
				<input
					type="text"
					placeholder="Referral Code (Optional)"
					className="w-full p-3 bg-black text-whitfullNamee rounded-3xl border border-gray-600 text-sm placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
					name="referralCode"
					value={formData.referralCode}
					onChange={handleChange}
				/>
			</div>
			{/* <div className="flex items-center">
				<input
					type="checkbox"
					id="updates"
					className="w-4 h-4 text-purple-500 bg-black rounded border-gray-600 focus:ring-purple-500"
					name="receiveUpdates"
					checked={formData.receiveUpdates}
					onChange={handleChange}
				/>
				<label htmlFor="updates" className="ml-2 text-gray-400 text-sm">
					I would like to receive more info and updates
				</label>
			</div> */}
			<SubmitButton disabled={!areAllFieldsFilled} />
		</form>
	);
};

export { Form };
