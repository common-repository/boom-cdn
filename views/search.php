<div class="wrap">


<section class="jumbotron fluid bg-white text-center home-jumbo bg-cover" style=" background-image: linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),  url('<?php echo BOOMCDN_URL; ?>/images/hero-bg.jpg');">
        <!-- SEARCH INPUT -->
        <div class="search-library homepage-search pt-5 pb-4">
            <img src="<?php echo BOOMCDN_URL; ?>/images/boomcdn-hero-logo.png" alt="">
            <p class="h3  text-primary mt-2">Content Delivery Network</p>
            <div class="container">
                <!-- SEARCH FORM -->
                <div class="search-form mt-5">
                  <form method="get">
                    <input type="hidden" name="page" value="boomcdn" />
                      <div class="flex-center-center col-md-8 mx-auto search-form-container">
                        <input type="text" value="<?php echo BoomCDN::getSearchValue(); ?>" name="s" class="input search-light" placeholder="Search libraries by name">
                        <button class="btn-none rounded"><i class="fa fa-search"></i></button>
                    </div>

                                      </div>
                  </form>
                </div>
                <!-- / SEARCH FORM -->

            </div>

    </section>

<section id="boomcdn-libraries" class="py-3">
<?php if($this->isSearch()): ?>
<h4>Search for: <?php echo $this->getSearchValue(); ?></h4>
<?php else: ?>
<h4>Libraries</h4>
<?php endif; ?>

<table>
<thead>
<tr>
  <th width="80%">Library</th>
  <th>Latest Version</th>
</tr>
</thead>
<tbody>
<?
if(count($libraries)>0):
foreach($libraries as $library):
?>
<tr>
<td><a href="?page=boomcdn&tab=library&slug=<?php echo $library["slug"]; ?>" class="library-list-title"><?php echo $library["title"]; ?></a></td>
<td><span class="badge badge-lg"><?php echo $library["version"]; ?></span></td>
</tr>
<?
endforeach;
endif;

?>
</tbody>
</table>
</section>


        <section class="popular-libs bg-light">

<!-- POPULAR  LIBS -->
<div class="pt-5 pb-4">
  <!-- POPULAR ONES -->
  <div class="col-md-8 mx-auto mt-0 recent-libs">

      <div class="flex-center-center">
          <h1 class="text-center h4 weight-400 mb-4 bg-primary px-2 py-1 text-white"><?php _e( 'Featured Libraries', 'boomcdn' ); ?></h1>
      </div>

      <!-- LIBRARIES -->
      <div class="row libraries-row">
        <?
        if(count($featured_libraries)>0):
          foreach($featured_libraries as $featured_library):
        ?>
        <div class="col-md-4 col-sm-6 col-6 mb-2">
<a class="d-block" href="?page=boomcdn&tab=library&slug=<?php echo $featured_library["slug"]; ?>">
  <div class="bc-card shadow">
      <div class="bc-card-header">
          <p class="h6 card-title text-center text-dark"><?php echo $featured_library["title"]; ?></p>
      </div>
      <div class="img flex-center-center bc-card-body">
          <img class="img-contain" src="<?php echo $featured_library["image"]; ?>"
              alt="Twitter Bootstrap">
      </div>
  </div>
</a>
</div>

        <?
        endforeach;
      endif;
        ?>
      </div>
  </div>
</div>
</section>




</div>

<div class="modal" id="modal1">
<div class="modal-container modal-sm">
<!-- header -->
<div class="modal-header bg-secondary">
  <h5 class="modal-title text-white">First modal</h5>
  <div class="modal-close" data-modal="modal1"><i class="fa fa-close"></i></div>
</div>

<div class="modal-body">
  <a href="#!" class="btn-primary modal-open" data-modal="modal2">Open Second Modal</a>
</div>
</div>
</div>
