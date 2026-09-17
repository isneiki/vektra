<script lang="ts" setup>
const session = await authClient.getSession();

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

const experiences = ref<Experience[]>([]);
const educations = ref<Education[]>([]);

function addExperience() {
  experiences.value.push({
    company: "",
    position: "",
    startDate: "",
    endDate: undefined,
    current: false,
    description: "",
  });
}

function addEducation() {
  educations.value.push({
    institution: "",
    degree: "",
    startDate: "",
    endDate: undefined,
    current: false,
    description: "",
  });
}

function removeExperience(index: number) {
  experiences.value.splice(index, 1);
}

function removeEducation(index: number) {
  educations.value.splice(index, 1);
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
    <UForm>
      <!-- Contact info -->
      <UContainer class="flex items-center gap-4">
        <NuxtImg
          v-if="session.data?.user.image"
          :src="session.data?.user.image"
          class="rounded-full size-18 md:size-20"
        ></NuxtImg>
        <UIcon v-else name="i-lucide-user" class="size-18 md:size-20" />
        <div class="flex flex-col gap-2">
          <UInput
            :value="session.data?.user.name"
            placeholder="John Doe"
            variant="ghost"
            size="xl"
            class="w-48 md:w-lg"
          />
          <!-- Socials -->
          <div class="hidden md:flex gap-2">
            <UInput
              placeholder="john.doe@example.com"
              size="md"
              variant="ghost"
              icon="i-lucide-mail"
            />
            <UInput
              placeholder="+55 11 99999-9999"
              size="md"
              variant="ghost"
              icon="i-lucide-phone"
            />
            <UInput
              placeholder="https://linkedin.com/in/john-doe"
              size="md"
              variant="ghost"
              icon="i-lucide-linkedin"
            />
            <UInput
              placeholder="https://github.com/john-doe"
              size="md"
              variant="ghost"
              icon="i-lucide-github"
            />
          </div>
        </div>
      </UContainer>
      <!-- For mobile view -->
      <div class="flex flex-col md:hidden gap-4 mt-8">
        <UInput
          :value="session.data?.user.email"
          placeholder="john.doe@example.com"
          size="md"
          variant="ghost"
          icon="i-lucide-mail"
        />
        <UInput
          placeholder="+55 11 99999-9999"
          size="md"
          variant="ghost"
          icon="i-lucide-phone"
        />
        <UInput
          placeholder="https://linkedin.com/in/john-doe"
          size="md"
          variant="ghost"
          icon="i-lucide-linkedin"
        />
        <UInput
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
        <UFormField label="Summary" name="summary">
          <UTextarea
            :cols="60"
            :rows="4"
            placeholder="Write a brief summary about yourself..."
            size="md"
            variant="ghost"
            for="summary"
          />
        </UFormField>
        <UFormField label="Skills" name="skills">
          <UTextarea
            :cols="60"
            :rows="4"
            placeholder="Ex.: Python, SQL, JavaScript, React, Node.js"
            size="md"
            variant="ghost"
            for="skills"
          />
        </UFormField>
      </UContainer>

      <UContainer
        class="mt-12 flex flex-col gap-4 md:gap-0 md:flex-row justify-between"
      >
        <UFormField label="Experience" name="experience" ">
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
          <UCard
            v-for="(experience, index) in experiences"
            :key="experience.id ?? index"
          >
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
              <UFormField label="Company">
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
          <UCard
            v-for="(education, index) in educations"
            :key="education.id ?? index"
          >
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
                <UInput v-model="education.institution" placeholder="Harvard University" />
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
    </UForm>
  </UContainer>
</template>
