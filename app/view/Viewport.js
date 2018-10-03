Ext.define('Vendas.view.Viewport', {
    extend   : 'Ext.container.Viewport',
    layout   : 'border',
    requires : ['Vendas.view.menu.Menu'],
    items    : [{
        xtype    : 'menu',
        renderTo : Ext.getBody(),
    }] 
});
