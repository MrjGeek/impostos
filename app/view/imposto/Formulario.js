Ext.define('Vendas.view.imposto.Formulario', {
    extend   : 'Ext.window.Window',
    alias    : 'widget.impostoform',
    title    : 'Impostos',
    layout   : 'fit',
    autoShow : true,
    width    : 400,
    modal    : true,   

    initComponent: function() {

        this.items = [{
            xtype  : 'form',      
            layout : 'anchor',
            items  : [{
                xtype      : 'textfield',
                name       : 'idimpostos',
                fieldLabel : 'idimpostos',
                hidden     : true
            },{
                xtype             : 'textfield',
                fieldLabel        : 'Nome:',
                afterLabelTextTpl : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                allowBlank        : false,
                name              : 'nome',
                anchor            : '100%',
                margin            : '5 5 5 5'                       
            },{
                xtype                 : 'numberfield',
                fieldLabel            : 'Porcentagem:',
                afterLabelTextTpl     : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                allowBlank            : false,
                name                  : 'porcentagem',
                anchor                : '100%',
                margin                : '5 5 5 5',
                decimalPrecision      : 2,
                decimalSeparator      : ",",
                submitLocaleSeparator : false,
                minValue              : 0                            
            }],
            buttons: [{
                text     : 'Salvar',
                disabled : true,
                formBind : true,
                action   : 'btnSalvarImposto'
            },{
                text    : 'Cancelar',
                scope   : this,
                handler : this.close
            }]
        }];
        this.callParent(arguments);
    }
});
