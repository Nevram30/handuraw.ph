"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";

type BusinessType = "owner" | "investor" | "venture";

interface FormData {
  businessType: BusinessType;
  // Demographic
  age: string;
  gender: string;
  ethnicity: string;
  income: string;
  education: string;
  religion: string;
  profession: string;
  // Psychographic
  personalityTraits: string;
  hobbies: string;
  lifeGoals: string;
  values: string;
  beliefs: string;
  lifestyles: string;
  // Geographic
  country: string;
  region: string;
  city: string;
  postalCode: string;
  // Behavioral
  spendingHabits: string;
  purchasingHabits: string;
  browsingHabits: string;
  brandInteractions: string;
  brandLoyalty: string;
  previousFeedback: string;
}

const initialFormData: FormData = {
  businessType: "owner",
  age: "",
  gender: "",
  ethnicity: "",
  income: "",
  education: "",
  religion: "",
  profession: "",
  personalityTraits: "",
  hobbies: "",
  lifeGoals: "",
  values: "",
  beliefs: "",
  lifestyles: "",
  country: "",
  region: "",
  city: "",
  postalCode: "",
  spendingHabits: "",
  purchasingHabits: "",
  browsingHabits: "",
  brandInteractions: "",
  brandLoyalty: "",
  previousFeedback: "",
};

