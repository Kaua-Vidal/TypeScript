import type { FastifyReply, FastifyRequest } from "fastify"


const createTransaction = async(request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const userId = "3lkj1lk2j0" // userId -> request.userId

    if (!userId) {
        reply.status(401).send({ error: "Usuário não autenticado"})
    }
    

    // VALIDAÇÃO DOS DADOS
}

export default createTransaction