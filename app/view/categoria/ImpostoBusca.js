Ext.define('Vendas.view.categoria.ImpostoBusca' ,{
    extend   : 'Ext.window.Window',
    alias    : 'widget.impostobuscagrid',   
    title    : 'Buscar Impostos',
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
                xtype     : 'textfield',
                itemId    : 'buscarImposto',
                emptyText : 'Buscar'
            },{
                text   : 'Buscar',
                action : 'btnBuscarImposto'
            },'->',{
                text    : 'Inserir',
                action  : 'btnInserirImposto'
            }]
        }];
        
        this.callParent(arguments);
    }
});