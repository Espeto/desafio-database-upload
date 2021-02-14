import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  category: string;
}

interface Response {
  id: string;
}

class CreateCategoryService {
  public async execute({ category }: Request): Promise<Response> {
    const catergoryRepository = getRepository(Category);

    let checkCategoryExists = await catergoryRepository.findOne({
      where: { title: category },
    });

    if (!checkCategoryExists) {
      checkCategoryExists = catergoryRepository.create({
        title: category,
      });

      await catergoryRepository.save(checkCategoryExists);
    }

    return { id: checkCategoryExists.id };
  }
}

export default CreateCategoryService;
