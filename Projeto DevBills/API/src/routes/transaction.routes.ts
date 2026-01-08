import { FastifyInstance } from "fastify";
import  { zodToJsonSchema }  from "zod-to-json-schema" 
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { createTransactionSchema } from "../schema/transaction.schema";


const transactionRoutes = async(fastify: FastifyInstance): Promise<void> => {
    fastify.route({
        method: "POST",
        url: "/",
        schema: {
            body: zodToJsonSchema(createTransactionSchema) as unknown as object
        },
        handler: createTransaction
    })
    
}

export default transactionRoutes;