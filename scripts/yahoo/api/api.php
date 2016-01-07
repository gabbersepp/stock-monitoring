<?php

	$f = $_GET["f"];
	$s = $_GET["s"];
    header('Content-Type: text/plain');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
	$url = "http://download.finance.yahoo.com/d/quotes.csv?f=" . $f . "&s=" . $s;
    readfile($url);
	
?>