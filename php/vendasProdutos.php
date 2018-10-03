<?php
	require_once("conecta.php");

	switch ($_SERVER['REQUEST_METHOD']){
		case 'GET':
			listaVendasProdutos();
			break;

		case 'POST':
			criaVendasProdutos();
			break;

		case 'DELETE':
			deletaVendasProdutos();
			break;
	}

	function listaVendasProdutos() {

		$vendas_idvendas = $_GET['vendas_idvendas'];

		$queryString = "SELECT 	vp.idvendasprodutos, vp.vendas_idvendas, vp.produtos_idprodutos, vp.total, 
							vp.totalsemimposto, vp.quantidade, p.nome as nomeproduto,
							p.valor, p.valorsemimposto
						FROM vendasprodutos vp
						INNER JOIN produtos p ON p.idprodutos = vp.produtos_idprodutos
						WHERE vp.vendas_idvendas =  $vendas_idvendas";
		$query = pg_query($queryString);

		if (!$query) {
			$success = false;
		}
		else {
			$success = true;
		} 

		$vendasProdutos = array();

		while($vend = pg_fetch_assoc($query)){
			$vendasProdutos[] = $vend;
		}

		echo json_encode(array(
			"success"        => $success,
			"vendasProdutos" => $vendasProdutos
		));			
	}

	function criaVendasProdutos() {
		$vendas_idvendas     = $_POST['vendas_idvendas'];
		$info                = $_POST['vendasProdutos'];
		$data                = json_decode($info);
		$produtos_idprodutos = $data->produtos_idprodutos;
		$total               = $data->total;
		$totalsemimposto     = $data->totalsemimposto;
		$quantidade          = $data->quantidade;

		$query = "	INSERT INTO vendasprodutos(vendas_idvendas, produtos_idprodutos,total ,totalsemimposto, quantidade) 
					VALUES ($vendas_idvendas, $produtos_idprodutos, $total, $totalsemimposto, $quantidade)
					RETURNING idvendasprodutos;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
			$id      = 0;
		}
		else {
			$success = true;
			$row     = pg_fetch_assoc($rs);
			$id      = $row['idvendasprodutos'];		 				
		}


		echo json_encode(array(
			"success"        => $success,
			"action"         => "Inseri",
			"vendasProdutos" => array(
				"idvendasprodutos"    => $id,
				"vendas_idvendas"     => $vendas_idvendas,
				"produtos_idprodutos" => $produtos_idprodutos,
				"total"               => $total,
				"totalsemimposto"     => $totalsemimposto,
				"quantidade"          => $quantidade
			)
		));	
	}


	function deletaVendasProdutos() {		
		parse_str(file_get_contents("php://input"), $post_vars);
		$info             = $post_vars['vendasProdutos'];
		$data             = json_decode($info);
		$idvendasprodutos = $data->idvendasprodutos;		

		$query = "DELETE FROM vendasprodutos WHERE idvendasprodutos = $idvendasprodutos";
		$rs    = pg_query($query);

		if (!$rs) {
			$success = false;
		}
		else {
			$success = true;
		}

		echo json_encode(array(
			"success" => $success,
			"action" => "Exclui",
		));
	}
?>