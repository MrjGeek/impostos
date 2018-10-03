Ext.define('Vendas.view.venda.Grid' ,{
    extend   : 'Ext.window.Window',
    alias    : 'widget.vendasgrid',   
    title    : 'Vendas',
    layout   : 'fit',
    autoShow : true,
    width    : 500,
    height   : 300,
    modal    : true, 

    initComponent: function() {       

        this.items = [{
            xtype      : 'grid',
            store      : 'Vendas',
            viewConfig : {
                preserveScrollOnRefresh : true,
            },            
            columns: [{
                header    : "ID",
                dataIndex : 'idvendas'
            },{
                header    : "BRUTO",
                dataIndex : 'valorsemimposto',
                flex      : 1
            },{
                header    : "LIQUIDO",
                dataIndex : 'valor',
                flex      : 1
            },{
                header    : "RECEBIDO",
                dataIndex : 'recebido',
                flex      : 1
            },{
                header    : "TROCO",
                dataIndex : 'troco',
                flex      : 1
            }]
        }];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text   : 'Adicionar',
                action : 'btnAdicionarVendas'
            },{
                text   : 'Editar',
                action : 'btnEditarVendas'
            },{
                text   : 'Excluir',
                action : 'btnExcluirVendas'
            }]
        }];
        
        this.callParent(arguments);
    }
});