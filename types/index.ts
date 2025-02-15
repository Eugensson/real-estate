import { z } from "zod";

import { AgentInputSchema, PropertyInputSchema } from "@/lib/validator";

export type IAgentInput = z.infer<typeof AgentInputSchema>;
export type IPropertyInput = z.infer<typeof PropertyInputSchema>;

export type Data = {
  agents: IAgentInput[];
  properties: IPropertyInput[];
};
