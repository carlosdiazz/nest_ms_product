import {
  HttpStatus,
  Injectable,
  Logger,
  //NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
//Propio
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PagiantionDto } from 'src/common';

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

    //const totalPage = await this.product.count({ where: { available: true } });
    //const lastPage = Math.ceil(totalPage / limit);
    //console.log(`Total page: ${totalPage} - LastPage: ${lastPage}`);
    return await this.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        available: true,
      },
    });
  }

  public async findOne(id: number): Promise<Product> {
    const product = await this.product.findFirst({
      where: {
        id,
        available: true,
      },
    });
    if (!product) {
      //throw new NotFoundException(`Product with id ${id} not found`);
      throw new RpcException({
        message: `Product with id ${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return product;
  }

  public async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...data } = updateProductDto;

    await this.findOne(id);

    return await this.product.update({
      where: { id },
      data: data,
    });
  }

  public async remove(id: number): Promise<Product> {
    await this.findOne(id);

    //return await this.product.delete({ where: { id } });

    return await this.product.update({
      where: { id },
      data: {
        available: false,
      },
    });
  }
}
