Ext.define('Vendas.view.produto.Formulario', {
    extend   : 'Ext.window.Window',
    alias    : 'widget.produtoform',
    title    : 'Produtos',
    layout   : 'fit',
    autoShow : true,
    width    : 500,
    modal    : true,   

    initComponent: function() {

        this.items = [{
            xtype  : 'form',      
            layout : 'anchor',
            items  : [{
                xtype      : 'textfield',
                name       : 'idprodutos',
                fieldLabel : 'idprodutos',
                hidden     : true
            },{
                xtype      : 'textfield',
                name       : 'categorias_idcategorias',
                fieldLabel : 'categorias_idcategorias',
                itemId     : 'categorias_idcategorias',
                hidden     : true
            },{                
                xtype             : 'textfield',
                fieldLabel        : 'Nome:',
                afterLabelTextTpl : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                allowBlank        : false,
                name              : 'nome',
                anchor            : '100%',
                margin            : '5 5 5 5'
            },{
                xtype  : 'container',
                layout : 'hbox',
                flex   : 2,
                items  : [{
                    xtype             : 'textfield',
                    fieldLabel        : 'Categoria:',
                    afterLabelTextTpl : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                    allowBlank        : false,
                    name              : 'nomecategoria',
                    itemId            : 'nomecategoria',
                    anchor            : '100%',
                    readOnly          : true,
                    margin            : '5 0 5 5',
                    flex              : 1
                },{
                    xtype  : 'button',
                    text   : 'Adicionar Categoria',
                    action : 'btnSalvarCategorias',
                    margin : '5 0 5 0',
                    flex   : 0.5
                },{
                    xtype  : 'button',
                    text   : 'Remover Categoria',
                    action : 'btnRemoverCategorias',
                    margin : '5 5 5 0',
                    flex   : 0.5                                     
                }]                       
            },{
                xtype                 : 'numberfield',
                fieldLabel            : 'V. Sem Imposto:',
                afterLabelTextTpl     : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                allowBlank            : false,
                name                  : 'valorsemimposto',
                anchor                : '100%',
                margin                : '5 5 5 5',
                decimalPrecision      : 2,
                decimalSeparator      : ",",
                submitLocaleSeparator : false,
                minValue              : 0                            
            }],
            buttons: [{
                text     : 'Salvar',
                disabled : true,
                formBind : true,
                action   : 'btnSalvarProduto'
            },{
                text    : 'Cancelar',
                scope   : this,
                handler : this.close
            }]
        }];
        this.callParent(arguments);
    }
});
