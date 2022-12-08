<?php

	$action = $_POST['action'];

	if ($action == "addPuntaje") 
		addPuntaje();
	else if ($action == "getPuntaje")
    getPuntaje();

	function connect() {
		$databasehost = "159.223.191.152";
		$databaseuser = "remote";
		$databasepass = "super-secret";
		$databasename = "webgl";

		$mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename);
		if ($mysqli->connect_error) {
			echo "Problema con la conexion a la base de datos";
		}
		return $mysqli;
	}



	function addPuntaje() {
		$name = $_POST["name"];
		$puntaje = $_POST["puntaje"];
		$nivel = $_POST["nivel"];
		$mysqli = connect();

		$result = $mysqli->query("INSERT INTO puntaje(nombre, puntaje, nivel) values('".$name."','".$puntaje."',".$nivel.")");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";		
		}
		mysqli_close($mysqli);
	}

	function getPuntaje() {
		$mysqli = connect();

		$result = $mysqli->query("Select * from puntaje order by puntaje asc limit 10");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
	}
?>