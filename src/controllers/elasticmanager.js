const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'http://localhost:9200'
    ,log: 'trace'
});

function mappings(index, err, cb){
    client.indices.create({
        index: index
        ,body: {
            "mappings": {
                "properties": {
                    "nomeParlamentar": { "type": "text"  },
                    "cpf": { "type": "text"  },
                    "idDeputado": { "type": "text"  },
                    "numeroCarteiraParlamentar": { "type": "text"  },
                    "legislatura": { "type": "text"  },
                    "siglaUF": { "type": "text"  },
                    "siglaPartido": { "type": "text"  },
                    "codigoLegislatura": { "type": "text"  },
                    "numeroSubCota": { "type": "text"  },
                    "descricao": { "type": "text"  },
                    "numeroEspecificacaoSubCota": { "type": "text"  },
                    "descricaoEspecificacao": { "type": "text"  },
                    "fornecedor": { "type": "text"  },
                    "cnpjCPF": { "type": "text"  },
                    "numero": { "type": "text"  },
                    "tipoDocumento": { "type": "text"  },
                    "dataEmissao": { "type": "text"  },
                    "valorDocumento": { "type": "text"  },
                    "valorGlosa": { "type": "text"  },
                    "valorLiquido": { "type": "text"  },
                    "mes": { "type": "text"  },
                    "ano": { "type": "text"  },
                    "parcela": { "type": "text"  },
                    "passageiro": { "type": "text"  },
                    "trecho": { "type": "text"  },
                    "lote": { "type": "text"  },
                    "ressarcimento": { "type": "text"  },
                    "restituicao": { "type": "text"  },
                    "numeroDeputadoID": { "type": "text"  },
                    "idDocumento": { "type": "text"  }
                }
            }
        }
    }, function(error,response,status) {
        if (error) {
            err(response);
            return;
        }
        else {
            cb(response);
            return;
        }
    });
};

function create(index,type,id,body,err,cb){
    client.create({
        index: index
        ,type: type
        ,id: id
        ,body: body
    }, function(error, response) {
        if (error) {
            err(response);
            return;
        }
        else {
            cb(response);
            return;
        }
    });
}

module.exports={
    mappings
    ,create
}
