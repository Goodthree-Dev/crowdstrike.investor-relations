if (typeof $ === 'undefined') {
  var $ = jQuery;
}

$(document).ready(function() {

  /**
   * Replace all SVG images with inline SVG
   */
  $('img[src$=".svg"]').each(function() {
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(
      imgURL,
      function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);
      },
      'xml'
    );
  });
  
  new MegaNav('.main-nav');
});


$(window).on('scroll ready', function(){
  var sticky = $('.sticky'),
      hero = $('.hero'),
      distance = hero.outerHeight() - sticky.outerHeight(),
      scroll = $(window).scrollTop();

  if (scroll >= distance) {
    sticky.addClass('fixed');
  } else {
    sticky.removeClass('fixed');
  }
});

class MegaNav {
  constructor(el, args) {
    this.defaults = {
      navItem: '> li',
      menu: '.main-nav__top'
    };
    this.options = Object.assign({}, this.defaults, args);
    this.container = el;
    this.$container = $(el);
    this.navItems = this.getNavItems(this.options.navItem);
    this.listen();
  }
  listen() {
    var instance = this;
    this.$container.on(
      'MegaNav:sync',
      this.navItems,
      function(e, navItem) {
        instance.sync(navItem);
      }
    );
  }
  getNavItems(selector) {
    var navItems = [];
    $(this.options.menu).find(selector).each(function(i, el) {
      var navItem = new NavItem(el);
      navItems.push(navItem);
    });
    return navItems;
  }
  sync(navItem) {
    if (navItem.active) {
      this.deactivate(navItem);
    } else {
      this.activate(navItem);
    }
  }
  activate(navItem) {
    navItem.activate();
    this.$container.addClass('active')

    this.navItems.forEach((el, i) => {
      if(el != navItem) {
        el.deactivate();
      }
    });
  }
  deactivate(navItem) {
    if (navItem) {
      this.$container.removeClass('active')
      navItem.deactivate();
    }
  }
}

class NavItem {
  constructor(el) {
    this.el = el;
    this.$el = $(el);
    this.$subNav = $(el).find('.main-nav__sub');
    this.active = false;
    this.listen();
  }
  listen() {
    var headerSearch = this.$el.hasClass('header-search');
    
    if(this.$subNav.length > 0) {
      if(!headerSearch) {
        this.$el.on('mouseenter', (e) => {
          $(e.target).trigger('NavItem:mouseenter', [this]);
          $(e.target).trigger('MegaNav:sync', [this]);
        });
  
        this.$el.on('mouseleave', (e) => {
          $(e.target).trigger('NavItem:mouseleave', [this]);
          $(e.target).trigger('MegaNav:sync', [this]);
        });  
      } else {
        this.$el.find('.header-search__toggle').on('click', (e) => {
          e.preventDefault();

          $(e.target).trigger('NavItem:click', [this]);
          $(e.target).trigger('MegaNav:sync', [this]);
        });
      }
    }
  }
  activate() {
    var instance = this;
    this.active = true;
    $(this).trigger('NavItem:activated', [this]);
    instance.$el.addClass('active');
    
    if(instance.$el.hasClass('header-search')) {
      instance.$el.find('input').focus();
    }
  }
  deactivate() {
    var instance = this;
    this.active = false;
    $(this).trigger('NavItem:deactivated', [this]);
    instance.$el.removeClass('active');
  }
}
