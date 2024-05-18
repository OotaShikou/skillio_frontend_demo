import { type InferSelectModel, relations } from 'drizzle-orm'
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
export const usersRelations = relations(users, ({ many }) => ({
  workbooks: many(workbooks),
  students: many(students),
}))

export const workbooks = pgTable(
  'workbooks',
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
export const workbookRelations = relations(workbooks, ({ one }) => ({
  user: one(users, {
    fields: [workbooks.userId],
    references: [users.id],
  }),
}))

export const questionType = pgEnum('question_type', ['simple', 'essay', 'select', 'fill_in_the_blank'])
export const questions = pgTable(
  'questions',
  {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    workbookId: uuid('workbook_id')
      .notNull()
      .references(() => workbooks.id),
    content: text('content').notNull(),
    type: questionType('type').default('simple').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    workbookIdIndex: index('question_workbook_id_index').on(table.workbookId),
  }),
)
export const questionRelations = relations(questions, ({ one, many }) => ({
  workbook: one(workbooks, {
    fields: [questions.workbookId],
    references: [workbooks.id],
  }),
  answers: many(answers),
}))

export const answers = pgTable('answers', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  questionId: uuid('question_id')
    .notNull()
    .references(() => questions.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
export const answerRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
}))

export const students = pgTable(
  'students',
  {
    id: uuid('id').defaultRandom().notNull().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    workbookId: uuid('workbook_id')
      .notNull()
      .references(() => workbooks.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index('student_user_id_index').on(table.userId),
    workbookIdIndex: index('student_workbook_id_index').on(table.workbookId),
  }),
)
export const studentRelations = relations(students, ({ one }) => ({
  user: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
  workbook: one(workbooks, {
    fields: [students.workbookId],
    references: [workbooks.id],
  }),
}))

export type User = InferSelectModel<typeof users>
export type Workbook = InferSelectModel<typeof workbooks>
export type Question = InferSelectModel<typeof questions>
export type Answer = InferSelectModel<typeof answers>
export type Student = InferSelectModel<typeof students>
