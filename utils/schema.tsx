import { pgTable, serial, text, timestamp, varchar, boolean, integer  } from "drizzle-orm/pg-core";

export const AIOutput=pgTable('aiOutput',{
    id:serial('id').primaryKey(),
    formData:text('formData').notNull(),
    aiResponse:text('aiResponse'),
    templateSlug:varchar('templateSlug').notNull(),
    createdBy:varchar('createdBy'),
    createdAt:timestamp('createdAt')
})

export const UserSubscription=pgTable('userSubscription',{
    id:serial('id').primaryKey(),
    email:varchar('email'),
    username:varchar('username'),
    active:boolean('active'),
    paymentId:varchar('paymentId'),
    joinDate:timestamp('joinDate'),
})

export const UserUsage = pgTable('userUsage', {
  id: serial('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  totalUsage: integer('totalUsage').notNull().default(0),
});