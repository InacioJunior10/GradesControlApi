# :dart: Objetivos

<p align="justify">Exercitar os conceitos trabalhados no módulo para criação de uma API, criando endpoints utilizando Node.js e Express:
<ul>
<li>O desafio final consiste em desenvolver uma API chamada “grades-control-api” para controlar notas de alunos em matérias de um curso.</li>
<li>Você deverá desenvolver endpoints para criação, atualização, exclusão e consulta de notas, aqui chamadas de grades.</li>
<li>As grades deverão ser salvas em um arquivo json, chamado “grades.json”. Esse arquivo será previamente fornecido e seus endpoints devem atuar considerando os registros já existentes.</li>
</ul>
</p>

## :triangular_flag_on_post: Desafio

:heavy_check_mark: <b>1:</b> Crie um endpoint para criar uma grade. Este endpoint deverá receber como parâmetros os campos student, subject, type e value conforme descritos acima. Essa grade deverá ser salva no arquivo json grades.json, e deverá ter um id único associado. No campo timestamp deverá ser salvo a data e hora do momento da inserção. O endpoint deverá retornar o objeto da grade que foi criada. A API deverá garantir o incremento automático desse identificador, de forma que ele não se repita entre os registros. Dentro do arquivo grades.json que foi fornecido para utilização no desafio, o campo nextId já está com um valor definido. Após a inserção é preciso que esse nextId seja incrementado e salvo no próprio arquivo, de forma que na próxima inserção ele possa ser utilizado.

:heavy_check_mark: <b>2:</b> Crie um endpoint para atualizar uma grade. Esse endpoint deverá receber como parâmetros o id da grade a ser alterada e os campos student, subject, type e value. O endpoint deverá validar se a grade informada existe, caso não exista deverá retornar um erro. Caso exista, o endpoint deverá atualizar as informações recebidas por parâmetros no registro, e realizar sua atualização com os novos dados alterados no arquivo grades.json.

:heavy_check_mark: <b>3:</b> Crie um endpoint para excluir uma grade. Esse endpoint deverá receber como parâmetro o id da grade e realizar sua exclusão do arquivo grades.json.

:heavy_check_mark: <b>4:</b> Crie um endpoint para consultar uma grade em específico. Esse endpoint deverá receber como parâmetro o id da grade e retornar suas informações.

:heavy_check_mark: <b>5:</b> Crie um endpoint para consultar a nota total de um aluno em uma disciplina. O endpoint deverá receber como parâmetro o student e o subject, e realizar a soma de todas as notas de atividades correspondentes àquele subject, para aquele student. O endpoint deverá retornar a soma da propriedade value dos registros encontrados.

:heavy_check_mark: <b>6:</b> Crie um endpoint para consultar a média das grades de determinado subject e type. O endpoint deverá receber como parâmetro um subject e um type, e retornar a média. A média é calculada somando o registro value de todos os registros que possuem o subject e type informados, dividindo pelo total de registros que possuem este mesmo subject e type.

:heavy_check_mark: <b>7:</b> Crie um endpoint para retornar as três melhores grades de acordo com determinado subject e type. O endpoint deve receber como parâmetro um subject e um type, e retornar um array com os três registros de maior value daquele subject e type. A ordem deve ser do maior para o menor.

# Grades Control API

![GradesControlApi](https://github.com/InacioJunior10/GradesControlApi/blob/master/src/assets/Swagger.png)

Além do proposto para o desafio foram implementados o controle de logs com a bibliote Winston e um front-end com a biblioteca Swagger.
A aplicação roda na porta 3000 em localhost. Para utilizar o front-end do swagger: http://localhost:3000/swagger/
