Ext.define('Vendas.view.produto.CategoriaBusca' ,{
    extend   : 'Ext.window.Window',
    alias    : 'widget.categoriabuscagrid',   
    title    : 'Buscar Categorias',
    layout   : 'fit',
    autoShow : true,
    width    : 500,
    height   : 300,
    modal    : true, 

    initComponent: function() {       

        this.items = [{
            xtype      : 'grid',
            store      : 'Categorias',
            viewConfig : {
                preserveScrollOnRefresh : true,
            },            
            columns: [{
                header    : "ID",
                dataIndex : 'idcategorias'
            },{
                header    : "NOME",
                flex      : 1,
                dataIndex : 'nome'
            }]
        }];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                xtype     : 'textfield',
                itemId    : 'buscarCategoria',
                emptyText : 'Buscar'
            },{
                text   : 'Buscar',
                action : 'btnBuscarCategoria'
            },'->',{
                text    : 'Inserir',
                action  : 'btnInserirCategoria'
            }]
        }];
        
        this.callParent(arguments);
    }
});