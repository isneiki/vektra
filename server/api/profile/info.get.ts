import { eq } from "drizzle-orm";
import { educations, experiences } from "~~/server/db/schema";

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

  const userId = session.user.id;

  const [userExperiences, userEducations] = await Promise.all([
    db.select().from(experiences).where(eq(experiences.userId, userId)),

    db.select().from(educations).where(eq(educations.userId, userId)),
  ]);

  return {
    userId,
    experiences: userExperiences,
    educations: userEducations,
  };
});
