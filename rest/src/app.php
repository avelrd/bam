<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

$em = createEntityManager();
$app = new Silex\Application();
$app['debug'] = true;

function json_encode_event(Event $event) {
    return [
        $event->getId(),
        $event->getStartdate(),
        $event->getEnddate(),
        $event->getUsers(),
        $event->getLocation(),
        $event->getDescription(),
        $event->getName(),
        $event->getHosts(),
        $event->getTags(),
    ];
}

$app->get('/events', function () use ($app, $em) {
    $events = $em->getRepository('Event')->findAll();
    $encoded = [];
    foreach($events as $event) {
        $encoded[] = json_encode_event($event);
    }
    return new JsonResponse($encoded);
});

$app->post('/events/add', function (Request $request) use ($app, $em) {

    $event = new Event();
    $event->setStartdate($request->get('startdate', null));
    $event->setEnddate($request->get('enddate', null));
    $event->setUsers($request->get('users', []));
    $event->setLocation($request->get('location', ''));
    $event->setDescription($request->get('description', ''));
    $event->setName($request->get('name', null));
    $event->setHosts($request->get('hosts', []));
    $event->setTags($request->get('tags', []));

    if($event->getName() === null) {
        return new JsonResponse(['error'=>'No name set'], 500);
    }

    $em->persist($event);
    $em->flush();

    return new JsonResponse(['success'=>'Event stored']);

});

$app->run();

