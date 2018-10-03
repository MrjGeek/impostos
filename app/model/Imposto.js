Ext.define('Vendas.model.Imposto', {
	extend : 'Ext.data.Model',
	fields : [
		{name: 'idimpostos', type: 'int'},
		{name: 'nome', type: 'string'}, 
		{name: 'porcentagem', type: 'numeric'},
		{name: 'vinculado', type: 'int'}
	],
	idProperty: 'idimpostos'
});