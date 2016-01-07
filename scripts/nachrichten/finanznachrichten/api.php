<?php

	$id = $_GET["id"];
    header('Content-Type: text/plain');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
	$url = "http://www.finanznachrichten.de/rss-" . $id;
    readfile($url);
	
?>