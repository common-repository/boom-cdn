<?php
/**
 * Plugin Name:       Boom CDN
 * Description:       Content Delivery Network
 * Version:           1.0.0
 * Author:            Ken Key
 * Author URI:        https://www.kennykey.com
 * Text Domain:       kennykey
 */


 class BoomCDN
 {
   private $_nonce = 'boomcdn_admin';
   private $option_name = 'boomcdn_data';
   private $private_key = '';
   private $prefix = 'boomcdn';
   private $db_version = "1.0";


     public function __construct()
     {

       if(!defined('BOOMCDN_URL'))
         define('BOOMCDN_URL', plugin_dir_url( __FILE__ ));
       if(!defined('BOOMCDN_PATH'))
         define('BOOMCDN_PATH', plugin_dir_path( __FILE__ ));

       add_action( 'admin_menu', array( $this, 'boomcdn_addAdminMenu' ) );
       add_action( 'admin_enqueue_scripts', array($this,'load_custom_wp_admin_styles') );
       add_action( 'admin_enqueue_scripts', array($this,'load_custom_wp_admin_scripts') );
       //add_action( 'wp_enqueue_scripts', array($this,'boomcdn_enqueue_scripts' ));
       add_action( 'get_header', array($this,'boomcdn_enqueue_header' ));
       add_action( 'get_footer', array($this,'boomcdn_enqueue_footer' ));
       add_action( 'wp_ajax_boomcdn_add_file', array($this,'boomcdn_add_file') );
       add_action( 'wp_ajax_boomcdn_remove_file', array($this,'boomcdn_remove_file') );
       add_action( 'wp_ajax_boomcdn_enable_file', array($this,'boomcdn_enable_file') );
       add_action( 'wp_ajax_boomcdn_disable_file', array($this,'boomcdn_disable_file') );
       add_action( 'wp_ajax_boomcdn_update_order', array($this,'boomcdn_update_order') );
       add_action( 'plugins_loaded', array($this,'boomcdn_update_db_check' ));
       //register_activation_hook( __FILE__, array($this,'install') );
       //register_activation_hook( __FILE__, array($this,'install_data') );

     }

     function boomcdn_enqueue_header(){
       global $wpdb;
       //$table_name = $wpdb->prefix . $this->prefix;

       $results = $wpdb->get_results(
                         "SELECT type, slug, url FROM $wpdb->prefix$this->prefix
                         WHERE location = 'header' AND enabled = 1
                         ORDER BY weight ASC, slug, version, id"
                 );

        if(!empty($results)){
          foreach($results as $index => $lib){
            if($lib->type == "style"){
              wp_enqueue_style( $lib->slug."-".$index, $lib->url);
            } else if($lib->type == "script"){
              wp_enqueue_script( $lib->slug."-".$index, $lib->url);
            }
          }
        }
     }

     function boomcdn_enqueue_footer(){
       global $wpdb;
       //$table_name = $wpdb->prefix . $this->prefix;

       $results = $wpdb->get_results(
                         "SELECT type, slug, url FROM $wpdb->prefix$this->prefix
                         WHERE location = 'footer' AND enabled = 1
                         ORDER BY weight ASC, slug, version, id"
                 );

        if(!empty($results)){
          foreach($results as $index => $lib){
            if($lib->type == "style"){
              wp_enqueue_style( $lib->slug."-".$index, $lib->url);
            } else if($lib->type == "script"){
              wp_enqueue_script( $lib->slug."-".$index, $lib->url, [], true, true);
            }
          }
        }
     }

     function boomcdn_update_order(){
       global $wpdb;
       //$table_name = $wpdb->prefix . $this->prefix;

       if (empty($_POST["_nonce"]) || ! wp_verify_nonce( $_POST["_nonce"], $this->_nonce ) ) {
         return false;
       }

       if(!empty($_POST["order"])){
         $jsonData = stripslashes(html_entity_decode(sanitize_text_field($_POST["order"])));
         $order = json_decode($jsonData, true);

         if(count($order)>0){
           foreach($order as $index => $o){
             $id = str_replace("file-card-", "", $o);



             $wpdb->update(
           		$wpdb->prefix . $this->prefix,
           		[
                 "weight" => $index
               ],
               [
                 "id" => $id
               ]
           	);

           }
         }
       if(!empty($_POST["id"]) && !empty($_POST["location"])){
         $id = str_replace("file-card-", "", sanitize_text_field($_POST["id"]));
         $location = sanitize_text_field($_POST["location"]);

         $wpdb->update(
          $wpdb->prefix . $this->prefix,
          [
             "location" => $location
           ],
           [
             "id" => $id
           ]
        );
       }
     }
       die();
     }

     function boomcdn_update_db_check() {
       global $wpdb;
    if ( get_site_option( 'boomcdn_db_version' ) != $this->db_version
  || $wpdb->get_var("SHOW TABLES LIKE '".$this->$prefix."'") != $this->prefix ) {
    update_option( "boomcdn_db_version", "" );
        $this->install();
      }
    }

     public function boomcdn_add_file(){
       if (empty($_POST["_nonce"]) || ! wp_verify_nonce( $_POST["_nonce"], $this->_nonce ) ) {
         return false;
       }

       $file_hash = !empty($_POST["file_hash"])?sanitize_text_field($_POST["file_hash"]):false;
       $file_json = $this->boom_crypt(json_encode($file_hash), "d");
       $file_data = json_decode($file_json, true);
       $data = [
         "type" => !empty($_POST["type"])?sanitize_text_field($_POST["type"]):"script",
         "location" => !empty($_POST["location"])?sanitize_text_field($_POST["location"]):"footer",
         "enabled" => true
       ];
       $data = array_merge($file_data, $data);
       $this->addFileToData($data);
       //print_r($this->getData());
       //print_r($file_data);
       die();
       wp_die();
     }

     public function boomcdn_remove_file(){
       if (empty($_POST["_nonce"]) || ! wp_verify_nonce( $_POST["_nonce"], $this->_nonce ) ) {
         return false;
       }

       // validated in: removeFileFromData()
       $file_data = $_POST;
       $this->removeFileFromData($file_data);
       //print_r($this->getData());
       wp_die();
     }

     public function boomcdn_enable_file(){
       if (empty($_POST["_nonce"]) || ! wp_verify_nonce( $_POST["_nonce"], $this->_nonce ) ) {
         return false;
       }

       // validated in: enableFileFromData()
       $file_data = $_POST;
       $this->enableFileFromData($file_data);
       //print_r($this->getData());
       wp_die();
     }

     public function boomcdn_disable_file(){
       if (empty($_POST["_nonce"]) || ! wp_verify_nonce( $_POST["_nonce"], $this->_nonce ) ) {
         return false;
       }

       // validated in: disableFileFromData()
       $file_data = $_POST;
       $this->disableFileFromData($file_data);
       //print_r($this->getData());
       wp_die();
     }

     public function boomcdn_addAdminMenu()
      {
          add_menu_page(
      	__( 'Boom CDN', 'boomcdn' ),
      	__( 'Boom CDN', 'boomcdn' ),
      	'manage_options',
      	'boomcdn',
      	array($this, 'adminLayout'),
      	BOOMCDN_URL."images/boomcdn.png"
           );
      }

      function load_custom_wp_admin_styles($hook) {
         // Load only on ?page=mypluginname
         if($hook != 'toplevel_page_boomcdn') {
                 return;
         }

          wp_enqueue_style( 'font-awesome', BOOMCDN_URL.'css/font-awesome/css/font-awesome.min.css');
          wp_enqueue_style( 'boomcdn_admin_style', BOOMCDN_URL.'css/famousui.css');
         wp_enqueue_style( 'boomcdn_admin_style2', BOOMCDN_URL.'css/style.css');
       }

       function load_custom_wp_admin_scripts($hook) {
          // Load only on ?page=mypluginname
          if($hook != 'toplevel_page_boomcdn') {
                  return;
          }

          wp_enqueue_script( 'jquery-ui-sortable');
          wp_enqueue_script( 'boomcdn_famous_script', BOOMCDN_URL.'js/famousui.js', array(), true, true );
          wp_enqueue_script( 'boomcdn_admin_script', BOOMCDN_URL.'js/admin-script.js', array(), true, true );
          $admin_options = array(
       'ajax_url' => admin_url( 'admin-ajax.php' ),
       '_nonce'   => wp_create_nonce( $this->_nonce ),
          );
          wp_localize_script('boomcdn_admin_script', 'boomcdn_exchanger', $admin_options);
        }

        private function isSearch(){
          if(!empty($_GET["s"]) && strlen(sanitize_text_field($_GET["s"])) > 0){
            return true;
          }

          return false;

        }

        public static function getSearchValue(){
          $search_value = "";
          if(!empty($_GET["s"]) && strlen(sanitize_text_field($_GET["s"])) > 0){
            $search_value = sanitize_text_field($_GET["s"]);
          }

          return $search_value;

        }



      public function adminLayout()
      {

        if(!empty($_GET[ 'tab' ]) && !(in_array($_GET[ 'tab' ], ["search", "manage", "library"]))){
          $_GET[ 'tab' ] = "search";
        }

        $active_tab = isset( $_GET[ 'tab' ] ) ? sanitize_text_field($_GET[ 'tab' ]) : 'search';
        include __DIR__."/views/tabs.php";

          switch($active_tab){
            case "search":
            $libraries = $this->getLibraries(["s" => $this->getSearchValue()]);
            $featured_libraries = $this->getFeaturedLibraries();
            $is_search = $this->isSearch();
            $search_value = $this->getSearchValue();
            include __DIR__."/views/search.php";
            break;

            case "manage":
            $data = $this->getSavedLibraries();
            include __DIR__."/views/manage.php";
            break;

            case "library":
            $library = $this->getLibrary([
              "slug" => !empty( $_GET[ 'slug' ] ) ? sanitize_text_field($_GET[ 'slug' ]) : false,
              "version" => !empty( $_GET[ 'version' ] ) ? sanitize_text_field($_GET[ 'version' ]) : false,
            ]);
            include __DIR__."/views/library.php";
            break;

            default:
          }

      }

      private function display_view($name, $data){
        include __DIR__."/views/".$name.".php";
      }

      private function getData() {
          return get_option($this->option_name, array());
      }

      private function addFileToData($file) {
        /*
        [file_url] => https://cdn.boomcdn.com/libs/icon-famous/1.0.0-beta.1/iconfamous.otf
        [library_name] => Icon Famous
        [library_slug] => icon-famous
        [library_version] => 1.0.0-beta.1
        */

        if(empty($file["library_slug"])
        || empty($file["library_name"])
        || empty($file["library_version"])
        || empty($file["file_url"])
        || empty($file["type"])
        || empty($file["location"])){
          return false;
        }

        if (!empty($file["file_url"]) && strpos($file["file_url"], 'https://cdn.boomcdn.com') !== 0) {
          return false;
        }

        if(!(in_array($file["location"], ["header", "footer"]))){
          return false;
        }

        if(!(in_array($file["type"], ["script", "style"]))) {
          return false;
        }

          $this->addFile([
            "slug" => sanitize_text_field($file["library_slug"]),
            "name" => sanitize_text_field($file["library_name"]),
            "version" => sanitize_text_field($file["library_version"]),
            "url" => sanitize_text_field($file["file_url"]),
            "type" => sanitize_text_field($file["type"]),
            "location" => sanitize_text_field($file["location"]),
            "enabled" => true,
          ]);

          return true;
      }

      private function removeFileFromData($file) {

        if(empty($file["file_url"])){
          return false;
        }

        if (strpos($file["file_url"], 'https://cdn.boomcdn.com') !== 0) {
          return false;
        }

        $this->removeFile([
          "url" => sanitize_text_field($file["file_url"])
        ]);

          return true;
    }

    function getSavedLibraries(){
      global $wpdb;
      //$table_name = $wpdb->prefix . $this->prefix;
      $libraries = [
        "header" => [],
        "footer" => []
      ];

      $libraries["header"] = $wpdb->get_results(
                        "SELECT * FROM $wpdb->prefix$this->prefix
                        WHERE location = 'header'
                        ORDER BY weight ASC, slug, version, id"
                );

                $libraries["footer"] = $wpdb->get_results(
                                  "SELECT * FROM $wpdb->prefix$this->prefix
                                  WHERE location = 'footer'
                                  ORDER BY weight ASC, slug, version, id"
                          );

                return $libraries;
    }

    public function disableFileFromData($options) {
      global $wpdb;
      //$table_name = $wpdb->prefix . $this->prefix;

      $defaultOptions = [
        "enabled" => 0
      ];

      $options = array_merge($defaultOptions, $options);

      if(filter_var($options["enabled"], FILTER_VALIDATE_BOOLEAN) === NULL){
        return false;
      }

      if (empty($options["file_url"])) {
        return false;
      }

      if (strpos($options["file_url"], 'https://cdn.boomcdn.com') !== 0) {
        return false;
      }

      $wpdb->update(
    		$wpdb->prefix . $this->prefix,
    		[
          "enabled" => boolval($options["enabled"])
        ],
        [
          "url" => sanitize_text_field($options["file_url"])
        ]
    	);
        return true;
  }

  public function enableFileFromData($options) {
    global $wpdb;
    //$table_name = $wpdb->prefix . $this->prefix;
      //$data = get_option($this->option_name, array());

      $defaultOptions = [
        "enabled" => 1
      ];

      $options = array_merge($defaultOptions, $options);

      if(filter_var($options["enabled"], FILTER_VALIDATE_BOOLEAN) === NULL){
        return false;
      }

      if (empty($options["file_url"])) {
        return false;
      }

      if (strpos($options["file_url"], 'https://cdn.boomcdn.com') !== 0) {
        return false;
      }

      $update = $wpdb->update(
    		$wpdb->prefix . $this->prefix,
    		[
          "enabled" => boolval($options["enabled"])
        ],
        [
          "url" => sanitize_text_field($options["file_url"])
        ]
    	);

      return true;
}

      public function isFileExistInData($file) {
          $data = get_option($this->option_name, array());

          if(empty($file["library_slug"])){
            return false;
          }

          if(
            !empty($data[$file["library_slug"]])
            && !empty($data[$file["library_slug"]]["versions"][$file["library_version"]])
          ){
            foreach($data[$file["library_slug"]]["versions"][$file["library_version"]] as $file_index => $file_data){
              if($file["file_url"] == $file_data["url"]){
                return true;
              }
            }
          }

          return false;
      }

      public function removeOldData() {
          $data = get_option($this->option_name, array());

          $found = false;

          if(count($data) > 0){
            foreach($data as $data_index => $data_value){
              if(empty($data_value["versions"])){
                unset($data[$data_index]);
                $found = true;
              }
            }
          }

          if($found == false){
            return false;
          }

          update_option($this->option_name, $data);
      }

      private function getLibrary($options)
      {

        $defaultOptions = [
          "slug" => "",
          "version" => ""
        ];

        $options = array_merge($defaultOptions, $options);

          $data = array();
          $response = wp_remote_get('https://www.boomcdn.com/wp-json/boomcdn/v1/library?lib='.$options["slug"]."&version=".$options["version"]);

          if (is_array($response) && !is_wp_error($response)) {
      	$data = json_decode($response['body'], true);
          }

          return $data;

      }

      private function getLibraries($options)
      {

        $defaultOptions = [
          "s" => ""
        ];

        $options = array_merge($defaultOptions, $options);

          $data = array();
          $response = wp_remote_get('https://www.boomcdn.com/wp-json/boomcdn/v1/libraries?s='.$options["s"]);

          if (is_array($response) && !is_wp_error($response)) {
      	$data = json_decode($response['body'], true);
          }

          return $data;

      }

      private function getFeaturedLibraries()
      {

          $data = array();
          $response = wp_remote_get('https://www.boomcdn.com/wp-json/boomcdn/v1/featured-libraries');

          if (is_array($response) && !is_wp_error($response)) {
      	$data = json_decode($response['body'], true);
          }

          return $data;

      }



      public function boom_crypt( $string, $action = 'e' ) {
          // you may change these values to your own
          $secret_key = '9cG94Ge64rMrW3Zf';
          $secret_iv = 'ZVSF7NrTNcmLUWqF';

          $output = false;
          $encrypt_method = "AES-256-CBC";
          $key = hash( 'sha256', $secret_key );
          $iv = substr( hash( 'sha256', $secret_iv ), 0, 16 );

          if( $action == 'e' ) {
              $output = base64_encode( openssl_encrypt( $string, $encrypt_method, $key, 0, $iv ) );
          }
          else if( $action == 'd' ){
              $output = openssl_decrypt( base64_decode( $string ), $encrypt_method, $key, 0, $iv );
          }

          return $output;
      }


function install() {
	global $wpdb;

  $installed_db_version = get_option( "boomcdn_db_version" );

  if ( $installed_db_version != $this->db_version ) {

	//$table_name = $wpdb->prefix . $this->prefix;

	$charset_collate = $wpdb->get_charset_collate();

	$sql = "CREATE TABLE wp_boomcdn (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  version varchar(255) NOT NULL,
  url varchar(255) NOT NULL,
  type varchar(255) NOT NULL,
  location varchar(255) NOT NULL,
  weight int(11) NOT NULL DEFAULT '0',
  enabled tinyint(4) NOT NULL DEFAULT '1',
  created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) $charset_collate;";

	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	dbDelta( $sql );

	update_option( 'boomcdn_db_version', $this->db_version );
  }
}

