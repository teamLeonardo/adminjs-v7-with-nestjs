import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AdminModule } from '@adminjs/nestjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { Database, Resource, getModelByName } from '@adminjs/prisma';
import AdminJS from 'adminjs';
import { readFileSync } from 'fs';

const es = JSON.parse(
  readFileSync(new URL('../i18n/es.json', import.meta.url), 'utf-8'),
);
const en = JSON.parse(
  readFileSync(new URL('../i18n/en.json', import.meta.url), 'utf-8'),
);

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    PrismaModule,
    AdminModule.createAdminAsync({
      useFactory: () => {
        const prisma = new PrismaService();
        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              {
                resource: {
                  model: getModelByName('Organization'),
                  client: prisma,
                },
                options: {},
              },
              {
                resource: { model: getModelByName('User'), client: prisma },
                options: {},
              },
              {
                resource: { model: getModelByName('Role'), client: prisma },
                options: {},
              },
              {
                resource: {
                  model: getModelByName('Department'),
                  client: prisma,
                },
                options: {},
              },
              {
                resource: { model: getModelByName('AuditLog'), client: prisma },
                options: {},
              },
            ],
            branding: {
              companyName: 'AdminJS Multiidioma',
              logo: false,
              softwareBrothers: false,
            },
            locale: { language: 'es', translations: { es, en } },
          },
          auth: {
            authenticate: async (email, password) => {
              return { email };
            },
            cookiePassword: 'secret',
            cookieName: 'adminjs',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        };
      },
    }),
  ],
})
export class CustomAdminModule {}
