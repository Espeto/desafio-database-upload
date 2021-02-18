import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';

import Transaction from '../models/Transaction';

import CreateTransactionService from './CreateTransactionService';

interface Request {
  fileDestination: string;
  fileName: string;
}

interface TransactionInput {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  async execute({
    fileDestination,
    fileName,
  }: Request): Promise<Transaction[]> {
    const createTransactionService = new CreateTransactionService();

    const csvFilePath = path.resolve(fileDestination, fileName);

    const readCSVStream = fs.createReadStream(csvFilePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: TransactionInput[] = [];

    parseCSV.on('data', line => {
      // const transaction = await createTransactionService.execute({
      //   title: line[0],
      //   type: line[1],
      //   value: line[2],
      //   category: line[3],
      // });

      console.log(line);

      lines.push(line);

      console.log(lines);
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    const transactions: Transaction[] = [];

    lines.forEach(async line => {
      const transaction = await createTransactionService.execute({
        title: line.title,
        type: line.type,
        value: line.value,
        category: line.category,
      });

      transactions.push(transaction);
    });

    return [];
  }
}

export default ImportTransactionsService;
