import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
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
  createdAt: timestamp("createdAt").defaultNow(),
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
    .references(() => user.id),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const enrollments = pgTable("Enrollments", {
  id: serial("enroll_id").primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => user.id),
  course_id: integer("course_id ")
    .notNull()
    .references(() => course.id),
  enrollment_date: timestamp("createdAt").defaultNow(),
});

// export const courseRelation = relations(course, ({ one }) => ({
//   createdBy: one(user, { fields: [course.createdBy], references: [user.id] }),
// }));
