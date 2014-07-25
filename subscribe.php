<?php

	header('Content-Type: application/json');

	$input = $_POST;
	$output = http_build_query(array(
		'field_123' => $input['name'],
		'field_234' => $input['company'],
		'field_345' => $input['email'],
	));

	$url = 'https://www.formstack.com/api/v1/submit?id=your_id&api_key=your_api_key';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
 	curl_setopt($ch, CURLOPT_POSTFIELDS, $output);
    $response = curl_exec($ch);
	curl_close($ch);

	$xml = simplexml_load_string($response);
	$json['status'] = (string)$xml->attributes()->status;
	die(json_encode($json));