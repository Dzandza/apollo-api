import { Client } from "../../entities/Client";
import { getManager } from "typeorm";

export const getClients = async () => {
  const clients = await getManager().find(Client);
  return { nodes: clients, totalCount: clients.length };
};

export const createClient = async ({ client }) => {
  const newClient = getManager().create(Client, client);
  const { identifiers } = await getManager().insert(Client, newClient);

  return identifiers.length > 0 ? identifiers[0].id : null;
};

export const updateClient = async ({ clientId, client }) => {
  const updatedClient = getManager().create(Client, client);
  const { affected } = await getManager().update(
    Client,
    clientId,
    updatedClient
  );

  return affected > 0 ? clientId : null;
};

export const deleteClient = async ({ clientId }) => {
  const { affected } = await getManager().delete(Client, clientId);
  return affected > 0 ? clientId : null;
};
