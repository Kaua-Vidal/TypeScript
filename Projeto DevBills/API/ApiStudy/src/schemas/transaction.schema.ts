import { z } from 'zod';
import { ObjectId } from 'mongodb';
import { TransactionType } from '@prisma/client';

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id)

export const createTransactionSchema = z.object ({
    description: z.string().min(1, "Descrição obrigatória"),
    amount: z.number().positive("O número deve ser um valor positivo"),
    date: z.coerce.date({
        errorMap: () => ({ message: "Data inválida" })
    }),
    categoryId: z.string().refine(isValidObjectId, {
        message: "Categoria inválida"
    }),
    type: z.enum([TransactionType.expense, TransactionType.income], {
        errorMap: () => ({ message: "Data inválida"})
    })
})