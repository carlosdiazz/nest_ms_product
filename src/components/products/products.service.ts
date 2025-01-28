import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//Propio
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PagiantionDto } from 'src/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  async onModuleInit() {
    await this.$connect();
  }

  public async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.product.create({
      data: createProductDto,
    });
  }

  public async findAll(paginationDto: PagiantionDto): Promise<Product[]> {
    const { limit, page } = paginationDto;

    const totalPage = await this.product.count();
    const lastPage = Math.ceil(totalPage / limit);
    console.log(`Total page: ${totalPage} - LastPage: ${lastPage}`);
    return await this.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  public async findOne(id: number): Promise<Product> {
    const product = await this.product.findFirst({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  public async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.findOne(id);

    return await this.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  public async remove(id: number): Promise<Product> {
    await this.findOne(id);

    return await this.product.delete({ where: { id } });
  }
}
