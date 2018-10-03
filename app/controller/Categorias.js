Ext.define('Vendas.controller.Categorias', {
    extend: 'Ext.app.Controller',
    views : ['categoria.Grid','categoria.Formulario'],
    stores: ['Categorias','ImpostosCategorias', 'Impostos'],
    init: function() {
        this.control({
            'categoriagrid button[action=btnAdicionarCategoria]': {
                click: this.adicionarCategoria
            },
            'categoriagrid button[action=btnEditarCategoria]': {
                click: this.editarCategoria
            },  
            'categoriagrid button[action=btnExcluirCategoria]': {
                click: this.deletarCategoria
            },
            'categoriaform button[action=btnAbrirImposto]': {
                click: this.abrirImpostos
            },
            'categoriaform button[action=btnRemoverImposto]': {
                click: this.removerImpostos
            },                              
            'categoriaform button[action=btnSalvarCategoria]': {
                click: this.salvarCategoria
            },
            'impostobuscagrid button[action=btnBuscarImposto]': {
                click: this.buscarImposto
            },
            'impostobuscagrid button[action=btnInserirImposto]': {
                click: this.inserirImposto
            },                        
        });
    },

    adicionarCategoria: function() {
        Ext.create('Vendas.view.categoria.Formulario').show();
        this.getImpostosCategoriasStore().loadData([],false);        
    },

    editarCategoria: function() {
        var grid   = Ext.ComponentQuery.query('categoriagrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else {
            var win = Ext.create('Vendas.view.categoria.Formulario').show();
            win.down('form').loadRecord(record[0]);
            Ext.ComponentQuery.query('categoriaform #editar')[0].setValue(1);
            this.getImpostosCategoriasStore().load({
                params: {
                    categorias_idcategorias: record[0].data.idcategorias
                }
            });
        }
    },

    deletarCategoria: function() {
        var grid   = Ext.ComponentQuery.query('categoriagrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else if (record[0].data.vinculado > 0) {
            Ext.Msg.alert('Atenção', 'Esta categoria não pode ser excluida pois está vinculada a um ou mais produtos');
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
                        var store = this.getCategoriasStore();
                        store.remove(record);      
                        store.sync();
                    }
                }
            });
        }
    },

    abrirImpostos: function() {           
        Ext.create('Vendas.view.categoria.ImpostoBusca').show();
        this.getImpostosStore().load();
    },

    removerImpostos: function() {            
        var grid   = Ext.ComponentQuery.query('categoriaform')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else {
            var store = this.getImpostosCategoriasStore();
            store.remove(record);  
        }        
    },

    salvarCategoria: function(button) {           
        var win         = button.up('window');
        var form        = win.down('form');
        var record      = form.getRecord();
        var values      = form.getValues();
        var store       = this.getCategoriasStore();
        var impCatStore = this.getImpostosCategoriasStore();

        if (values.idcategorias > 0) {
            record.set(values);
        }
        else {
            record = Ext.create('Vendas.model.Categoria');
            record.set(values);
            store.add(record);          
        }            

        store.sync({
            success: function() {                           
                idcat =  parseInt(store.getProxy().getReader().rawData.categorias.idcategorias); 
                impCatStore.proxy.extraParams = {
                    categorias_idcategorias: idcat
                } 
                impCatStore.sync();    
            }
        });    

        win.close();
    },

    buscarImposto: function() {
        var busca = Ext.ComponentQuery.query('impostobuscagrid #buscarImposto')[0].getValue();
        var store = this.getImpostosStore();
        store.load({
            params: {
                busca: busca
            }
        });
    },

    inserirImposto: function(button) {           
        var win    = button.up('window');
        var grid   = Ext.ComponentQuery.query('impostobuscagrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else {
            var store      = this.getImpostosCategoriasStore();
            var totalstore = store.count();
            var inserido   = 0;

            for (a = 0; a < totalstore; a++) {
                if (store.data.items[a].data.impostos_idimpostos == record[0].data.idimpostos) {
                    inserido = 1;
                }
            }

            if (inserido == 0) {
                var model = Ext.create('Vendas.model.ImpostosCategoria');
                model.set({
                    impostos_idimpostos : record[0].data.idimpostos,
                    nome                : record[0].data.nome,
                    porcentagem         : record[0].data.porcentagem
                });
                store.add(model);
                win.close();
            }
            else {
                Ext.Msg.alert('Atenção', 'Este imposto já foi inserido');
                return false;                
            }
        }
    }
});