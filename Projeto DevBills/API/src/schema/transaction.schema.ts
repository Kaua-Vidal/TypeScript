import * as z from "zod" //Serve para validação, estilo YUP no React
import { ObjectId } from 'mongodb'
import { TransactionType } from "@prisma/client";

const isValidObjectId = 
    (id: string): boolean => 
        ObjectId.isValid(id);

export const createTransaction = z.object({
    description: z.string().min(1, "Descrição obrigatória"),

    amount: z.number().positive("Valor deve ser positivo"),

    date: z.coerce.date({
        error: () => ({ message: "Data inválida"})
    }),

    categoryId: z.string().refine(isValidObjectId, {
        message: "Categoria inválida",
    }),
    
    type: z.enum([TransactionType.expense, TransactionType.income], {
        error: () => ({ message: "Data inválida" }),
    }),
})

// desciption String
//   amount     Float
//   date       DateTime
//   type       TransactionType