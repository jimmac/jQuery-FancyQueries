(function($){
  $.fn.fancyQueries = function () {
      /* Handle closing of dropdown if clicked outside */
      $(document).click(function (e) {
        //console.log(e.target);
        if(!( $(e.target).closest(".search").length ||
              $(e.target).hasClass("queryeditor") ||
              $(e.target).hasClass("showmore"))) {
          $(".qdropdown").hide();
          $(".queries").removeClass('open queryeditor');
        }
      });
    this.each(function () {
      var $qdropdown = $('.qdropdown', this),
          $searchbox = this,
          menuurl = $(this).attr("data-url"),
          $button,
          offset = $(this).offset(),
          height = $(this).outerHeight(),
          width = $(this).outerWidth();
      /* Create Dropdown if it doesn't exist */
      if (!$qdropdown.length) {
        $qdropdown = $("<div class='qdropdown'></div>");
        $qdropdown.appendTo(this).hide();
      }
      /* Create button and resize the search input to show it */
      $button = $('<div class="queries"><span class="arrow"></span></div>"').appendTo($(this));
      $("input",this).css('margin-left', '24px');
      $("input",this).css('width', function () {
        var width = $(this).width() - 24;
        return width;
      });
      /* Hook showing and hiding of the dropdown */
      $button.click(function () {
        if ($qdropdown.filter(":visible").length>0) {
          $qdropdown.hide(); //hides all menus, not just in this context
          $(".queries").removeClass('open queryeditor');
        } else {
          $('.qdropdown').hide(); //hide all first
          $(".queries").removeClass('open queryeditor');
  
          $.get(menuurl, function (data) {
            var $list, hidden, $hideme;
            $qdropdown.html(data).css('top', height - 1);
            if ($qdropdown.width()+offset.left > $(document).width()) {
              $qdropdown.removeClass('left').addClass('right');
            } else {
              $qdropdown.removeClass('right').addClass('left');
            }
            $qdropdown.show(200);
            //console.log($qdropdown.width());
            $button.addClass('open');
            $list = $("ul:first", $qdropdown);
            $("li:gt(6)", $list).hide();
            hidden = $("li:hidden",$list).length;
            if (hidden) {
              $hideme = $('<a class="showmore">Show '+ hidden + ' more</a>')
              $list.append($hideme);
              $hideme.click(function (e) {
                e.preventDefault();
                $("li", $list).show();
                $(this).remove(); //for some reason remove triggers a click or something.
              });
            }
          });
        }
      });

      /* Query Editor */
      $(".queryeditor", $qdropdown[0]).live('click', function (e) {
        var content = '<h1>Query Editor</h1>';
        //console.log(this);
        content += "<div><h2>FIXME</h2>";
        content += "<p style='width: 400px; min-height: 100px;'>Initially I think this would provide help on how to compose a query. Once we have a better idea on what the queries look like, a gui editor.</p></div>";
        $button.removeClass('open').addClass('queryeditor');
        $qdropdown.empty().hide().addClass('queryeditor').html(content);
        //console.log($qdropdown.width()+offset.left, $(document).width());
        if ($qdropdown.width()+offset.left > $(document).width()) {
              $qdropdown.removeClass('left').addClass('right');
            } else {
              $qdropdown.removeClass('right').addClass('left');
        }
        $qdropdown.show(200);
      });
    });
  };
})(jQuery);
