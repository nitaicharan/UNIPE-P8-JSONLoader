'use strict'

require('array.prototype.flatmap').shim()
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200'
})

async function run(index, body) {
    await client.indices.create(
        {
            "index": index 
            ,"body": {
                "mappings": {
                    "properties": {
                        "nomeParlamentar": { "type": "text"  },
                        "cpf": { "type": "text"  },
                        "idDeputado": {
                            "type" : "integer"
                        },
                        "numeroCarteiraParlamentar": { "type": "text"  },
                        "legislatura": {
                            "type":   "date",
                            "format": "yyyy"
                        },
                        "siglaUF": { "type": "text"  },
                        "siglaPartido": { "type": "text"  },
                        "codigoLegislatura": {
                            "type" : "integer"
                        },
                        "numeroSubCota": {
                            "type" : "integer"
                        },
                        "descricao": { "type": "text"  },
                        "numeroEspecificacaoSubCota": {
                            "type" : "integer"
                        },
                        "descricaoEspecificacao": { "type": "text"  },
                        "fornecedor": { "type": "text"  },
                        "cnpjCPF": { "type": "text"  },
                        "numero": { "type": "text"  },
                        "tipoDocumento": { "type": "text"  },
                        "dataEmissao": {
                            "type":   "date",
                            "format": "yyyy-MM-dd'T'HH:mm:ss"
                        },
                        "valorDocumento": { "type": "text"  },
                        "valorGlosa": { "type": "text"  },
                        "valorLiquido": { "type": "text"  },
                        "mes": {
                            "type":   "date",
                            "format": "MM"
                        },
                        "ano": {
                            "type":   "date",
                            "format": "yyyy"
                        },
                        "parcela": {
                            "type" : "integer"
                        },
                        "passageiro": { "type": "text"  },
                        "trecho": { "type": "text"  },
                        "lote": { "type": "text"  },
                        "ressarcimento": { "type": "text"  },
                        "restituicao": { "type": "text"  },
                        "numeroDeputadoID": {
                            "type" : "integer"
                        },
                        "idDocumento": {
                            "type" : "integer"
                        }
                    }
                }
            }
        }
        , { ignore: [400] })

    body = body.flatMap(doc => [{ index: { _index: index } }, doc])

    const { body: bulkResponse } = await client.bulk({ refresh: true, body })

    if (bulkResponse.errors) {
        const erroredDocuments = []
        bulkResponse.items.forEach((action, i) => {
            const operation = Object.keys(action)[0]
            if (action[operation].error) {
                erroredDocuments.push({
                    status: action[operation].status,
                    error: action[operation].error,
                    operation: body[i * 2],
                    document: body[i * 2 + 1]
                })
            }
        })
        console.log(erroredDocuments)
    }

    const { body: count } = await client.count({ index: index })
    console.log(count)
}

module.exports = {
    run
}
