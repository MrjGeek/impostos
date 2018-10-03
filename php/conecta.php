<?php
	$servidor = "127.0.0.1";
	$port     = "5432";
	$user     = "postgres";
	$senha    = "chooseteam";
	$db       = "vendas";	
	$conexao  = pg_connect("host=".$servidor." port=".$port." dbname=".$db." user=".$user." password=".$senha);
	 
	if (!$conexao) {
	   die('Não foi possível abrir conexão com PGSQL');
	} 
?>