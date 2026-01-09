import type { FastifyReply, FastifyRequest } from "fastify";
import { getTransactionsSummaryQuery } from "../../schema/transaction.schema";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import prisma from "../../config/prisma";


dayjs.extend(utc)

export const getTransactionsSummary = async(
    request:FastifyRequest<{Querystring: getTransactionsSummaryQuery}>, 
    reply:FastifyReply
):Promise<void> => {
    const userId = "3lkj1lk2j0";

    if (!userId) {
        return reply.status(401).send({ error: "Usuário não autenticado"})
    }

    const { month, year } = request.query

    if (!month || !year) {
        return reply.status(400).send({error: "Mês e Ano são Obrigatórios"});
    }

    const startDate = dayjs.utc(`${year}-${month}-01`)
                .startOf('month')
                .toDate();
            
    const endDate = dayjs.utc(startDate)
        .endOf('month')
        .toDate();


    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate,
                }
            },
            include: {
                category: true
            }
        })

        console.log(transactions)

        reply.send(transactions)
    } catch (err) {
        request.log.error("Erro ao trazer transações")
        reply.status(500).send({ error: "Erro do servidor"})
    }


}