// intent properties
// const properties = {
//     prompt: 'Boolean', // optional
//     input: 'String', // optional
//     text: 'String | Array<String|Array> | Function<String|Array>', // optional
//     actions: [
//         {
//             key: 'Boolean | String | Function', // optional
//             text: 'String | Array | Function', // optional
//             target: 'String', // required
//             args: 'Object' // optional
//         }
//     ]
// }

const context = {
    cpf_url: '123'
}

const fases = {
    'fez_o_link': {
        text: 'Você gerou o link mas ainda não pagou',
        next: 'pago',
    },
    'pago': {
        text: 'Agora já pagou, aguarde os cheques chegarem no seu endereço',
        next: null
    }
}

const json = {
    dialog: {
        key: 'nina',
        initial: 'wellcome',
        intents: [
            {
                id: 'fallback',
                text: 'não entendi',
                actions: [
                    {
                        description: 'não entendi :: volta pra quem chamou',
                        target: '@BACK@'
                    }
                ]
            },
            {
                id: 'fallback_opcao_invalida',
                text: 'opção inválida',
                actions: [
                    {
                        target: '@BACK@'
                    }
                ]
            },
            {
                id: 'standby',
                prompt: true,
                actions: [
                    {
                        key: (input, ctx) => {
                            let obj = fases[ctx.fase]

                            if (!obj) {
                                return false
                            }

                            ctx.faseText = obj.text
                            ctx.fase = obj.next

                            return true
                        },
                        description: 'desvia de acordo com a fase atual',
                        text: (ctx) => ctx.faseText,
                        target: 'standby'
                    },
                    {
                        key: 'nina',
                        target: 'wellcome'
                    },
                    {
                        target: 'standby'
                    }
                ]
            },
            {
                id: 'wellcome',
                description: 'Oi, eu sou a nina',
                text: 'Eu sou a nina',
                actions: [
                    {
                        description: 'se tem cpf na url',
                        // se key=true, executa o target
                        key: () => { return Boolean(context.cpf_url) },
                        target: 'confirma_cpf_url'
                    },
                    {
                        description: 'não tem cpf na url',
                        // como não tem key, executa o target se o anterior não foi executado
                        target: 'confirma_cpf'
                    }
                ]
            },
            {
                id: 'confirma_cpf',
                prompt: true,
                text: 'Confirme o seu cpf',
                input: 'cpf',
                actions: [
                    {
                        description: 'após 3 segundos :: vai digitar não? tô aguardando',
                        key: '@TIMEOUT@',
                        text: 'vai digitar não? tô aguardando',
                        target: '@BACK@',
                        args: {
                            text: null // substitui a propriedade text da intent confirma_cpf
                        }
                    },
                    {
                        description: '',
                        key: (ctx) => { return ctx.cpf === context.cpf_url },
                        target: 'ver_cheques_devolvidos'
                    },
                    {
                        description: ' se responde "não sou eu"',
                        key: 'naosoueu',
                        target: 'nao_sou_eu'
                    }
                ],
                trainings: {
                    naosoueu: [
                        'não sou eu',
                        'esse cpf não é meu',
                        'eu não sou {nome}',
                        'esse não é meu nome'
                    ]
                }
            },
            {
                id: 'confirma_cpf_url',
                text: 'Estou confirmando o seu cpf, aguarde',
                actions: [
                    {
                        description: 'confirmou cpf via endpoint',
                        key: (ctx) => { return context.cpf_url === '123' },
                        text: 'Ok, cpf confirmado',
                        target: 'ver_cheques_devolvidos'
                    },
                    {
                        description: 'falhou a confirmação via endpoint',
                        text: 'Não consegui confirmar o seu cpf',
                        target: 'confirma_cpf'
                    }
                ]
            },
            {
                id: 'naosoueu',
                text: 'ok, não vou mais incomodar',
                actions: [
                    {
                        target: 'standby'
                    }
                ]
            },
            { // abrange ver_cheques_devolvidos, veja_se_tem_desconto, pergunta_parcelado_ou_a_vista e vamos_ver_o_melhor
                id: 'ver_cheques_devolvidos',
                prompt: true,
                textDescription: 'lista os cheques devolvidos e...\n\npergunta parcelado ou à vista?',
                text: () => [
                    'cheque devolvido 01',
                    'cheque devolvido 02',
                    'desconto à vista 80%\ndesconto parcelado 50%',
                    'parcelado ou à vista?'],
                actions: [
                    {
                        // a pergunta é só imbuste, continua no mesmo fluxo seja qual for a resposta
                        text: 'Ok, estou verificando a melhor opção pra vc',
                        target: 'confirma_email'
                    }
                ]
            },
            {
                id: 'confirma_email',
                prompt: true,
                fallback: 'fallback_opcao_invalida',
                text: [
                    'confirma seu email?',
                    '<b>emailqualquer@gmail.com</b>',
                    '<b>1</b>. confirmo',
                    '<b>2</b>. informar outro',
                    '<b>3</b>. não uso email'
                ].join('\n'),
                actions: [
                    {
                        key: '1',
                        target: 'confirma_telefone'
                    },
                    {
                        key: '2',
                        target: 'informar_outro_email'
                    },
                    {
                        key: '3',
                        text: 'Entendi, vc não usa email, vamos prosseguir',
                        target: 'confirma_telefone'
                    }
                ]
            },
            {
                id: 'informar_outro_email',
                prompt: true,
                text: 'Digite seu email',
                input: 'novo_email',
                actions: [
                    {
                        target: 'confirma_telefone'
                    }
                ]
            },
            {
                id: 'confirma_telefone',
                prompt: true,
                text: [
                    'confirma seu telefone?',
                    '<b>61 93625.3652</b>',
                    '<b>1</b>. confirmo',
                    '<b>2</b>. informar outro',
                    '<b>3</b>. não uso telefone'
                ].join('\n'),
                actions: [
                    {
                        key: '1',
                        target: 'confirma_informacoes'
                    },
                    {
                        key: '2',
                        target: 'informar_outro_telefone'
                    },
                    {
                        key: '3',
                        text: 'Ok, não quer ser incomodado por telefone, vamo nessa',
                        target: 'confirma_informacoes'
                    }
                ]
            },
            {
                id: 'informar_outro_telefone',
                prompt: true,
                text: 'Informe seu número de telefone',
                actions: [
                    {
                        target: 'confirma_informacoes'
                    }
                ]
            },
            {
                id: 'confirma_informacoes',
                prompt: true,
                text: [
                    'Você confirma as informações de email, tel e cpf?',
                    '<b>sim</b> ou <b>não</b>'
                ].join('\n'),
                actions: [
                    {
                        key: 'sim',
                        text: 'mostro alguam coisa sobre parcelamento',
                        target: 'mostra_opcoes_pagamento'
                    },
                    {
                        key: 'nao',
                        text: 'ok, vamos recomeçar',
                        target: 'confirma_email'
                    }
                ]
            },
            {
                id: 'mostra_opcoes_pagamento',
                prompt: true,
                input: 'opcao_pagamento',
                text: [
                    'tenho essas opções de pagamento:',
                    '<b>a</b>',
                    '<b>b</b>',
                    '<b>c</b>',
                    'qual você prefere?'
                ].join('\n'),
                actions: [
                    {
                        target: 'confirma_endereco'
                    }
                ]
            },
            {
                id: 'confirma_endereco',
                prompt: true,
                text: [
                    'Confirma o seu endereço?',
                    '<b>Riacho Fundo I - DF</b>',
                    '<b>1</b>. confirmo',
                    '<b>2</b>. informar outro'
                ].join('\n'),
                actions: [
                    {
                        key: '1',
                        target: 'busca_link_pagamento'
                    },
                    {
                        key: '2',
                        target: 'pergunta_endereco'
                    }
                ]
            },
            {
                id: 'pergunta_endereco',
                prompt: true,
                input: 'novo_endereco',
                text: 'Digite o seu endereço',
                actions: [
                    {
                        target: 'busca_link_pagamento'
                    }
                ]
            },
            {
                id: 'busca_link_pagamento',
                text: (ctx) => {
                    ctx.fase = 'fez_o_link'
                    return [
                        'seu link para pagamento é:',
                        '<b>b</b>',
                        '<script>alert(0)</script>',
                        '<a href="link.com.br/87b91">link.com.br/87b91</a>' 
                    ].join('\n')
                },
                actions: [
                    {
                        target: 'standby'
                    }
                ]
            }
        ]
    },
    views: {
        fallback: {
            id: 'fallback',
            x: 10,
            y: 20,
            width: 100,
            height: 80,
            actions: [null]
        },
        oi_nina: {
            id: 'oi_nina',
            x: 10,
            y: 20,
            width: 100,
            height: 80,
            actions: [
                {
                    x1: 10, y1: 20, x2: 0, y2: 0
                }
            ]
        }
    }
}

export default json
