import type { FastifyInstance } from "fastify"

async function routes(fastify: FastifyInstance) {
    fastify.get('/health', async() => {
        
    })
}