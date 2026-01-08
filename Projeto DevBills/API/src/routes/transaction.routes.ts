import { FastifyInstance } from "fastify";
import  { zodToJsonSchema as _zodToJsonSchema }  from "zod-to-json-schema" 
import createTransaction from "../controllers/transactions/createTransaction.controller";
import {getTransactions} from "../controllers/transactions/getTransactions.controller";
import { createTransactionSchema, getTransactionSchema } from "../schema/transaction.schema";


const transactionRoutes = async(fastify: FastifyInstance): Promise<void> => {
    const zodToJsonSchema = _zodToJsonSchema as unknown as (schema: unknown, options?: unknown) => object;


    // Criação
    fastify.route({
        method: "POST",
        url: "/",
        schema: {
            body: zodToJsonSchema(createTransactionSchema),
        },
        handler: createTransaction
    })

    //Buscar com Filtro
    fastify.route({
        method: "GET",
        url: "/",
        schema: {
            querystring: zodToJsonSchema(getTransactionSchema)
        },
        handler: getTransactions
    })
    
}

export default transactionRoutes;