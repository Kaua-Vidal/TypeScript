import { FastifyInstance } from "fastify";
import app from "../app";
import createTransaction from "../controllers/transactions/createTransaction.controller";


const transactionRoutes = async(fastify: FastifyInstance): Promise<void> => {
    fastify.route({
        method: "POST",
        url: "/",
        schema: {
            
        },
        handler: createTransaction
    })
    
}

export default transactionRoutes