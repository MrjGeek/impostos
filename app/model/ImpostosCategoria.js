Ext.define('Vendas.model.ImpostosCategoria', {
	extend : 'Ext.data.Model',
	fields : [
		{name: 'idimpostoscategoria', type: 'int'},
		{name: 'impostos_idimpostos', type: 'int'},
		{name: 'categorias_idcategorias', type: 'int'},
		{name: 'nome', type: 'string'}, 
		{name: 'porcentagem', type: 'numeric'}
	],
	idProperty: 'idimpostoscategoria'
});