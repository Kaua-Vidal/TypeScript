import type { FastifyReply, FastifyRequest } from "fastify"

const createTransaction = async(request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const userId = "1234aaa" // Vem do request.userId

    if (!userId) {
        reply.status(401).send({ error: "Usuário não autenticado"})
    }

    // Validação dos Dados
}

export default createTransaction