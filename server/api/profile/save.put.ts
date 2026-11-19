import { eq } from "drizzle-orm";
import { z } from "zod";
import { createError, defineEventHandler, readBody } from "h3";

import { user, experiences, educations } from "~~/server/db/schema";

const experienceSchema = z.object({
  id: z.string().optional(),

  company: z.string().min(2),
  position: z.string().min(2),

  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .or(z.literal("")),

  current: z.boolean(),

  description: z.string().min(20).max(250),
});

const educationSchema = z.object({
  id: z.string().optional(),

  institution: z.string().min(2),
  degree: z.string().min(2),

  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .or(z.literal("")),

  current: z.boolean(),

  description: z.string().min(20).max(250),
});

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(8),

  linkedin: z.string().optional(),
  github: z.string().optional(),

  summary: z.string().optional(),

  skills: z.array(z.string()),

  experiences: z.array(experienceSchema),
  educations: z.array(educationSchema),
});

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const body = await readBody(event);

  const data = bodySchema.parse(body);

  const userId = session.user.id;

  await db.transaction(async (tx) => {
    await tx
      .update(user)
      .set({
        name: data.name,
        phone: data.phone,
        linkedin: data.linkedin || null,
        github: data.github || null,
        summary: data.summary || null,
        skills: data.skills,
      })
      .where(eq(user.id, userId));

    // Removing old registers
    await tx.delete(experiences).where(eq(experiences.userId, userId));

    await tx.delete(educations).where(eq(educations.userId, userId));

    // Insert new registers
    if (data.experiences.length > 0) {
      await tx.insert(experiences).values(
        data.experiences.map((experience) => ({
          id: crypto.randomUUID(),

          userId,

          company: experience.company,
          position: experience.position,

          startDate: experience.startDate,

          endDate:
            experience.current || !experience.endDate
              ? null
              : experience.endDate,

          current: experience.current,

          description: experience.description,
        })),
      );
    }

    // Insert new educational records
    if (data.educations.length > 0) {
      await tx.insert(educations).values(
        data.educations.map((education) => ({
          id: crypto.randomUUID(),

          userId,

          institution: education.institution,
          degree: education.degree,

          startDate: education.startDate,

          endDate:
            education.current || !education.endDate ? null : education.endDate,

          current: education.current,

          description: education.description,
        })),
      );
    }
  });

  return {
    success: true,
  };
});
