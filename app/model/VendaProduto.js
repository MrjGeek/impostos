Ext.define('Vendas.model.VendaProduto', {
	extend : 'Ext.data.Model',
	fields : [
		{name: 'idvendasprodutos', type: 'int'},
		{name: 'vendas_idvendas', type: 'int'},
		{name: 'produtos_idprodutos', type: 'int'},
		{name: 'total', type: 'numeric'},
		{name: 'totalsemimposto', type: 'numeric'},
		{name: 'nomeproduto', type: 'string'},
		{name: 'quantidade', type: 'numeric'},
		{name: 'valor', type: 'numeric'},
		{name: 'valorsemimposto', type: 'numeric'},
	],
	idProperty: 'idvendasprodutos'
});