function addFile($options){
  global $wpdb;
  //$table_name = $wpdb->prefix . $this->prefix;

  $defaultOptions = [
    //"id" => null,
    "slug" => "",
    "name" => "",
    "version" => "",
    "url" => "",
    "type" => "",
    "location" => "",
    "enabled" => true,
    "created" => current_time( 'mysql' ),
    "modified" => current_time( 'mysql' )
  ];

  $options = array_merge($defaultOptions, $options);

  if (strpos($options["url"], 'https://cdn.boomcdn.com') !== 0) {
    return false;
  }

  if(!(in_array($options["type"], ["script", "style"]))) {
    return false;
  }

  $options["url"] = sanitize_text_field($options["url"]);
  $options["type"] = sanitize_text_field($options["type"]);


  $id = $this->getRowID($options["url"]);

  if(is_numeric($id)){

    $wpdb->update(
  		$wpdb->prefix . $this->prefix,
  		[
        "type" => $options["type"],
        //"location" => $options["location"]
      ],
      [
        "url" => $options["url"]
      ]
  	);
  } else {

  $wpdb->replace(
		$wpdb->prefix . $this->prefix,
		$options
	);
}
}
function getRowID($url){
  global $wpdb;
  //$table_name = $wpdb->prefix . $this->prefix;

  if (strpos($url, 'https://cdn.boomcdn.com') !== 0) {
    return false;
  }

  $url = sanitize_text_field($url);

  $row_id = $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT id FROM $wpdb->prefix$this->prefix
                    WHERE url = %s LIMIT 1",
                    $url
                )
            );

            if(is_numeric($row_id)){
              return $row_id;
            } else {
              return false;
            }
}

function removeFile($options){
  global $wpdb;
  //$table_name = $wpdb->prefix . $this->prefix;

  $defaultOptions = [
    "url" => ""
  ];

  $options = array_merge($defaultOptions, $options);

  $wpdb->delete(
    $wpdb->prefix . $this->prefix,
    $options
  );
}


 }


 $boomcdn = new BoomCDN();
