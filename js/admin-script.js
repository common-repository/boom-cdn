jQuery(function($){
  $(function(){

    $( ".library-card > .bc-card-body" ).sortable({
      connectWith: ".library-card > .bc-card-body",
      cursor: "move",
      receive: function (event, ui) {
        /*e
        console.log($(event.target));
        var id = "";
        var location = "";

        var form_data = [
          {name: "action", value: "update_location"},
          {name: "order", value: JSON.stringify(order)}
        ];

        $.post(ajaxurl, form_data, function(data, status){
          console.log(data);

        });
        */

      },
      stop: function (event, ui) {
        console.log("upated");
        var order = [];

        var item_id = $(ui.item).attr("id");
        var item_location = $(ui.item).closest(".library-card").data("location");


        $( ".library-card > .bc-card-body" ).each(function(){
          order = order.concat($(this).sortable('toArray'));
        });

        var form_data = [
          {name: "action", value: "boomcdn_update_order"},
          {name: "order", value: JSON.stringify(order)},
          {name: "id", value: item_id},
          {name: "location", value: item_location},
          {name: "_nonce", value: boomcdn_exchanger._nonce }
        ];

        $.post(boomcdn_exchanger.ajax_url, form_data, function(data, status){
          console.log(data);

        });
     }
    }).disableSelection();

    $(document).on("click", ".boomcdn_add_file", function(){
      var button = $(this);
      var file_hash = $(this).data("file-hash");
      var file_url = $(this).data("file-url");

      $("#add-file-modal").find(".fui-modal-title").text("Add Library");

      $("#add-file-modal").attr("data-file-hash", file_hash);
      $("#add-file-modal").data("file-hash", file_hash);
      $("#add-file-modal").find("[name=file_url]").val(file_url);
      FamousUI.modal.modalOpen($("#add-file-modal"));
    });

    $(document).on("click", ".boomcdn_remove_file", function(){
      var button = $(this);
      var file_hash = $(this).data("file-hash");
      var file_url = $(this).data("file-url");

      console.log(file_url);

      $("#remove-file-modal").attr("data-file-hash", file_hash);
      $("#remove-file-modal").data("file-hash", file_hash);
      $("#remove-file-modal").find("[name=file_url]").val(file_url);
      FamousUI.modal.modalOpen($("#remove-file-modal"));
    });

    $(document).on("click", ".boomcdn_edit_file", function(){
      var button = $(this);
      var file_hash = $(this).data("file-hash");
      var file_url = $(this).data("file-url");
      var file_type = $(this).data("file-type");
      var file_location = $(this).data("file-location");

      $("#add-file-modal").find(".fui-modal-title").text("Edit Library");

      $("#add-file-modal").attr("data-file-hash", file_hash);
      $("#add-file-modal").data("file-hash", file_hash);
      $("#add-file-modal").find("[name=file_url]").val(file_url);
      $("#add-file-modal").find("[name=location]").val(file_location).change();
      $("#add-file-modal").find("[name=type]").val(file_type).change();
      FamousUI.modal.modalOpen($("#add-file-modal"));
    });

    /*
    $(document).on("click", ".boomcdn_remove_file", function(e){
      e.preventDefault();

      var form = $(this);
      var file_hash = form.closest(".fui-modal").data("file-hash");
      var file_url = form.find("[name=file_url]").val();
      var button = $("button[data-file-url='"+file_url+"']");
      var form_data = form.serializeArray();

      form_data.push({name: "action", value: "add_file"});
      form_data.push({name: "file_hash", value: file_hash});

      console.log(form_data);
      $.post(ajaxurl, form_data, function(data, status){
        console.log(data);
        FamousUI.modal.modalClose($("#add-file-modal"));
        button.removeClass("btn-primary");
        button.removeClass("boomcdn_add_file");
        button.addClass("btn-danger");
        button.addClass("boomcdn_remove_file");
        button.html('Remove Library <i class="fa fa-close"></i>');
      });
    });
    */

    $("#add-file-modal").find("form").submit(function(e){
      e.preventDefault();

      var form = $(this);
      var file_hash = form.closest(".fui-modal").data("file-hash");
      var file_url = form.find("[name=file_url]").val();
      var button = $("button[data-file-url='"+file_url+"']");
      var file_card = button.closest(".file-card");
      var form_data = form.serializeArray();

      form_data.push({name: "action", value: "boomcdn_add_file"});
      form_data.push({name: "file_hash", value: file_hash});
      form_data.push({name: "_nonce", value: boomcdn_exchanger._nonce});

      console.log(form_data);
      $.post(boomcdn_exchanger.ajax_url, form_data, function(data, status){
        console.log(data);
        FamousUI.modal.modalClose($("#add-file-modal"));
        if(file_card.length < 1){
          button.removeClass("btn-primary");
          button.removeClass("boomcdn_add_file");
          button.addClass("btn-danger");
          button.addClass("boomcdn_remove_file");
          button.html('Remove Library <i class="fa fa-close"></i>');
        }
      });
    })

    $("#remove-file-modal").find("form").submit(function(e){
      e.preventDefault();

      var form = $(this);
      var file_url = form.find("[name=file_url]").val();
      var form_data = form.serializeArray();
      var button = $("button[data-file-url='"+file_url+"']");
      var file_card = button.closest(".file-card");

      form_data.push({name: "action", value: "boomcdn_remove_file"});
      form_data.push({name: "_nonce", value: boomcdn_exchanger._nonce});

      console.log(form_data);
      $.post(boomcdn_exchanger.ajax_url, form_data, function(data, status){
        console.log(data);
        FamousUI.modal.modalClose($("#remove-file-modal"));
        if(file_card.length){
          file_card.fadeOut();
        } else {
          button.removeClass("btn-danger");
          button.removeClass("boomcdn_remove_file");
          button.addClass("btn-primary");
          button.addClass("boomcdn_add_file");
          button.html('Add Library <i class="fa fa-copy"></i>');

        }

      });
    })




    /*$(document).on("submit", ".modal form", function(e){
      e.preventDefault();

      var formdata = $(this).serializeArray();
      $.post(ajaxurl, formdata, function(data, status){
        console.log(data);
      });

    });
    */

/*
    $(document).on("click", ".boomcdn_remove_file", function(){
      var button = $(this);
      var file_hash = $(this).data("file-hash");
      var info = {
  			'action': 'remove_file',
  			'file_hash': file_hash
  		};
      $.post(ajaxurl, info, function(data, status){
        console.log(data);
        button.addClass("btn-primary");
        button.addClass("boomcdn_add_file");
        button.removeClass("btn-danger");
        button.removeClass("boomcdn_remove_file");
        button.html('Add Library <i class="fa fa-copy"></i>');
        });
    });
    */

    $(document).on("click", ".boomcdn_file_status.enabled", function(){
      var button = $(this);
      var file_url = $(this).data("file-url");
      var info = {
  			'action': 'boomcdn_disable_file',
  			'file_url': file_url,
        '_nonce': boomcdn_exchanger._nonce
  		};
      $.post(boomcdn_exchanger.ajax_url, info, function(data, status){
        console.log(data);
        button.removeClass("enabled");
        button.removeClass("btn-success");
        button.addClass("btn-danger");
        button.addClass("disabled");
        button.html('<i class="fa fa-eye-slash"></i>');
        });
    });

    $(document).on("click", ".boomcdn_file_status.disabled", function(){
      var button = $(this);
      var file_card = button.closest(".file-card");
      var file_url = $(this).data("file-url");
      var info = {
  			'action': 'boomcdn_enable_file',
  			'file_url': file_url,
        '_nonce': boomcdn_exchanger._nonce
  		};
      $.post(boomcdn_exchanger.ajax_url, info, function(data, status){
        console.log(data);
        button.addClass("enabled");
        button.addClass("btn-success");
        button.removeClass("btn-danger");
        button.removeClass("disabled");
        button.html('<i class="fa fa-eye"></i>');
        });
    });

    $(".remove-file-modal-button").click(function(){
      var file_hash = $(this).closest(".bc-card-body").find("[data-file-hash]").data("file-hash");
      $("#remove-file-modal").data("file-hash", file_hash);
    });


/*
$(document).on("click", ".remove-file-button", function(){
  var button = $(this);
  var file_hash = $(this).closest(".modal").data("file-hash");
  var info = {
    'action': 'remove_file',
    'file_hash': file_hash
  };
  $.post(ajaxurl, info, function(data, status){
    var file_row = $(".manage-libraries input[data-file-hash='"+file_hash+"']").closest(".bc-card");
    var library_row = file_row.closest(".library-card");

    if(library_row.find("input[data-file-hash]").not(file_row).length > 1) {
      file_row.remove();
    } else {
      library_row.remove();
    }

  });

});
*/



    /*$.get("https://www.boomcdn.com/wp-json/boomcdn/v1/libraries", function(data, status){
          console.log(data);
          if(data.length > 0){
            $("#boomcdn-libraries table tbody").html("");
            $("#boomcdn-libraries").hide();
            data.forEach(function(library, library_index){
              var new_row = create_library_row(library.title, library.link,library.version);
              $("#boomcdn-libraries table tbody").append(new_row);
            });
            $("#boomcdn-libraries").fadeIn();
          }
      });

      $.get("https://www.boomcdn.com/wp-json/boomcdn/v1/featured-libraries", function(data, status){
            console.log(data);
            if(data.length > 0){
              $(".libraries-row").html("");
              $(".libraries-row").hide();
              data.forEach(function(featured, featured_index){
                var new_card = create_featured_card(featured.title, featured.image, featured.link);
                $(".libraries-row").append(new_card);
              });
              $(".libraries-row").fadeIn();
            }
        });*/
  });

  function create_library_row(title, href, version){
    var row = $("<tr />");
    var row_library = $("<td />");
    var row_version = $("<td />");

    row.append(row_library);
    row.append(row_version);

    row_library.text(title);
    row_version.text(version);

    return row;
  }

  function create_featured_card(title, image, href){
    var col = $("<div />");
    var link = $("<a />");
    var card = $("<div />");
    var card_header = $("<div />");
    var card_title = $("<div />");
    var card_content = $("<div />");
    var card_image = $("<img />");

    col.addClass("col-md-4 col-sm-6 col-6 mb-2");
    link.addClass("d-block").attr("target", "_blank");
    card.addClass("card shadow");
    card_header.addClass("card-header");
    card_title.addClass("h6 card-title text-center text-dark");
    card_content.addClass("img flex-center-center card-body");
    card_image.addClass("img-contain");

    col.append(link);
    link.append(card);
    card.append(card_header);
    card_header.append(card_title);
    card.append(card_content);
    card_content.append(card_image);

    link.attr("href", href);
    card_title.text(title);
    card_image.attr("src", image);
    return col;
  }
})
