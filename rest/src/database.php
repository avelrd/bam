<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

function createEntityManager() {
    $paths = array(__DIR__ . "/entities");
    $isDevMode = false;

    // the connection configuration
    $dbParams = array(
        'driver'   => 'pdo_sqlite',
        'path'     => __DIR__ . '/../db/data.sqlite3',
    );

    $config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode);
    return EntityManager::create($dbParams, $config);
}
