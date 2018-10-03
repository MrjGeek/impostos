<?php
	require_once("conecta.php");

	switch ($_SERVER['REQUEST_METHOD']){
		case 'GET':
			listaImpostosCategoria();
			break;

		case 'POST':
			criaImpostosCategoria();
			break;

		case 'DELETE':
			deletaImpostosCategoria();
			break;
	}

	function listaImpostosCategoria() {

		$categorias_idcategorias = $_GET['categorias_idcategorias'];

		$queryString = "SELECT ic.idimpostoscategoria, ic.categorias_idcategorias, ic.impostos_idimpostos,
							i.nome, i.porcentagem
						FROM impostoscategoria ic
						INNER JOIN impostos i ON i.idimpostos = ic.impostos_idimpostos
						WHERE ic.categorias_idcategorias = $categorias_idcategorias";
		$query = pg_query($queryString);

		if (!$query) {
			$success = false;
		}
		else {
			$success = true;
		} 

		$impostosCategorias = array();

		while($imp = pg_fetch_assoc($query)){
			$impostosCategorias[] = $imp;
		}

		echo json_encode(array(
			"success"  => $success,
			"impostosCategorias" => $impostosCategorias
		));			
	}

	function criaImpostosCategoria() {
		$categorias_idcategorias = $_POST['categorias_idcategorias'];
		$info                    = $_POST['impostosCategorias'];
		$data                    = json_decode($info);
		$impostos_idimpostos     = $data->impostos_idimpostos;

		$query = "	INSERT INTO impostoscategoria(impostos_idimpostos, categorias_idcategorias) 
					VALUES ($impostos_idimpostos, $categorias_idcategorias) 
					RETURNING idimpostoscategoria;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
			$id      = 0;
		}
		else {
			$success = true;
			$row     = pg_fetch_assoc($rs);
			$id      = $row['idimpostoscategoria'];		 				
		}


		echo json_encode(array(
			"success"            => $success,
			"action"             => "Inseri",
			"impostosCategorias" => array(
				"idimpostoscategoria"     => $id,
				"impostos_idimpostos"     => $impostos_idimpostos,
				"categorias_idcategorias" => $categorias_idcategorias
			)
		));	
	}


	function deletaImpostosCategoria() {		
		parse_str(file_get_contents("php://input"), $post_vars);
		$info                = $post_vars['impostosCategorias'];
		$data                = json_decode($info);
		$idimpostoscategoria = $data->idimpostoscategoria;		

		$query = "DELETE FROM impostoscategoria WHERE idimpostoscategoria = $idimpostoscategoria";
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