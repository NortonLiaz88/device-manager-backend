import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CreateCategoryUseCase } from 'src/core/usecases/create-category.use-case';
import { DeleteCategoryUseCase } from 'src/core/usecases/delete-category.use-case';
import { FindAllCategoriesUseCase } from 'src/core/usecases/find-all-categories.use-case';
import { FindCategoryByIdUseCase } from 'src/core/usecases/find-category-by-id.use-case';
import { UpdateCategoryUseCase } from 'src/core/usecases/update-category.use-case';
import { CategoryQueryDto } from '../dtos/category-query.dto';
import { PaginatedCategoriesUseCase } from 'src/core/usecases/paginated-categories.use-case';
import { Category } from 'src/core/domain/entities/category.entity';

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
    type: [Category],
  })
  async findAll(): Promise<Category[]> {
    const categories = await this.findAllCategories.execute();
    return categories.map(
      (category) => new Category(category.id, category.name),
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.findCategoryById.execute(id);
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
