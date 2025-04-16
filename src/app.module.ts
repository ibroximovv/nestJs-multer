import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterController } from './multer/multer.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ProductModule, CategoryModule, MongooseModule.forRoot('mongodb://localhost/nest-lesson10'), 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: "/file"
    }),
  ],
  controllers: [AppController, MulterController],
  providers: [AppService],
})
export class AppModule {}
