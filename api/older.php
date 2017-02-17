<?php

	header('Content-Type: application/json');

	// 将字符串转成时间
	// echo strtotime('-1day');

	$older = date('Y-m-d', strtotime('-1day'));

	// echo $older;

	// exit();

	$url = 'https://moment.douban.com/api/stream/date/'.$older.'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

	echo file_get_contents($url);











?>