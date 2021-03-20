<?php
header('Content-Type: text/html; charset=utf-8');
if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "Error: you need to submit the form!";
}
//Data from form
// $name = $_POST['name'];
// $visitor_email = $_POST['email'];
// $topic = $_POST['topic'];
// $message = $_POST['message'];
$name = "Osoba zamawiająca";
$visitor_email = 'vansmoe@hotmail.com';
$data = $_POST['data'];
$order_num = $_POST['order-num'];

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

$email_from = 'szafawawa@gmail.com';//<== update the email address
$email_subject = "Zamówienie nr. $order_num";
$email_body = "$name: \n $data";

$to = 'szafawawa@gmail.com';//<== update the email address
$headers = 'Content-Type: text/html; charset=utf-8' . "\r\n";
$headers .= "Reply-To: $visitor_email \r\n";
//Send the email!
$sent_mail = mail($to,$email_subject,$email_body,$headers);
// mail($to,$email_subject,$email_body,$headers);

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

if ($sent_mail)
{
    header("Location: sent.html");
    exit;
}

?>
