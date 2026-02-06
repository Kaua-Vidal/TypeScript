import type { FastifyInstance } from "fastify"
import createTransaction from "../controllers/transactions/createTransaction.controller"
import { zodToJsonSchema} from "zod-to-json-schema"
import { createTransactionSchema } from "../schemas/transaction.schema"

// @ts-expect-error: complex type instantiation
const transactionJsonSchema = zodToJsonSchema(createTransactionSchema);

const transactionRoutes = async(fastify: FastifyInstance) => {
    fastify.route({
        method: "POST",
        url: "/",
        schema: {
            body: transactionJsonSchema
        },
        handler: createTransaction
    })
}

export default transactionRoutes