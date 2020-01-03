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




class HelloWorldController{

    

    public function hello() {

        $database = \Drupal::database();


        $query = $database->select('users_field_data', 't')
            ->fields('t',['name'])
            ->condition('name', 'Telenet', '=')
            ->execute()->fetchAll();

        dd($query);


        if(isset($_POST["submit"]))
            {
            $minDate = $_POST["min"];
            $maxDate = $_POST["max"];
            $klant = $_POST["klant"];
            $title = $_POST["title"];

                            
            // $values = array(

            //     'type' => 'periode',

            //     'title' => $title,

            //     'field_start_periode' => $minDate,

            //     'field_eind_periode' => $maxDate,

            //     'field_klantnaam' => $klant

            // );  

            // $account = entity_create('node', $values);

            // $account->save();

             // $query = $database->insert('node__field_start_periode')
            // ->fields(['bundle','field_start_periode_value'])
            // ->values([
            //     'bundle'=>'periode',
            //     'field_start_periode_value'=> '2019-01-01'
            // ])
            // ->execute();
        }

        return array(
            '#title' => 'Hello World',
            '#markup' => 'this is some content'
        );
    }
}