<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

//require '../vendor/autoload.php';
require 'vendor/autoload.php';

if (!function_exists('get_config')) {
    // Config contains non-repo environment and credentials information
    function get_config() {
        //return json_decode(file_get_contents('../../../configs/config_google_sheets.json'),true);
        return json_decode(file_get_contents('config_google_sheets.json'),true);
    }
}

////guzzle libraries
use GuzzleHttp\Client;
use GuzzleHttp\Promise;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\RequestOptions;

$client = new Google_Client();
$client->setApplicationName("test");
$client->setDeveloperKey("AIzaSyBp3cXmBd-tcRhJIm7BewhRembmo4lZiLo");

$service = new Google_Service_Sheets($client);
//
// Prints the names and majors of students in a sample spreadsheet:
// https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
$spreadsheetId = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ';
$range = 'county_maps';
$response = $service->spreadsheets_values->get($spreadsheetId, $range);
$values = $response->getValues();

$i = 0;
$billCount = 1;
$billLength = count($values);
$customDPData = array();
if (empty($values)) {
    print "No data found.\n";
} else {
    foreach ($values as $row) {
        $i++;
        if($i <= 1) continue;
        //put google sheet data into a seperate array that will get put into a different json file
        // $customDPData["data"]["Bill$billCount"]["updated"] .= $row[0];
        // $customDPData["data"]["Bill$billCount"]["school or district name"] .= $row[1];
        // $customDPData["data"]["Bill$billCount"]["mask policy"] .= $row[2];
        // $customDPData["data"]["Bill$billCount"]["policy normalized"] .= $row[3];
        // $customDPData["data"]["Bill$billCount"]["notes"] .= $row[4];
        // $customDPData["data"]["Bill$billCount"]["city"] .= $row[5];
        // $customDPData["data"]["Bill$billCount"]["public or private"] .= $row[6];
        // $customDPData["data"]["Bill$billCount"]["link"] .= $row[7];

        $customDPData["$billCount"]["county"] .= $row[0];
        $customDPData["$billCount"]["number of cases"] .= $row[1];
        $customDPData["$billCount"]["number of deaths"] .= $row[2];
        $customDPData["$billCount"]["geometry"] .= $row[3];
        $customDPData["$billCount"]["latitude"] .= $row[4];
        $customDPData["$billCount"]["longitude"] .= $row[5];
        $customDPData["$billCount"]["population"] .= $row[6];
        $customDPData["$billCount"]["county check"] .= $row[7];
        $customDPData["$billCount"]["county vaccinated"] .= $row[8];
        $customDPData["$billCount"]["all vaccinated pct"] .= $row[9];
        $customDPData["$billCount"]["teen vaccinated pct"] .= $row[10];
        $customDPData["$billCount"]["elderly vaccinated pct"] .= $row[11];

        $billCount++;
    }
};

//County    Number of cases Number of deaths    Geometry    Latitude    Longitude   Population  County check    County vaccinated   All vaccinated pct  Teen vaccinated pct Elderly vaccinated pct

$customDPData = json_encode(array_values($customDPData)); // convert php array to json object

function ftp_json($file,$config) {
        $success = false;
        $connection = ftp_connect($config['ftp_server']);
        $login = ftp_login($connection,$config['ftp_user'],$config['ftp_pass']);
        if ($login) {
            ftp_pasv($connection, TRUE);
            if (!$chg_dir = ftp_chdir($connection,$config['ftp_path'])) {
                $error = 'Could not find directory!';
            }
            $remotefiles = ftp_nlist($connection,'.');

            $local_file = $file;
            echo "saving this local file to extras ".$file;
            $local_exists = file_exists($local_file);
            $remote_exists = in_array($file, $remotefiles);
            $bak_exists = in_array($file.'.bak', $remotefiles);
//            if ($remote_exists) {
//                if ($bak_exists) {
//                    $bak_exists = ftp_delete($connection,$file.'.bak');
//                }
//                $rename = ftp_rename($connection,$file,$file.'.bak');
//            } else {
//                $rename = false;
//            }
            //if ((!$remote_exists || !$rename=false) && $local_exists) {
                echo "<br><br>inside ftp_put";
                $put = ftp_put($connection, $file, $local_file, FTP_BINARY);
                if (!$put) {
                    $error = 'FTP of '.$file.' to '.$config['ftp_path'].' failed.';
                }
            //}
            ftp_close($connection);
            if (isset($error)) {
                return array(false,$error);
            } else {
                return array(true,'Success!');
            }
        } else {
            return array(false,'Could not log in to FTP server.');
        }
    }
    $config = get_config();
    //echo "<br><br>CHRIS config -".$config['ftp_server'];
    //save to file so users aren't hitting these API's and slowing down
    $file = "covid_data.json";

    file_put_contents($file, $customDPData);
    //ftp_json($file,$config); // Un-comment this before deploy