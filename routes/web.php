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

const VAPID = [
    'publicKey' => 'BFt4kH9ePdoHORYnuGgDnouCNBhAG+0BlXXXLo3Dwb5JqgVMd3p8wKXbUH6zD+3wAfEIQOz3EvjVD8YCNZvTFEA=',
    'privateKey' => 'LZZcDcdCJl1FxmbHGwzmPWYOCMz3h5NnSJt41Xb5JT8=',
];

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

$router->post('/push', function () use ($router) {
    $webPush = new \Minishlink\WebPush\WebPush();

    $subscription = $router->app->request->input('subscription');
    $message = $router->app->request->input('message');

    $status = $webPush->sendNotification(
        \Minishlink\WebPush\Subscription::create($subscription),
        $message,
        true,
        ['TTL' => (24 * 60 * 60)],
        [
            'VAPID' => [
                'subject' => 'mailto:sender@web-push.co.ua',
                'publicKey' => VAPID['publicKey'],
                'privateKey' => VAPID['privateKey'],
            ],
        ]
    );

    return $status ? 'OK' : 'FAILED';
});

$router->get('/vapidPublicKey', function () use ($router) {
//    return \Minishlink\WebPush\VAPID::createVapidKeys();
    return VAPID['publicKey'];
});

