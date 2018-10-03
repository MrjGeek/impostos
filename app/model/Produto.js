Ext.define('Vendas.model.Produto', {
	extend : 'Ext.data.Model',
	fields : [
		{name: 'idprodutos', type: 'int'},
		{name: 'nome', type: 'string'}, 
		{name: 'nomecategoria', type: 'string'}, 
		{name: 'categorias_idcategorias', type: 'int'},
		{name: 'valor', type: 'numeric'},
		{name: 'valorsemimposto', type: 'numeric'},		 
		{name: 'vinculado', type: 'int'}
	],
	idProperty: 'idprodutos'
});