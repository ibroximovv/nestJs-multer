import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly category: Model<Category>){}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const data = await this.category.create(createCategoryDto)
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll(query) {
    try {
      interface CategoryQuery {
        name?: {$regex: string, $options: string }
      }
      const { search, page = 1, limit = 10, order = "desc", column = "name" } = query;
      const filter: CategoryQuery = {}
      if(search) {
        filter.name = {$regex: search, $options: "i" }
      }
      const data = await this.category.find(filter).sort({[column]: order === "asc" ? 1 : -1}).limit(limit).skip((page - 1) * limit)
      return data
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.category.findById(id)
      if (!data) {
        throw new NotFoundException(`Category with id ${id} not found`)
      }
      return data
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const findData = await this.category.findById(id)
      if (!findData) {
        throw new NotFoundException(`Category with id ${id} not found`)
      }
      const data = await this.category.findByIdAndUpdate(id, updateCategoryDto, { new: true })
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async remove(id: string) {
    try {
      const findData = await this.category.findById(id)
      if (!findData) {
        throw new NotFoundException(`Category with id ${id} not found`)
      }
      const data = await this.category.findByIdAndDelete(id)
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
