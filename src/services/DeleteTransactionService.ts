import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getRepository(Transaction);

    const transaction = await transactionRepository
      .findOne({ id })
      .catch(error => {
        throw new AppError(error.message);
      });

    console.log(transaction);

    if (!transaction) {
      throw new AppError('Transação não encontrada', 404);
    }

    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
