import type { FastifyRequest, FastifyReply } from "fastify";
import type { DeleteTransactionParams } from "../../schema/transaction.schema";
import prisma from "../../config/prisma";

export const deleteTransaction = async(
    request:FastifyRequest<{ Params: DeleteTransactionParams}>, 
    reply:FastifyReply
):Promise<void> => {

    const { id } = request.params
    const userId = "3lkj1lk2j0" // userId -> request.userId

    if (!userId) {
        return reply.status(401).send({ error: "Usuário não autenticado"})
    }

    try {
        const transaction = await prisma.transaction.findFirst({
            where: {
                id, userId
            }
        })

        if (!transaction) {
            return reply.status(400).send({error: "ID da transação inválido"})
        }

        await prisma.transaction.delete({ where: { id } })
        reply.status(200).send({message: "Transação deletada com sucesso!"})
    } catch (error) {
        request.log.error({ message: "Erro ao deletar transação" })
        reply.status(500).send({ error: "Erro interno do servidor, falha ao deletar transação" })
    }
}