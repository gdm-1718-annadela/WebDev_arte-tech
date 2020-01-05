<?php


namespace Drupal\pdf\Controller;
use Drupal\views\Views;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;
use Symfony\Component\HttpFoundation\JsonResponse;
use Dompdf\Dompdf;





class PdfController{

    

    public function download() {


    $view = views_embed_view('taken','page_1');
    $pdf = drupal_render($view);

    $dompdf = new Dompdf();
    $dompdf->setPaper('A4', 'landscape');


    $renderable = [
        '#theme' => 'pdf.html.twig',
        '#test_var' => 'test variable',

    ];
    $rendered = \Drupal::service('renderer')->render($renderable);
    $dompdf->loadHtml(
        'hello'
    );
    $dompdf->render();



    $dompdf->stream();

        return array(
            '#title' => 'Downloadpdf',
            '#markup' => 'this is some content'
        );
    }
}