const businessTypes = [
  { value: "owner", label: "Business Owner", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { value: "investor", label: "Investor", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { value: "venture", label: "Business Venture", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
];

function FormSection({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className={`mb-6 flex items-center gap-2 text-xl font-bold ${color}`}>
        <span className={`h-3 w-3 rounded-full bg-current`} />
        {title}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  options
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: "text" | "select" | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
}) {
  const baseClasses = "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500";

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      {type === "select" && options ? (
        <select name={name} value={value} onChange={onChange} className={baseClasses}>
          <option value="" className="bg-white">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white">{opt.label}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className={baseClasses}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </div>
  );
}

export default function BusinessPersonaForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createPersona = api.persona.createBusiness.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
    },
    onError: (error) => {
      console.error("Error creating persona:", error);
      alert("Failed to create persona. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createPersona.mutateAsync(formData);
    } catch {
      // Error handled in mutation
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = ["Type", "Demographic", "Psychographic", "Geographic", "Behavioral"];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Persona Created!</h2>
          <p className="mb-8 text-gray-600">Your business persona has been successfully saved.</p>
          <Link
            href="/main-page"
            className="inline-block rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 font-semibold text-white transition hover:from-violet-700 hover:to-fuchsia-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/main-page" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600" />
            <span className="text-xl font-bold text-gray-900">Handuraw</span>
          </Link>
          <Link
            href="/main-page"
            className="text-sm text-gray-600 transition hover:text-gray-900"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">Business Persona Profile</h1>
          <p className="text-gray-600">Create your detailed persona for business insights and decision-making</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <button
                onClick={() => setCurrentStep(index)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                  index === currentStep
                    ? "bg-violet-600 text-white"
                    : index < currentStep
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index < currentStep ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>
              {index < steps.length - 1 && (
                <div className={`mx-2 h-1 w-8 rounded ${index < currentStep ? "bg-emerald-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 0: Business Type */}
          {currentStep === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-center text-xl font-bold text-gray-900">Select Your Business Role</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {businessTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, businessType: type.value as BusinessType }))}
                    className={`rounded-xl border-2 p-6 text-center transition ${
                      formData.businessType === type.value
                        ? "border-violet-500 bg-violet-50"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <svg className={`mx-auto mb-3 h-12 w-12 ${formData.businessType === type.value ? "text-violet-600" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={type.icon} />
                    </svg>
                    <span className={`font-medium ${formData.businessType === type.value ? "text-violet-700" : "text-gray-700"}`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Demographic */}
          {currentStep === 1 && (
            <FormSection title="Demographic Information" color="text-blue-600">
              <InputField
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                type="select"
                options={[
                  { value: "18-24", label: "18-24" },
                  { value: "25-34", label: "25-34" },
                  { value: "35-44", label: "35-44" },
                  { value: "45-54", label: "45-54" },
                  { value: "55-64", label: "55-64" },
                  { value: "65+", label: "65+" },
                ]}
              />
              <InputField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                type="select"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "non-binary", label: "Non-binary" },
                  { value: "prefer-not-to-say", label: "Prefer not to say" },
                ]}
              />
              <InputField
                label="Ethnicity"
                name="ethnicity"
                value={formData.ethnicity}
                onChange={handleChange}
                placeholder="Enter your ethnicity"
              />
              <InputField
                label="Income Range"
                name="income"
                value={formData.income}
                onChange={handleChange}
                type="select"
                options={[
                  { value: "under-25k", label: "Under $25,000" },
                  { value: "25k-50k", label: "$25,000 - $50,000" },
                  { value: "50k-75k", label: "$50,000 - $75,000" },
                  { value: "75k-100k", label: "$75,000 - $100,000" },
                  { value: "100k-150k", label: "$100,000 - $150,000" },
                  { value: "150k-plus", label: "$150,000+" },
                ]}
              />
              <InputField
                label="Education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                type="select"
                options={[
                  { value: "high-school", label: "High School" },
                  { value: "some-college", label: "Some College" },
                  { value: "bachelors", label: "Bachelor's Degree" },
                  { value: "masters", label: "Master's Degree" },
                  { value: "doctorate", label: "Doctorate" },
                  { value: "professional", label: "Professional Degree" },
                ]}
              />
              <InputField
                label="Religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                placeholder="Enter your religion (optional)"
              />
              <InputField
                label="Profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="Enter your profession"
              />
            </FormSection>
          )}

          {/* Step 2: Psychographic */}
          {currentStep === 2 && (
            <FormSection title="Psychographic Profile" color="text-purple-600">
              <InputField
                label="Personality Traits"
                name="personalityTraits"
                value={formData.personalityTraits}
                onChange={handleChange}
                type="textarea"
                placeholder="Describe your key personality traits (e.g., analytical, creative, decisive)"
              />
              <InputField
                label="Hobbies & Interests"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                type="textarea"
                placeholder="List your hobbies and interests"
              />
              <InputField
                label="Life Goals"
                name="lifeGoals"
                value={formData.lifeGoals}
                onChange={handleChange}
                type="textarea"
                placeholder="What are your main life goals?"
              />
              <InputField
                label="Core Values"
                name="values"
                value={formData.values}
                onChange={handleChange}
                type="textarea"
                placeholder="What values are most important to you?"
              />
              <InputField
                label="Beliefs"
                name="beliefs"
                value={formData.beliefs}
                onChange={handleChange}
                type="textarea"
                placeholder="Key beliefs that guide your decisions"
              />
              <InputField
                label="Lifestyle"
                name="lifestyles"
                value={formData.lifestyles}
                onChange={handleChange}
                type="textarea"
                placeholder="Describe your lifestyle (e.g., active, minimalist, tech-forward)"
              />
            </FormSection>
          )}

          {/* Step 3: Geographic */}
          {currentStep === 3 && (
            <FormSection title="Geographic Information" color="text-emerald-600">
              <InputField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
              />
              <InputField
                label="Region / State"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="Enter your region or state"
              />
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
              <InputField
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Enter your postal code"
              />
            </FormSection>
          )}

          {/* Step 4: Behavioral */}
          {currentStep === 4 && (
            <FormSection title="Behavioral Patterns" color="text-amber-600">
              <InputField
                label="Spending Habits"
                name="spendingHabits"
                value={formData.spendingHabits}
                onChange={handleChange}
                type="textarea"
                placeholder="Describe your spending patterns (e.g., budget-conscious, premium buyer)"
              />
              <InputField
                label="Purchasing Habits"
                name="purchasingHabits"
                value={formData.purchasingHabits}
                onChange={handleChange}
                type="textarea"
                placeholder="How do you typically make purchase decisions?"
              />
              <InputField
                label="Browsing Habits"
                name="browsingHabits"
                value={formData.browsingHabits}
                onChange={handleChange}
                type="textarea"
                placeholder="How do you research products/services?"
              />
              <InputField
                label="Brand Interactions"
                name="brandInteractions"
                value={formData.brandInteractions}
                onChange={handleChange}
                type="textarea"
                placeholder="How do you typically interact with brands?"
              />
              <InputField
                label="Brand Loyalty"
                name="brandLoyalty"
                value={formData.brandLoyalty}
                onChange={handleChange}
                type="select"
                options={[
                  { value: "very-loyal", label: "Very Loyal - Stick to trusted brands" },
                  { value: "somewhat-loyal", label: "Somewhat Loyal - Open to alternatives" },
                  { value: "not-loyal", label: "Not Loyal - Always seeking best value" },
                  { value: "varies", label: "Varies by category" },
                ]}
              />
              <InputField
                label="Previous Feedback"
                name="previousFeedback"
                value={formData.previousFeedback}
                onChange={handleChange}
                type="textarea"
                placeholder="Any feedback or experiences you'd like to share?"
              />
            </FormSection>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              className={`rounded-full border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50 ${
                currentStep === 0 ? "invisible" : ""
              }`}
            >
              Previous
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 font-medium text-white transition hover:from-violet-700 hover:to-fuchsia-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3 font-medium text-white transition hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create Persona"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
