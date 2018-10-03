Ext.define('Vendas.model.Categoria', {
	extend : 'Ext.data.Model',
	fields : [
		{name: 'idcategorias', type: 'int'},
		{name: 'nome', type: 'string'},
		{name: 'vinculado', type: 'int'},
		{name: 'editar', type: 'int'}
	],
	idProperty: 'idcategorias'
});