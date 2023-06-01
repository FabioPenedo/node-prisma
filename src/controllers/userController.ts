import { Request, Response } from "express";
import { UserService } from '../services/UserService';

export const all = async (req: Request, res: Response) => {
  try {
    const users = await UserService.findAll();
    res.json({ users })
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os usuários.' });
  }
};

export const create = async (req: Request, res: Response) => {
  const { email, name, age } = req.body
  try {
    if(email && name && age) {
      const user = await UserService.findOne({email})
      if(!user) {
        const newUser = await UserService.create({
          email, name, age: parseInt(age)
        })
        res.status(201).json({ user: newUser })
      } else {
        res.status(400).json({error: 'Já existe usuário com esse e-mail'})
      }
    } else {
      res.status(400).json({error: 'Dados não preenchidos'})
    }
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao tentar criar o usuário.' });
  }
}