"use client";
import React,{useState, useEffect} from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { UserSubscription } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { useContext } from "react";

function BillingPage() {

  const [loading, setLoading] = useState(false)
  const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext)
  const {user} = useUser()

    // Load Razorpay script on component mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const CreateSubscription=()=>{
    setLoading(true)
    axios.post('/api/create-subscription', {})
    .then(resp=>{
      console.log(resp.data);
      OnPayment(resp.data.id)
    },(error)=>{
      setLoading(false)
    })
  }

  const OnPayment=(subId:string)=>{
    const options ={
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id": subId,
      "name": "CreatextAI",
      "image":"/img.png",
      "description": "Monthly Subscription",
      handler:async(resp:any)=>{
        console.log(resp);
        if(resp){
          SaveSubscription(resp?.razorpay_payment_id)
        }
        setLoading(false)
      }
    }

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const SaveSubscription=async(paymentId:string)=>{
    const result = await db.insert(UserSubscription)
    .values({
      email:user?.primaryEmailAddress?.emailAddress,
      username:user?.fullName,
      active:true,
      paymentId:paymentId,
      joinDate:new Date()
    });
    console.log(result);
    if(result){
      window.location.reload()
    }
  }

  return (
    <div className="p-10">
      {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
      <h1 className="text-3xl font-bold text-center mb-10">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Free Plan Card */}
        <div className="border border-gray-300 rounded-lg shadow-lg p-5 flex flex-col justify-between h-80 transform duration-300 hover:shadow-xl hover:scale-105">
          <div>
            <h2 className="text-2xl font-medium text-center mb-2">Free</h2>
            <p className="text-2xl text-center text-black font-bold mb-5">$0/month</p>
            <ul className="text-gray-700 mb-5">
              <li className="mb-2">✅ 10,000 words/month</li>
              <li className="mb-2">✅ Unlimited copy</li>
              <li className="mb-2">✅ 1 month of History</li>
            </ul>
          </div>
          <div className="text-center">
            <button
              className="bg-gray-500 text-white px-5 py-2 rounded-md cursor-not-allowed"
              disabled
            >
              {!userSubscription?'Currently Active Plan':''}
            </button>
          </div>
        </div>

        {/* Pro Plan Card */}
        <div className="border border-gray-300 rounded-lg shadow-lg p-5 flex flex-col justify-between h-80 transform duration-300 hover:shadow-xl hover:scale-105">
          <div>
            <h2 className="text-2xl font-medium text-center mb-2">Pro</h2>
            <p className="text-2xl text-center text-black font-bold mb-5">$5/month</p>
            <ul className="text-gray-700 mb-5">
              <li className="mb-2">✅ 100,000 words/month</li>
              <li className="mb-2">✅ Unlimited copy</li>
              <li className="mb-2">✅ 1 year of History</li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <button
            disabled={loading}
              className="bg-purple-700 text-white px-5 py-2 flex items-center gap-2 rounded-md hover:bg-purple-500"
              onClick={() => CreateSubscription()}
            >
              {loading&&<Loader2Icon className="animate-spin"/>}
              {userSubscription?'Active Plan':'Get Started'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingPage;
