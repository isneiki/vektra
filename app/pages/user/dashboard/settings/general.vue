<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const session = await authClient.getSession();

// Experience and education
interface Experience {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | undefined;
  current: boolean;
  description: string;
}

interface Education {
  id?: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string | undefined;
  current: boolean;
  description: string;
}

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email"),
  phone: z.string().min(8, "At least 8 numbers"),
  linkedin: z.url("Invalid URL").optional(),
  github: z.url("Invalid URL").optional(),
  summary: z
    .string()
    .min(200, "Summary must be at least 200 characters")
    .max(500, "Summary must be at most 500 characters"),
  skills: z
    .array(z.string().regex(/^[a-z-]+$/, "Lowercase letters and dashes only"))
    .min(1, "Please add at least one skill"),

  experiences: z
    .array(
      z.object({
        company: z.string().min(2, "Company must be at least 2 characters"),
        position: z.string().min(2, "Position must be at least 2 characters"),
        startDate: z
          .string()
          .min(10, "Start date must be at least 10 characters"),
        endDate: z
          .string()
          .min(10, "End date must be at least 10 characters")
          .optional(),
        current: z.boolean(),
        description: z
          .string()
          .min(20, "Description must be at least 20 characters")
          .max(250, "Description must be at most 250 characters")
          .optional(),
      }),
    )
    .optional(),

  educations: z
    .array(
      z.object({
        institution: z
          .string()
          .min(2, "Institution must be at least 2 characters"),
        degree: z.string().min(2, "Degree must be at least 2 characters"),
        startDate: z
          .string()
          .min(10, "Start date must be at least 10 characters"),
        endDate: z
          .string()
          .min(10, "End date must be at least 10 characters")
          .optional(),
        current: z.boolean(),
        description: z
          .string()
          .min(20, "Description must be at least 20 characters")
          .max(250, "Description must be at most 250 characters")
          .optional(),
      }),
    )
    .optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: session.data?.user.name || undefined,
  email: session.data?.user.email || undefined,
  phone: session.data?.user.phone || undefined,
  linkedin: session.data?.user.linkedin || undefined,
  github: session.data?.user.github || undefined,
  summary: session.data?.user.summary || undefined,
  skills: session.data?.user.skills || undefined,
  experiences: [],
  educations: [],
});

function addExperience() {
  state.experiences?.push({
    company: "",
    position: "",
    startDate: "",
    endDate: undefined,
    current: false,
    description: "",
  });
}

function addEducation() {
  state.educations?.push({
    institution: "",
    degree: "",
    startDate: "",
    endDate: undefined,
    current: false,
    description: "",
  });
}

function removeExperience(index: number) {
  state.experiences?.splice(index, 1);
}

function removeEducation(index: number) {
  state.educations?.splice(index, 1);
}

definePageMeta({
  layout: "dashboard",
  middleware: "logged",
});
</script>

