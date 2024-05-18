import { type InferSelectModel } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid, index, pgEnum } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  uid: text('uid').notNull(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  icon: text('icon').default('').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
export type User = InferSelectModel<typeof users>

export const workbook = pgTable(
  'workbook',
  {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    title: text('title').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index('workbook_user_id_index').on(table.userId),
  }),
)

export const questionType = pgEnum('question_type', ['simple', 'essay', 'select', 'fill_in_the_blank'])
export const question = pgTable(
  'question',
  {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    workbookId: uuid('workbook_id')
      .notNull()
      .references(() => workbook.id),
    content: text('content').notNull(),
    type: questionType('type').default('simple').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    workbookIdIndex: index('question_workbook_id_index').on(table.workbookId),
  }),
)

export const answer = pgTable('answer', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const student = pgTable(
  'student',
  {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    workbookId: uuid('workbook_id')
      .notNull()
      .references(() => workbook.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index('student_user_id_index').on(table.userId),
    workbookIdIndex: index('student_workbook_id_index').on(table.workbookId),
  }),
)
