"use server";

import { earlyAccessFormSchema } from "@/app/schema/zod/earlyAccess";
import type { FormState } from "@/app/types/FormState";
import { connector } from "@/app/utils/connector";
import { dbConnect } from "@/app/utils/db";
import { fromErrorToFormState } from "@/app/utils/formError";

const create = async (
  formState: FormState,
  formData: FormData,
): Promise<{ message: {}; status: boolean }> => {
  try {
    const pool = await dbConnect();

    const rawFormData = earlyAccessFormSchema.parse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      businessName: formData.get("businessName"),
      referralCode: formData.get("referralCode"),
      updates: formData.get("updates") === "on" ? true : false,
    });

    const res = await pool.query(
      `INSERT INTO early_access(full_name,business_name,email,referral_code,updates) VALUES('${rawFormData.fullName}','${rawFormData.businessName}', '${rawFormData.email}', '${rawFormData.referralCode}', ${rawFormData.updates}) ON CONFLICT (email) DO UPDATE SET full_name=EXCLUDED.full_name,business_name=EXCLUDED.business_name, referral_code=EXCLUDED.referral_code, updates=EXCLUDED.updates, updated_at = NOW()`,
    );
    await pool.end();
    connector.close();

    return {
      status: true,
      message: "You will be notified very soon",
    };
  } catch (e) {
    return fromErrorToFormState(e);
  }
};

export { create };
