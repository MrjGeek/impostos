Ext.define('Vendas.view.menu.Menu', {
	extend : 'Ext.container.Viewport',
	extend : 'Ext.toolbar.Toolbar',
	alias  : 'widget.menu',
	region : 'north',
	items  : [{      
		xtype  : 'button',
		text   : 'Vendas',
		itemId : 'btnVenda',
		action : 'btnVenda'
    },{
        xtype : 'button',
        text  : 'Produtos',
        menu  : Ext.create('Ext.menu.Menu',{
            items: [{
                text    : 'Produtos',
                action  : 'btnProdutos'
            },{
                text    : 'Categorias',
                action  : 'btnCategorias'
            }]
        })    	
    },{
		xtype  : 'button',
		text   : 'Impostos',
		itemId : 'btnImpostos',
		action : 'btnImpostos'    	
    }]
});