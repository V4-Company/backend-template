# Finance service

Objetivo desse repositório é ser um gerenciador de tarefas com o escopo de finanças.

## Estrutura de pastas

```
|--src/                                      #Pasta principal
|----modules/                                #Modulos
|------{{nomeDoModulo}}/                     #Modulo a ser criado, pode haver mais de um modulo
|--------dtos/                               #Onde guardamos os Data Transfer Object (DTOs) do nosso modulo
|--------infra/                              #Infra do nosso modulo
|----------http/                             #Primeiro contato externo com nosso modulo
|------------controllers/                    #Controllers do modulo (onde fica primeiro contato com a requisição)
|------------documentation/                  #Documentação do módulo
|------------routes/                         #Rotas referente a este módulo
|----------orm/                              #Onde fica informações sobre o orm/banco
|------------entites/                        #Entidades do banco
|------------repositories/                   #Onde comunica com o banco por meio do orm
|--------iRepositories/                      #Interfaces dos repositorios
|--------services/                           #Serviços do módulo (onde fica a lógica)
|--------utils/                              #Pasta para salvar funções/constants que uteis para esse modulo
|----shared/                                 #Onde fica arquivos compartilhado por todos módulos
|------container/                            #Implementação do Singleton
|--------providers/                          #Providers para envio de email/pagamentos/cache/etc
|------errors/                               #Implementação do controle de erros
|------infra/                                #Infra principal da aplicação
|--------http/                               #Parte que comunica externamente
|----------documentation/                    #Onde configura e junta todas as documentações dos modulos
|----------routes/                           #Onde chama todas as rotas dos modulos
|----------server.ts                         #Arquivo principal da nossa aplicação
|--------orm/                                #Local de configuração do nosso orm
|----------migrations/                       #Local das migrações do banco
|----------utils/                            #Armazena funções/constants uteis para o orm
|----------index.ts                          #configuração padrão do orm
|------utils/                                #Funções/constants uteis para o app todo
|----tests/                                  #Onde fica os testes
|------services/                             #Serviços dos testes
|------mocks/                                #onde armazena os mocks dos testes
```

## Comandos

- Instala dependencias
  `yarn`

- Executa como desenvolvedor e usa as variaveis do .env.development
  `yarn dev`

- Executa os testes
  `yarn test`

- Builda a aplicação usando as variaveis do .env
  `yarn build`

- Roda a build
  `yarn start`

- Verifica eslint e prettier
  `yarn lint`

- Verifica eslint e prettier, corrigindo automaticamente
  `yarn lint --fix`

## Sobre o Eslint e Prettier

Estamos usando as regras de lint do airbnb, e qualquer alteração de regra deve ser tomada em conjunto junto aos tech leads.

## Considerações finais

Espero que tenham entendido com clareza, qualquer dúvida ou sugestão por favor entrem em contato comigo (Marlon).

### Happy coding

#### #goToIpo 🚀

![toast](https://media.giphy.com/media/8Iv5lqKwKsZ2g/giphy.gif)

## Product module business-rules

- An user should be able to create a product.
- An user should be able to disable a product.
