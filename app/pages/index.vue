<script lang="ts" setup>
import type { ButtonProps, PricingPlanProps, PageFeatureProps } from "@nuxt/ui";

const links = ref<ButtonProps[]>([
  {
    label: "Get started",
    to: "/user/register",
    icon: "i-lucide-file-user",
  },
  {
    label: "Learn more",
    to: "#learn",
    color: "neutral",
    variant: "subtle",
    trailingIcon: "i-lucide-arrow-right",
  },
]);

const features = ref<PageFeatureProps[]>([
  {
    title: "AI-Powered Resume Builder",
    description:
      "Our AI analyzes your experience and the job description to create a resume that highlights what matters most for each opportunity.",
    icon: "i-lucide-robot",
  },
  {
    title: "Tailored for Every Job",
    description:
      "Stop sending the same generic resume everywhere. Our AI creates a unique resume for each job application, increasing your chances of landing an interview.",
    icon: "i-lucide-file-text",
  },
  {
    title: "Easy to Use",
    description:
      "Our user-friendly interface makes it easy to create and customize your resume in minutes, without any technical skills required.",
    icon: "i-lucide-magic-wand",
  },
]);

const plans = ref<PricingPlanProps[]>([
  {
    title: "Free",
    price: "$0",
    description: "For individuals just getting started.",
    features: ["1 use per day", "Basic analytics", "Community support"],
    button: {
      label: "Get started",
      to: "/docs/getting-started",
      variant: "outline",
    },
  },
  {
    title: "Pro",
    price: "$19/mo",
    description: "For professionals that need a job quickly.",
    scale: true,
    features: [
      "15 uses per day",
      "Advanced analytics",
      "Technical support",
      "Best cost-benefit",
    ],
    button: {
      label: "Upgrade to Pro",
      to: "/docs/getting-started/theme/design-system",
      variant: "solid",
    },
  },
  {
    title: "Pro+",
    price: "$25/mo",
    description: "For professionals looking for a high paying job.",
    features: [
      "50 uses per day",
      "Advanced analytics",
      "Priority support",
      "Best models",
    ],
    button: {
      label: "Upgrade to Pro+",
      to: "/docs/getting-started/theme/design-system",
      variant: "solid",
    },
  },
]);
</script>

<template>
  <UPage>
    <UPageHero headline="vektra" :links="links">
      <template #title>
        <h1 class="font-display">
          Your Best Resume
          <span class="text-brand-500/80">For Every Job.</span>
        </h1>
      </template>
      <template #description>
        <p>
          Stop sending the same generic resume everywhere. Our AI analyzes your
          experience and the job description to create a resume that highlights
          what matters most for each opportunity.
        </p>
      </template>
    </UPageHero>

    <UPageSection
      headline="What is Vektra?"
      title="Our AI powered resume builder"
      description="Vektra is an AI-powered resume builder that helps you create a unique
        resume for each job application. Our AI analyzes your experience and the
        job description to create a resume that highlights what matters most for
        each opportunity."
      icon="i-lucide-circle-question-mark"
      id="learn"
    >
    </UPageSection>

    <UPageSection title="Why choose Vektra?">
      <UPageGrid>
        <UPageFeature
          v-for="feature in features"
          :key="feature.title"
          v-bind="feature"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      title="Pricing"
      description="Choose the plan that fits your current needs."
    >
      <UPricingPlans :plans="plans" scale />
    </UPageSection>

    <UPageSection>
      <UPageCTA
        title="Build your customized curriculum vitae now!"
        description="You can start for free today with no commitment using our basic models."
        :links="links"
      />
    </UPageSection>
  </UPage>
</template>
