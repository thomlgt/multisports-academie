import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from '../admin/jwt-admin-auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  //* POST
  /**
   * crée un nouvel article
   * @param createArticleDto 
   */
  @Post()
  @UseGuards(AuthGuard("admin"))
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }


  //* GET
  /**
   * retourne tous les articles en base
   */
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  /**
   * Renvoie le nombre choisi d'articles en base classés par ordre chronologique
   * @param number le nombre d'articles que l'on souhaite récupérer (défaut = 3)
   * @param sort l'ordre chronologique des articles, n'accepte que 'asc' ou 'desc' (défaut = descendant)
   */
  @Get('/last')
  findLastArticlesByDate(@Query() params) {
    return this.articleService.findLastArticlesByDate(params);
  }

  /**
   * retourne un article à partir de son id
   * @param id 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }


  //* UPDATE
  /**
   * modifie un article à partir de son id
   * @param id 
   * @param updateArticleDto 
   */
  @Patch(':id')
  @UseGuards(AuthGuard("admin"))
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }


  //* DELETE
  /**
   * supprime un article à partir de son id
   * @param id 
   */
  @Delete(':id')
  @UseGuards(AuthGuard("admin"))
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }

}
