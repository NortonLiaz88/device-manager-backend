import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../dtos/category/update-category.dto';
import { CreateCategoryUseCase } from 'src/core/usecases/category/create-category.use-case';
import { DeleteCategoryUseCase } from 'src/core/usecases/category/delete-category.use-case';
import { FindAllCategoriesUseCase } from 'src/core/usecases/category/find-all-categories.use-case';
import { FindCategoryByIdUseCase } from 'src/core/usecases/category/find-category-by-id.use-case';
import { UpdateCategoryUseCase } from 'src/core/usecases/category/update-category.use-case';
import { CategoryQueryDto } from '../dtos/category/category-query.dto';
import { PaginatedCategoriesUseCase } from 'src/core/usecases/category/paginated-categories.use-case';
import { CategoryEntity } from 'src/core/domain/entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategory: CreateCategoryUseCase,
    private readonly findAllCategories: FindAllCategoriesUseCase,
    private readonly findCategoryById: FindCategoryByIdUseCase,
    private readonly updateCategory: UpdateCategoryUseCase,
    private readonly deleteCategory: DeleteCategoryUseCase,
    private readonly paginatedCategories: PaginatedCategoriesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.' })
  create(@Body() dto: CreateCategoryDto) {
    return this.createCategory.execute(dto.name);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias (sem paginação)' })
  @ApiResponse({
    status: 200,
    description: 'Lista completa de categorias',
    type: [CategoryEntity],
  })
  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.findAllCategories.execute();
    return categories.map(
      (category) => new CategoryEntity(category.id, category.name),
    );
  }

  @Get('paginated')
  @ApiOperation({
    summary: 'Listar categorias com paginação, filtros e ordenação',
  })
  findPaginated(@Query() query: CategoryQueryDto) {
    return this.paginatedCategories.execute({
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      id: query.id,
      name: query.name,
      orderBy: query.orderBy ?? 'id',
      orderDir: query.orderDir ?? 'ASC',
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar categoria por ID' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.findCategoryById.execute(id);

    if (!category) {
      throw new NotFoundException('Category with id ${id} not found');
    }
    return new CategoryEntity(category.id, category.name);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.updateCategory.execute(id, dto.name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover categoria' })
  @ApiResponse({ status: 200, description: 'Categoria removida.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteCategory.execute(id);
  }
}
