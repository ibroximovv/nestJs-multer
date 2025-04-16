import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly product: Model<Product>){}
  async create(createProductDto: CreateProductDto) {
    try {
      const data = await this.product.create(createProductDto);
      return data
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll(query) {
    try {
      const { search, page = 1, limit = 10, categoryId, order = 'desc', column = 'name'} = query;
      interface IFilterObj {
        name?: {$regex: string, $options: string}
        color?: {$regex: string, $options: string}
        category?: string
      }

      let filter: IFilterObj = {}

      if (column == "name" && search) {
        filter.name = { $regex: search, $options: 'i' }
      }

      if (column == "color" && search) {
        filter.color = { $regex: search, $options: "i" }
      }

      if (categoryId) {
        filter.category = categoryId
      }
      const data = await this.product.find(filter).populate('category').sort({[column]: order === 'asc' ? 1 : -1 }).limit(limit).skip((page - 1) * limit)
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.product.findById(id)
      if (!data) {
        throw new NotFoundException(`Product with id ${id} not found`)
      }
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const findData = await this.product.findById(id)
      if (!findData) {
        throw new NotFoundException(`Product with id ${id} not found`)
      }
      const data = await this.product.findByIdAndUpdate(id, updateProductDto, { new: true })
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async remove(id: string) {
    try {
      const findData = await this.product.findById(id)
      if (!findData) {
        throw new NotFoundException(`Product with id ${id} not found`)
      }
      const data = await this.product.findByIdAndDelete(id)
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
