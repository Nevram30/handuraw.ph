"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectPath: string;
  personaType: "business" | "customer";
}

export function PrivacyModal({ isOpen, onClose, redirectPath, personaType }: PrivacyModalProps) {
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);

  if (!isOpen) return null;

  const handleProceed = () => {
    if (isAgreed) {
      router.push(redirectPath);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className={`px-6 py-4 ${personaType === "business" ? "bg-gradient-to-r from-violet-600 to-fuchsia-600" : "bg-gradient-to-r from-pink-600 to-rose-600"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Data Privacy Notice</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[50vh] overflow-y-auto px-6 py-6">
          <div className="space-y-4 text-gray-700">
            <div className="rounded-lg bg-blue-50 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-900">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Republic Act No. 10173 - Data Privacy Act of 2012
              </h3>
              <p className="text-sm text-blue-800">
                In compliance with the Data Privacy Act of 2012 and its Implementing Rules and Regulations,
                we are committed to protecting your personal information.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">What information we collect:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                <li><strong>Demographic Data:</strong> Age, gender, ethnicity, income, education, religion, profession</li>
                <li><strong>Psychographic Data:</strong> Personality traits, hobbies, life goals, values, beliefs, lifestyles</li>
                <li><strong>Geographic Data:</strong> Country, region, city, postal code</li>
                <li><strong>Behavioral Data:</strong> Spending habits, purchasing habits, browsing habits, brand interactions</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">How we use your information:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                <li>To create and analyze user personas for business insights</li>
                <li>To improve our platform and services</li>
                <li>To provide personalized recommendations and analytics</li>
                <li>To conduct market research and trend analysis</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Your Rights:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                <li><strong>Right to be Informed:</strong> You have the right to know how your data is being processed</li>
                <li><strong>Right to Access:</strong> You can request access to your personal data</li>
                <li><strong>Right to Rectification:</strong> You can correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> You can request deletion of your personal data</li>
                <li><strong>Right to Data Portability:</strong> You can obtain your data in a structured format</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Data Security:</h4>
              <p className="text-sm text-gray-600">
                We implement appropriate technical and organizational measures to protect your personal data
                against unauthorized access, alteration, disclosure, or destruction. Your data is stored
                securely and access is limited to authorized personnel only.
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-semibold text-amber-900">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Important Notice
              </h4>
              <p className="text-sm text-amber-800">
                By proceeding, you acknowledge that you have read and understood this privacy notice,
                and you consent to the collection and processing of your personal information as described above.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="mb-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
              />
              <span className="text-sm text-gray-700">
                I have read and agree to the Data Privacy Notice. I consent to the collection and
                processing of my personal information for the purposes stated above.
              </span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              disabled={!isAgreed}
              className={`rounded-full px-5 py-2 text-sm font-medium text-white transition ${
                isAgreed
                  ? personaType === "business"
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
                    : "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              I Agree & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
