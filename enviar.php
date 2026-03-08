<?php

$destinatari = "xaviarnau@hotmail.com";

$nom = $_POST['nom'];
$email = $_POST['email'];
$missatge = $_POST['missatge'];

$assumpte = "Nou missatge del formulari";

$contingut = "Nom: $nom\n";
$contingut .= "Email: $email\n\n";
$contingut .= "Missatge:\n$missatge";

$headers = "From: $email";

mail($destinatari, $assumpte, $contingut, $headers);

echo "Missatge enviat correctament";

?>
