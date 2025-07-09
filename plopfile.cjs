module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Crea un nuevo módulo de dominio (MVC + repo + dto)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nombre del módulo (en minúsculas, ej: users):'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/{{kebabCase name}}.controller.ts',
        templateFile: 'plop-templates/controller.hbs'
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/{{kebabCase name}}.service.ts',
        templateFile: 'plop-templates/service.hbs'
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/{{kebabCase name}}.repository.ts',
        templateFile: 'plop-templates/repository.hbs'
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/dto/create-{{kebabCase name}}.dto.ts',
        templateFile: 'plop-templates/dto.hbs'
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/{{kebabCase name}}.entity.ts',
        templateFile: 'plop-templates/entity.hbs'
      },
      {
        type: 'add',
        path: 'src/modules/{{kebabCase name}}/{{kebabCase name}}.module.ts',
        templateFile: 'plop-templates/module.hbs'
      }
    ]
  });
}; 