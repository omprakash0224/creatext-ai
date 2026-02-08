import { db } from "@/utils/db";
import { UserUsage } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function incrementUserUsage(email: string, incrementBy: number) {
  const existing = await db.select().from(UserUsage).where(eq(UserUsage.email, email));
  if (existing.length > 0) {
    await db.update(UserUsage)
      .set({ totalUsage: existing[0].totalUsage + incrementBy })
      .where(eq(UserUsage.email, email));
  } else {
    await db.insert(UserUsage).values({ email, totalUsage: incrementBy });
  }
}