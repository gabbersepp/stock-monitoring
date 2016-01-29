<?php

	$f = $_GET["f"];
	$s = $_GET["s"];
	$c = $_GET["c"];

    header('Content-Type: text/plain');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');

    $url;

    if ($c == "point") {
	    $url = "http://download.finance.yahoo.com/d/quotes.csv?f=" . $f . "&s=" . $s;

	} else if ($c == "intraday") {
		$url = "http://chartapi.finance.yahoo.com/instrument/1.0/" . $s . "/chartdata;type=quote;range=1d/csv";
		
	}

 		   readfile($url);
	
?>