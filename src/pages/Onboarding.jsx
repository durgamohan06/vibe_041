import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const Onboarding = () => {
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    role: "", // Step 1
    education: "", // Step 2
    fields: [], // Step 2
    interests: [], // Step 3
    goal: "", // Step 4
    pace: "", // Step 5
    dailyTime: "", // Step 5
  });

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Complete
      setStep(6);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleList = (key, value) => {
    setFormData((prev) => {
      const list = prev[key];
      if (list.includes(value)) {
        return { ...prev, [key]: list.filter((item) => item !== value) };
      } else {
        return { ...prev, [key]: [...list, value] };
      }
    });
  };

  const handleFinish = () => {
    completeOnboarding(formData);
    navigate("/");
  };

  // Skip
  const handleSkip = () => {
    completeOnboarding({ skipped: true });
    navigate("/");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepContainer
            title="What best describes you?"
            subtitle="This helps us tailor the learning path for you.">
            <div className="grid gap-3">
              {[
                "Student",
                "Working Professional",
                "Career Switcher",
                "Government Exam Aspirant",
                "Lifelong Learner",
              ].map((role) => (
                <SelectionCard
                  key={role}
                  label={role}
                  selected={formData.role === role}
                  onClick={() => updateData("role", role)}
                />
              ))}
            </div>
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer
            title="Academic & Background"
            subtitle="Tell us where you are starting from.">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Current Level
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "School",
                    "Undergraduate",
                    "Postgraduate",
                    "Self-learning",
                  ].map((level) => (
                    <SelectionCard
                      key={level}
                      label={level}
                      compact
                      selected={formData.education === level}
                      onClick={() => updateData("education", level)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Field of Interest (Multiple)
                </label>
                <div className="grid gap-3">
                  {[
                    "IT / Computer Science",
                    "Core Engineering",
                    "Government & Policy",
                    "Science & Research",
                    "Other",
                  ].map((field) => (
                    <SelectionCard
                      key={field}
                      label={field}
                      multi
                      selected={formData.fields.includes(field)}
                      onClick={() => toggleList("fields", field)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </StepContainer>
        );
      case 3:
        return (
          <StepContainer
            title="What are you curious about?"
            subtitle="Select topics that spark your interest.">
            <div className="flex flex-wrap gap-3">
              {[
                "AI & Technology",
                "Core Engineering Concepts",
                "Public Policy & Governance",
                "Research & Innovation",
                "Problem Solving",
                "General Knowledge",
                "Economics",
                "History",
              ].map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleList("interests", interest)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    formData.interests.includes(interest)
                      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                      : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                  }`}>
                  {interest}
                </button>
              ))}
            </div>
          </StepContainer>
        );
      case 4:
        return (
          <StepContainer
            title="What is your primary goal?"
            subtitle="We'll prioritize content based on this.">
            <div className="grid gap-3">
              {[
                "Build strong fundamentals",
                "Prepare for future-ready skills",
                "Improve academic performance",
                "Explore domains before choosing a path",
                "Long-term career clarity",
              ].map((goal) => (
                <SelectionCard
                  key={goal}
                  label={goal}
                  selected={formData.goal === goal}
                  onClick={() => updateData("goal", goal)}
                />
              ))}
            </div>
          </StepContainer>
        );
      case 5:
        return (
          <StepContainer
            title="Learning Preferences"
            subtitle="How do you want to learn?">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Pace
                </label>
                <div className="grid gap-3">
                  {["Slow & Deep", "Balanced", "Fast & Goal-Driven"].map(
                    (pace) => (
                      <SelectionCard
                        key={pace}
                        label={pace}
                        selected={formData.pace === pace}
                        onClick={() => updateData("pace", pace)}
                      />
                    )
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Daily Availability
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["30 mins", "1 hour", "2+ hours"].map((time) => (
                    <SelectionCard
                      key={time}
                      label={time}
                      compact
                      selected={formData.dailyTime === time}
                      onClick={() => updateData("dailyTime", time)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </StepContainer>
        );
      case 6:
        return (
          <div className="text-center animate-fade-in space-y-6 py-10">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Check size={24} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your learning space is ready
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              We'll now guide you based on your interests and long-term goals.
            </p>
            <div className="pt-8">
              <button
                onClick={handleFinish}
                className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Enter Workspace
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!formData.role;
      case 2:
        return !!formData.education && formData.fields.length > 0;
      case 3:
        return formData.interests.length > 0;
      case 4:
        return !!formData.goal;
      case 5:
        return !!formData.pace && !!formData.dailyTime;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 p-4 font-sans">
      <div className="w-full max-w-xl">
        {/* Render Active Step */}
        {renderStep()}

        {/* Navigation */}
        {step < 6 && (
          <div className="flex items-center justify-between mt-10">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <button
                onClick={handleSkip}
                className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                Skip to workspace
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                isStepValid()
                  ? "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              }`}>
              Next <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {step < 6 && (
          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-all duration-300 ${
                  s <= step
                    ? "w-8 bg-black dark:bg-white"
                    : "w-2 bg-gray-200 dark:bg-gray-800"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const StepContainer = ({ title, subtitle, children }) => (
  <div className="animate-fade-in">
    <div className="mb-8 text-center md:text-left">
      <span className="text-xs font-semibold tracking-wider text-green-600 dark:text-green-500 uppercase mb-2 block">
        Step{" "}
        {title.includes("Preference")
          ? 5
          : title.includes("goal")
          ? 4
          : title.includes("curious")
          ? 3
          : title.includes("Academic")
          ? 2
          : 1}{" "}
        of 5
      </span>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h1>
      <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
    </div>
    {children}
  </div>
);

const SelectionCard = ({ label, selected, onClick, multi, compact }) => (
  <div
    onClick={onClick}
    className={`
       cursor-pointer border rounded-xl transition-all flex items-center justify-between
       ${compact ? "p-3 text-sm" : "p-4"}
       ${
         selected
           ? "border-black dark:border-white bg-gray-50 dark:bg-gray-900 shadow-sm"
           : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-950"
       }
     `}>
    <span
      className={`font-medium ${
        selected
          ? "text-gray-900 dark:text-white"
          : "text-gray-600 dark:text-gray-400"
      }`}>
      {label}
    </span>
    {selected && (
      <div className="w-5 h-5 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black">
        <Check size={12} strokeWidth={3} />
      </div>
    )}
  </div>
);

export default Onboarding;
