import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  category: string;
}

interface Response {
  id: string;
}

class CreateCategoryService {
  public async execute({ category }: Request): Promise<Category> {
    const catergoryRepository = getRepository(Category);

    let checkCategory = await catergoryRepository.findOne({
      where: { title: category },
    });

    if (!checkCategory) {
      checkCategory = catergoryRepository.create({
        title: category,
      });

      await catergoryRepository.save(checkCategory);
    }

    return checkCategory;
  }
}

export default CreateCategoryService;
