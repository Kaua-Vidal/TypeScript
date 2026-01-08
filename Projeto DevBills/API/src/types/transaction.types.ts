import type { TransactionType } from "@prisma/client"

export interface TransactionFilter {
    userId: string,
    date?:{
        gte: Date
        lte: Date
    },
    type?: TransactionType
    categoryId?: string;
}

//se usa uma ? é porque não é obrigatório