function select ( selector, context ) {
  return [].slice.call( ( context || document ).querySelectorAll( selector ) );
}

function someContains ( arr, string ) {
  return arr.some( function ( str ) {
    return str.indexOf( string ) !== -1;
  });
}

function deepGet ( obj, path ) {
  if ( path == null ) {
    path = obj;
    obj = window;
  }
  return path
    .split(/[.\[\]]/g)
    .reduce( function ( prev, prop, i, arr ) {
      if ( prop ) {
        return prev[prop] === undefined ?
          undefined :
          prev[prop];
      }
      return prev;
    }, obj );
}

window.Librarian = {};

var styleSheetHrefs = select( "link" ).reduce( function ( acc, link ) {
  if ( link.rel === "stylesheet" ) {
    acc.push( link.href );
  }
  return acc;
}, [] );

function isLodash ( _ ) {
  return _.name === "lodash";
}

function isZepto ( $ ) {
  return typeof $.zepto !== "undefined";
}

var libs = {
  jQuery: {
    global: "jQuery",
    version: "fn.jquery",
    plugins: {
      "jQuery Mobile": {
        global: "jQuery.mobile"
      },
      "jQuery UI": {
        global: "jQuery.ui"
      },
      Velocity: {
        global: "Velocity"
      }
    }
  },
  AngularJS: {
    global: "angular",
    version: "version.full"
  },
  Backbone: {
    global: "Backbone",
    version: "VERSION",
    plugins: {
      Marionette: {
        global: "Marionette"
      },
      Thorax: {
        global: "Thorax"
      },
      Chaplin: {
        global: "Chaplin"
      }
    }
  },
  Ember: {
    global: "Ember",
    version: "VERSION"
  },
  Meteor: {
    global: "Meteor",
    version: "release"
  },
  React: {
    global: "React",
    version: "version"
  },
  Knockout: {
    global: "ko",
    version: "version"
  },
  d3: {
    global: "d3",
    version: "version"
  },
  moment: {
    global: "moment",
    version: "version"
  },
  Underscore: {
    global: "_",
    version: "VERSION"
  },
  "Lo-Dash": {
    global: "_",
    version: "VERSION"
  },
  "three.js": {
    global: "THREE",
    version: ""
  },
  Modernizr: {
    global: "Modernizr",
    version: "_version"
  },
  "socket.io": {
    global: "io"
  },
  YUI: {
    global: "YUI",
    version: "version"
  },
  ExtJS: {
    global: "Ext",
    version: "versions.core.version"
  },
  Handlebars: {
    global: "Handlebars",
    version: "VERSION"
  },
  Famous: {
    global: "famous",
    version: null
  },
  Polymer: {
    global: "Polymer",
    version: "version"
  },
  async: {
    global: "async",
    version: null
  }
};

function init () {
  Object.keys( libs ).forEach( function ( key ) {
    var lib = deepGet( libs[key].global );
    var v;
    if ( lib ) {
      v = deepGet( libs[key].global + "." + libs[key].version );
      console.log( key + ": " + v );
    }
  });
}

if ( document.readyState === "complete" || document.readyState === "loaded" ) {
  init();
} else {
  document.addEventListener( "DOMContentLoaded", init );
}
