Ext.define('Vendas.view.categoria.Formulario', {
    extend   : 'Ext.window.Window',
    alias    : 'widget.categoriaform',
    title    : 'Categorias',
    layout   : 'fit',
    autoShow : true,
    width    : 400,
    modal    : true,   

    initComponent: function() {

        this.items = [{
            xtype  : 'form',      
            layout : 'anchor',
            items  : [{
                xtype      : 'textfield',
                name       : 'idcategorias',
                fieldLabel : 'idcategorias',
                hidden     : true
            },{
                xtype      : 'textfield',
                name       : 'editar',
                fieldLabel : 'editar',
                itemId     : 'editar',
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
                xtype  : 'fieldset',
                margin : '5 5 5 5',
                title  : 'Impostos',
                items  :[{
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype  : 'button',
                        text   : 'Adicionar Imposto',
                        action : 'btnAbrirImposto',
                        margin : '5 5 5 5'
                    },{
                        xtype  : 'button',
                        text   : 'Remover Imposto',
                        action : 'btnRemoverImposto',
                        margin : '5 5 5 5'                        
                    }]
                },{
                    xtype    : 'grid',
                    height   : 200,
                    store : 'ImpostosCategorias',
                    margin : '5 5 5 5',
                    columns  : [{                        
                        header    : "NOME",
                        flex      : 1,
                        dataIndex : 'nome'
                    },{
                        header    : 'PORCENTAGEM',
                        dataIndex : 'porcentagem'
                    }]
                }]
            }],
            buttons: [{
                text     : 'Salvar',
                disabled : true,
                formBind : true,
                action   : 'btnSalvarCategoria'
            },{
                text    : 'Cancelar',
                scope   : this,
                handler : this.close
            }]
        }];
        this.callParent(arguments);
    }
});
