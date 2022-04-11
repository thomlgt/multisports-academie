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
    const articles = await this.articleModel
    .find()
    .populate('mainPicture')
    .sort({ "updatedDate": -1 })
    this.logger.debug(`findAll : ${articles.length} elements trouvées`);
    return articles;
  }

  async findOne(id: string): Promise<Article> {
    const article =  await this.articleModel
      .findById(id)
      .populate(['mainPicture', 'gallery']);

    if (!article) {
      this.logger.warn(`findOne: l'id ${id} n'a renvoyé aucun résultat`);
      throw new NotFoundException(`Aucun article avec l'id ${id} trouvée`);
    }
    this.logger.debug(`findOne: l'id ${id} a retourné 1 element`);
    return article;
  }

  async update(id: string, modifiedArticle: UpdateArticleDto): Promise<Article> {
    modifiedArticle.updatedDate = new Date();
    return this.articleModel
      .findByIdAndUpdate(
        id, modifiedArticle, { new: true },
        (err, updatedArticle) => {
          if (err) {
            this.logger.error(`update: Une erreur est survenue lors de la MAJ de l'article ${id}`, { "erreur": err });
            throw new BadRequestException(err.message);
          }
          console.log(updatedArticle);
        })
      .clone();
  }

  async remove(id: string): Promise<Article> {
    return this.articleModel
      .findByIdAndRemove(id, {}, (err, deletedArticle) => {
        if (err) {
          this.logger.error(
            `remove: Une erreur est survenue lors de la suppression de l'article ${id}`,
            { "erreur": err }
          );
          throw new BadRequestException(err.message);
        }
        this.logger.debug(`remove: l'article ${id} a été supprimé avec succès`);
        return deletedArticle;
      })
      .clone();
  }

  async findLastArticlesByDate(params) {
    const articles = await this.articleModel
      .find({})
      .limit(params.take)
      .sort({ "updatedDate": params.sort = 'asc' ? -1 : 1 })
      .populate('mainPicture', {_id: 0, url: 1,  altText: 1});
    this.logger.debug({ "message": `findLastArticlesByDate: ${articles.length} article(s) trouvé(s)`, "params": params, "articles": articles });
    return articles;
  }
}
