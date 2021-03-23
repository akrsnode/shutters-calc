<?php
header('Content-Type: text/html; charset=utf-8');
if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "Error: you need to submit the form!";
}

$name = $_POST['name'];
$visitor_email = $_POST['email'];
$comment = $_POST['add-info'];
$order = json_decode($_POST['data']);

//Validate first
if(empty($name)||empty($visitor_email))
{
    echo "Name and email are mandatory!";
    exit;
}
if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}

$szafawawa = 'szafawawa@gmail.com';//<== update the email address

$email_subject = "Zamówienie nr. $order->id";

$headers = 'Content-Type: text/html; charset=utf-8' . "\r\n";
$headers .= "MIME-Version: 1.0 \r\n";
$headers .= "From: Szafawawa <szafawawa@gmail.com> \r\n";
$headers .= "Reply-To: $visitor_email \r\n";

$header_client = 'Content-Type: text/html; charset=utf-8' . "\r\n";
$header_client .= "MIME-Version: 1.0 \r\n";
$header_client .= "From: Szafawawa <szafawawa@gmail.com> \r\n";
$header_client .= "Reply-To: $szafawawa \r\n";

$list_items = "";

foreach($order->items as $item) {
  $list_items .= "<tr><td>$item->height m</td><td>$item->width m</td><td>$item->quantity</td><td>$item->value zł</td></tr>\r\n";
}

$email_body = "<html>
    <body style=\"font-family: sans-serif; \">
        <div style=\"padding: 10%; border: 10px solid #111;\">
            <center><img width=\"200px\" src=\"http://szafawawa.pl/wp-content/uploads/2019/05/logo-circle-1023x1024.png\"></center>
            <h1>Zamówienie nr. $order->id</h1>
            <p>Zamówienie jest w trakcie przetwarzania, niebawem poinformujemy Cię o jego akceptacji.</p>
            <h2 style=\"padding-top: 3rem\">Twoje zamówienie:</h2>
            <table style=\"width: 100%; text-align: center\">
              <tr>
                <th>Wysokość</th>
                <th>Szerokość</th>
                <th>Ilość</th>
                <th>Wartość</th>
              </tr>
              $list_items
            </table>
            <p style=\"font-size: 20px; font-weight: 800; text-align: center\">Suma: $order->value zł</p>
            <h2>Informace dodatkowe:</h2>
            <p>$comment</p>
            <p style=\"text-align: center; font-size: 15px; padding-top: 5rem; color: darkgray\">Dziękujemy za wybranie naszych ażurów 😀</p>
        </div>
    </body>
</html>";

// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}

// Return to sent page
if (mail($szafawawa,$email_subject,$email_body,$headers) && mail($visitor_email,$email_subject,$email_body,$header_client)) {
  header("Location: form-sent.html");
  exit;
} else {
  header("Location: form-error.html");
  exit;
}

?>
