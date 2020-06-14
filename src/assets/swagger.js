export const swaggerDocument = {
    swagger: '2.0',
    info: {
        description: 'Desafio do módulo 2 do curso Bootcamp - Desenvolvedor Full Stack',
        version: '1.0.0',
        title: 'Grades Control API - API para gerenciamento de notas',
    },
    host: 'localhost:3000',
    tags: [
        {
            name: 'grades',
            description: 'Gerenciamento de notas',
        },
    ],
    paths: {
        '/grades': {
            get: {
                tags: ['grades'],
                summary: 'Obter notas existentes',
                description: 'Obter descrição da nota existente',
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'successful operation',
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/Grade',
                            },
                        },
                    },
                    '400': {
                        description: 'Error occurred',
                    },
                },
            },
            post: {
                tags: ['grades'],
                summary: 'Criar uma nova nota',
                description: 'Criar uma nova nota com os parâmetros recebidos',
                consumes: ['application/json'],
                parameters: [
                    {
                        in: 'body',
                        name: 'body',
                        description: 'Grade object',
                        required: true,
                        schema: {
                            $ref: '#/definitions/GradePost',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Grade created',
                    },
                    '400': {
                        description: 'Error occurred',
                    },
                },
            },
            put: {
                tags: ['grades'],
                summary: 'Atualizar uma nota existente',
                description: 'Atualizar uma nota existente com os parâmetros recebidos',
                consumes: ['application/json'],
                parameters: [
                    {
                        in: 'body',
                        name: 'body',
                        description: 'Grade object',
                        required: true,
                        schema: {
                            $ref: '#/definitions/GradePut',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Grade update',
                    },
                    '400': {
                        description: 'Error occurred',
                    },
                },
            },
        },
        '/grades/{gradeId}': {
            get: {
                tags: ['grades'],
                summary: 'Encontrar nota por ID',
                description: 'Retorna uma única nota',
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'gradeId',
                        in: 'path',
                        description: 'ID of grade to return',
                        required: true,
                        type: 'integer',
                        format: 'int64',
                    },
                ],
                responses: {
                    '200': {
                        description: 'successful operation',
                        schema: {
                            $ref: '#/definitions/Grade',
                        },
                    },
                    '400': {
                        description: 'Invalid ID supplied',
                    },
                },
            },
            delete: {
                tags: ['grades'],
                summary: 'Excluir notas existentes',
                description: 'Excluir nota existente',
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'gradeId',
                        in: 'path',
                        description: 'Grade id to delete',
                        required: true,
                        type: 'integer',
                        format: 'int64',
                    },
                ],
                responses: {
                    '200': {
                        description: 'successful operation',
                        schema: {
                            type: 'string',
                            items: {
                                $ref: '#/definitions/GradeDelete',
                            },
                        },
                    },
                    '400': {
                        description: 'Error occurred',
                    },
                },
            },
        },
        '/grades/{student}/{subject}': {
            get: {
                tags: ['grades'],
                summary: 'Retornar a nota total de um aluno em um curso',
                description: 'Retornar a nota total de um aluno em um curso',
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'student',
                        in: 'path',
                        description: 'Name of the student',
                        required: true,
                        type: 'string',
                        format: 'string',
                    },
                    {
                        name: 'subject',
                        in: 'path',
                        description: 'Name of the subject',
                        required: true,
                        type: 'string',
                        format: 'string',
                    },
                ],
                responses: {
                    '200': {
                        description: 'successful operation',
                        schema: {
                            $ref: '#/definitions/GradeTotal',
                        },
                    },
                    '400': {
                        description: 'Invalid ID supplied',
                    },
                },
            },
        },
        '/grades/media/{subject}/{type}': {
            get: {
                tags: ['grades'],
                summary: 'Consultar a média das notas de determinado subject e type',
                description: 'Consultar a média das notas de determinado subject e type',
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'subject',
                        in: 'path',
                        description: 'Name of the subject',
                        required: true,
                        type: 'string',
                        format: 'string',
                    },
                    {
                        name: 'type',
                        in: 'path',
                        description: 'Name of the type',
                        required: true,
                        type: 'string',
                        format: 'string',
                    },
                ],
                responses: {
                    '200': {
                        description: 'successful operation',
                        schema: {
                            $ref: '#/definitions/GradeMedia',
                        },
                    },
                    '400': {
                        description: 'Invalid ID supplied',
                    },
                },
            },
        },
        '/grades/melhor/{subject}/{type}': {
            get: {
                tags: ['grades'],
                summary: 'Retornar as três melhores notas de acordo com determinado subject e type',
                description: 'Retornar as três melhores notas de acordo com determinado subject e type',
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'subject',
                        in: 'path',
                        description: 'Name of the subject',
                        required: true,
                        type: 'string',
                        format: 'string',
                    },
                    {
                        name: 'type',
                        in: 'path',
                        description: 'Name of the type',
                        required: true,
                        type: 'string',
                        format: 'string',
                    },
                ],
                responses: {
                    '200': {
                        description: 'successful operation',
                        schema: {
                            $ref: '#/definitions/GradeMelhor',
                        },
                    },
                    '400': {
                        description: 'Invalid ID supplied',
                    },
                },
            },
        },
    },
    definitions: {
        Grade: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    example: 1,
                },
                student: {
                    type: 'string',
                    example: 'Loiane Groner',
                },
                subject: {
                    type: 'string',
                    example: '01 - JavaScript',
                },
                type: {
                    type: 'string',
                    example: 'Fórum',
                },
                value: {
                    type: 'integer',
                    example: 15,
                },
                timestamp: {
                    type: 'string',
                    example: '2020-05-19T18:21:24.958Z',
                },
            },
        },
        GradePost: {
            type: 'object',
            properties: {
                student: {
                    type: 'string',
                    example: '',
                },
                subject: {
                    type: 'string',
                    example: '',
                },
                type: {
                    type: 'string',
                    example: '',
                },
                value: {
                    type: 'integer',
                    example: 0,
                },
            },
        },
        GradePut: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    example: 1,
                },
                student: {
                    type: 'string',
                    example: '',
                },
                subject: {
                    type: 'string',
                    example: '',
                },
                type: {
                    type: 'string',
                    example: '',
                },
                value: {
                    type: 'integer',
                    example: 0,
                },
            },
        },
        GradeDelete: {
            type: 'string',
            value: 'Registro deletado com sucesso!',
        },
        GradeTotal: {
            properties: {
                type: 'object',
                totalNotas: {
                    type: 'integer',
                    example: 35,
                },
            },
        },
        GradeMedia: {
            properties: {
                type: 'object',
                mediaGrades: {
                    type: 'integer',
                    example: 42,
                },
            },
        },
        GradeMelhor: {
            properties: {
                type: 'object',
                maiorValue: {
                    type: 'integer',
                    example: 20,
                },
            },
        },
    },
};
