import { FastifyInstance } from "fastify";
import  { zodToJsonSchema as _zodToJsonSchema }  from "zod-to-json-schema" 
import createTransaction from "../controllers/transactions/createTransaction.controller";
import {getTransactions} from "../controllers/transactions/getTransactions.controller";
import { createTransactionSchema, deleteTransactionSchema, getTransactionSchema, getTransactionsSummarySchema } from "../schema/transaction.schema";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";


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

    //Buscar o resumo
    fastify.route({
        method: "GET",
        url: "/summary",
        schema: {
            querystring: zodToJsonSchema(getTransactionsSummarySchema)
        },
        handler: getTransactionsSummary
    })

    //Deletar
    fastify.route({
        method: "DELETE",
        url: "/:id",
        schema: {
            params: zodToJsonSchema(deleteTransactionSchema)
        },
        handler: deleteTransaction
    })
    
}

export default transactionRoutes;

/*
    Querystring => filtrps
    body => Varias infos
    params => uma informação
*/ 