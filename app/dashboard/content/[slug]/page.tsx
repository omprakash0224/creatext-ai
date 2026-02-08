"use client";
import React, { useState, useContext } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { incrementUserUsage } from "@/utils/user-usage";
import { useUser } from "@clerk/nextjs";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter, useParams } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateNewContent() {
  const params = useParams(); // Use useParams to get the slug dynamically
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === params.slug
  );
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const { updateCreditContext, setUpdateCreditContext } = useContext(UpdateCreditUsageContext);

  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 100000) {
      setTotalUsage(10000); // Reset credits to 10,000
      toast.error("You have used all your credits. Please buy a subscription to continue using CreatextAI.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (totalUsage >= 10000 && !userSubscription) {
      toast.warn("You have exceeded your free credits. Please buy a subscription.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/dashboard/billing");
      return;
    }
    setLoading(true);
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + "," + SelectedPrompt;

    const result = await chatSession.sendMessage(FinalAIPrompt);

    console.log(result.response.text());
    setAiOutput(result?.response.text());
    await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug, result?.response.text());
    setLoading(false);
    setUpdateCreditContext(Date.now());
  };

  const SaveInDb = async (formData: any, slug: any, aiOutput: string) => {
    const result = await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiOutput,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: new Date(),
    });
    // Update usage credits after saving output
    if (user?.primaryEmailAddress?.emailAddress && aiOutput) {
      await incrementUserUsage(user.primaryEmailAddress.emailAddress, aiOutput.length);
    }
    console.log(result);
  };

  return (
    <div className="p-10">
      <ToastContainer />
      <Link href={"/dashboard"}>
        <Button className="text-md font-bold bg-purple-700 hover:bg-purple-500">
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;

