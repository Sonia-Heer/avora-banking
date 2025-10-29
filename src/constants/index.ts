export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Dashboard",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
];

export const transactionCategoryStyles = {
  FOOD_AND_DRINK: {
    borderColor: "border-pink-700",
    backgroundColor: "bg-pink-50",
    textColor: "text-pink-900",
    chipBackgroundColor: "bg-pink-100",
  },
  Payment: {
    borderColor: "border-blue-700",
    backgroundColor: "bg-blue-50",
    textColor: "text-blue-900",
    chipBackgroundColor: "bg-blue-100",
  },
  "Bank Fees": {
    borderColor: "border-amber-700",
    backgroundColor: "bg-amber-50",
    textColor: "text-amber-900",
    chipBackgroundColor: "bg-amber-100",
  },
  TRANSFER: {
    borderColor: "border-indigo-700",
    backgroundColor: "bg-indigo-50",
    textColor: "text-indigo-900",
    chipBackgroundColor: "bg-indigo-100",
  },
  Processing: {
    borderColor: "border-gray-400",
    backgroundColor: "bg-gray-50",
    textColor: "text-gray-800",
    chipBackgroundColor: "bg-gray-100",
  },
  Success: {
    borderColor: "border-green-700",
    backgroundColor: "bg-green-50",
    textColor: "text-green-900",
    chipBackgroundColor: "bg-green-100",
  },
  TRAVEL: {
    borderColor: "border-sky-700",
    backgroundColor: "bg-sky-50",
    textColor: "text-sky-900",
    chipBackgroundColor: "bg-sky-100",
  },
  TRANSPORTATION: {
    borderColor: "border-orange-700",
    backgroundColor: "bg-orange-50",
    textColor: "text-orange-900",
    chipBackgroundColor: "bg-orange-100",
  },
  default: {
    borderColor: "border-slate-400",
    backgroundColor: "bg-slate-50",
    textColor: "text-slate-900",
    chipBackgroundColor: "bg-slate-100",
  },
};

export const topCategoryStyles = {
  "food and drink": {
    bg: "bg-gray-100",
    circleBg: "bg-brand-secondary",
    text: {
      main: "text-foreground",
      count: "text-foreground",
    },
    progress: {
      bg: "bg-brand-secondary",
      progressBg: "bg-brand-primary",
    },
    icon: "/icons/monitor.svg",
  },
  travel: {
    bg: "bg-gray-100",
    circleBg: "bg-brand-secondary",
    text: {
      main: "text-foreground",
      count: "text-foreground",
    },
    progress: {
      bg: "bg-brand-secondary",
      progressBg: "bg-brand-primary",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-gray-100",
    circleBg: "bg-brand-secondary",
    text: {
      main: "text-foreground",
      count: "text-foreground",
    },
    progress: {
      bg: "bg-brand-secondary",
      progressBg: "bg-brand-primary",
    },
    icon: "/icons/shopping-bag.svg",
  },
};
