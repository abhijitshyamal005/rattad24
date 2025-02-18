type SubmName = {
  title: PLAN_NAME;
  subtitle: PLAN_SUBNAME[];
};
export enum PLAN_NAME {
  CREDIT = 'CREDIT',
  BUNDLE = 'BUNDLE',
  DYNAMIC = 'DYNAMIC',
  FREELANCE_PARTNERS = 'FREELANCE PARTNERS',
}
export enum PLAN_SUBNAME {
  FREE_FOREVER = 'Free Forever',
  UNIQUE = 'Unique',
  UNICORN = 'Unicorn',
  CUSTOM = 'Custom',
  SUPER_QUNICORN = 'Super Unicorn',
  PRO = 'Pro',
  OG = 'OG',
  RPODIGEE = 'Prodigee',
}
export enum PaymentType {
  MONTHLY = 'Monthly',
  ANNUALY = 'Annualy',
}
export interface Plan {
  name: PLAN_NAME;
  paymentType: PaymentType;
  planDescription: PlanDescription[];
}

export interface PlanDescription {
  planTitle: PLAN_SUBNAME;
  price: string;
  subscribedUsers: string;
  CTO: string;
  CTODescription: string;
  planPoint: string[];
  additionalFeatures?: string[];
  credit?: string;
}
