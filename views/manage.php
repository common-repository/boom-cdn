<div class="wrap manage-libraries">
  <div class="bc-card px-0 library-card col-12 mb-2" data-location="header" style="overflow: initial !important">
    <div class="bc-card-header">
      <h4 class="card-title">Header</h4>
    </div>

    <div class="bc-card-body">
      <?php foreach ($data["header"] as $index => $library) : ?>
      <?
      $file_data = [
        "file_url" => $library->url,
        "library_name" => $library->name,
        "library_version" => $library->version,
        "library_slug" => $library->slug
      ];
      $file_hash = $this->boom_crypt(json_encode($file_data));
      ?>
      <div id="file-card-<?php echo $library->id; ?>" class="bc-card file-card col-12 mb-1" style="overflow: initial !important">

        <div class="bc-card-body">
          <div class="row">
            <div class="col-9">
                <input class="input" type="text" placeholder="Disabled" data-file-hash="<?php echo $file_hash; ?>" value="<?php echo $library->url; ?>"
                readonly="">
            </div>
            <div class="col-3">

              <button class="btn <?php if($library->enabled): ?>boomcdn_file_status enabled btn-success<?php else: ?>boomcdn_file_status disabled btn-danger<?php endif; ?>" href="#!"
              data-file-url="<?php echo  $library->url; ?>"
              data-file-hash="<?php echo  $file_hash; ?>">
              <i class="fa <?php if($library->enabled): ?>fa-eye<?php else: ?>fa-eye-slash<?php endif; ?>"></i>
            </button>
              <button class="boomcdn_edit_file btn btn-primary" href="#!"
              data-file-url="<?php echo  $library->url; ?>"
              data-file-hash="<?php echo  $file_hash; ?>"
              data-file-type="<?php echo  $library->type; ?>"
              data-file-location="<?php echo  $library->location; ?>">
              <i class="fa fa-pencil"></i>
            </button>
              <button class="boomcdn_remove_file btn btn-danger" href="#!"
              data-file-url="<?php echo  $library->url; ?>"
              data-file-hash="<?php echo  $file_hash; ?>">
              <i class="fa fa-trash"></i>
            </button>
            </div>
          </div>

        </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
  <div class="bc-card px-0 library-card col-12 mb-2" data-location="footer" style="overflow: initial !important">
    <div class="bc-card-header">
      <h4 class="card-title">Footer</h4>
    </div>

    <div class="bc-card-body">
      <?php foreach ($data["footer"] as $index => $library) : ?>
      <?
      $file_data = [
        "file_url" => $library->url,
        "library_name" => $library->name,
        "library_version" => $library->version,
        "library_slug" => $library->slug
      ];
      $file_hash = $this->boom_crypt(json_encode($file_data));
      ?>
      <div id="file-card-<?php echo $library->id; ?>" class="bc-card file-card col-12 mb-1" style="overflow: initial !important">

        <div class="bc-card-body">
          <div class="row">
            <div class="col-9">
                <input class="input" type="text" placeholder="Disabled" data-file-hash="<?php echo $file_hash; ?>" value="<?php echo $library->url; ?>"
                readonly="">
            </div>
            <div class="col-3">

              <button class="btn <?php if($library->enabled): ?>boomcdn_file_status enabled btn-success<?php else: ?>boomcdn_file_status disabled btn-danger<?php endif; ?>" href="#!"
              data-file-url="<?php echo $library->url; ?>"
              data-file-hash="<?php echo $file_hash; ?>">
              <i class="fa <?php if($library->enabled): ?>fa-eye<?php else: ?>fa-eye-slash<?php endif; ?>"></i>
            </button>
              <button class="boomcdn_edit_file btn btn-primary" href="#!"
              data-file-url="<?php echo $library->url?>"
              data-file-hash="<?php echo $file_hash; ?>"
              data-file-type="<?php echo $library->type; ?>"
              data-file-location="<?php echo $library->location; ?>">
              <i class="fa fa-pencil"></i>
            </button>
              <button class="boomcdn_remove_file btn btn-danger" href="#!"
              data-file-url="<?php echo $library->url; ?>"
              data-file-hash="<?php echo $file_hash; ?>">
              <i class="fa fa-trash"></i>
            </button>
            </div>
          </div>

        </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

</div>

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
            <!--
            <br>
            <label> Location:</label>
            <select class="input" name="location">
              <option value="header">Header</option>
              <option value="footer">Footer</option>
            </select>
          -->

    </div>
    <div class="fui-modal-footer text-right">
      <button type="submit" class="btn-primary add-file-button">Save</button>
      <button type="button" class="btn-danger modal-close" data-modal="add-file-modal">Cancel</a>
    </div>
    </form>
</div>
