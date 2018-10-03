Ext.define('Vendas.controller.Impostos', {
    extend: 'Ext.app.Controller',
    views : ['imposto.Grid','imposto.Formulario'],
    stores: ['Impostos'],
    init: function() {
        this.control({
            'impostogrid button[action=btnAdicionarImposto]': {
                click: this.adicionarImposto
            },
            'impostogrid button[action=btnEditarImposto]': {
                click: this.editarImposto
            },  
            'impostogrid button[action=btnExcluirImposto]': {
                click: this.deletarImposto
            },
            'impostoform button[action=btnSalvarImposto]': {
                click: this.salvarImposto
            }                                                                         
        });
    },

    adicionarImposto: function() {
        Ext.create('Vendas.view.imposto.Formulario').show();
    },

    editarImposto: function() {
        var grid   = Ext.ComponentQuery.query('impostogrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else {
            var win = Ext.create('Vendas.view.imposto.Formulario').show();
            win.down('form').loadRecord(record[0]);            
        }
    },

    deletarImposto: function() {
        var grid   = Ext.ComponentQuery.query('impostogrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else if (record[0].data.vinculado > 0) {
            Ext.Msg.alert('Atenção', 'Este imposto não pode ser excluido pois está vinculado a uma ou mais categorias');
            return false;
        }
        else {
            Ext.Msg.show({
                title   : 'Confirmação',
                msg     : 'Tem certeza que deseja deletar o registro selecionado?',
                buttons : Ext.Msg.YESNO,
                icon    : Ext.MessageBox.QUESTION,
                scope   : this,
                width   : 450,
                fn : function(btn, ev){
                    if (btn == 'yes') {
                        var store = this.getImpostosStore();
                        store.remove(record);      
                        store.sync();
                    }
                }
            });
        }
    },

    salvarImposto: function(button) {           
        var win    = button.up('window');
        var form   = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var store  = this.getImpostosStore();
        
        if (values.idimpostos > 0) {
            record.set(values);
        }
        else {
            record = Ext.create('Vendas.model.Imposto');
            record.set(values);
            store.add(record);          
        }            

        store.sync();                

        win.close();
    },
});