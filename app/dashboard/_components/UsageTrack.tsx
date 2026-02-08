"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { AIOutput, UserSubscription, UserUsage } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { HistoryItem } from '../history/page'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext'

function UsageTrack() {

    const { user } = useUser();
    const {totalUsage, setTotalUsage} = useContext(TotalUsageContext)
    const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext)
    const {updateCreditContext, setUpdateCreditContext}= useContext(UpdateCreditUsageContext)
    const [maxWords, setMaxWords] = useState(10000)
    const router = useRouter();


    // useEffect(() => {
    //     user&&GetData()
    //     user&&IsUserSubscribe()
    // }, [user])

    // useEffect(() => {
    //     user&&GetData();
    // }, [updateCreditContext&&user])

        useEffect(() => {
        if (user) {
            fetchUsage();
            IsUserSubscribe();
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchUsage();
        }
    }, [updateCreditContext, user]);


    // Fetch usage from UserUsage table
    const fetchUsage = async () => {
        const usage = await db
            .select()
            .from(UserUsage)
            .where(eq(UserUsage.email, user?.primaryEmailAddress?.emailAddress || ""));
        setTotalUsage(usage[0]?.totalUsage || 0);
    }
    

    // const GetData = async () => {
    //     {/*@ts-ignore*/}
    //     const result:HistoryItem[] = await db.select().from(AIOutput)
    //         .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || ""));

    //         GetTotalUsage(result)
    // }

    const IsUserSubscribe = async () => {
        const result = await db.select().from(UserSubscription)
            .where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress || ""));
        
        if (result.length > 0) { // Check if the result array has at least one record
            setUserSubscription(true);
            setMaxWords(100000);
        } else {
            setUserSubscription(false); // Ensure unsubscribed users are handled
            setMaxWords(10000); // Reset max words for unsubscribed users
        }
    };


    // const GetTotalUsage = (result:HistoryItem[]) => {
    //     let total: number = 0;
    //     result.forEach(element => {
    //         total = total + Number(element.aiResponse?.length);
    //     })
    //     setTotalUsage(total)
    //     console.log(total);
    // }

    return (
        <div className='m-5'>
            <div className='bg-violet-700 text-white p-3 rounded-lg'>
                <h2 className='font-medium'>Credits</h2>
                <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
                    <div className='h-2 bg-white rounded-full'
                        style={{
                            width: (totalUsage/maxWords)*100+"%"
                        }}
                    ></div>
                </div>
                <h2 className='text-sm my-2'>{totalUsage}/{maxWords} Credit Used</h2>
            </div>
            <Button className='w-full my-3 bg-violet-700 cursor-pointer hover:bg-violet-500'
            onClick={() => router.push("/dashboard/billing")}
            >Upgrade</Button>
        </div>
    )
}

export default UsageTrack
