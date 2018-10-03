Ext.define('Vendas.model.Venda', {
	extend : 'Ext.data.Model',
	fields : [
		{name: 'idvendas', type: 'int'},
		{name: 'valorsemimposto', type: 'numeric'},
		{name: 'valor', type: 'numeric'},
		{name: 'recebido', type: 'numeric'},
		{name: 'troco', type: 'numeric'},
		{name: 'impostos', type: 'numeric'},
	],
	idProperty: 'idvendas'
});