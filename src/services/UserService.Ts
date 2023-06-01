import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type findOneDataProp = {
  id?: number;
  email?: string;
}

type createDataProp = {
  email: string;
  name: string;
  age: number;
}

export const UserService = {

  findAll: async () => {
    try {
      return await prisma.user.findMany({})
    } catch (error) {
      console.error('Erro no service:', error);
      throw new Error('Ocorreu um erro ao buscar os usuários.');
    }
  },

  findOne: async (data: findOneDataProp) => {
    try {
      return await prisma.user.findUnique({ where: data })
    } catch (error) {
      console.error('Erro no service:', error);
      throw new Error('Ocorreu um erro ao buscar o usuário.');
    }
  },

  create: async (data: createDataProp) => {
    try {
      return await prisma.user.create({data});
    } catch (error) {
      console.error('Erro no service:', error);
      throw new Error('Ocorreu um erro ao tentar criar o usuário.');
    }
  },
}