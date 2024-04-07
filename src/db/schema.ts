import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  id: uuid("user_id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  password: varchar("password", { length: 6 }).notNull(),
  image: varchar("image"),
  role: varchar("role", { length: 5, enum: ["user", "admin"] }).default("user"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
});

export const course = pgTable("Course", {
  id: serial("course_id").primaryKey(),
  title: varchar("title").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level", { enum: ["basic", "intermediate", "expert"] })
    .default("basic")
    .notNull(),
  popularity: integer("popularity").notNull(),
  createdBy: uuid("createdBy")
    .notNull()
    .references(() => user.id, { onDelete: "set null" }),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
});

export const enrollments = pgTable(
  "Enrollments",
  {
    id: serial("enroll_id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    course_id: integer("course_id ")
      .notNull()
      .references(() => course.id, { onDelete: "cascade" }),
    enrollment_date: timestamp("createdAt", {
      withTimezone: true,
    }).defaultNow(),
  },
  (table) => ({
    uniqueUserCourse: unique("uniqueUserCourse").on(
      table.user_id,
      table.course_id
    ),
  })
);

export const userRelation = relations(user, ({ many }) => ({
  enrollments: many(enrollments),
  course: many(course),
}));

export const courseRelation = relations(course, ({ one, many }) => ({
  createdBy: one(user, { fields: [course.createdBy], references: [user.id] }),
  enrollments: many(enrollments),
}));

export const enrollmentsRelation = relations(enrollments, ({ one }) => ({
  user: one(user, { fields: [enrollments.user_id], references: [user.id] }),
  course: one(course, {
    fields: [enrollments.course_id],
    references: [course.id],
  }),
}));
