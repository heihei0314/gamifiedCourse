<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

$adminemail = "hiddenshop@ust.hk"; 
$pw = 'PDx_pdev6800';

$instructorMail = 'ericyeung@ust.hk';
$instructorName = 'Eric';
$recevierMail = "ericyeung@ust.hk";
$receiverName = "Sherlock";
$subject = "[PDEV6800Z] Reward Confirmation";
$content = "<p>Thank you for your purchase at The Hidden Tuck Shop! We're excited to confirm that you've successfully acquired the reward. </p>";

if(isset($_GET['uid'])){
	//$recevierMail = $_POST['uid']."@connect.ust.hk";
	if ($_GET['uid']=="ericyeung" || $_GET['uid']=="ykh"){
		$recevierMail = $_GET['uid']."@ust.hk";
	}
	else{
		$recevierMail = $_GET['uid']."@connect.ust.hk";
	}
}
if(isset($_GET['name'])){
	$receiverName = $_GET['name'];
}
if(isset($_GET['classSession'])){
	$classSession = $_GET['classSession'];
	switch($classSession){
		case "T01":
			$instructorMail = 'ykh@ust.hk';
			$instructorName = 'Karina';
			break;
		case "T02":
			$instructorMail = 'mirandafung@ust.hk';
			$instructorName = 'Miranda';
			break;
		default:
			$instructorMail = 'ericyeung@ust.hk';
			$instructorName = 'Eric';
	}
}

if(isset($_GET['itemName'])){
	$subject = "[PDEV6800Z] Reward Confirmation: ".$_GET['itemName'];
}

if(isset($_GET['content'])){
	$content = $_GET['content'];
}

try {
    //Server settings
    $mail->IsSMTP();
	$mail->SMTPAuth = true;
	$mail->Host = "smtp.ust.hk";
	$mail->Port = 587;
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
	$mail->SMTPDebug = SMTP::DEBUG_SERVER;
    
	//sender
	$mail->Username   = $adminemail;                     //SMTP username
    $mail->Password   = $pw;                               //SMTP password
    
	//Recipients
    $mail->setFrom($adminemail);
    $mail->addAddress($recevierMail);     //Add a recipient
    $mail->addReplyTo($instructorMail, $instructorName);
	
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $subject;
	$content = "Dear ".$receiverName.",".$content."<p>This email is automatically generated. Please do not reply to this email address. Should you have any question, please contact your instructor or ericyeung@ust.hk.</p>"."Best regards,<br>The Shopkeeper<br>The Hidden Tuck Shop";
	if ($_GET['itemName']!="Moriarty's Whisper"){
		$content = $content."<p><i>&lt;This is an automated message from The Hidden Tuck Shop system. Please do not reply to this email. Contact your instructor if you have any questions. &gt;</i></p>";
    }
    $mail->Body    = $content;
	
	if ($_GET['itemName']=="Hidden Gem"){
		$mail->addAttachment("The Hidden Gem.pdf");
	}
	
	$mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>