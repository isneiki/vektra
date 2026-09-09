<script lang="ts" setup>
import type { ButtonProps, PricingPlanProps, PageFeatureProps } from "@nuxt/ui";
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();

const links = ref<ButtonProps[]>([
  {
    label: `${$t("get_started")}`,
    to: "/user/register",
    icon: "i-lucide-file-user",
  },
  {
    label: `${$t("learn_more")}`,
    to: "#learn",
    color: "neutral",
    variant: "subtle",
    trailingIcon: "i-lucide-arrow-right",
  },
]);

const features = ref<PageFeatureProps[]>([
  {
    title: `${$t("feature_ai_powered_resume_builder_title")}`,
    description: `${$t("feature_ai_powered_resume_builder_description")}`,
    icon: "i-lucide-robot",
  },
  {
    title: `${$t("feature_tailored_for_every_job_title")}`,
    description: `${$t("feature_tailored_for_every_job_description")}`,
    icon: "i-lucide-file-text",
  },
  {
    title: `${$t("feature_easy_to_use_title")}`,
    description: `${$t("feature_easy_to_use_description")}`,
    icon: "i-lucide-magic-wand",
  },
]);

const free_plans_features = computed(() =>
  $tm("plans_free_features").map((feature: string) => feature),
);

const pro_plans_features = computed(() =>
  $tm("plans_pro_features").map((feature: string) => feature),
);

const pro_plus_plans_features = computed(() =>
  $tm("plans_pro_plus_features").map((feature: string) => feature),
);

const plans = ref<PricingPlanProps[]>([
  {
    title: $t("plans_free_title"),
    price: $t("plans_free_price"),
    description: $t("plans_free_description"),
    features: free_plans_features.value,
    button: {
      label: $t("get_started"),
      to: "/user/register",
      variant: "outline",
    },
  },
  {
    title: $t("plans_pro_title"),
    price: $t("plans_pro_price"),
    description: $t("plans_pro_description"),
    features: pro_plans_features.value,
    button: {
      label: $t("plans_pro_cta"),
      to: "/user/register",
      variant: "solid",
    },
  },
  {
    title: $t("plans_pro_plus_title"),
    price: $t("plans_pro_plus_price"),
    description: $t("plans_pro_plus_description"),
    features: pro_plus_plans_features.value,
    button: {
      label: $t("plans_pro_plus_cta"),
      to: "/user/register",
      variant: "solid",
    },
  },
]);

definePageMeta({
  layout: "landing",
});
</script>

<template>
  <UPage>
    <UPageHero headline="vektra" :links="links">
      <template #title>
        <h1 class="font-display">
          {{ $t("hero_title") }}
          <span class="text-brand-500/80">{{ $t("hero_title_stilized") }}</span>
        </h1>
      </template>
      <template #description>
        <p>
          {{ $t("hero_description") }}
        </p>
      </template>
    </UPageHero>

    <UPageSection
      :headline="$t('what_is_vektra_headline')"
      :title="$t('what_is_vektra_title')"
      :description="$t('what_is_vektra_description')"
      icon="i-lucide-circle-question-mark"
      id="learn"
    >
    </UPageSection>

    <UPageSection :title="$t('why_choose_vektra')">
      <UPageGrid>
        <UPageFeature
          v-for="feature in features"
          :key="feature.title"
          v-bind="feature"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      :title="$t('pricing_title')"
      :description="$t('pricing_description')"
    >
      <UPricingPlans :plans="plans" scale />
    </UPageSection>

    <UPageSection>
      <UPageCTA
        :title="$t('cta_title')"
        :description="$t('cta_description')"
        :links="links"
      />
    </UPageSection>
  </UPage>
</template>
