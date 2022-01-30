import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from './entities/article.entity';

@Injectable()
export class ArticleService {

  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    //Transformation du DTO createArticle en Article
    const article: Article = plainToInstance(Article, createArticleDto);
    article.createdDate = new Date();
    article.updatedDate = new Date();
    const createdArticle = new this.articleModel(article);
    return createdArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find();
  }

  async findOne(id: string): Promise<Article> {
      const article = this.articleModel.findById(id);
    if (!article) {
      //TODO:Log error
      throw new NotFoundException(`Aucun article avec l'id ${id} trouvée`);
    }
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
            //TODO: LOG error, throw error
            console.log(err);
          }
          console.log(updatedArticle);
        },
      )
      .clone();
  }

 async remove(id: string): Promise<Article> {
  return this.articleModel
    .findByIdAndRemove(id, {}, (err, deletedArticle) => {
      if (err) {
        //TODO: LOG error, throw error
      }
      return deletedArticle;
    })
    .clone();
  }
}
