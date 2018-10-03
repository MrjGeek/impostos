Ext.define('Vendas.view.venda.Formulario', {
    extend    : 'Ext.window.Window',
    alias     : 'widget.vendaform',
    title     : 'Vendas',
    layout    : 'fit',
    autoShow  : true,
    modal     : true,
    maximized : true,   

    initComponent: function() {

        this.items = [{
            xtype  : 'form',      
            layout : 'anchor',
            items  : [{
                xtype      : 'textfield',
                name       : 'idvendas',
                fieldLabel : 'idvendas',
                hidden     : true
            },{                
                xtype  : 'button',
                text   : 'Adicionar Produtos',
                action : 'btnSalvarProdutos',
                margin : '5 5 5 5',
                flex   : 0.5                      
            },{
                xtype  : 'container',
                layout : 'hbox',
                items  : [{
                    xtype      : 'textfield',
                    name       : 'produtos_idprodutos',
                    fieldLabel : 'produtos_idprodutos',
                    itemId     : 'produtos_idprodutos',
                    hidden     : true
                },{
                    xtype             : 'textfield',
                    fieldLabel        : 'Produto:',
                    name              : 'nomeproduto',
                    itemId            : 'nomeproduto',
                    anchor            : '100%',
                    readOnly          : true,
                    margin            : '5 5 5 5',
                    labelWidth        : 50,
                    flex              : 1
                },{
                    xtype                 : 'numberfield',
                    fieldLabel            : 'Bruto:',
                    name                  : 'valorprodsemimposto',
                    itemId                : 'valorprodsemimposto',
                    anchor                : '100%',
                    margin                : '5 5 5 5',
                    decimalPrecision      : 2,
                    readOnly              : true,
                    decimalSeparator      : ",",
                    submitLocaleSeparator : false,
                    minValue              : 0, 
                    labelWidth            : 40,
                    flex                  : 0.5
                },{
                    xtype                 : 'numberfield',
                    fieldLabel            : 'Liquido:',
                    name                  : 'valorprod',
                    itemId                : 'valorprod',
                    anchor                : '100%',
                    margin                : '5 10 5 5',
                    decimalPrecision      : 2,
                    readOnly              : true,
                    decimalSeparator      : ",",
                    submitLocaleSeparator : false,
                    minValue              : 0,
                    labelWidth            : 40,
                    flex                  : 0.5 
                },{
                    xtype                 : 'numberfield',
                    fieldLabel            : 'Quantidade:',
                    name                  : 'quantidade',
                    itemId                : 'quantidade',
                    anchor                : '100%',
                    margin                : '5 5 5 10',
                    decimalPrecision      : 2,
                    decimalSeparator      : ",",
                    submitLocaleSeparator : false,
                    minValue              : 0,
                    labelWidth            : 65,
                    flex                  : 0.5                     
                },{
                    xtype  : 'button',
                    text   : 'Inserir na Venda',
                    action : 'btnInserirVenda',
                    margin : '5 5 5 5',  
                    flex   : 0.5                          
                }]
            },{
                xtype  : 'container',
                layout : 'hbox',
                items  : [{
                    xtype  : 'fieldset',
                    title  : 'Produtos',
                    flex   : 1.5,
                    margin : '5 5 5 5', 
                    height : window.innerHeight - 150,
                    items  : [{
                        xtype   : 'grid',
                        height  : window.innerHeight - 200,
                        store   : 'VendasProdutos',
                        margin  : '5 5 5 5',
                        columns : [{                        
                            header    : "NOME",
                            dataIndex : 'nomeproduto',
                            flex      : 1
                        },{
                            header    : 'UNIT. S/ IMP',
                            dataIndex : 'valorsemimposto'
                        },{
                            header    : 'UNIT. C/ IMP',
                            dataIndex : 'valor'
                        },{
                            header    : 'QTD',
                            dataIndex : 'quantidade'
                        },{
                            header    : 'TOTAL S/ IMP',
                            dataIndex : 'totalsemimposto'
                        },{
                            header    : 'TOTAL C/ IMP',
                            dataIndex : 'total'
                        },{
                            xtype :'actioncolumn',
                            width : 50,
                            align : 'center',
                            items : [{
                                icon    : 'https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Close-16.png',
                                tooltip : 'Excluir',
                                handler : function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    Vendas.app.getController('Vendas').calculatotal();
                                }
                            }]                            
                        }]
                    }]
                },{
                    xtype  : 'fieldset',
                    title  : 'Totais',
                    flex   : 0.5,
                    margin : '5 5 5 5', 
                    height : window.innerHeight - 150,
                    items  : [{
                        xtype                 : 'numberfield',
                        fieldLabel            : 'Sem Imposto:',
                        name                  : 'valorsemimposto',
                        itemId                : 'valorsemimposto',
                        anchor                : '100%',
                        margin                : '5 10 5 5',
                        decimalPrecision      : 2,
                        readOnly              : true,
                        decimalSeparator      : ",",
                        submitLocaleSeparator : false,
                        minValue              : 0,
                        labelAlign            : 'top'
                    },{
                        xtype                 : 'numberfield',
                        fieldLabel            : 'Impostos:',
                        name                  : 'impostos',
                        itemId                : 'impostos',
                        anchor                : '100%',
                        margin                : '5 10 5 5',
                        decimalPrecision      : 2,
                        readOnly              : true,
                        decimalSeparator      : ",",
                        submitLocaleSeparator : false,
                        minValue              : 0,
                        labelAlign            : 'top'
                    },{                        
                        xtype                 : 'numberfield',
                        fieldLabel            : 'Valor:',
                        name                  : 'valor',
                        itemId                : 'valor',
                        anchor                : '100%',
                        margin                : '5 10 5 5',
                        decimalPrecision      : 2,
                        readOnly              : true,
                        decimalSeparator      : ",",
                        submitLocaleSeparator : false,
                        minValue              : 0,
                        labelAlign            : 'top'
                    },{
                        xtype                 : 'numberfield',
                        fieldLabel            : 'Recebido:',
                        name                  : 'recebido',
                        itemId                : 'recebido',
                        anchor                : '100%',
                        margin                : '5 10 5 5',
                        decimalPrecision      : 2,
                        decimalSeparator      : ",",
                        submitLocaleSeparator : false,
                        minValue              : 0,
                        afterLabelTextTpl     : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                        allowBlank            : false,                        
                        labelAlign            : 'top',
                    },{
                        xtype                 : 'numberfield',
                        fieldLabel            : 'Troco:',
                        name                  : 'troco',
                        itemId                : 'troco',
                        anchor                : '100%',
                        margin                : '5 10 5 5',
                        decimalPrecision      : 2,
                        decimalSeparator      : ",",
                        submitLocaleSeparator : false,
                        minValue              : 0,
                        afterLabelTextTpl     : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                        allowBlank            : false,                        
                        labelAlign            : 'top'
                    }]
                }]
            }],
            buttons: [{
                text     : 'Salvar',
                disabled : true,
                formBind : true,
                action   : 'btnSalvarVenda'
            },{
                text    : 'Cancelar',
                scope   : this,
                handler : this.close
            }]
        }];
        this.callParent(arguments);
    }
});
