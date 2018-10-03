<?php
	require_once("conecta.php");

	switch ($_SERVER['REQUEST_METHOD']){
		case 'GET':
			listaVendas();
			break;

		case 'POST':
			criaVendas();
			break;

		case 'PUT':
			atualizaVendas();
			break;

		case 'DELETE':
			deletaVendas();
			break;
	}

	function listaVendas () {

		
		$queryString = "SELECT idvendas, valorsemimposto, valor, recebido, troco
						FROM vendas
						ORDER BY idvendas";
		$query = pg_query($queryString);

		if (!$query) {
			$success = false;
		}
		else {
			$success = true;
		} 

		$vendas = array();

		while($vend = pg_fetch_assoc($query)){
			$vendas[] = $vend;
		}

		echo json_encode(array(
			"success"  => $success,
			"vendas" => $vendas
		));			
	}

	function criaVendas () {
		$info            = $_POST['vendas'];
		$data            = json_decode($info);
		$valorsemimposto = $data->valorsemimposto;
		$valor           = $data->valor;
		$recebido        = $data->recebido;
		$troco           = $data->troco;

		$query = "	INSERT INTO vendas(valorsemimposto, valor, recebido, troco) 
					VALUES ($valorsemimposto, $valor, $recebido, $troco) 
					RETURNING idvendas;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
			$id      = 0;
		}
		else {
			$success = true;
			$row     = pg_fetch_assoc($rs);
			$id      = $row['idvendas'];		 				
		}


		echo json_encode(array(
			"success" => $success,
			"action"  => "Inseri",
			"vendas"  => array(
				"idvendas"        => $id,
				"valorsemimposto" => $valorsemimposto,
				"valor"           => $valor,
				"recebido"        => $recebido,
				"troco"           => $troco
			)
		));	
	}

	function atualizaVendas () {
		parse_str(file_get_contents("php://input"), $post_vars);		
		$info            = $post_vars['vendas'];
		$data            = json_decode($info);
		$idvendas        = $data->idvendas;
		$valorsemimposto = $data->valorsemimposto;
		$valor           = $data->valor;
		$recebido        = $data->recebido;
		$troco           = $data->troco;

		$query = "	UPDATE vendas 
					SET valorsemimposto = $valorsemimposto, valor = $valor, recebido = $recebido, troco = $troco
					WHERE idvendas = $idvendas;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
		}
		else {
			$success = true;
		}
		 
		echo json_encode(array(
			"success" => $success,
			"action"  => "Atualiza",
			"vendas"  => array(
				"idvendas"        => $idvendas,
				"valorsemimposto" => $valorsemimposto,
				"valor"           => $valor,
				"recebido"        => $recebido,
				"troco"           => $troco
			)
		));
	}

	function deletaVendas () {		
		parse_str(file_get_contents("php://input"), $post_vars);
		$info     = $post_vars['vendas'];
		$data     = json_decode($info);
		$idvendas = $data->idvendas;		

		$query  = "DELETE FROM vendasprodutos WHERE vendas_idvendas = $idvendas;";
		$query .= "DELETE FROM vendas WHERE idvendas = $idvendas;";
		$rs    = pg_query($query);

		if (!$rs) {
			$success = false;
		}
		else {
			$success = true;
		}

		echo json_encode(array(
			"success" => $success,
			"action"  => "Exclui",
		));
	}
?>