import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Tipo de transação inválida');
    }

    const transactionRepository = getRepository(Transaction);
    const categoryService = new CreateCategoryService();

    const category_id = await categoryService.execute({ category });

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: category_id.id,
    });

    if (!transaction) {
      throw new AppError('Problemas na criação da transação');
    }

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
