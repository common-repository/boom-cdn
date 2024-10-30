<ol class="fui-breadcrumb">
    <li><a href="?page=boomcdn&tab=search">Search Boom CDN</a></li>
    <li><?php echo $library["title"]; ?></li>
</ol>

<section class="single-page single-library-page">

    <div class="jumbotron mb-0 fluid py-5">
        <div class="container">
            <h1 class="text-center title"><?php echo $library["title"]; ?></h1>
            <p class="text-center text-white weight-100">Latest Version - <?php echo $library["library_data"]["version"]; ?></p>
        </div>
    </div>

    <!-- Main Container -->
    <div class="container py-5">

        <!-- About Library -->
        <p class="text-center text-muted weight-300 h4"><?php echo $library["library_data"]["description"]; ?></p>


        <!-- CHOOSE DROPDOWN VERSION -->
        <div class="choose-verions flex fj-between fa-center pt-4 pb-2">
            <div class="dropdown btn-primary">
                <div>Select Version <i class="fa fa-angle-down"></i></div>
                <ul class="dropdown-menu b-none">
                  <?php foreach($library["versions"] as $version): ?>
                    <li><a href="?page=boomcdn&tab=library&slug=<?php echo $library["slug"]; ?>&version=<?php echo urlencode($version); ?>"><?php echo $version; ?></a></li>
                  <?php endforeach;  ?>
                </ul>
            </div>

            <div class="badge light text-gray badge-lg"><small>Version</small> <?php echo $library["show_version"]; ?></div>
        </div>

        <!-- Latest Releases -->
        <div class="pb-5">

          <?

            if(!empty($library["filetree"])):
              foreach($library["filetree"] as $tree_type => $file_list):
          ?>
            <!-- CSS -->
            <div class="py-2 mx-auto">
                <div class="table-fluid">
                    <table>
                        <thead>
                            <tr>
                                <th><?php echo ucwords($tree_type); ?></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                          <?
                            if(!empty($file_list)):
                              foreach($file_list as $file_type => $file_name):
                          ?>

                          <?
                          $file_data = [
                            "file_url" => $file_name,
                            "library_name" => $library["title"],
                            "library_slug" => $library["slug"],
                            "library_version" => $library["show_version"]
                          ];
                          $file_hash = $this->boom_crypt(json_encode($file_data));
                          $file_exists = $this->getRowID($file_name);
                          ?>
                            <tr>
                                <td><?php echo $file_name; ?></td>
                                <td style="width: 10%">
                                  <button class="btn btn-sm btn-link-copy <?php if($file_exists):?>btn-danger boomcdn_remove_file<?php else: ?>btn-primary boomcdn_add_file modal-open<?php endif; ?>"
                                    data-file-url="<?php echo $file_name; ?>"
                                    data-file-hash="<?php echo $file_hash; ?>">
                                        <?php if($file_exists):?>
                                        Remove Library <i class="fa fa-close"></i>
                                      <?php else: ?>
                                      Add Library <i class="fa fa-copy"></i>
                                    <?php endif; ?>
                                      </button>
                                    </td>
                            </tr>
                            <?
                        endforeach;
                        endif;
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <?
        endforeach;
        endif;

            ?>





        </div>
    </div>
</section>

<div class="modal" id="remove-file-modal" data-file-hash="">
    <div class="modal-container modal-sm">
        <!-- header -->
        <div class="modal-header">
            <h5 class="modal-title">Remove File</h5>
            <div class="modal-close" data-modal="remove-file-modal"><i class="fa fa-close"></i></div>
        </div>

        <form>
          <input class="input" type="hidden" name="file_url" value="" />
          <div class="modal-body text-center">
            <h4>Are you sure?</h4>
              <button type="submit" class="btn-primary remove-file-button">Yes</button>
              <button type="button" class="btn-primary modal-close" data-modal="remove-file-modal">No</button>
          </div>
        </form>
    </div>
</div>

<div class="fui-modal" id="add-file-modal" data-file-hash="">
    <div class="fui-modal-container modal-sm">
        <!-- header -->
        <div class="fui-modal-header">
            <h5 class="fui-modal-title">Add Library</h5>
            <div class="modal-close" data-modal="add-file-modal"><i class="fa fa-close"></i></div>
        </div>
        <form>
        <div class="fui-modal-body">
            <label> File:</label>
            <input class="input" type="text" name="file_url" value="" readonly="">
            <br>
            <label> Type:</label>
            <select class="input" name="type">
              <option value="script">Script</option>
              <option value="style">Style</option>
            </select>
            <br>
            <label> Location:</label>
            <select class="input" name="location">
              <option value="header">Header</option>
              <option value="footer">Footer</option>
            </select>

    </div>
    <div class="fui-modal-footer text-right">
      <button type="submit" class="btn-primary add-file-button">Save</button>
      <button type="button" class="btn-danger modal-close" data-modal="add-file-modal">Cancel</a>
    </div>
    </form>
</div>
