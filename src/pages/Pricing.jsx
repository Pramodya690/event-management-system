import React from "react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9",
      period: "/month",
      description: "Perfect for small events and new organizers.",
      features: [
        "Up to 100 attendees",
        "Basic event analytics",
        "Email support",
        "1 event per month",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Ideal for growing organizers with multiple events.",
      features: [
        "Up to 500 attendees",
        "Advanced event analytics",
        "Priority email support",
        "Unlimited events",
        "Custom branding",
      ],
      buttonText: "Choose Pro",
      buttonVariant: "solid",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large-scale events with dedicated support.",
      features: [
        "Unlimited attendees",
        "Full analytics suite",
        "24/7 phone support",
        "Unlimited events",
        "Custom branding",
        "Dedicated account manager",
      ],
      buttonText: "Contact Us",
      buttonVariant: "outline",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
            Pricing Plans
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your event organizing needs. Start small
            or scale up with our flexible options.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "border-2 border-sky-500"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Most Popular
                </span>
              )}
              <h2 className="text-2xl font-semibold text-gray-900">
                {plan.name}
              </h2>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="ml-1 text-lg text-gray-500">
                    {plan.period}
                  </span>
                )}
              </div>
              <p className="mt-2 text-gray-600">{plan.description}</p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-sky-500 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    plan.buttonVariant === "solid"
                      ? "bg-sky-600 text-white hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      : "border-2 border-sky-500 text-sky-500 hover:bg-sky-50 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
