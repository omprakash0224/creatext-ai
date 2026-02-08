import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { eq, desc, lt, and } from "drizzle-orm";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.emailAddresses[0].emailAddress;

    // Check if the user is subscribed
    const subscription = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));

    const isSubscribed = subscription.length > 0;

    // If the user is not subscribed, delete history older than one month
    if (!isSubscribed) {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      await db
        .delete(AIOutput)
        .where(
          and(
            eq(AIOutput.createdBy, email),
            lt(AIOutput.createdAt, oneMonthAgo)
          )
        );
    }

    const history = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, email))
      .orderBy(desc(AIOutput.createdAt));

    return NextResponse.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

