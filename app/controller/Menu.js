Ext.define('Vendas.controller.Menu', {
    extend: 'Ext.app.Controller',
    stores: ['Impostos','Categorias', 'Produtos','Vendas'],
    init: function() {
        this.control({
            'menu button[action=btnVenda]': {
                click: this.abrirVendas
            },   
            'menu menuitem[action=btnProdutos]': {
                click: this.abrirProdutos
            },  
            'menu menuitem[action=btnCategorias]': {
                click: this.abrirCategorias
            },              
            'menu button[action=btnImpostos]': {
                click: this.abrirImpostos
            },                                                               
        });
    },

    abrirVendas: function() {
        Ext.create('Vendas.view.venda.Grid').show();
        this.getVendasStore().load();
    },

    abrirProdutos: function() {
        Ext.create('Vendas.view.produto.Grid').show();
        this.getProdutosStore().load();
    },

    abrirCategorias: function() {
        Ext.create('Vendas.view.categoria.Grid').show();
        this.getCategoriasStore().load();
    },

    abrirImpostos: function() {
        Ext.create('Vendas.view.imposto.Grid').show();
        this.getImpostosStore().load();
    }
});