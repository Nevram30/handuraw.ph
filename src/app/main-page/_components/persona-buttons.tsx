"use client";

import { useState } from "react";
import { PrivacyModal } from "./privacy-modal";

export function PersonaButtons() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<"business" | "customer">("business");

  const handleButtonClick = (type: "business" | "customer") => {
    setSelectedPersona(type);
    setModalOpen(true);
  };

  return (
    <>
      <div className="mb-8 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
        <button
          onClick={() => handleButtonClick("business")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-purple-700 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/20 text-left"
        >
          <div className="rounded-xl bg-white p-6 transition-all duration-300 group-hover:bg-gray-50">
            <div className="mb-4 flex items-center justify-center gap-3">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 text-center">Business & Investors</h3>
            <p className="text-sm text-gray-600 text-center">For Business Owners, Investors & Ventures</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-violet-600">
              <span className="text-sm font-medium">Create Your Persona</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleButtonClick("customer")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-600 via-rose-600 to-red-700 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/20 text-left"
        >
          <div className="rounded-xl bg-white p-6 transition-all duration-300 group-hover:bg-gray-50">
            <div className="mb-4 flex items-center justify-center">
              <svg className="h-10 w-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 text-center">Customers</h3>
            <p className="text-sm text-gray-600 text-center">For Consumer Insights & Market Research</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-pink-600">
              <span className="text-sm font-medium">Create Your Persona</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      <PrivacyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        redirectPath={selectedPersona === "business" ? "/persona/business" : "/persona/customer"}
        personaType={selectedPersona}
      />
    </>
  );
}
