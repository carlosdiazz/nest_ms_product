import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PagiantionDto } from 'src/common';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  public async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  public async findAll(
    @Query() paginationDto: PagiantionDto,
  ): Promise<Product[]> {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.remove(id);
  }
}
