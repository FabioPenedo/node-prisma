import { Request, Response } from "express";
import { PostService } from '../services/PostService';
import { UserService } from '../services/UserService';

export const all = async (req: Request, res: Response) => {
  try {
    const posts = await PostService.findAll();
    res.json({posts})
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os posts.' });
  }
};

export const one = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const post = await PostService.findOne(parseInt(id));
    if(post) {
      res.json({post})
    } else {
      res.status(404).json({ error: 'Post não encontrado!' })
    }
    
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar o post.' });
  }
};

export const create = async (req: Request, res: Response) => {
  const { title, body, author } = req.body
  try {
    if(title && body && author) {
      const user = await UserService.findOne({id: parseInt(author)})
      if(user !== null) {
        const post = await PostService.create({
          title, body, authorId: user.id
        })
        res.status(201).json({post})
      } else {
        res.status(404).json({error: 'Autor não existe'})
      }
    } else {
      res.status(400).json({error: 'Dados não preenchidos'})
    }
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao tentar criar o post.' });
  }
}

export const togglePost = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const post = await PostService.findOne(parseInt(id))
    if(post) {
      const postUpdated = await PostService.update(
        post.id,
        { published: !post.published }
      )
      res.json({ post: postUpdated  })
    } else {
      res.status(404).json({ error: 'Post não encontrado!' })
    }
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao tentar alterar o post.' });
  }
}

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const post = await PostService.findOne(parseInt(id))
    if(post) {
      await PostService.delete(parseInt(id))
      res.json({status: true})
    } else {
      res.status(404).json({ error: 'Post não encontrado!' })
    }
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao tentar deletar o post.' });
  }
}