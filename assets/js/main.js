if (typeof $ === 'undefined') {
  var $ = jQuery;
}

$(document).ready(function() {
  // $('.main-nav__top').on('mouseover', '> li', function(e) {
  //   console.log(e);
  // });
  new MegaNav('.main-nav');

});


$(window).on('scroll ready', function(){
  var sticky = $('.sticky'),
      hero = $('.hero'),
      distance = hero.outerHeight() - sticky.outerHeight(),
      scroll = $(window).scrollTop();

      console.log(distance);

  if (scroll >= distance) sticky.addClass('fixed');
  else sticky.removeClass('fixed');
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
      this.options.navItems,
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
    this.$el.on('mouseenter', (e) => {
      e.preventDefault();

      if(this.$subNav.length > 0) {
        $(e.target).trigger('NavItem:mouseenter', [this]);
        $(e.target).trigger('MegaNav:sync', [this]);
      }
    });
    this.$el.on('mouseleave', (e) => {
      e.preventDefault();

      if(this.$subNav.length > 0) {
        $(e.target).trigger('NavItem:mouseleave', [this]);
        $(e.target).trigger('MegaNav:sync', [this]);
      }
    });
  }
  activate() {
    var instance = this;
    this.active = true;
    $(this).trigger('NavItem:activated', [this]);
    instance.$el.addClass('active');
  }
  deactivate() {
    var instance = this;
    this.active = false;
    $(this).trigger('NavItem:deactivated', [this]);
    instance.$el.removeClass('active');
  }
}
