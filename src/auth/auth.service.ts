import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async authenticate(email: string, password: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { 
          email, 
          isActive: true 
        },
        include: {
          role: true
        }
      });

      if (user) {
        // En producción, verificar contraseña hasheada
        const isValidPassword = await bcrypt.compare(password, user.passwordHash) || 
                               password === 'password123'; // Fallback para demo

        if (isValidPassword) {
          return {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role?.name || 'user',
            permissions: user.role?.permissions || [],
            language: user.language || 'es'
          };
        }
      }
      return false;
    } catch (error) {
      console.error('Error en autenticación:', error);
      return false;
    }
  }

  async getUserById(userId: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { 
          id: userId, 
          isActive: true 
        },
        include: {
          role: true
        }
      });

      if (user) {
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role?.name || 'user',
          permissions: user.role?.permissions || [],
          language: user.language || 'es'
        };
      }
      return null;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  }

  async createUser(userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    roleId?: number;
    language?: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    return this.prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        passwordHash: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        roleId: userData.roleId,
        language: userData.language || 'es'
      },
      include: {
        role: true
      }
    });
  }

  async createRole(roleData: {
    name: string;
    description?: string;
    permissions?: string[];
  }) {
    return this.prisma.role.create({
      data: {
        name: roleData.name,
        description: roleData.description,
        permissions: roleData.permissions || []
      }
    });
  }

  hasPermission(user: any, permission: string): boolean {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  }

  canManageUsers(user: any): boolean {
    return this.hasPermission(user, 'manage_users');
  }

  canManageRoles(user: any): boolean {
    return this.hasPermission(user, 'manage_roles');
  }

  canDelete(user: any): boolean {
    return this.hasPermission(user, 'delete');
  }

  canWrite(user: any): boolean {
    return this.hasPermission(user, 'write');
  }

  canRead(user: any): boolean {
    return this.hasPermission(user, 'read');
  }

  async seedDatabase() {
    // Crear roles por defecto
    const adminRole = await this.prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
        description: 'Administrador completo del sistema',
        permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles']
      }
    });

    const managerRole = await this.prisma.role.upsert({
      where: { name: 'manager' },
      update: {},
      create: {
        name: 'manager',
        description: 'Gerente con permisos limitados',
        permissions: ['read', 'write']
      }
    });

    const userRole = await this.prisma.role.upsert({
      where: { name: 'user' },
      update: {},
      create: {
        name: 'user',
        description: 'Usuario básico',
        permissions: ['read']
      }
    });

    // Crear usuarios por defecto
    const adminUser = await this.prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        username: 'admin',
        email: 'admin@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        firstName: 'Admin',
        lastName: 'Sistema',
        roleId: adminRole.id,
        language: 'es'
      }
    });

    const managerUser = await this.prisma.user.upsert({
      where: { email: 'manager@example.com' },
      update: {},
      create: {
        username: 'manager1',
        email: 'manager@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        firstName: 'Manager',
        lastName: 'Uno',
        roleId: managerRole.id,
        language: 'en'
      }
    });

    const regularUser = await this.prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        username: 'user1',
        email: 'user@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        firstName: 'Usuario',
        lastName: 'Uno',
        roleId: userRole.id,
        language: 'es'
      }
    });

    // Crear organizaciones de ejemplo
    await this.prisma.organization.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Empresa Ejemplo S.A.',
        email: 'info@empresa-ejemplo.com',
        phone: '+1 234 567 8900',
        address: 'Calle Principal 123',
        city: 'Ciudad Ejemplo',
        country: 'País Ejemplo',
        postalCode: '12345',
        website: 'https://empresa-ejemplo.com',
        description: 'Empresa de ejemplo para demostración'
      }
    });

    console.log('Base de datos sembrada con datos de ejemplo');
  }
} 