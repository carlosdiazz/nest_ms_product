import {
  Controller,
  //Get,
  //Post,
  //Body,
  //Patch,
  //Param,
  //Delete,
  //Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

//Propio
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateItemProduct, CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PagiantionDto } from 'src/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //@Post()
  @MessagePattern('create_product')
  public async create(
    @Payload() createProductDto: CreateProductDto,
    //@Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  //@Get()
  @MessagePattern('find_all_product')
  public async findAll(
    @Payload() paginationDto: PagiantionDto,
    //@Query() paginationDto: PagiantionDto,
  ): Promise<Product[]> {
    return await this.productsService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern('find_product')
  public async findOne(
    @Payload('id', ParseIntPipe) id: number,
    //@Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern('update_product')
  public async update(
    @Payload() updateProductDto: UpdateProductDto,
    //@Param('id', ParseIntPipe) id: number,
    //@Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(
      updateProductDto.id,
      updateProductDto,
    );
  }

  //@Delete(':id')
  @MessagePattern('remove_product')
  public async remove(
    @Payload('id', ParseIntPipe) id: number,
    //@Param('id', ParseIntPipe) id: number
  ): Promise<Product> {
    return await this.productsService.remove(id);
  }

  @MessagePattern('validateProducts')
  public async validateProducts(
    @Payload() createItemProduct: CreateItemProduct,
  ) {
    return await this.productsService.validateProducts(createItemProduct);
  }
}
