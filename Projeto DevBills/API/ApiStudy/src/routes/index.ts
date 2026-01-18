import type { FastifyInstance } from "fastify"


async function routes(fastify: FastifyInstance): Promise<void> {
    fastify.get('/health', async() => {
        return {
            status: 'ok',
            message: 'DevBills API Rodando normalmente'
        }
    })
}

export default routes