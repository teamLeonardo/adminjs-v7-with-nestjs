import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Database, Resource } from '@adminjs/prisma';
import AdminJS from 'adminjs';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthService } from './auth/auth.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CustomAdminModule } from './admin/admin.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { ProductsModule } from './modules/products/products.module.js';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    PrismaModule,
    CustomAdminModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
