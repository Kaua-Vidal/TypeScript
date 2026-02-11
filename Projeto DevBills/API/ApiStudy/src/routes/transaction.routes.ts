import type { FastifyInstance } from "fastify"
import createTransaction from "../controllers/transactions/createTransaction.controller"
import { zodToJsonSchema} from "zod-to-json-schema"
import { getTransactionsSchema } from "../schemas/transaction.schema"



const transactionRoutes = async(fastify: FastifyInstance) => {
    //Criação da transação
    fastify.route({
        method: "POST",
        url: "/",
        schema: {
        },
        handler: createTransaction
    })

    //Buscar com Filtros
    fastify.route({
        method: "GET",
        url: "/",
        schema: {
            querystring: zodToJsonSchema(getTransactionsSchema)
        },
        handler: getTransactions
    })
}

export default transactionRoutes