import { Injectable } from '@nestjs/common';
import { Products } from './products.entity.js';

@Injectable()
export class ProductsRepository {
  private items: Products[] = [];

  findAll(): Products[] {
    return this.items;
  }
} 