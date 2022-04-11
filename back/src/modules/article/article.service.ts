import { BadRequestException, Body, Inject, Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from './entities/article.entity';

@Injectable()
export class ArticleService {

  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {
    (logger as WinstonLogger).setContext(this.constructor.name);
  }

  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    //Transformation du DTO createArticle en Article
    const article: Article = plainToInstance(Article, createArticleDto);
    article.createdDate = new Date();
    article.updatedDate = new Date();
    const createdArticle = new this.articleModel(article);
    return createdArticle.save();
  }

  async findAll(): Promise<Article[]> {
    const articles = await this.articleModel.find();
    this.logger.debug(`findAll : ${articles.length} elements trouvées`);
    return articles;
  }

  async findOne(id: string): Promise<Article> {
      const article = this.articleModel.findById(id);
    if (!article) {
      this.logger.warn(`findOne: l'id ${id} n'a renvoyé aucun résultat`);
      throw new NotFoundException(`Aucun article avec l'id ${id} trouvée`);
    }
    this.logger.debug(`findOne: l'id ${id} a retourné 1 element`, article);
    return article;
  }

  async update(id: string, modifiedArticle: UpdateArticleDto): Promise<Article> {
     modifiedArticle.updatedDate = new Date();
    return this.articleModel
      .findByIdAndUpdate(
        id,
        modifiedArticle,
        { new: true },
        (err, updatedArticle) => {
          if (err) {
            this.logger.error(
              `update: erreur lors de l'update`,
              [
                { "erreur": err },
                { "méthode": "update"},
                { "id": id },
                { "entry": modifiedArticle }
              ]);
            throw new BadRequestException(`update: l'update de l'article ${id} a échoué`);
          }
          this.logger.debug(`update: l'element ${id} a été modifié avec succès`, updatedArticle);
        },
      )
      .clone();
  }

 async remove(id: string): Promise<Article> {
  return this.articleModel
    .findByIdAndRemove(id, {}, (err, deletedArticle) => {
      if (err) {
        this.logger.error(`remove: erreur lors de la suppression de l'element ${id}`, err);
        throw new BadRequestException(`erreur lors de la suppression de l'article ${id}`);
      }
      this.logger.debug(`remove: l'element ${id} a été supprimé avec succès`, deletedArticle);
      return deletedArticle;
    })
    .clone();
  }
}
