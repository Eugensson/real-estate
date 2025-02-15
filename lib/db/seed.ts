import { cwd } from "process";
import { loadEnvConfig } from "@next/env";

import { Agent } from "@/lib/db/models/agent.model";
import { Property } from "@/lib/db/models/property.model";

import data from "@/lib/data";
import { connectToDatabase } from "@/lib/db";

loadEnvConfig(cwd());

const main = async () => {
  try {
    const { agents, properties } = data;
    await connectToDatabase(process.env.MONGODB_URI);

    await Agent.deleteMany();
    await Property.deleteMany();

    const createdAgents = await Agent.insertMany(agents);
    const agentIds = createdAgents.map((agent) => agent._id);

    const propertiesWithAgents = properties.map((property) => ({
      ...property,
      agent: agentIds[Math.floor(Math.random() * agentIds.length)],
    }));

    const createdProperties = await Property.insertMany(propertiesWithAgents);

    console.log({
      createdAgents,
      createdProperties,
      message: "Seeded database successfully",
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
