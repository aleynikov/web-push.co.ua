<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return view('index');
});

$router->get('db-test', function() use ($router) {
    try {
        $pdo = app('db')->getPdo();
    } catch (\PDOException $e) {
        $pdo = null;
    }

    return is_null($pdo) ? 'Failed' : 'Success';
});


