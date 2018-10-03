Ext.define('Vendas.view.imposto.Grid' ,{
    extend   : 'Ext.window.Window',
    alias    : 'widget.impostogrid',   
    title    : 'Impostos',
    layout   : 'fit',
    autoShow : true,
    width    : 500,
    height   : 300,
    modal    : true, 

    initComponent: function() {       

        this.items = [{
            xtype      : 'grid',
            store      : 'Impostos',
            viewConfig : {
                preserveScrollOnRefresh : true,
            },            
            columns: [{
                header    : "ID",
                dataIndex : 'idimpostos'
            },{
                header    : "NOME",
                flex      : 1,
                dataIndex : 'nome'
            },{
                header    : "PORCENTAGEM",                
                dataIndex : 'porcentagem'                
            }]
        }];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text    : 'Adicionar',
                action  : 'btnAdicionarImposto'
            },{
                text    : 'Editar',
                action  : 'btnEditarImposto'
            },{
                text    : 'Excluir',
                action  : 'btnExcluirImposto'
            }]
        }];
        
        this.callParent(arguments);
    }
});