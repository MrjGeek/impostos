Ext.define('Vendas.view.venda.ProdutoBusca' ,{
    extend   : 'Ext.window.Window',
    alias    : 'widget.produtobuscagrid',   
    title    : 'Buscar Produtos',
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
                xtype     : 'textfield',
                itemId    : 'buscarProdutos',
                emptyText : 'Buscar'
            },{
                text   : 'Buscar',
                action : 'btnBuscarProdutos'
            },'->',{
                text    : 'Inserir',
                action  : 'btnInserirProdutos'
            }]
        }];
        
        this.callParent(arguments);
    }
});