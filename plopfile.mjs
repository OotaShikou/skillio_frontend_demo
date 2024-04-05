export default function (plop) {
  plop.setGenerator('component', {
    description: 'create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name? (e.g. button)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'components/{{pascalCase name}}/index.tsx',
        templateFile: '.plop/component.tsx.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: '.plop/component.test.tsx.hbs',
      },
    ],
  })
}
