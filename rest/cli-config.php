<?php
use Doctrine\ORM\Tools\Console\ConsoleRunner;

// replace with mechanism to retrieve EntityManager in your app
$entityManager = createEntityManager();

return ConsoleRunner::createHelperSet($entityManager);