<template>
  <UContainer
    class="md:border md:border-default h-full rounded-xl flex flex-col overflow-y-scroll py-8"
  >
    <UForm :schema="schema" :state="state" class="flex flex-col h-full">
      <!-- Contact info -->
      <UContainer class="flex items-center gap-4">
        <NuxtImg
          v-if="session.data?.user.image"
          :src="session.data?.user.image"
          class="rounded-full size-18 md:size-20"
        ></NuxtImg>
        <UIcon v-else name="i-lucide-user" class="size-18 md:size-20" />

        <div class="flex flex-col gap-2">
          <UFormField name="name">
            <UInput
              v-model="state.name"
              placeholder="John Doe"
              variant="ghost"
              size="xl"
              class="w-48 md:w-lg"
            />
          </UFormField>

          <!-- Socials -->
          <div class="hidden md:flex gap-2">
            <UFormField name="email">
              <UInput
                v-model="state.email"
                placeholder="john.doe@example.com"
                size="md"
                variant="ghost"
                icon="i-lucide-mail"
              />
            </UFormField>
            <UFormField name="phone">
              <UInput
                v-model="state.phone"
                placeholder="+55 11 99999-9999"
                size="md"
                variant="ghost"
                icon="i-lucide-phone"
              />
            </UFormField>
            <UFormField name="linkedin">
              <UInput
                v-model="state.linkedin"
                placeholder="https://linkedin.com/in/john-doe"
                size="md"
                variant="ghost"
                icon="i-lucide-linkedin"
              />
            </UFormField>
            <UFormField name="github">
              <UInput
                v-model="state.github"
                placeholder="https://github.com/john-doe"
                size="md"
                variant="ghost"
                icon="i-lucide-github"
              />
            </UFormField>
          </div>
        </div>
      </UContainer>
      <!-- For mobile view -->
      <div class="flex flex-col md:hidden gap-4 mt-8">
        <UInput
          v-model="state.email"
          placeholder="john.doe@example.com"
          size="md"
          variant="ghost"
          icon="i-lucide-mail"
        />
        <UInput
          v-model="state.phone"
          placeholder="+55 11 99999-9999"
          size="md"
          variant="ghost"
          icon="i-lucide-phone"
        />
        <UInput
          v-model="state.linkedin"
          placeholder="https://linkedin.com/in/john-doe"
          size="md"
          variant="ghost"
          icon="i-lucide-linkedin"
        />
        <UInput
          v-model="state.github"
          placeholder="https://github.com/john-doe"
          size="md"
          variant="ghost"
          icon="i-lucide-github"
        />
      </div>
      <!-- End mobile view -->

      <!-- Summary and skills -->
      <UContainer
        class="mt-12 flex flex-col gap-4 md:gap-0 md:flex-row justify-between"
      >
        <UFormField label="Summary" name="summary" class="md:w-1/2">
          <UTextarea
            v-model="state.summary"
            :cols="60"
            :rows="4"
            placeholder="Write a brief summary about yourself..."
            size="md"
            variant="ghost"
            for="summary"
          />
        </UFormField>
        <UFormField
          label="Skills"
          name="skills"
          :error-pattern="/^tags\..+/"
          class="md:w-1/2"
        >
          <UInputTags
            v-model="state.skills"
            placeholder="Ex.: Python, SQL, JavaScript, React, Node.js"
            size="md"
            variant="ghost"
            for="skills"
            class="w-full"
          />
        </UFormField>
      </UContainer>

      <UContainer
        class="mt-12 flex flex-col gap-4 md:gap-0 md:flex-row justify-between"
      >
        <UFormField label="Experience" name="experience">
          <template #hint>
            <div class="flex items-center justify-center gap-2 h-12">
              <p class="hidden md:block">Add your work experience</p>
              <UButton
                @click="addExperience"
                variant="outline"
                size="xs"
                class="mt-2"
                icon="i-lucide-plus"
              />
            </div>
          </template>

          <!-- Experiences -->
          <UCard v-for="(experience, index) in state.experiences" :key="index">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-medium">
                  {{ experience.position || "New experience" }}
                </h3>

                <p class="text-sm text-muted">
                  {{ experience.company || "Company" }}
                </p>
              </div>

              <UButton
                icon="i-lucide-trash-2"
                color="error"
                variant="ghost"
                @click="removeExperience(index)"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Company" name="experience.company">
                <UInput v-model="experience.company" placeholder="Google" />
              </UFormField>

              <UFormField label="Position">
                <UInput
                  v-model="experience.position"
                  placeholder="Software Engineer"
                />
              </UFormField>

              <UFormField label="Start date">
                <UInput v-model="experience.startDate" type="date" />
              </UFormField>

              <UFormField label="End date" :disabled="experience.current">
                <UInput
                  v-model="experience.endDate"
                  type="date"
                  :disabled="experience.current"
                />
              </UFormField>
            </div>

            <div class="mt-4">
              <UCheckbox
                v-model="experience.current"
                label="I currently work here"
              />
            </div>

            <div class="mt-4">
              <UFormField label="Description">
                <UTextarea
                  v-model="experience.description"
                  :rows="5"
                  :cols="45"
                  placeholder="Describe your responsibilities, achievements and technologies used..."
                />
              </UFormField>
            </div>
          </UCard>
        </UFormField>

        <!-- Education -->
        <UFormField label="Education" name="education">
          <template #hint>
            <div class="flex items-center justify-center gap-2 h-12">
              <p class="hidden md:block">Add your education</p>
              <UButton
                @click="addEducation"
                variant="outline"
                size="xs"
                class="mt-2"
                icon="i-lucide-plus"
              />
            </div>
          </template>
          <!-- Experiences -->
          <UCard v-for="(education, index) in state.educations" :key="index">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-medium">
                  {{ education.degree || "New Education" }}
                </h3>

                <p class="text-sm text-muted">
                  {{ education.institution || "Institution" }}
                </p>
              </div>

              <UButton
                icon="i-lucide-trash-2"
                color="error"
                variant="ghost"
                @click="removeEducation(index)"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Institution">
                <UInput
                  v-model="education.institution"
                  placeholder="Harvard University"
                />
              </UFormField>

              <UFormField label="Degree">
                <UInput
                  v-model="education.degree"
                  placeholder="Software Engineer"
                />
              </UFormField>

              <UFormField label="Start date">
                <UInput v-model="education.startDate" type="date" />
              </UFormField>

              <UFormField label="End date" :disabled="education.current">
                <UInput
                  v-model="education.endDate"
                  type="date"
                  :disabled="education.current"
                />
              </UFormField>
            </div>

            <div class="mt-4">
              <UCheckbox
                v-model="education.current"
                label="I currently study here"
              />
            </div>

            <div class="mt-4">
              <UFormField label="Description">
                <UTextarea
                  v-model="education.description"
                  :rows="5"
                  :cols="40"
                  placeholder="Describe your responsibilities, achievements and technologies used..."
                />
              </UFormField>
            </div>
          </UCard>
        </UFormField>
      </UContainer>

      <UButton type="submit" class="mt-4 md:place-self-start md:mt-auto"
        >Save changes</UButton
      >
    </UForm>
  </UContainer>
</template>
