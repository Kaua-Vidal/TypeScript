import type { FastifyReply, FastifyRequest } from "fastify"
import { createTransactionSchema } from "../../schemas/transaction.schema"
import prisma from "../../config/prisma"

const createTransaction = async(request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const userId = "1234aaa" // Vem do request.userId

    if (!userId) {
        return reply.status(401).send({ error: "Usuário não autenticado"})
    }

    // Validação dos Dados

    const result = createTransactionSchema.safeParse(request.body)

    if(!result.success) {
        const errorMessage = result.error.errors[0].message 
            || "Validação Inválida"
        reply.status(500).send({ error: errorMessage})
        return;
    }

    const transaction = result.data

    try {
        const category = await prisma.category.findFirst({ 
            where:{
                id: transaction.categoryId,
                type: transaction.type
            }
        })

        if (!category) {
            reply.status(400).send({ error: "Categoria inválida"})
            return;
        }

        //Corrigindo data de String -> Date
        const parsedDate = new Date(transaction.date)
        
        //Enviar info para Banco de Dados
        const newTransaction = await prisma.transaction.create({
            data: {
                ...transaction,
                userId,
                date: parsedDate
            },
            //Incluindo as infos de Categorias também
            include: {
                category: true
            }
        })


        reply.status(201).send(newTransaction)
    } catch(err) {
        request.log.error("Erro ao criar transação")
        reply.status(500).send({ error: "Erro interno do servidor" })
    }
}

export default createTransaction