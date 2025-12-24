import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

const businessPersonaInput = z.object({
  businessType: z.enum(["owner", "investor", "venture"]),
  // Demographic
  age: z.string().optional(),
  gender: z.string().optional(),
  ethnicity: z.string().optional(),
  income: z.string().optional(),
  education: z.string().optional(),
  religion: z.string().optional(),
  profession: z.string().optional(),
  // Psychographic
  personalityTraits: z.string().optional(),
  hobbies: z.string().optional(),
  lifeGoals: z.string().optional(),
  values: z.string().optional(),
  beliefs: z.string().optional(),
  lifestyles: z.string().optional(),
  // Geographic
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  // Behavioral
  spendingHabits: z.string().optional(),
  purchasingHabits: z.string().optional(),
  browsingHabits: z.string().optional(),
  brandInteractions: z.string().optional(),
  brandLoyalty: z.string().optional(),
  previousFeedback: z.string().optional(),
});

const customerPersonaInput = z.object({
  // Demographic
  age: z.string().optional(),
  gender: z.string().optional(),
  ethnicity: z.string().optional(),
  income: z.string().optional(),
  education: z.string().optional(),
  religion: z.string().optional(),
  profession: z.string().optional(),
  // Psychographic
  personalityTraits: z.string().optional(),
  hobbies: z.string().optional(),
  lifeGoals: z.string().optional(),
  values: z.string().optional(),
  beliefs: z.string().optional(),
  lifestyles: z.string().optional(),
  // Geographic
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  // Behavioral
  spendingHabits: z.string().optional(),
  purchasingHabits: z.string().optional(),
  browsingHabits: z.string().optional(),
  brandInteractions: z.string().optional(),
  brandLoyalty: z.string().optional(),
  previousFeedback: z.string().optional(),
});

export const personaRouter = createTRPCRouter({
  createBusiness: publicProcedure
    .input(businessPersonaInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.businessPersona.create({
        data: {
          businessType: input.businessType,
          // Demographic
          age: input.age ?? null,
          gender: input.gender ?? null,
          ethnicity: input.ethnicity ?? null,
          income: input.income ?? null,
          education: input.education ?? null,
          religion: input.religion ?? null,
          profession: input.profession ?? null,
          // Psychographic
          personalityTraits: input.personalityTraits ?? null,
          hobbies: input.hobbies ?? null,
          lifeGoals: input.lifeGoals ?? null,
          values: input.values ?? null,
          beliefs: input.beliefs ?? null,
          lifestyles: input.lifestyles ?? null,
          // Geographic
          country: input.country ?? null,
          region: input.region ?? null,
          city: input.city ?? null,
          postalCode: input.postalCode ?? null,
          // Behavioral
          spendingHabits: input.spendingHabits ?? null,
          purchasingHabits: input.purchasingHabits ?? null,
          browsingHabits: input.browsingHabits ?? null,
          brandInteractions: input.brandInteractions ?? null,
          brandLoyalty: input.brandLoyalty ?? null,
          previousFeedback: input.previousFeedback ?? null,
          // Connect to user if logged in
          ...(ctx.session?.user?.id && {
            createdBy: { connect: { id: ctx.session.user.id } },
          }),
        },
      });
    }),

  createCustomer: publicProcedure
    .input(customerPersonaInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.customerPersona.create({
        data: {
          // Demographic
          age: input.age ?? null,
          gender: input.gender ?? null,
          ethnicity: input.ethnicity ?? null,
          income: input.income ?? null,
          education: input.education ?? null,
          religion: input.religion ?? null,
          profession: input.profession ?? null,
          // Psychographic
          personalityTraits: input.personalityTraits ?? null,
          hobbies: input.hobbies ?? null,
          lifeGoals: input.lifeGoals ?? null,
          values: input.values ?? null,
          beliefs: input.beliefs ?? null,
          lifestyles: input.lifestyles ?? null,
          // Geographic
          country: input.country ?? null,
          region: input.region ?? null,
          city: input.city ?? null,
          postalCode: input.postalCode ?? null,
          // Behavioral
          spendingHabits: input.spendingHabits ?? null,
          purchasingHabits: input.purchasingHabits ?? null,
          browsingHabits: input.browsingHabits ?? null,
          brandInteractions: input.brandInteractions ?? null,
          brandLoyalty: input.brandLoyalty ?? null,
          previousFeedback: input.previousFeedback ?? null,
          // Connect to user if logged in
          ...(ctx.session?.user?.id && {
            createdBy: { connect: { id: ctx.session.user.id } },
          }),
        },
      });
    }),

  getAllBusiness: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.businessPersona.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAllCustomer: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.customerPersona.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
