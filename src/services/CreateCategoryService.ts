import { getRepository } FindOperator, 'typeorm';

import Category from '../models/Category';

interface Request {
  category: string;
}

interface Response {
  id: string;
}

class CreateCategoryService {
  public async execute({category}: Request): Promise<Response> {
    const catergoryRepository = getRepository(Category);

    let checkCategoryExists = await catergoryRepository.findOne({
      where: {category},
    });

    if (!checkCategoryExists) {
      checkCategoryExists = catergoryRepository.create({
        category: category,
      });

      await catergoryRepository.save(checkCategoryExists);
    }

    return { id: checkCategoryExists.id };
  }
}

export default CreateCategoryService;
