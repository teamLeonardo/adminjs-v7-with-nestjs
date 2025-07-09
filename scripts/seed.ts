import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeding de la base de datos...');

  // Crear roles por defecto
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Administrador completo del sistema',
      permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles']
    }
  });

  const managerRole = await prisma.role.upsert({
    where: { name: 'manager' },
    update: {},
    create: {
      name: 'manager',
      description: 'Gerente con permisos limitados',
      permissions: ['read', 'write']
    }
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      description: 'Usuario básico',
      permissions: ['read']
    }
  });

  console.log('✅ Roles creados:', { adminRole, managerRole, userRole });

  // Crear usuarios por defecto
  const adminUser = await prisma.user.upsert({
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

  const managerUser = await prisma.user.upsert({
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

  const regularUser = await prisma.user.upsert({
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

  console.log('✅ Usuarios creados:', { adminUser, managerUser, regularUser });

  // Crear organizaciones de ejemplo
  const organization1 = await prisma.organization.upsert({
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

  const organization2 = await prisma.organization.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Tech Solutions Inc.',
      email: 'contact@techsolutions.com',
      phone: '+1 555 123 4567',
      address: 'Tech Street 456',
      city: 'Silicon Valley',
      country: 'USA',
      postalCode: '94025',
      website: 'https://techsolutions.com',
      description: 'Empresa de tecnología innovadora'
    }
  });

  console.log('✅ Organizaciones creadas:', { organization1, organization2 });

  // Crear departamentos de ejemplo
  const department1 = await prisma.department.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Recursos Humanos',
      description: 'Departamento de gestión de personal',
      organizationId: 1,
      isActive: true
    }
  });

  const department2 = await prisma.department.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Tecnología',
      description: 'Departamento de desarrollo y IT',
      organizationId: 1,
      isActive: true
    }
  });

  const department3 = await prisma.department.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Ventas',
      description: 'Departamento comercial',
      organizationId: 2,
      isActive: true
    }
  });

  console.log('✅ Departamentos creados:', { department1, department2, department3 });

  // Crear algunos logs de auditoría de ejemplo
  const auditLog1 = await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: 'CREATE',
      tableName: 'users',
      recordId: regularUser.id,
      newValues: { email: regularUser.email, username: regularUser.username },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  const auditLog2 = await prisma.auditLog.create({
    data: {
      userId: managerUser.id,
      action: 'UPDATE',
      tableName: 'organizations',
      recordId: organization1.id,
      oldValues: { name: 'Empresa Antigua' },
      newValues: { name: organization1.name },
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  });

  console.log('✅ Logs de auditoría creados:', { auditLog1, auditLog2 });

  console.log('🎉 ¡Seeding completado exitosamente!');
  console.log('');
  console.log('📋 Credenciales de acceso:');
  console.log('👤 Admin: admin@example.com / password123');
  console.log('👤 Manager: manager@example.com / password123');
  console.log('👤 User: user@example.com / password123');
  console.log('');
  console.log('🌐 URL: http://localhost:3002/admin');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 