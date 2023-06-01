import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type createDataProp = {
  title: string;
  body: string;
  authorId: number;
}

type updateDataProp = {
  title?: string;
  body?: string;
  authorId?: number;
  published?: boolean;
}

export const PostService = {

  findAll: async () => {
    try {
      return await prisma.post.findMany({
        where: {published: true},
        orderBy: {id: 'desc'}
      })
    } catch (error) {
      console.error('Erro no service:', error);
      throw new Error('Ocorreu um erro ao buscar os posts.');
    }
  },

  findOne: async (id: number) => {
    try {
      return await prisma.post.findUnique({where:{ id }})
    } catch (error) {
      console.error('Erro no service:', error);
      throw new Error('Ocorreu um erro ao buscar o post.');
    }
  },

  create: async (data: createDataProp) => {
    try {
      return await prisma.post.create({data});
    } catch (error) {
      console.error('Erro no service:', error);
      throw new Error('Ocorreu um erro ao tentar criar o post.');
    }
  },

  update: async (id: number, data: updateDataProp) => {
    try {
      return await prisma.post.update({ where: {id}, data })
    } catch (error) {
      console.error('Erro no service:', error);
      throw new Error('Ocorreu um erro ao tentar alterar o post.');
    }
  },

  delete: async (id: number) => {
    try {
      return await prisma.post.delete({where: {id}})
    } catch (error) {
      console.error('Erro no service:', error);
      throw new Error('Ocorreu um erro ao tentar deletar o post.');
    }
  }
}

