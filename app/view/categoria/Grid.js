Ext.define('Vendas.view.categoria.Grid' ,{
    extend   : 'Ext.window.Window',
    alias    : 'widget.categoriagrid',   
    title    : 'Categorias',
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
                text    : 'Adicionar',
                action  : 'btnAdicionarCategoria'
            },{
                text    : 'Editar',
                action  : 'btnEditarCategoria'
            },{
                text    : 'Excluir',
                action  : 'btnExcluirCategoria'
            }]
        }];
        
        this.callParent(arguments);
    }
});