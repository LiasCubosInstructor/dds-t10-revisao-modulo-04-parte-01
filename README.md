![](https://i.imgur.com/xG74tOh.png)

# dds-t10-revisao-modulo-04-parte-01

- Criar uma API REST com 6 endPoints, sendo eles responsaveis por ler e escrever um arquivo JSON sobre os alunos da DDS-T10

- Verbos utilizados (GET, POST, PUT, DELETE)

- GET (Receber, visualizar, listar)
- POST (Postar, enviar)
- PUT (modificar, atualizar)
- DELETE (Deletar, apagar, excluir)

## Listar Alunos

- Critérios de Aceite:

Este endpoint deve listar todos os alunos registrados no nosso BD-IN-MEMORY

O retorno deve ser um JSON contendo uma lista de objetos, sendo ele: { id, name, lastName, age, class, address, testScores}

StatusCode = 200

- Critérios de Falha:

Caso nenhum Aluno tenho sido encotrado registrado na BD-IN-MEMORY retornar algo vazio (NO-CONTENT)

StatusCode = 204

## Buscar Aluno

- Critérios de Aceite:

O Endpoint de buscar, deve ser similar ao listar, porem retornando apenas o aluno com o id especifico

StatusCode = 200

- Critérios de Falha:

Caso nenhum Aluno tenho sido encotrado registrado na BD-IN-MEMORY retornar algo vazio (NO-CONTENT)

StatusCode = 204

## Registrar o Aluno
O endpoint de registrar alunos deve enviar informacoes para o servidor no formato .json, como no exemplo abaixo:

```
{
    "name": "John",
    "lastName": "Armless"
    "age": 20,
    "class": "DDS-10"
    "address": {
      "postalCode": 05397120,
      "number": 65,
    } 
}
```

- Critérios de Aceite:

O id de um aluno deve se auto incrementar

O aluno deve ser salvo em um arquivo json

StatusCode = 201

- Critérios de Falha:

Caso o cep não seja valido retonar um erro

Atualmente não deve ser aceito alunos fora da DDS-T10, caso ocorra retornar um erro

StatusCode = 400

## Deletar um aluno

- Critérios de Aceite:

Caso o registro do aluno tenha sido feito errado, este endpoint devera deletar o registro

StatusCode = 200

- Critérios de Falha:

Em caso de registro nao encontrado retornar um erro

StatusCode = 400

## Adicionar nota dos módulos para um aluno

- Critérios de Aceite:

O endpoint de adicionar nota para um aluno deve passar um aluno em específico e sua nota do módulo no corpo da requisição, como no exemplo abaixo:

````
 {
  "module": 1-7,
  score: 0-10
 }
````

StatusCode = 200

- Critérios de Falha:

Só podem ser aceitas notas do módulo 1 ao 7, caso seja enviado qualquer módulo fora desse range retornar um erro

Só podem ser aceitas notas entre 0 e 10

StatusCode = 400

## Buscar situação de uma aluno

- Critérios de Aceite:

Busca a situação de um aluno dentro do curso, ou seja, se ele foi aprovado ou nao.

StatusCode = 200

- Critérios de Falha:

Caso o aluno nao exita retornar um erro

StatusCode = 400
