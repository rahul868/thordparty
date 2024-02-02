export const pricing = {
  plansmeta: [
    {
      plan_code: "P",
      plan_name: "Free Plan",
      plan_desc:
        "Moderate usage for small professional teams up to three (3) people.",
      plan_tenure: "MONTHLY",
      plan_price: 9.99,
      features: {
        "Basic Features": true,
        User: "Unlimited for individuals, limited block trial for 2+ members",
        "Total Free Pages(monthly)": "Moderate usage for small professional teams up to three (3) people.",
        "Additional Pages": "Moderate usage for small professional teams up to three (3) people.",
        "Chat Support": false,
        "Optional GPT 4.0 Support": true,
        "Folder Level Permissions": false,
        "Department Level Permissions":"upto 1",
        OCR: false,
        "Response Personalization": false,
        "Uptime SLA": false,
        "Early Access To New Features": false,
        "On-Premises": false,
      },
    },
    {
      plan_code: "P001",
      plan_name: "Business Plan",
      plan_desc:
        "Moderate usage for small professional teams up to three (3) people.",
      plan_tenure: "MONTHLY",
      plan_price: 9.99,
      features: {
        "Basic Features": true,
        User: "1",

        "Total Free Pages(monthly)": "60",

        "Additional Pages": "$ 0.02/Page",

        "Chat Support": true,

        "Optional GPT 4.0 Support": true,
        "Department Level Permissions":"upto 2",
        "Folder Level Permissions": false,

        OCR: false,

        "Response Personalization": false,

        "Uptime SLA": false,

        "Early Access To New Features": false,

        "On-Premises": false,
      },
    },
    {
      plan_code: "P002",
      plan_name: "Enterprise Plan",
      plan_desc:
        "Moderate usage for small professional teams up to three (3) people.",
      plan_tenure: "MONTHLY",
      plan_price: 9.99,
      features: {
        "Basic Features": true,
        User: "3",
        "Total Free Pages(monthly)": "60",
        "Additional Pages": "$ 0.02/Page",
        "Chat Support": false,
        "Optional GPT 4.0 Support": true,
        "Folder Level Permissions": false,
        "Department Level Permissions":"upto 2",
        OCR: false,
        "Response Personalization": false,
        "Uptime SLA": false,
        "Early Access To New Features": false,
        "On-Premises": false,
      },
    },
  ],
  common_features: [
    "",
    "Basic Features",
    "User",
    "Total Free Pages(monthly)",
    "Additional Pages",
    "Chat Support",
    "Optional GPT 4.0 Support",
    "Enterprise Support",
    "Department Level Permissions",
    "Folder Level Permissions",
    "OCR",
    "Response Personalization",
    "SOC-2-Certificate",
    "Uptime SLA",
    "Early Access To New Features",
    "On-Premises",
  ],
  total_plans: 2,
};
