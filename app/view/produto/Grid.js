Ext.define('Vendas.view.produto.Grid' ,{
    extend   : 'Ext.window.Window',
    alias    : 'widget.produtosgrid',   
    title    : 'Produtos',
    layout   : 'fit',
    autoShow : true,
    width    : 500,
    height   : 300,
    modal    : true, 

    initComponent: function() {       

        this.items = [{
            xtype      : 'grid',
            store      : 'Produtos',
            viewConfig : {
                preserveScrollOnRefresh : true,
            },            
            columns: [{
                header    : "ID",
                dataIndex : 'idprodutos'
            },{
                header    : "NOME",
                flex      : 1,
                dataIndex : 'nome'
            },{
                header    : "BRUTO",
                dataIndex : 'valorsemimposto'
            },{
                header    : "LIQUIDO",
                dataIndex : 'valor'
            }]
        }];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text   : 'Adicionar',
                action : 'btnAdicionarProdutos'
            },{
                text   : 'Editar',
                action : 'btnEditarProdutos'
            },{
                text   : 'Excluir',
                action : 'btnExcluirProdutos'
            }]
        }];
        
        this.callParent(arguments);
    }
});