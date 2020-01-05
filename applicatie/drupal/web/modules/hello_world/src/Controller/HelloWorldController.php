<?php


namespace Drupal\hello_world\Controller;
use Drupal\views\Views;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;
use Symfony\Component\HttpFoundation\JsonResponse;
use Dompdf\Dompdf;
use Drupal;





class HelloWorldController{

    

    public function hello() {


        if(isset($_POST["submit"]))
            {
            $minDate = $_POST["min"];
            $maxDate = $_POST["max"];
            $klant = $_POST["klant"];
            $title = $_POST["title"];
            $hour = $_POST["uur"];
            $trans = $_POST["trans"];


            $database = \Drupal::database();

            $query = $database->select('users_field_data','u')
            ->fields('u', ['uid'])
            ->condition('name', $klant, '=')
            ->execute()->fetchField();

           

            $values = array(

                'type' => 'periode',

                'title' => $title,

                'field_start_periode' => $minDate,

                'field_eind_periode' => $maxDate,

                'field_klantnaam' => $query,
                
                'field_kost' => $hour,
                
                'field_transportkost' => $trans

            );  

            $account = entity_create('node', $values);

            $account->save();



        //     $taakids = $database->select('node__field_datum', 'd')
        //     ->fields('d',['entity_id'])
        //     ->condition('field_datum_value', array($minDate, $maxDate), 'BETWEEN')
        //     ->execute()->fetchAll();

        //     $taakids = $taakids['0']->entity_id;
        //     var_dump($taakids);



        // $periodeId = $database->select('node_field_data', 'n')
        //     ->fields('n',['nid'])
        //     ->condition('type', 'periode')
        //     ->orderBy('nid', 'DESC')
        //     ->range(0, 1)
        //     ->execute()->fetchField();
    


        // $loader = node_load($taakids);

        // $valuesTaak = array(

        //     'type' => 'taak',

        //     'entity_id' => $taakids,

        //     'field_periode_titel_value' => $periodeId,

        // );  

        // $taken = entity_create('node', $valuesTaak);

        // $taken->save();
        
     
        }


    // $view = views_embed_view('taken','page_1');
    // $pdf = drupal_render($view);

    // $dompdf = new Dompdf();
    // $dompdf->setPaper('A4', 'landscape');


    // $renderable = [
    //     '#theme' => 'pdf.html.twig',
    //     '#test_var' => 'test variable',

    // ];
    // $rendered = \Drupal::service('renderer')->render($renderable);
    // $dompdf->loadHtml(
    //     'hello'
    // );
    // $dompdf->render();



    // $dompdf->stream();

    // $message="test";
    // $label="test";


    // $from = 'annadelanghe1@gmail.com';
    // $subject = "test";
    // $message = "test bericht";
    // $mailto = 'annadelanghe@hotmail.be';


    // $headers  = "MIME-Version: 1.0" . "\r\n";
    // $headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
    // $headers .= "From: ". $from. "\r\n";
    // $headers .= "Reply-To: ". $from. "\r\n";
    // $headers .= "X-Mailer: PHP/" . phpversion();
    // $headers .= "X-Priority: 1" . "\r\n";

    // if(mail($mailto,$subject,$message,$header)) {
    //     dd( 'Email on the way');
    // }

    // $message = "test messagemail";
    // $message = wordwrap($message, 70, "\r\n");
    // mail('annadelanghe@hotmail.be', 'Test', $message);

    // $mailManager = \Drupal::service('plugin.manager.mail');
    // $module = 'module-name';
    // $key = 'node_insert'; // Replace with Your key
    // $to = \Drupal::currentUser()->getEmail();
    // $params['message'] = $message;
    // $params['title'] = $label;
    // $langcode = \Drupal::currentUser()->getPreferredLangcode();
    // $send = true;
  
    // $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);
    // if ($result['result'] != true) {
    //   $message = t('There was a problem sending your email notification to @email.', array('@email' => $to));
    //   drupal_set_message($message, 'error');
    //   \Drupal::logger('mail-log')->error($message);
    //   dd($message);
    // }
  
    // $message = t('An email notification has been sent to @email ', array('annadelanghe1@gmail.be' => $to));
    // drupal_set_message($message);
    // \Drupal::logger('mail-log')->notice($message);

    // dd($message);

    header("Location: /taken", true, 301);
  
    
    return array(
            '#title' => 'Periode vastgelegd',
        );
    }
}