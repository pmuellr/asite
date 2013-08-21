require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
d3 = function() {
  var d3 = {
    version: "3.2.8"
  };
  if (!Date.now) Date.now = function() {
    return +new Date();
  };
  var d3_document = document, d3_documentElement = d3_document.documentElement, d3_window = window;
  try {
    d3_document.createElement("div").style.setProperty("opacity", 0, "");
  } catch (error) {
    var d3_element_prototype = d3_window.Element.prototype, d3_element_setAttribute = d3_element_prototype.setAttribute, d3_element_setAttributeNS = d3_element_prototype.setAttributeNS, d3_style_prototype = d3_window.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
    d3_element_prototype.setAttribute = function(name, value) {
      d3_element_setAttribute.call(this, name, value + "");
    };
    d3_element_prototype.setAttributeNS = function(space, local, value) {
      d3_element_setAttributeNS.call(this, space, local, value + "");
    };
    d3_style_prototype.setProperty = function(name, value, priority) {
      d3_style_setProperty.call(this, name, value + "", priority);
    };
  }
  d3.ascending = function(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  };
  d3.descending = function(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  };
  d3.min = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
      while (++i < n) if ((b = array[i]) != null && a > b) a = b;
    } else {
      while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
    }
    return a;
  };
  d3.max = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
      while (++i < n) if ((b = array[i]) != null && b > a) a = b;
    } else {
      while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
    }
    return a;
  };
  d3.extent = function(array, f) {
    var i = -1, n = array.length, a, b, c;
    if (arguments.length === 1) {
      while (++i < n && !((a = c = array[i]) != null && a <= a)) a = c = undefined;
      while (++i < n) if ((b = array[i]) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    } else {
      while (++i < n && !((a = c = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    }
    return [ a, c ];
  };
  d3.sum = function(array, f) {
    var s = 0, n = array.length, a, i = -1;
    if (arguments.length === 1) {
      while (++i < n) if (!isNaN(a = +array[i])) s += a;
    } else {
      while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
    }
    return s;
  };
  function d3_number(x) {
    return x != null && !isNaN(x);
  }
  d3.mean = function(array, f) {
    var n = array.length, a, m = 0, i = -1, j = 0;
    if (arguments.length === 1) {
      while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
    } else {
      while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
    }
    return j ? m : undefined;
  };
  d3.quantile = function(values, p) {
    var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
    return e ? v + e * (values[h] - v) : v;
  };
  d3.median = function(array, f) {
    if (arguments.length > 1) array = array.map(f);
    array = array.filter(d3_number);
    return array.length ? d3.quantile(array.sort(d3.ascending), .5) : undefined;
  };
  d3.bisector = function(f) {
    return {
      left: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (f.call(a, a[mid], mid) < x) lo = mid + 1; else hi = mid;
        }
        return lo;
      },
      right: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (x < f.call(a, a[mid], mid)) hi = mid; else lo = mid + 1;
        }
        return lo;
      }
    };
  };
  var d3_bisector = d3.bisector(function(d) {
    return d;
  });
  d3.bisectLeft = d3_bisector.left;
  d3.bisect = d3.bisectRight = d3_bisector.right;
  d3.shuffle = function(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.random() * m-- | 0;
      t = array[m], array[m] = array[i], array[i] = t;
    }
    return array;
  };
  d3.permute = function(array, indexes) {
    var i = indexes.length, permutes = new Array(i);
    while (i--) permutes[i] = array[indexes[i]];
    return permutes;
  };
  d3.zip = function() {
    if (!(n = arguments.length)) return [];
    for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m; ) {
      for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n; ) {
        zip[j] = arguments[j][i];
      }
    }
    return zips;
  };
  function d3_zipLength(d) {
    return d.length;
  }
  d3.transpose = function(matrix) {
    return d3.zip.apply(d3, matrix);
  };
  d3.keys = function(map) {
    var keys = [];
    for (var key in map) keys.push(key);
    return keys;
  };
  d3.values = function(map) {
    var values = [];
    for (var key in map) values.push(map[key]);
    return values;
  };
  d3.entries = function(map) {
    var entries = [];
    for (var key in map) entries.push({
      key: key,
      value: map[key]
    });
    return entries;
  };
  d3.merge = function(arrays) {
    return Array.prototype.concat.apply([], arrays);
  };
  d3.range = function(start, stop, step) {
    if (arguments.length < 3) {
      step = 1;
      if (arguments.length < 2) {
        stop = start;
        start = 0;
      }
    }
    if ((stop - start) / step === Infinity) throw new Error("infinite range");
    var range = [], k = d3_range_integerScale(Math.abs(step)), i = -1, j;
    start *= k, stop *= k, step *= k;
    if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k); else while ((j = start + step * ++i) < stop) range.push(j / k);
    return range;
  };
  function d3_range_integerScale(x) {
    var k = 1;
    while (x * k % 1) k *= 10;
    return k;
  }
  function d3_class(ctor, properties) {
    try {
      for (var key in properties) {
        Object.defineProperty(ctor.prototype, key, {
          value: properties[key],
          enumerable: false
        });
      }
    } catch (e) {
      ctor.prototype = properties;
    }
  }
  d3.map = function(object) {
    var map = new d3_Map();
    if (object instanceof d3_Map) object.forEach(function(key, value) {
      map.set(key, value);
    }); else for (var key in object) map.set(key, object[key]);
    return map;
  };
  function d3_Map() {}
  d3_class(d3_Map, {
    has: function(key) {
      return d3_map_prefix + key in this;
    },
    get: function(key) {
      return this[d3_map_prefix + key];
    },
    set: function(key, value) {
      return this[d3_map_prefix + key] = value;
    },
    remove: function(key) {
      key = d3_map_prefix + key;
      return key in this && delete this[key];
    },
    keys: function() {
      var keys = [];
      this.forEach(function(key) {
        keys.push(key);
      });
      return keys;
    },
    values: function() {
      var values = [];
      this.forEach(function(key, value) {
        values.push(value);
      });
      return values;
    },
    entries: function() {
      var entries = [];
      this.forEach(function(key, value) {
        entries.push({
          key: key,
          value: value
        });
      });
      return entries;
    },
    forEach: function(f) {
      for (var key in this) {
        if (key.charCodeAt(0) === d3_map_prefixCode) {
          f.call(this, key.substring(1), this[key]);
        }
      }
    }
  });
  var d3_map_prefix = "\0", d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
  d3.nest = function() {
    var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
    function map(mapType, array, depth) {
      if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
      var i = -1, n = array.length, key = keys[depth++], keyValue, object, setter, valuesByKey = new d3_Map(), values;
      while (++i < n) {
        if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
          values.push(object);
        } else {
          valuesByKey.set(keyValue, [ object ]);
        }
      }
      if (mapType) {
        object = mapType();
        setter = function(keyValue, values) {
          object.set(keyValue, map(mapType, values, depth));
        };
      } else {
        object = {};
        setter = function(keyValue, values) {
          object[keyValue] = map(mapType, values, depth);
        };
      }
      valuesByKey.forEach(setter);
      return object;
    }
    function entries(map, depth) {
      if (depth >= keys.length) return map;
      var array = [], sortKey = sortKeys[depth++];
      map.forEach(function(key, keyMap) {
        array.push({
          key: key,
          values: entries(keyMap, depth)
        });
      });
      return sortKey ? array.sort(function(a, b) {
        return sortKey(a.key, b.key);
      }) : array;
    }
    nest.map = function(array, mapType) {
      return map(mapType, array, 0);
    };
    nest.entries = function(array) {
      return entries(map(d3.map, array, 0), 0);
    };
    nest.key = function(d) {
      keys.push(d);
      return nest;
    };
    nest.sortKeys = function(order) {
      sortKeys[keys.length - 1] = order;
      return nest;
    };
    nest.sortValues = function(order) {
      sortValues = order;
      return nest;
    };
    nest.rollup = function(f) {
      rollup = f;
      return nest;
    };
    return nest;
  };
  d3.set = function(array) {
    var set = new d3_Set();
    if (array) for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
    return set;
  };
  function d3_Set() {}
  d3_class(d3_Set, {
    has: function(value) {
      return d3_map_prefix + value in this;
    },
    add: function(value) {
      this[d3_map_prefix + value] = true;
      return value;
    },
    remove: function(value) {
      value = d3_map_prefix + value;
      return value in this && delete this[value];
    },
    values: function() {
      var values = [];
      this.forEach(function(value) {
        values.push(value);
      });
      return values;
    },
    forEach: function(f) {
      for (var value in this) {
        if (value.charCodeAt(0) === d3_map_prefixCode) {
          f.call(this, value.substring(1));
        }
      }
    }
  });
  d3.behavior = {};
  d3.rebind = function(target, source) {
    var i = 1, n = arguments.length, method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  };
  function d3_rebind(target, source, method) {
    return function() {
      var value = method.apply(source, arguments);
      return value === source ? target : value;
    };
  }
  function d3_vendorSymbol(object, name) {
    if (name in object) return name;
    name = name.charAt(0).toUpperCase() + name.substring(1);
    for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
      var prefixName = d3_vendorPrefixes[i] + name;
      if (prefixName in object) return prefixName;
    }
  }
  var d3_vendorPrefixes = [ "webkit", "ms", "moz", "Moz", "o", "O" ];
  var d3_array = d3_arraySlice;
  function d3_arrayCopy(pseudoarray) {
    var i = pseudoarray.length, array = new Array(i);
    while (i--) array[i] = pseudoarray[i];
    return array;
  }
  function d3_arraySlice(pseudoarray) {
    return Array.prototype.slice.call(pseudoarray);
  }
  try {
    d3_array(d3_documentElement.childNodes)[0].nodeType;
  } catch (e) {
    d3_array = d3_arrayCopy;
  }
  function d3_noop() {}
  d3.dispatch = function() {
    var dispatch = new d3_dispatch(), i = -1, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    return dispatch;
  };
  function d3_dispatch() {}
  d3_dispatch.prototype.on = function(type, listener) {
    var i = type.indexOf("."), name = "";
    if (i >= 0) {
      name = type.substring(i + 1);
      type = type.substring(0, i);
    }
    if (type) return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
    if (arguments.length === 2) {
      if (listener == null) for (type in this) {
        if (this.hasOwnProperty(type)) this[type].on(name, null);
      }
      return this;
    }
  };
  function d3_dispatch_event(dispatch) {
    var listeners = [], listenerByName = new d3_Map();
    function event() {
      var z = listeners, i = -1, n = z.length, l;
      while (++i < n) if (l = z[i].on) l.apply(this, arguments);
      return dispatch;
    }
    event.on = function(name, listener) {
      var l = listenerByName.get(name), i;
      if (arguments.length < 2) return l && l.on;
      if (l) {
        l.on = null;
        listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
        listenerByName.remove(name);
      }
      if (listener) listeners.push(listenerByName.set(name, {
        on: listener
      }));
      return dispatch;
    };
    return event;
  }
  d3.event = null;
  function d3_eventPreventDefault() {
    d3.event.preventDefault();
  }
  function d3_eventSource() {
    var e = d3.event, s;
    while (s = e.sourceEvent) e = s;
    return e;
  }
  function d3_eventDispatch(target) {
    var dispatch = new d3_dispatch(), i = 0, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    dispatch.of = function(thiz, argumentz) {
      return function(e1) {
        try {
          var e0 = e1.sourceEvent = d3.event;
          e1.target = target;
          d3.event = e1;
          dispatch[e1.type].apply(thiz, argumentz);
        } finally {
          d3.event = e0;
        }
      };
    };
    return dispatch;
  }
  d3.requote = function(s) {
    return s.replace(d3_requote_re, "\\$&");
  };
  var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
  var d3_subclass = {}.__proto__ ? function(object, prototype) {
    object.__proto__ = prototype;
  } : function(object, prototype) {
    for (var property in prototype) object[property] = prototype[property];
  };
  function d3_selection(groups) {
    d3_subclass(groups, d3_selectionPrototype);
    return groups;
  }
  var d3_select = function(s, n) {
    return n.querySelector(s);
  }, d3_selectAll = function(s, n) {
    return n.querySelectorAll(s);
  }, d3_selectMatcher = d3_documentElement[d3_vendorSymbol(d3_documentElement, "matchesSelector")], d3_selectMatches = function(n, s) {
    return d3_selectMatcher.call(n, s);
  };
  if (typeof Sizzle === "function") {
    d3_select = function(s, n) {
      return Sizzle(s, n)[0] || null;
    };
    d3_selectAll = function(s, n) {
      return Sizzle.uniqueSort(Sizzle(s, n));
    };
    d3_selectMatches = Sizzle.matchesSelector;
  }
  d3.selection = function() {
    return d3_selectionRoot;
  };
  var d3_selectionPrototype = d3.selection.prototype = [];
  d3_selectionPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, group, node;
    selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(subnode = selector.call(node, node.__data__, i, j));
          if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selector(selector) {
    return typeof selector === "function" ? selector : function() {
      return d3_select(selector, this);
    };
  }
  d3_selectionPrototype.selectAll = function(selector) {
    var subgroups = [], subgroup, node;
    selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
          subgroup.parentNode = node;
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selectorAll(selector) {
    return typeof selector === "function" ? selector : function() {
      return d3_selectAll(selector, this);
    };
  }
  var d3_nsPrefix = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  d3.ns = {
    prefix: d3_nsPrefix,
    qualify: function(name) {
      var i = name.indexOf(":"), prefix = name;
      if (i >= 0) {
        prefix = name.substring(0, i);
        name = name.substring(i + 1);
      }
      return d3_nsPrefix.hasOwnProperty(prefix) ? {
        space: d3_nsPrefix[prefix],
        local: name
      } : name;
    }
  };
  d3_selectionPrototype.attr = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node();
        name = d3.ns.qualify(name);
        return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
      }
      for (value in name) this.each(d3_selection_attr(value, name[value]));
      return this;
    }
    return this.each(d3_selection_attr(name, value));
  };
  function d3_selection_attr(name, value) {
    name = d3.ns.qualify(name);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    function attrConstant() {
      this.setAttribute(name, value);
    }
    function attrConstantNS() {
      this.setAttributeNS(name.space, name.local, value);
    }
    function attrFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttribute(name); else this.setAttribute(name, x);
    }
    function attrFunctionNS() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttributeNS(name.space, name.local); else this.setAttributeNS(name.space, name.local, x);
    }
    return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
  }
  function d3_collapse(s) {
    return s.trim().replace(/\s+/g, " ");
  }
  d3_selectionPrototype.classed = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node(), n = (name = name.trim().split(/^|\s+/g)).length, i = -1;
        if (value = node.classList) {
          while (++i < n) if (!value.contains(name[i])) return false;
        } else {
          value = node.getAttribute("class");
          while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
        }
        return true;
      }
      for (value in name) this.each(d3_selection_classed(value, name[value]));
      return this;
    }
    return this.each(d3_selection_classed(name, value));
  };
  function d3_selection_classedRe(name) {
    return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
  }
  function d3_selection_classed(name, value) {
    name = name.trim().split(/\s+/).map(d3_selection_classedName);
    var n = name.length;
    function classedConstant() {
      var i = -1;
      while (++i < n) name[i](this, value);
    }
    function classedFunction() {
      var i = -1, x = value.apply(this, arguments);
      while (++i < n) name[i](this, x);
    }
    return typeof value === "function" ? classedFunction : classedConstant;
  }
  function d3_selection_classedName(name) {
    var re = d3_selection_classedRe(name);
    return function(node, value) {
      if (c = node.classList) return value ? c.add(name) : c.remove(name);
      var c = node.getAttribute("class") || "";
      if (value) {
        re.lastIndex = 0;
        if (!re.test(c)) node.setAttribute("class", d3_collapse(c + " " + name));
      } else {
        node.setAttribute("class", d3_collapse(c.replace(re, " ")));
      }
    };
  }
  d3_selectionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
        return this;
      }
      if (n < 2) return d3_window.getComputedStyle(this.node(), null).getPropertyValue(name);
      priority = "";
    }
    return this.each(d3_selection_style(name, value, priority));
  };
  function d3_selection_style(name, value, priority) {
    function styleNull() {
      this.style.removeProperty(name);
    }
    function styleConstant() {
      this.style.setProperty(name, value, priority);
    }
    function styleFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.style.removeProperty(name); else this.style.setProperty(name, x, priority);
    }
    return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
  }
  d3_selectionPrototype.property = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") return this.node()[name];
      for (value in name) this.each(d3_selection_property(value, name[value]));
      return this;
    }
    return this.each(d3_selection_property(name, value));
  };
  function d3_selection_property(name, value) {
    function propertyNull() {
      delete this[name];
    }
    function propertyConstant() {
      this[name] = value;
    }
    function propertyFunction() {
      var x = value.apply(this, arguments);
      if (x == null) delete this[name]; else this[name] = x;
    }
    return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
  }
  d3_selectionPrototype.text = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    } : value == null ? function() {
      this.textContent = "";
    } : function() {
      this.textContent = value;
    }) : this.node().textContent;
  };
  d3_selectionPrototype.html = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    } : value == null ? function() {
      this.innerHTML = "";
    } : function() {
      this.innerHTML = value;
    }) : this.node().innerHTML;
  };
  d3_selectionPrototype.append = function(name) {
    name = d3_selection_creator(name);
    return this.select(function() {
      return this.appendChild(name.apply(this, arguments));
    });
  };
  function d3_selection_creator(name) {
    return typeof name === "function" ? name : (name = d3.ns.qualify(name)).local ? function() {
      return d3_document.createElementNS(name.space, name.local);
    } : function() {
      return d3_document.createElementNS(this.namespaceURI, name);
    };
  }
  d3_selectionPrototype.insert = function(name, before) {
    name = d3_selection_creator(name);
    before = d3_selection_selector(before);
    return this.select(function() {
      return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments));
    });
  };
  d3_selectionPrototype.remove = function() {
    return this.each(function() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    });
  };
  d3_selectionPrototype.data = function(value, key) {
    var i = -1, n = this.length, group, node;
    if (!arguments.length) {
      value = new Array(n = (group = this[0]).length);
      while (++i < n) {
        if (node = group[i]) {
          value[i] = node.__data__;
        }
      }
      return value;
    }
    function bind(group, groupData) {
      var i, n = group.length, m = groupData.length, n0 = Math.min(n, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n), node, nodeData;
      if (key) {
        var nodeByKeyValue = new d3_Map(), dataByKeyValue = new d3_Map(), keyValues = [], keyValue;
        for (i = -1; ++i < n; ) {
          keyValue = key.call(node = group[i], node.__data__, i);
          if (nodeByKeyValue.has(keyValue)) {
            exitNodes[i] = node;
          } else {
            nodeByKeyValue.set(keyValue, node);
          }
          keyValues.push(keyValue);
        }
        for (i = -1; ++i < m; ) {
          keyValue = key.call(groupData, nodeData = groupData[i], i);
          if (node = nodeByKeyValue.get(keyValue)) {
            updateNodes[i] = node;
            node.__data__ = nodeData;
          } else if (!dataByKeyValue.has(keyValue)) {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          }
          dataByKeyValue.set(keyValue, nodeData);
          nodeByKeyValue.remove(keyValue);
        }
        for (i = -1; ++i < n; ) {
          if (nodeByKeyValue.has(keyValues[i])) {
            exitNodes[i] = group[i];
          }
        }
      } else {
        for (i = -1; ++i < n0; ) {
          node = group[i];
          nodeData = groupData[i];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
          } else {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          }
        }
        for (;i < m; ++i) {
          enterNodes[i] = d3_selection_dataNode(groupData[i]);
        }
        for (;i < n; ++i) {
          exitNodes[i] = group[i];
        }
      }
      enterNodes.update = updateNodes;
      enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }
    var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
    if (typeof value === "function") {
      while (++i < n) {
        bind(group = this[i], value.call(group, group.parentNode.__data__, i));
      }
    } else {
      while (++i < n) {
        bind(group = this[i], value);
      }
    }
    update.enter = function() {
      return enter;
    };
    update.exit = function() {
      return exit;
    };
    return update;
  };
  function d3_selection_dataNode(data) {
    return {
      __data__: data
    };
  }
  d3_selectionPrototype.datum = function(value) {
    return arguments.length ? this.property("__data__", value) : this.property("__data__");
  };
  d3_selectionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i)) {
          subgroup.push(node);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_filter(selector) {
    return function() {
      return d3_selectMatches(this, selector);
    };
  }
  d3_selectionPrototype.order = function() {
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
        if (node = group[i]) {
          if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  };
  d3_selectionPrototype.sort = function(comparator) {
    comparator = d3_selection_sortComparator.apply(this, arguments);
    for (var j = -1, m = this.length; ++j < m; ) this[j].sort(comparator);
    return this.order();
  };
  function d3_selection_sortComparator(comparator) {
    if (!arguments.length) comparator = d3.ascending;
    return function(a, b) {
      return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
    };
  }
  d3_selectionPrototype.each = function(callback) {
    return d3_selection_each(this, function(node, i, j) {
      callback.call(node, node.__data__, i, j);
    });
  };
  function d3_selection_each(groups, callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
        if (node = group[i]) callback(node, i, j);
      }
    }
    return groups;
  }
  d3_selectionPrototype.call = function(callback) {
    var args = d3_array(arguments);
    callback.apply(args[0] = this, args);
    return this;
  };
  d3_selectionPrototype.empty = function() {
    return !this.node();
  };
  d3_selectionPrototype.node = function() {
    for (var j = 0, m = this.length; j < m; j++) {
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        var node = group[i];
        if (node) return node;
      }
    }
    return null;
  };
  d3_selectionPrototype.size = function() {
    var n = 0;
    this.each(function() {
      ++n;
    });
    return n;
  };
  function d3_selection_enter(selection) {
    d3_subclass(selection, d3_selection_enterPrototype);
    return selection;
  }
  var d3_selection_enterPrototype = [];
  d3.selection.enter = d3_selection_enter;
  d3.selection.enter.prototype = d3_selection_enterPrototype;
  d3_selection_enterPrototype.append = d3_selectionPrototype.append;
  d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
  d3_selection_enterPrototype.node = d3_selectionPrototype.node;
  d3_selection_enterPrototype.call = d3_selectionPrototype.call;
  d3_selection_enterPrototype.size = d3_selectionPrototype.size;
  d3_selection_enterPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, upgroup, group, node;
    for (var j = -1, m = this.length; ++j < m; ) {
      upgroup = (group = this[j]).update;
      subgroups.push(subgroup = []);
      subgroup.parentNode = group.parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
          subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  d3_selection_enterPrototype.insert = function(name, before) {
    if (arguments.length < 2) before = d3_selection_enterInsertBefore(this);
    return d3_selectionPrototype.insert.call(this, name, before);
  };
  function d3_selection_enterInsertBefore(enter) {
    var i0, j0;
    return function(d, i, j) {
      var group = enter[j].update, n = group.length, node;
      if (j != j0) j0 = j, i0 = 0;
      if (i >= i0) i0 = i + 1;
      while (!(node = group[i0]) && ++i0 < n) ;
      return node;
    };
  }
  d3_selectionPrototype.transition = function() {
    var id = d3_transitionInheritId || ++d3_transitionId, subgroups = [], subgroup, node, transition = d3_transitionInherit || {
      time: Date.now(),
      ease: d3_ease_cubicInOut,
      delay: 0,
      duration: 250
    };
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) d3_transitionNode(node, i, id, transition);
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, id);
  };
  d3.select = function(node) {
    var group = [ typeof node === "string" ? d3_select(node, d3_document) : node ];
    group.parentNode = d3_documentElement;
    return d3_selection([ group ]);
  };
  d3.selectAll = function(nodes) {
    var group = d3_array(typeof nodes === "string" ? d3_selectAll(nodes, d3_document) : nodes);
    group.parentNode = d3_documentElement;
    return d3_selection([ group ]);
  };
  var d3_selectionRoot = d3.select(d3_documentElement);
  d3_selectionPrototype.on = function(type, listener, capture) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof type !== "string") {
        if (n < 2) listener = false;
        for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
        return this;
      }
      if (n < 2) return (n = this.node()["__on" + type]) && n._;
      capture = false;
    }
    return this.each(d3_selection_on(type, listener, capture));
  };
  function d3_selection_on(type, listener, capture) {
    var name = "__on" + type, i = type.indexOf("."), wrap = d3_selection_onListener;
    if (i > 0) type = type.substring(0, i);
    var filter = d3_selection_onFilters.get(type);
    if (filter) type = filter, wrap = d3_selection_onFilter;
    function onRemove() {
      var l = this[name];
      if (l) {
        this.removeEventListener(type, l, l.$);
        delete this[name];
      }
    }
    function onAdd() {
      var l = wrap(listener, d3_array(arguments));
      onRemove.call(this);
      this.addEventListener(type, this[name] = l, l.$ = capture);
      l._ = listener;
    }
    function removeAll() {
      var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"), match;
      for (var name in this) {
        if (match = name.match(re)) {
          var l = this[name];
          this.removeEventListener(match[1], l, l.$);
          delete this[name];
        }
      }
    }
    return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll;
  }
  var d3_selection_onFilters = d3.map({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  });
  d3_selection_onFilters.forEach(function(k) {
    if ("on" + k in d3_document) d3_selection_onFilters.remove(k);
  });
  function d3_selection_onListener(listener, argumentz) {
    return function(e) {
      var o = d3.event;
      d3.event = e;
      argumentz[0] = this.__data__;
      try {
        listener.apply(this, argumentz);
      } finally {
        d3.event = o;
      }
    };
  }
  function d3_selection_onFilter(listener, argumentz) {
    var l = d3_selection_onListener(listener, argumentz);
    return function(e) {
      var target = this, related = e.relatedTarget;
      if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
        l.call(target, e);
      }
    };
  }
  var d3_event_dragSelect = d3_vendorSymbol(d3_documentElement.style, "userSelect"), d3_event_dragId = 0;
  function d3_event_dragSuppress() {
    var name = ".dragsuppress-" + ++d3_event_dragId, touchmove = "touchmove" + name, selectstart = "selectstart" + name, dragstart = "dragstart" + name, click = "click" + name, w = d3.select(d3_window).on(touchmove, d3_eventPreventDefault).on(selectstart, d3_eventPreventDefault).on(dragstart, d3_eventPreventDefault), style = d3_documentElement.style, select = style[d3_event_dragSelect];
    style[d3_event_dragSelect] = "none";
    return function(suppressClick) {
      w.on(name, null);
      style[d3_event_dragSelect] = select;
      if (suppressClick) {
        function off() {
          w.on(click, null);
        }
        w.on(click, function() {
          d3_eventPreventDefault();
          off();
        }, true);
        setTimeout(off, 0);
      }
    };
  }
  d3.mouse = function(container) {
    return d3_mousePoint(container, d3_eventSource());
  };
  var d3_mouse_bug44083 = /WebKit/.test(d3_window.navigator.userAgent) ? -1 : 0;
  function d3_mousePoint(container, e) {
    var svg = container.ownerSVGElement || container;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      if (d3_mouse_bug44083 < 0 && (d3_window.scrollX || d3_window.scrollY)) {
        svg = d3.select("body").append("svg").style({
          position: "absolute",
          top: 0,
          left: 0,
          margin: 0,
          padding: 0,
          border: "none"
        }, "important");
        var ctm = svg[0][0].getScreenCTM();
        d3_mouse_bug44083 = !(ctm.f || ctm.e);
        svg.remove();
      }
      if (d3_mouse_bug44083) {
        point.x = e.pageX;
        point.y = e.pageY;
      } else {
        point.x = e.clientX;
        point.y = e.clientY;
      }
      point = point.matrixTransform(container.getScreenCTM().inverse());
      return [ point.x, point.y ];
    }
    var rect = container.getBoundingClientRect();
    return [ e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop ];
  }
  d3.touches = function(container, touches) {
    if (arguments.length < 2) touches = d3_eventSource().touches;
    return touches ? d3_array(touches).map(function(touch) {
      var point = d3_mousePoint(container, touch);
      point.identifier = touch.identifier;
      return point;
    }) : [];
  };
  d3.behavior.drag = function() {
    var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"), origin = null, mousedown = dragstart(d3_noop, d3.mouse, "mousemove", "mouseup"), touchstart = dragstart(touchid, touchposition, "touchmove", "touchend");
    function drag() {
      this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart);
    }
    function touchid() {
      return d3.event.changedTouches[0].identifier;
    }
    function touchposition(parent, id) {
      return d3.touches(parent).filter(function(p) {
        return p.identifier === id;
      })[0];
    }
    function dragstart(id, position, move, end) {
      return function() {
        var target = this, parent = target.parentNode, event_ = event.of(target, arguments), eventTarget = d3.event.target, eventId = id(), drag = eventId == null ? "drag" : "drag-" + eventId, origin_ = position(parent, eventId), dragged = 0, offset, w = d3.select(d3_window).on(move + "." + drag, moved).on(end + "." + drag, ended), dragRestore = d3_event_dragSuppress();
        if (origin) {
          offset = origin.apply(target, arguments);
          offset = [ offset.x - origin_[0], offset.y - origin_[1] ];
        } else {
          offset = [ 0, 0 ];
        }
        event_({
          type: "dragstart"
        });
        function moved() {
          if (!parent) return ended();
          var p = position(parent, eventId), dx = p[0] - origin_[0], dy = p[1] - origin_[1];
          dragged |= dx | dy;
          origin_ = p;
          event_({
            type: "drag",
            x: p[0] + offset[0],
            y: p[1] + offset[1],
            dx: dx,
            dy: dy
          });
        }
        function ended() {
          w.on(move + "." + drag, null).on(end + "." + drag, null);
          dragRestore(dragged && d3.event.target === eventTarget);
          event_({
            type: "dragend"
          });
        }
      };
    }
    drag.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return drag;
    };
    return d3.rebind(drag, event, "on");
  };
  d3.behavior.zoom = function() {
    var translate = [ 0, 0 ], translate0, scale = 1, scaleExtent = d3_behavior_zoomInfinity, mousedown = "mousedown.zoom", mousemove = "mousemove.zoom", mouseup = "mouseup.zoom", touchstart = "touchstart.zoom", touchmove = "touchmove.zoom", touchend = "touchend.zoom", touchtime, event = d3_eventDispatch(zoom, "zoom"), x0, x1, y0, y1;
    function zoom() {
      this.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on(mousemove, mousewheelreset).on("dblclick.zoom", dblclicked).on(touchstart, touchstarted);
    }
    zoom.translate = function(x) {
      if (!arguments.length) return translate;
      translate = x.map(Number);
      rescale();
      return zoom;
    };
    zoom.scale = function(x) {
      if (!arguments.length) return scale;
      scale = +x;
      rescale();
      return zoom;
    };
    zoom.scaleExtent = function(x) {
      if (!arguments.length) return scaleExtent;
      scaleExtent = x == null ? d3_behavior_zoomInfinity : x.map(Number);
      return zoom;
    };
    zoom.x = function(z) {
      if (!arguments.length) return x1;
      x1 = z;
      x0 = z.copy();
      translate = [ 0, 0 ];
      scale = 1;
      return zoom;
    };
    zoom.y = function(z) {
      if (!arguments.length) return y1;
      y1 = z;
      y0 = z.copy();
      translate = [ 0, 0 ];
      scale = 1;
      return zoom;
    };
    function location(p) {
      return [ (p[0] - translate[0]) / scale, (p[1] - translate[1]) / scale ];
    }
    function point(l) {
      return [ l[0] * scale + translate[0], l[1] * scale + translate[1] ];
    }
    function scaleTo(s) {
      scale = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
    }
    function translateTo(p, l) {
      l = point(l);
      translate[0] += p[0] - l[0];
      translate[1] += p[1] - l[1];
    }
    function rescale() {
      if (x1) x1.domain(x0.range().map(function(x) {
        return (x - translate[0]) / scale;
      }).map(x0.invert));
      if (y1) y1.domain(y0.range().map(function(y) {
        return (y - translate[1]) / scale;
      }).map(y0.invert));
    }
    function dispatch(event) {
      rescale();
      event({
        type: "zoom",
        scale: scale,
        translate: translate
      });
    }
    function mousedowned() {
      var target = this, event_ = event.of(target, arguments), eventTarget = d3.event.target, dragged = 0, w = d3.select(d3_window).on(mousemove, moved).on(mouseup, ended), l = location(d3.mouse(target)), dragRestore = d3_event_dragSuppress();
      function moved() {
        dragged = 1;
        translateTo(d3.mouse(target), l);
        dispatch(event_);
      }
      function ended() {
        w.on(mousemove, d3_window === target ? mousewheelreset : null).on(mouseup, null);
        dragRestore(dragged && d3.event.target === eventTarget);
      }
    }
    function touchstarted() {
      var target = this, event_ = event.of(target, arguments), locations0, distance0 = 0, scale0, w = d3.select(d3_window).on(touchmove, moved).on(touchend, ended), t = d3.select(target).on(mousedown, null).on(touchstart, started), dragRestore = d3_event_dragSuppress();
      started();
      function relocate() {
        var touches = d3.touches(target);
        scale0 = scale;
        locations0 = {};
        touches.forEach(function(t) {
          locations0[t.identifier] = location(t);
        });
        return touches;
      }
      function started() {
        var now = Date.now(), touches = relocate();
        if (touches.length === 1) {
          if (now - touchtime < 500) {
            var p = touches[0], l = locations0[p.identifier];
            scaleTo(scale * 2);
            translateTo(p, l);
            d3_eventPreventDefault();
            dispatch(event_);
          }
          touchtime = now;
        } else if (touches.length > 1) {
          var p = touches[0], q = touches[1], dx = p[0] - q[0], dy = p[1] - q[1];
          distance0 = dx * dx + dy * dy;
        }
      }
      function moved() {
        var touches = d3.touches(target), p0 = touches[0], l0 = locations0[p0.identifier];
        if (p1 = touches[1]) {
          var p1, l1 = locations0[p1.identifier], scale1 = d3.event.scale;
          if (scale1 == null) {
            var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1;
            scale1 = distance0 && Math.sqrt(distance1 / distance0);
          }
          p0 = [ (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 ];
          l0 = [ (l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2 ];
          scaleTo(scale1 * scale0);
        }
        touchtime = null;
        translateTo(p0, l0);
        dispatch(event_);
      }
      function ended() {
        if (d3.event.touches.length) {
          relocate();
        } else {
          w.on(touchmove, null).on(touchend, null);
          t.on(mousedown, mousedowned).on(touchstart, touchstarted);
          dragRestore();
        }
      }
    }
    function mousewheeled() {
      d3_eventPreventDefault();
      if (!translate0) translate0 = location(d3.mouse(this));
      scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
      translateTo(d3.mouse(this), translate0);
      dispatch(event.of(this, arguments));
    }
    function mousewheelreset() {
      translate0 = null;
    }
    function dblclicked() {
      var p = d3.mouse(this), l = location(p), k = Math.log(scale) / Math.LN2;
      scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1));
      translateTo(p, l);
      dispatch(event.of(this, arguments));
    }
    return d3.rebind(zoom, event, "on");
  };
  var d3_behavior_zoomInfinity = [ 0, Infinity ];
  var d3_behavior_zoomDelta, d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() {
    return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1);
  }, "wheel") : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() {
    return d3.event.wheelDelta;
  }, "mousewheel") : (d3_behavior_zoomDelta = function() {
    return -d3.event.detail;
  }, "MozMousePixelScroll");
  function d3_Color() {}
  d3_Color.prototype.toString = function() {
    return this.rgb() + "";
  };
  d3.hsl = function(h, s, l) {
    return arguments.length === 1 ? h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : d3_hsl(+h, +s, +l);
  };
  function d3_hsl(h, s, l) {
    return new d3_Hsl(h, s, l);
  }
  function d3_Hsl(h, s, l) {
    this.h = h;
    this.s = s;
    this.l = l;
  }
  var d3_hslPrototype = d3_Hsl.prototype = new d3_Color();
  d3_hslPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_hsl(this.h, this.s, this.l / k);
  };
  d3_hslPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_hsl(this.h, this.s, k * this.l);
  };
  d3_hslPrototype.rgb = function() {
    return d3_hsl_rgb(this.h, this.s, this.l);
  };
  function d3_hsl_rgb(h, s, l) {
    var m1, m2;
    h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
    s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
    l = l < 0 ? 0 : l > 1 ? 1 : l;
    m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;
    function v(h) {
      if (h > 360) h -= 360; else if (h < 0) h += 360;
      if (h < 60) return m1 + (m2 - m1) * h / 60;
      if (h < 180) return m2;
      if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
      return m1;
    }
    function vv(h) {
      return Math.round(v(h) * 255);
    }
    return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
  }
  var π = Math.PI, ε = 1e-6, ε2 = ε * ε, d3_radians = π / 180, d3_degrees = 180 / π;
  function d3_sgn(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  }
  function d3_acos(x) {
    return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
  }
  function d3_asin(x) {
    return x > 1 ? π / 2 : x < -1 ? -π / 2 : Math.asin(x);
  }
  function d3_sinh(x) {
    return (Math.exp(x) - Math.exp(-x)) / 2;
  }
  function d3_cosh(x) {
    return (Math.exp(x) + Math.exp(-x)) / 2;
  }
  function d3_haversin(x) {
    return (x = Math.sin(x / 2)) * x;
  }
  d3.hcl = function(h, c, l) {
    return arguments.length === 1 ? h instanceof d3_Hcl ? d3_hcl(h.h, h.c, h.l) : h instanceof d3_Lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : d3_hcl(+h, +c, +l);
  };
  function d3_hcl(h, c, l) {
    return new d3_Hcl(h, c, l);
  }
  function d3_Hcl(h, c, l) {
    this.h = h;
    this.c = c;
    this.l = l;
  }
  var d3_hclPrototype = d3_Hcl.prototype = new d3_Color();
  d3_hclPrototype.brighter = function(k) {
    return d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.darker = function(k) {
    return d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.rgb = function() {
    return d3_hcl_lab(this.h, this.c, this.l).rgb();
  };
  function d3_hcl_lab(h, c, l) {
    if (isNaN(h)) h = 0;
    if (isNaN(c)) c = 0;
    return d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
  }
  d3.lab = function(l, a, b) {
    return arguments.length === 1 ? l instanceof d3_Lab ? d3_lab(l.l, l.a, l.b) : l instanceof d3_Hcl ? d3_hcl_lab(l.l, l.c, l.h) : d3_rgb_lab((l = d3.rgb(l)).r, l.g, l.b) : d3_lab(+l, +a, +b);
  };
  function d3_lab(l, a, b) {
    return new d3_Lab(l, a, b);
  }
  function d3_Lab(l, a, b) {
    this.l = l;
    this.a = a;
    this.b = b;
  }
  var d3_lab_K = 18;
  var d3_lab_X = .95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
  var d3_labPrototype = d3_Lab.prototype = new d3_Color();
  d3_labPrototype.brighter = function(k) {
    return d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.darker = function(k) {
    return d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.rgb = function() {
    return d3_lab_rgb(this.l, this.a, this.b);
  };
  function d3_lab_rgb(l, a, b) {
    var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
    x = d3_lab_xyz(x) * d3_lab_X;
    y = d3_lab_xyz(y) * d3_lab_Y;
    z = d3_lab_xyz(z) * d3_lab_Z;
    return d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z));
  }
  function d3_lab_hcl(l, a, b) {
    return l > 0 ? d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : d3_hcl(NaN, NaN, l);
  }
  function d3_lab_xyz(x) {
    return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
  }
  function d3_xyz_lab(x) {
    return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
  }
  function d3_xyz_rgb(r) {
    return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055));
  }
  d3.rgb = function(r, g, b) {
    return arguments.length === 1 ? r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : d3_rgb(~~r, ~~g, ~~b);
  };
  function d3_rgbNumber(value) {
    return d3_rgb(value >> 16, value >> 8 & 255, value & 255);
  }
  function d3_rgbString(value) {
    return d3_rgbNumber(value) + "";
  }
  function d3_rgb(r, g, b) {
    return new d3_Rgb(r, g, b);
  }
  function d3_Rgb(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  var d3_rgbPrototype = d3_Rgb.prototype = new d3_Color();
  d3_rgbPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    var r = this.r, g = this.g, b = this.b, i = 30;
    if (!r && !g && !b) return d3_rgb(i, i, i);
    if (r && r < i) r = i;
    if (g && g < i) g = i;
    if (b && b < i) b = i;
    return d3_rgb(Math.min(255, ~~(r / k)), Math.min(255, ~~(g / k)), Math.min(255, ~~(b / k)));
  };
  d3_rgbPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_rgb(~~(k * this.r), ~~(k * this.g), ~~(k * this.b));
  };
  d3_rgbPrototype.hsl = function() {
    return d3_rgb_hsl(this.r, this.g, this.b);
  };
  d3_rgbPrototype.toString = function() {
    return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
  };
  function d3_rgb_hex(v) {
    return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
  }
  function d3_rgb_parse(format, rgb, hsl) {
    var r = 0, g = 0, b = 0, m1, m2, name;
    m1 = /([a-z]+)\((.*)\)/i.exec(format);
    if (m1) {
      m2 = m1[2].split(",");
      switch (m1[1]) {
       case "hsl":
        {
          return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
        }

       case "rgb":
        {
          return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
        }
      }
    }
    if (name = d3_rgb_names.get(format)) return rgb(name.r, name.g, name.b);
    if (format != null && format.charAt(0) === "#") {
      if (format.length === 4) {
        r = format.charAt(1);
        r += r;
        g = format.charAt(2);
        g += g;
        b = format.charAt(3);
        b += b;
      } else if (format.length === 7) {
        r = format.substring(1, 3);
        g = format.substring(3, 5);
        b = format.substring(5, 7);
      }
      r = parseInt(r, 16);
      g = parseInt(g, 16);
      b = parseInt(b, 16);
    }
    return rgb(r, g, b);
  }
  function d3_rgb_hsl(r, g, b) {
    var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
    if (d) {
      s = l < .5 ? d / (max + min) : d / (2 - max - min);
      if (r == max) h = (g - b) / d + (g < b ? 6 : 0); else if (g == max) h = (b - r) / d + 2; else h = (r - g) / d + 4;
      h *= 60;
    } else {
      h = NaN;
      s = l > 0 && l < 1 ? 0 : h;
    }
    return d3_hsl(h, s, l);
  }
  function d3_rgb_lab(r, g, b) {
    r = d3_rgb_xyz(r);
    g = d3_rgb_xyz(g);
    b = d3_rgb_xyz(b);
    var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X), y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y), z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
    return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
  }
  function d3_rgb_xyz(r) {
    return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
  }
  function d3_rgb_parseNumber(c) {
    var f = parseFloat(c);
    return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
  }
  var d3_rgb_names = d3.map({
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  });
  d3_rgb_names.forEach(function(key, value) {
    d3_rgb_names.set(key, d3_rgbNumber(value));
  });
  function d3_functor(v) {
    return typeof v === "function" ? v : function() {
      return v;
    };
  }
  d3.functor = d3_functor;
  function d3_identity(d) {
    return d;
  }
  d3.xhr = d3_xhrType(d3_identity);
  function d3_xhrType(response) {
    return function(url, mimeType, callback) {
      if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, 
      mimeType = null;
      return d3_xhr(url, mimeType, response, callback);
    };
  }
  function d3_xhr(url, mimeType, response, callback) {
    var xhr = {}, dispatch = d3.dispatch("progress", "load", "error"), headers = {}, request = new XMLHttpRequest(), responseType = null;
    if (d3_window.XDomainRequest && !("withCredentials" in request) && /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest();
    "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
      request.readyState > 3 && respond();
    };
    function respond() {
      var status = request.status, result;
      if (!status && request.responseText || status >= 200 && status < 300 || status === 304) {
        try {
          result = response.call(xhr, request);
        } catch (e) {
          dispatch.error.call(xhr, e);
          return;
        }
        dispatch.load.call(xhr, result);
      } else {
        dispatch.error.call(xhr, request);
      }
    }
    request.onprogress = function(event) {
      var o = d3.event;
      d3.event = event;
      try {
        dispatch.progress.call(xhr, request);
      } finally {
        d3.event = o;
      }
    };
    xhr.header = function(name, value) {
      name = (name + "").toLowerCase();
      if (arguments.length < 2) return headers[name];
      if (value == null) delete headers[name]; else headers[name] = value + "";
      return xhr;
    };
    xhr.mimeType = function(value) {
      if (!arguments.length) return mimeType;
      mimeType = value == null ? null : value + "";
      return xhr;
    };
    xhr.responseType = function(value) {
      if (!arguments.length) return responseType;
      responseType = value;
      return xhr;
    };
    xhr.response = function(value) {
      response = value;
      return xhr;
    };
    [ "get", "post" ].forEach(function(method) {
      xhr[method] = function() {
        return xhr.send.apply(xhr, [ method ].concat(d3_array(arguments)));
      };
    });
    xhr.send = function(method, data, callback) {
      if (arguments.length === 2 && typeof data === "function") callback = data, data = null;
      request.open(method, url, true);
      if (mimeType != null && !("accept" in headers)) headers["accept"] = mimeType + ",*/*";
      if (request.setRequestHeader) for (var name in headers) request.setRequestHeader(name, headers[name]);
      if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
      if (responseType != null) request.responseType = responseType;
      if (callback != null) xhr.on("error", callback).on("load", function(request) {
        callback(null, request);
      });
      request.send(data == null ? null : data);
      return xhr;
    };
    xhr.abort = function() {
      request.abort();
      return xhr;
    };
    d3.rebind(xhr, dispatch, "on");
    return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
  }
  function d3_xhr_fixCallback(callback) {
    return callback.length === 1 ? function(error, request) {
      callback(error == null ? request : null);
    } : callback;
  }
  d3.dsv = function(delimiter, mimeType) {
    var reFormat = new RegExp('["' + delimiter + "\n]"), delimiterCode = delimiter.charCodeAt(0);
    function dsv(url, row, callback) {
      if (arguments.length < 3) callback = row, row = null;
      var xhr = d3.xhr(url, mimeType, callback);
      xhr.row = function(_) {
        return arguments.length ? xhr.response((row = _) == null ? response : typedResponse(_)) : row;
      };
      return xhr.row(row);
    }
    function response(request) {
      return dsv.parse(request.responseText);
    }
    function typedResponse(f) {
      return function(request) {
        return dsv.parse(request.responseText, f);
      };
    }
    dsv.parse = function(text, f) {
      var o;
      return dsv.parseRows(text, function(row, i) {
        if (o) return o(row, i - 1);
        var a = new Function("d", "return {" + row.map(function(name, i) {
          return JSON.stringify(name) + ": d[" + i + "]";
        }).join(",") + "}");
        o = f ? function(row, i) {
          return f(a(row), i);
        } : a;
      });
    };
    dsv.parseRows = function(text, f) {
      var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
      function token() {
        if (I >= N) return EOF;
        if (eol) return eol = false, EOL;
        var j = I;
        if (text.charCodeAt(j) === 34) {
          var i = j;
          while (i++ < N) {
            if (text.charCodeAt(i) === 34) {
              if (text.charCodeAt(i + 1) !== 34) break;
              ++i;
            }
          }
          I = i + 2;
          var c = text.charCodeAt(i + 1);
          if (c === 13) {
            eol = true;
            if (text.charCodeAt(i + 2) === 10) ++I;
          } else if (c === 10) {
            eol = true;
          }
          return text.substring(j + 1, i).replace(/""/g, '"');
        }
        while (I < N) {
          var c = text.charCodeAt(I++), k = 1;
          if (c === 10) eol = true; else if (c === 13) {
            eol = true;
            if (text.charCodeAt(I) === 10) ++I, ++k;
          } else if (c !== delimiterCode) continue;
          return text.substring(j, I - k);
        }
        return text.substring(j);
      }
      while ((t = token()) !== EOF) {
        var a = [];
        while (t !== EOL && t !== EOF) {
          a.push(t);
          t = token();
        }
        if (f && !(a = f(a, n++))) continue;
        rows.push(a);
      }
      return rows;
    };
    dsv.format = function(rows) {
      if (Array.isArray(rows[0])) return dsv.formatRows(rows);
      var fieldSet = new d3_Set(), fields = [];
      rows.forEach(function(row) {
        for (var field in row) {
          if (!fieldSet.has(field)) {
            fields.push(fieldSet.add(field));
          }
        }
      });
      return [ fields.map(formatValue).join(delimiter) ].concat(rows.map(function(row) {
        return fields.map(function(field) {
          return formatValue(row[field]);
        }).join(delimiter);
      })).join("\n");
    };
    dsv.formatRows = function(rows) {
      return rows.map(formatRow).join("\n");
    };
    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }
    function formatValue(text) {
      return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
    }
    return dsv;
  };
  d3.csv = d3.dsv(",", "text/csv");
  d3.tsv = d3.dsv("	", "text/tab-separated-values");
  var d3_timer_queueHead, d3_timer_queueTail, d3_timer_interval, d3_timer_timeout, d3_timer_active, d3_timer_frame = d3_window[d3_vendorSymbol(d3_window, "requestAnimationFrame")] || function(callback) {
    setTimeout(callback, 17);
  };
  d3.timer = function(callback, delay, then) {
    var n = arguments.length;
    if (n < 2) delay = 0;
    if (n < 3) then = Date.now();
    var time = then + delay, timer = {
      callback: callback,
      time: time,
      next: null
    };
    if (d3_timer_queueTail) d3_timer_queueTail.next = timer; else d3_timer_queueHead = timer;
    d3_timer_queueTail = timer;
    if (!d3_timer_interval) {
      d3_timer_timeout = clearTimeout(d3_timer_timeout);
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
  };
  function d3_timer_step() {
    var now = d3_timer_mark(), delay = d3_timer_sweep() - now;
    if (delay > 24) {
      if (isFinite(delay)) {
        clearTimeout(d3_timer_timeout);
        d3_timer_timeout = setTimeout(d3_timer_step, delay);
      }
      d3_timer_interval = 0;
    } else {
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
  }
  d3.timer.flush = function() {
    d3_timer_mark();
    d3_timer_sweep();
  };
  function d3_timer_replace(callback, delay, then) {
    var n = arguments.length;
    if (n < 2) delay = 0;
    if (n < 3) then = Date.now();
    d3_timer_active.callback = callback;
    d3_timer_active.time = then + delay;
  }
  function d3_timer_mark() {
    var now = Date.now();
    d3_timer_active = d3_timer_queueHead;
    while (d3_timer_active) {
      if (now >= d3_timer_active.time) d3_timer_active.flush = d3_timer_active.callback(now - d3_timer_active.time);
      d3_timer_active = d3_timer_active.next;
    }
    return now;
  }
  function d3_timer_sweep() {
    var t0, t1 = d3_timer_queueHead, time = Infinity;
    while (t1) {
      if (t1.flush) {
        t1 = t0 ? t0.next = t1.next : d3_timer_queueHead = t1.next;
      } else {
        if (t1.time < time) time = t1.time;
        t1 = (t0 = t1).next;
      }
    }
    d3_timer_queueTail = t0;
    return time;
  }
  var d3_format_decimalPoint = ".", d3_format_thousandsSeparator = ",", d3_format_grouping = [ 3, 3 ], d3_format_currencySymbol = "$";
  var d3_formatPrefixes = [ "y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y" ].map(d3_formatPrefix);
  d3.formatPrefix = function(value, precision) {
    var i = 0;
    if (value) {
      if (value < 0) value *= -1;
      if (precision) value = d3.round(value, d3_format_precision(value, precision));
      i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
      i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
    }
    return d3_formatPrefixes[8 + i / 3];
  };
  function d3_formatPrefix(d, i) {
    var k = Math.pow(10, Math.abs(8 - i) * 3);
    return {
      scale: i > 8 ? function(d) {
        return d / k;
      } : function(d) {
        return d * k;
      },
      symbol: d
    };
  }
  d3.round = function(x, n) {
    return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
  };
  d3.format = function(specifier) {
    var match = d3_format_re.exec(specifier), fill = match[1] || " ", align = match[2] || ">", sign = match[3] || "", symbol = match[4] || "", zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, suffix = "", integer = false;
    if (precision) precision = +precision.substring(1);
    if (zfill || fill === "0" && align === "=") {
      zfill = fill = "0";
      align = "=";
      if (comma) width -= Math.floor((width - 1) / 4);
    }
    switch (type) {
     case "n":
      comma = true;
      type = "g";
      break;

     case "%":
      scale = 100;
      suffix = "%";
      type = "f";
      break;

     case "p":
      scale = 100;
      suffix = "%";
      type = "r";
      break;

     case "b":
     case "o":
     case "x":
     case "X":
      if (symbol === "#") symbol = "0" + type.toLowerCase();

     case "c":
     case "d":
      integer = true;
      precision = 0;
      break;

     case "s":
      scale = -1;
      type = "r";
      break;
    }
    if (symbol === "#") symbol = ""; else if (symbol === "$") symbol = d3_format_currencySymbol;
    if (type == "r" && !precision) type = "g";
    if (precision != null) {
      if (type == "g") precision = Math.max(1, Math.min(21, precision)); else if (type == "e" || type == "f") precision = Math.max(0, Math.min(20, precision));
    }
    type = d3_format_types.get(type) || d3_format_typeDefault;
    var zcomma = zfill && comma;
    return function(value) {
      if (integer && value % 1) return "";
      var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign;
      if (scale < 0) {
        var prefix = d3.formatPrefix(value, precision);
        value = prefix.scale(value);
        suffix = prefix.symbol;
      } else {
        value *= scale;
      }
      value = type(value, precision);
      var i = value.lastIndexOf("."), before = i < 0 ? value : value.substring(0, i), after = i < 0 ? "" : d3_format_decimalPoint + value.substring(i + 1);
      if (!zfill && comma) before = d3_format_group(before);
      var length = symbol.length + before.length + after.length + (zcomma ? 0 : negative.length), padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
      if (zcomma) before = d3_format_group(padding + before);
      negative += symbol;
      value = before + after;
      return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + suffix;
    };
  };
  var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
  var d3_format_types = d3.map({
    b: function(x) {
      return x.toString(2);
    },
    c: function(x) {
      return String.fromCharCode(x);
    },
    o: function(x) {
      return x.toString(8);
    },
    x: function(x) {
      return x.toString(16);
    },
    X: function(x) {
      return x.toString(16).toUpperCase();
    },
    g: function(x, p) {
      return x.toPrecision(p);
    },
    e: function(x, p) {
      return x.toExponential(p);
    },
    f: function(x, p) {
      return x.toFixed(p);
    },
    r: function(x, p) {
      return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
    }
  });
  function d3_format_precision(x, p) {
    return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
  }
  function d3_format_typeDefault(x) {
    return x + "";
  }
  var d3_format_group = d3_identity;
  if (d3_format_grouping) {
    var d3_format_groupingLength = d3_format_grouping.length;
    d3_format_group = function(value) {
      var i = value.length, t = [], j = 0, g = d3_format_grouping[0];
      while (i > 0 && g > 0) {
        t.push(value.substring(i -= g, i + g));
        g = d3_format_grouping[j = (j + 1) % d3_format_groupingLength];
      }
      return t.reverse().join(d3_format_thousandsSeparator);
    };
  }
  d3.geo = {};
  function d3_adder() {}
  d3_adder.prototype = {
    s: 0,
    t: 0,
    add: function(y) {
      d3_adderSum(y, this.t, d3_adderTemp);
      d3_adderSum(d3_adderTemp.s, this.s, this);
      if (this.s) this.t += d3_adderTemp.t; else this.s = d3_adderTemp.t;
    },
    reset: function() {
      this.s = this.t = 0;
    },
    valueOf: function() {
      return this.s;
    }
  };
  var d3_adderTemp = new d3_adder();
  function d3_adderSum(a, b, o) {
    var x = o.s = a + b, bv = x - a, av = x - bv;
    o.t = a - av + (b - bv);
  }
  d3.geo.stream = function(object, listener) {
    if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
      d3_geo_streamObjectType[object.type](object, listener);
    } else {
      d3_geo_streamGeometry(object, listener);
    }
  };
  function d3_geo_streamGeometry(geometry, listener) {
    if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
      d3_geo_streamGeometryType[geometry.type](geometry, listener);
    }
  }
  var d3_geo_streamObjectType = {
    Feature: function(feature, listener) {
      d3_geo_streamGeometry(feature.geometry, listener);
    },
    FeatureCollection: function(object, listener) {
      var features = object.features, i = -1, n = features.length;
      while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener);
    }
  };
  var d3_geo_streamGeometryType = {
    Sphere: function(object, listener) {
      listener.sphere();
    },
    Point: function(object, listener) {
      var coordinate = object.coordinates;
      listener.point(coordinate[0], coordinate[1]);
    },
    MultiPoint: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length, coordinate;
      while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1]);
    },
    LineString: function(object, listener) {
      d3_geo_streamLine(object.coordinates, listener, 0);
    },
    MultiLineString: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0);
    },
    Polygon: function(object, listener) {
      d3_geo_streamPolygon(object.coordinates, listener);
    },
    MultiPolygon: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamPolygon(coordinates[i], listener);
    },
    GeometryCollection: function(object, listener) {
      var geometries = object.geometries, i = -1, n = geometries.length;
      while (++i < n) d3_geo_streamGeometry(geometries[i], listener);
    }
  };
  function d3_geo_streamLine(coordinates, listener, closed) {
    var i = -1, n = coordinates.length - closed, coordinate;
    listener.lineStart();
    while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1]);
    listener.lineEnd();
  }
  function d3_geo_streamPolygon(coordinates, listener) {
    var i = -1, n = coordinates.length;
    listener.polygonStart();
    while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
    listener.polygonEnd();
  }
  d3.geo.area = function(object) {
    d3_geo_areaSum = 0;
    d3.geo.stream(object, d3_geo_area);
    return d3_geo_areaSum;
  };
  var d3_geo_areaSum, d3_geo_areaRingSum = new d3_adder();
  var d3_geo_area = {
    sphere: function() {
      d3_geo_areaSum += 4 * π;
    },
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_areaRingSum.reset();
      d3_geo_area.lineStart = d3_geo_areaRingStart;
    },
    polygonEnd: function() {
      var area = 2 * d3_geo_areaRingSum;
      d3_geo_areaSum += area < 0 ? 4 * π + area : area;
      d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
    }
  };
  function d3_geo_areaRingStart() {
    var λ00, φ00, λ0, cosφ0, sinφ0;
    d3_geo_area.point = function(λ, φ) {
      d3_geo_area.point = nextPoint;
      λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), 
      sinφ0 = Math.sin(φ);
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      φ = φ * d3_radians / 2 + π / 4;
      var dλ = λ - λ0, cosφ = Math.cos(φ), sinφ = Math.sin(φ), k = sinφ0 * sinφ, u = cosφ0 * cosφ + k * Math.cos(dλ), v = k * Math.sin(dλ);
      d3_geo_areaRingSum.add(Math.atan2(v, u));
      λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
    }
    d3_geo_area.lineEnd = function() {
      nextPoint(λ00, φ00);
    };
  }
  function d3_geo_cartesian(spherical) {
    var λ = spherical[0], φ = spherical[1], cosφ = Math.cos(φ);
    return [ cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ) ];
  }
  function d3_geo_cartesianDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function d3_geo_cartesianCross(a, b) {
    return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
  }
  function d3_geo_cartesianAdd(a, b) {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];
  }
  function d3_geo_cartesianScale(vector, k) {
    return [ vector[0] * k, vector[1] * k, vector[2] * k ];
  }
  function d3_geo_cartesianNormalize(d) {
    var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
    d[0] /= l;
    d[1] /= l;
    d[2] /= l;
  }
  function d3_geo_spherical(cartesian) {
    return [ Math.atan2(cartesian[1], cartesian[0]), d3_asin(cartesian[2]) ];
  }
  function d3_geo_sphericalEqual(a, b) {
    return Math.abs(a[0] - b[0]) < ε && Math.abs(a[1] - b[1]) < ε;
  }
  d3.geo.bounds = function() {
    var λ0, φ0, λ1, φ1, λ_, λ__, φ__, p0, dλSum, ranges, range;
    var bound = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        bound.point = ringPoint;
        bound.lineStart = ringStart;
        bound.lineEnd = ringEnd;
        dλSum = 0;
        d3_geo_area.polygonStart();
      },
      polygonEnd: function() {
        d3_geo_area.polygonEnd();
        bound.point = point;
        bound.lineStart = lineStart;
        bound.lineEnd = lineEnd;
        if (d3_geo_areaRingSum < 0) λ0 = -(λ1 = 180), φ0 = -(φ1 = 90); else if (dλSum > ε) φ1 = 90; else if (dλSum < -ε) φ0 = -90;
        range[0] = λ0, range[1] = λ1;
      }
    };
    function point(λ, φ) {
      ranges.push(range = [ λ0 = λ, λ1 = λ ]);
      if (φ < φ0) φ0 = φ;
      if (φ > φ1) φ1 = φ;
    }
    function linePoint(λ, φ) {
      var p = d3_geo_cartesian([ λ * d3_radians, φ * d3_radians ]);
      if (p0) {
        var normal = d3_geo_cartesianCross(p0, p), equatorial = [ normal[1], -normal[0], 0 ], inflection = d3_geo_cartesianCross(equatorial, normal);
        d3_geo_cartesianNormalize(inflection);
        inflection = d3_geo_spherical(inflection);
        var dλ = λ - λ_, s = dλ > 0 ? 1 : -1, λi = inflection[0] * d3_degrees * s, antimeridian = Math.abs(dλ) > 180;
        if (antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
          var φi = inflection[1] * d3_degrees;
          if (φi > φ1) φ1 = φi;
        } else if (λi = (λi + 360) % 360 - 180, antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
          var φi = -inflection[1] * d3_degrees;
          if (φi < φ0) φ0 = φi;
        } else {
          if (φ < φ0) φ0 = φ;
          if (φ > φ1) φ1 = φ;
        }
        if (antimeridian) {
          if (λ < λ_) {
            if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
          } else {
            if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
          }
        } else {
          if (λ1 >= λ0) {
            if (λ < λ0) λ0 = λ;
            if (λ > λ1) λ1 = λ;
          } else {
            if (λ > λ_) {
              if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
            } else {
              if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
            }
          }
        }
      } else {
        point(λ, φ);
      }
      p0 = p, λ_ = λ;
    }
    function lineStart() {
      bound.point = linePoint;
    }
    function lineEnd() {
      range[0] = λ0, range[1] = λ1;
      bound.point = point;
      p0 = null;
    }
    function ringPoint(λ, φ) {
      if (p0) {
        var dλ = λ - λ_;
        dλSum += Math.abs(dλ) > 180 ? dλ + (dλ > 0 ? 360 : -360) : dλ;
      } else λ__ = λ, φ__ = φ;
      d3_geo_area.point(λ, φ);
      linePoint(λ, φ);
    }
    function ringStart() {
      d3_geo_area.lineStart();
    }
    function ringEnd() {
      ringPoint(λ__, φ__);
      d3_geo_area.lineEnd();
      if (Math.abs(dλSum) > ε) λ0 = -(λ1 = 180);
      range[0] = λ0, range[1] = λ1;
      p0 = null;
    }
    function angle(λ0, λ1) {
      return (λ1 -= λ0) < 0 ? λ1 + 360 : λ1;
    }
    function compareRanges(a, b) {
      return a[0] - b[0];
    }
    function withinRange(x, range) {
      return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
    }
    return function(feature) {
      φ1 = λ1 = -(λ0 = φ0 = Infinity);
      ranges = [];
      d3.geo.stream(feature, bound);
      var n = ranges.length;
      if (n) {
        ranges.sort(compareRanges);
        for (var i = 1, a = ranges[0], b, merged = [ a ]; i < n; ++i) {
          b = ranges[i];
          if (withinRange(b[0], a) || withinRange(b[1], a)) {
            if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
            if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
          } else {
            merged.push(a = b);
          }
        }
        var best = -Infinity, dλ;
        for (var n = merged.length - 1, i = 0, a = merged[n], b; i <= n; a = b, ++i) {
          b = merged[i];
          if ((dλ = angle(a[1], b[0])) > best) best = dλ, λ0 = b[0], λ1 = a[1];
        }
      }
      ranges = range = null;
      return λ0 === Infinity || φ0 === Infinity ? [ [ NaN, NaN ], [ NaN, NaN ] ] : [ [ λ0, φ0 ], [ λ1, φ1 ] ];
    };
  }();
  d3.geo.centroid = function(object) {
    d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
    d3.geo.stream(object, d3_geo_centroid);
    var x = d3_geo_centroidX2, y = d3_geo_centroidY2, z = d3_geo_centroidZ2, m = x * x + y * y + z * z;
    if (m < ε2) {
      x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1;
      if (d3_geo_centroidW1 < ε) x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0;
      m = x * x + y * y + z * z;
      if (m < ε2) return [ NaN, NaN ];
    }
    return [ Math.atan2(y, x) * d3_degrees, d3_asin(z / Math.sqrt(m)) * d3_degrees ];
  };
  var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2;
  var d3_geo_centroid = {
    sphere: d3_noop,
    point: d3_geo_centroidPoint,
    lineStart: d3_geo_centroidLineStart,
    lineEnd: d3_geo_centroidLineEnd,
    polygonStart: function() {
      d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
    }
  };
  function d3_geo_centroidPoint(λ, φ) {
    λ *= d3_radians;
    var cosφ = Math.cos(φ *= d3_radians);
    d3_geo_centroidPointXYZ(cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ));
  }
  function d3_geo_centroidPointXYZ(x, y, z) {
    ++d3_geo_centroidW0;
    d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0;
    d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0;
    d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0;
  }
  function d3_geo_centroidLineStart() {
    var x0, y0, z0;
    d3_geo_centroid.point = function(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroid.point = nextPoint;
      d3_geo_centroidPointXYZ(x0, y0, z0);
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
      d3_geo_centroidW1 += w;
      d3_geo_centroidX1 += w * (x0 + (x0 = x));
      d3_geo_centroidY1 += w * (y0 + (y0 = y));
      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
      d3_geo_centroidPointXYZ(x0, y0, z0);
    }
  }
  function d3_geo_centroidLineEnd() {
    d3_geo_centroid.point = d3_geo_centroidPoint;
  }
  function d3_geo_centroidRingStart() {
    var λ00, φ00, x0, y0, z0;
    d3_geo_centroid.point = function(λ, φ) {
      λ00 = λ, φ00 = φ;
      d3_geo_centroid.point = nextPoint;
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroidPointXYZ(x0, y0, z0);
    };
    d3_geo_centroid.lineEnd = function() {
      nextPoint(λ00, φ00);
      d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
      d3_geo_centroid.point = d3_geo_centroidPoint;
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), cx = y0 * z - z0 * y, cy = z0 * x - x0 * z, cz = x0 * y - y0 * x, m = Math.sqrt(cx * cx + cy * cy + cz * cz), u = x0 * x + y0 * y + z0 * z, v = m && -d3_acos(u) / m, w = Math.atan2(m, u);
      d3_geo_centroidX2 += v * cx;
      d3_geo_centroidY2 += v * cy;
      d3_geo_centroidZ2 += v * cz;
      d3_geo_centroidW1 += w;
      d3_geo_centroidX1 += w * (x0 + (x0 = x));
      d3_geo_centroidY1 += w * (y0 + (y0 = y));
      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
      d3_geo_centroidPointXYZ(x0, y0, z0);
    }
  }
  function d3_true() {
    return true;
  }
  function d3_geo_clipPolygon(segments, compare, inside, interpolate, listener) {
    var subject = [], clip = [];
    segments.forEach(function(segment) {
      if ((n = segment.length - 1) <= 0) return;
      var n, p0 = segment[0], p1 = segment[n];
      if (d3_geo_sphericalEqual(p0, p1)) {
        listener.lineStart();
        for (var i = 0; i < n; ++i) listener.point((p0 = segment[i])[0], p0[1]);
        listener.lineEnd();
        return;
      }
      var a = {
        point: p0,
        points: segment,
        other: null,
        visited: false,
        entry: true,
        subject: true
      }, b = {
        point: p0,
        points: [ p0 ],
        other: a,
        visited: false,
        entry: false,
        subject: false
      };
      a.other = b;
      subject.push(a);
      clip.push(b);
      a = {
        point: p1,
        points: [ p1 ],
        other: null,
        visited: false,
        entry: false,
        subject: true
      };
      b = {
        point: p1,
        points: [ p1 ],
        other: a,
        visited: false,
        entry: true,
        subject: false
      };
      a.other = b;
      subject.push(a);
      clip.push(b);
    });
    clip.sort(compare);
    d3_geo_clipPolygonLinkCircular(subject);
    d3_geo_clipPolygonLinkCircular(clip);
    if (!subject.length) return;
    if (inside) for (var i = 1, e = !inside(clip[0].point), n = clip.length; i < n; ++i) {
      clip[i].entry = e = !e;
    }
    var start = subject[0], current, points, point;
    while (1) {
      current = start;
      while (current.visited) if ((current = current.next) === start) return;
      points = current.points;
      listener.lineStart();
      do {
        current.visited = current.other.visited = true;
        if (current.entry) {
          if (current.subject) {
            for (var i = 0; i < points.length; i++) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.point, current.next.point, 1, listener);
          }
          current = current.next;
        } else {
          if (current.subject) {
            points = current.prev.points;
            for (var i = points.length; --i >= 0; ) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.point, current.prev.point, -1, listener);
          }
          current = current.prev;
        }
        current = current.other;
        points = current.points;
      } while (!current.visited);
      listener.lineEnd();
    }
  }
  function d3_geo_clipPolygonLinkCircular(array) {
    if (!(n = array.length)) return;
    var n, i = 0, a = array[0], b;
    while (++i < n) {
      a.next = b = array[i];
      b.prev = a;
      a = b;
    }
    a.next = b = array[0];
    b.prev = a;
  }
  function d3_geo_clip(pointVisible, clipLine, interpolate, polygonContains) {
    return function(listener) {
      var line = clipLine(listener);
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          clip.point = pointRing;
          clip.lineStart = ringStart;
          clip.lineEnd = ringEnd;
          segments = [];
          polygon = [];
          listener.polygonStart();
        },
        polygonEnd: function() {
          clip.point = point;
          clip.lineStart = lineStart;
          clip.lineEnd = lineEnd;
          segments = d3.merge(segments);
          if (segments.length) {
            d3_geo_clipPolygon(segments, d3_geo_clipSort, null, interpolate, listener);
          } else if (polygonContains(polygon)) {
            listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd();
          }
          listener.polygonEnd();
          segments = polygon = null;
        },
        sphere: function() {
          listener.polygonStart();
          listener.lineStart();
          interpolate(null, null, 1, listener);
          listener.lineEnd();
          listener.polygonEnd();
        }
      };
      function point(λ, φ) {
        if (pointVisible(λ, φ)) listener.point(λ, φ);
      }
      function pointLine(λ, φ) {
        line.point(λ, φ);
      }
      function lineStart() {
        clip.point = pointLine;
        line.lineStart();
      }
      function lineEnd() {
        clip.point = point;
        line.lineEnd();
      }
      var segments;
      var buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer), polygon, ring;
      function pointRing(λ, φ) {
        ringListener.point(λ, φ);
        ring.push([ λ, φ ]);
      }
      function ringStart() {
        ringListener.lineStart();
        ring = [];
      }
      function ringEnd() {
        pointRing(ring[0][0], ring[0][1]);
        ringListener.lineEnd();
        var clean = ringListener.clean(), ringSegments = buffer.buffer(), segment, n = ringSegments.length;
        ring.pop();
        polygon.push(ring);
        ring = null;
        if (!n) return;
        if (clean & 1) {
          segment = ringSegments[0];
          var n = segment.length - 1, i = -1, point;
          listener.lineStart();
          while (++i < n) listener.point((point = segment[i])[0], point[1]);
          listener.lineEnd();
          return;
        }
        if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
        segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
      }
      return clip;
    };
  }
  function d3_geo_clipSegmentLength1(segment) {
    return segment.length > 1;
  }
  function d3_geo_clipBufferListener() {
    var lines = [], line;
    return {
      lineStart: function() {
        lines.push(line = []);
      },
      point: function(λ, φ) {
        line.push([ λ, φ ]);
      },
      lineEnd: d3_noop,
      buffer: function() {
        var buffer = lines;
        lines = [];
        line = null;
        return buffer;
      },
      rejoin: function() {
        if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
      }
    };
  }
  function d3_geo_clipSort(a, b) {
    return ((a = a.point)[0] < 0 ? a[1] - π / 2 - ε : π / 2 - a[1]) - ((b = b.point)[0] < 0 ? b[1] - π / 2 - ε : π / 2 - b[1]);
  }
  function d3_geo_pointInPolygon(point, polygon) {
    var meridian = point[0], parallel = point[1], meridianNormal = [ Math.sin(meridian), -Math.cos(meridian), 0 ], polarAngle = 0, polar = false, southPole = false, winding = 0;
    d3_geo_areaRingSum.reset();
    for (var i = 0, n = polygon.length; i < n; ++i) {
      var ring = polygon[i], m = ring.length;
      if (!m) continue;
      var point0 = ring[0], λ0 = point0[0], φ0 = point0[1] / 2 + π / 4, sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), j = 1;
      while (true) {
        if (j === m) j = 0;
        point = ring[j];
        var λ = point[0], φ = point[1] / 2 + π / 4, sinφ = Math.sin(φ), cosφ = Math.cos(φ), dλ = λ - λ0, antimeridian = Math.abs(dλ) > π, k = sinφ0 * sinφ;
        d3_geo_areaRingSum.add(Math.atan2(k * Math.sin(dλ), cosφ0 * cosφ + k * Math.cos(dλ)));
        if (Math.abs(φ) < ε) southPole = true;
        polarAngle += antimeridian ? dλ + (dλ >= 0 ? 2 : -2) * π : dλ;
        if (antimeridian ^ λ0 >= meridian ^ λ >= meridian) {
          var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
          d3_geo_cartesianNormalize(arc);
          var intersection = d3_geo_cartesianCross(meridianNormal, arc);
          d3_geo_cartesianNormalize(intersection);
          var φarc = (antimeridian ^ dλ >= 0 ? -1 : 1) * d3_asin(intersection[2]);
          if (parallel > φarc) {
            winding += antimeridian ^ dλ >= 0 ? 1 : -1;
          }
        }
        if (!j++) break;
        λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ, point0 = point;
      }
      if (Math.abs(polarAngle) > ε) polar = true;
    }
    return (!southPole && !polar && d3_geo_areaRingSum < 0 || polarAngle < -ε) ^ winding & 1;
  }
  var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, d3_geo_clipAntimeridianPolygonContains);
  function d3_geo_clipAntimeridianLine(listener) {
    var λ0 = NaN, φ0 = NaN, sλ0 = NaN, clean;
    return {
      lineStart: function() {
        listener.lineStart();
        clean = 1;
      },
      point: function(λ1, φ1) {
        var sλ1 = λ1 > 0 ? π : -π, dλ = Math.abs(λ1 - λ0);
        if (Math.abs(dλ - π) < ε) {
          listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? π / 2 : -π / 2);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          listener.point(λ1, φ0);
          clean = 0;
        } else if (sλ0 !== sλ1 && dλ >= π) {
          if (Math.abs(λ0 - sλ0) < ε) λ0 -= sλ0 * ε;
          if (Math.abs(λ1 - sλ1) < ε) λ1 -= sλ1 * ε;
          φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          clean = 0;
        }
        listener.point(λ0 = λ1, φ0 = φ1);
        sλ0 = sλ1;
      },
      lineEnd: function() {
        listener.lineEnd();
        λ0 = φ0 = NaN;
      },
      clean: function() {
        return 2 - clean;
      }
    };
  }
  function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
    var cosφ0, cosφ1, sinλ0_λ1 = Math.sin(λ0 - λ1);
    return Math.abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2;
  }
  function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
    var φ;
    if (from == null) {
      φ = direction * π / 2;
      listener.point(-π, φ);
      listener.point(0, φ);
      listener.point(π, φ);
      listener.point(π, 0);
      listener.point(π, -φ);
      listener.point(0, -φ);
      listener.point(-π, -φ);
      listener.point(-π, 0);
      listener.point(-π, φ);
    } else if (Math.abs(from[0] - to[0]) > ε) {
      var s = (from[0] < to[0] ? 1 : -1) * π;
      φ = direction * s / 2;
      listener.point(-s, φ);
      listener.point(0, φ);
      listener.point(s, φ);
    } else {
      listener.point(to[0], to[1]);
    }
  }
  var d3_geo_clipAntimeridianPoint = [ -π, 0 ];
  function d3_geo_clipAntimeridianPolygonContains(polygon) {
    return d3_geo_pointInPolygon(d3_geo_clipAntimeridianPoint, polygon);
  }
  function d3_geo_clipCircle(radius) {
    var cr = Math.cos(radius), smallRadius = cr > 0, point = [ radius, 0 ], notHemisphere = Math.abs(cr) > ε, interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
    return d3_geo_clip(visible, clipLine, interpolate, polygonContains);
    function visible(λ, φ) {
      return Math.cos(λ) * Math.cos(φ) > cr;
    }
    function clipLine(listener) {
      var point0, c0, v0, v00, clean;
      return {
        lineStart: function() {
          v00 = v0 = false;
          clean = 1;
        },
        point: function(λ, φ) {
          var point1 = [ λ, φ ], point2, v = visible(λ, φ), c = smallRadius ? v ? 0 : code(λ, φ) : v ? code(λ + (λ < 0 ? π : -π), φ) : 0;
          if (!point0 && (v00 = v0 = v)) listener.lineStart();
          if (v !== v0) {
            point2 = intersect(point0, point1);
            if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
              point1[0] += ε;
              point1[1] += ε;
              v = visible(point1[0], point1[1]);
            }
          }
          if (v !== v0) {
            clean = 0;
            if (v) {
              listener.lineStart();
              point2 = intersect(point1, point0);
              listener.point(point2[0], point2[1]);
            } else {
              point2 = intersect(point0, point1);
              listener.point(point2[0], point2[1]);
              listener.lineEnd();
            }
            point0 = point2;
          } else if (notHemisphere && point0 && smallRadius ^ v) {
            var t;
            if (!(c & c0) && (t = intersect(point1, point0, true))) {
              clean = 0;
              if (smallRadius) {
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
              } else {
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
              }
            }
          }
          if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
            listener.point(point1[0], point1[1]);
          }
          point0 = point1, v0 = v, c0 = c;
        },
        lineEnd: function() {
          if (v0) listener.lineEnd();
          point0 = null;
        },
        clean: function() {
          return clean | (v00 && v0) << 1;
        }
      };
    }
    function intersect(a, b, two) {
      var pa = d3_geo_cartesian(a), pb = d3_geo_cartesian(b);
      var n1 = [ 1, 0, 0 ], n2 = d3_geo_cartesianCross(pa, pb), n2n2 = d3_geo_cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
      if (!determinant) return !two && a;
      var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = d3_geo_cartesianCross(n1, n2), A = d3_geo_cartesianScale(n1, c1), B = d3_geo_cartesianScale(n2, c2);
      d3_geo_cartesianAdd(A, B);
      var u = n1xn2, w = d3_geo_cartesianDot(A, u), uu = d3_geo_cartesianDot(u, u), t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
      if (t2 < 0) return;
      var t = Math.sqrt(t2), q = d3_geo_cartesianScale(u, (-w - t) / uu);
      d3_geo_cartesianAdd(q, A);
      q = d3_geo_spherical(q);
      if (!two) return q;
      var λ0 = a[0], λ1 = b[0], φ0 = a[1], φ1 = b[1], z;
      if (λ1 < λ0) z = λ0, λ0 = λ1, λ1 = z;
      var δλ = λ1 - λ0, polar = Math.abs(δλ - π) < ε, meridian = polar || δλ < ε;
      if (!polar && φ1 < φ0) z = φ0, φ0 = φ1, φ1 = z;
      if (meridian ? polar ? φ0 + φ1 > 0 ^ q[1] < (Math.abs(q[0] - λ0) < ε ? φ0 : φ1) : φ0 <= q[1] && q[1] <= φ1 : δλ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
        var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
        d3_geo_cartesianAdd(q1, A);
        return [ q, d3_geo_spherical(q1) ];
      }
    }
    function code(λ, φ) {
      var r = smallRadius ? radius : π - radius, code = 0;
      if (λ < -r) code |= 1; else if (λ > r) code |= 2;
      if (φ < -r) code |= 4; else if (φ > r) code |= 8;
      return code;
    }
    function polygonContains(polygon) {
      return d3_geo_pointInPolygon(point, polygon);
    }
  }
  var d3_geo_clipViewMAX = 1e9;
  function d3_geo_clipView(x0, y0, x1, y1) {
    return function(listener) {
      var listener_ = listener, bufferListener = d3_geo_clipBufferListener(), segments, polygon, ring;
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          listener = bufferListener;
          segments = [];
          polygon = [];
        },
        polygonEnd: function() {
          listener = listener_;
          if ((segments = d3.merge(segments)).length) {
            listener.polygonStart();
            d3_geo_clipPolygon(segments, compare, inside, interpolate, listener);
            listener.polygonEnd();
          } else if (insidePolygon([ x0, y0 ])) {
            listener.polygonStart(), listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd(), listener.polygonEnd();
          }
          segments = polygon = ring = null;
        }
      };
      function inside(point) {
        var a = corner(point, -1), i = insidePolygon([ a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0 ]);
        return i;
      }
      function insidePolygon(p) {
        var wn = 0, n = polygon.length, y = p[1];
        for (var i = 0; i < n; ++i) {
          for (var j = 1, v = polygon[i], m = v.length, a = v[0], b; j < m; ++j) {
            b = v[j];
            if (a[1] <= y) {
              if (b[1] > y && isLeft(a, b, p) > 0) ++wn;
            } else {
              if (b[1] <= y && isLeft(a, b, p) < 0) --wn;
            }
            a = b;
          }
        }
        return wn !== 0;
      }
      function isLeft(a, b, c) {
        return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
      }
      function interpolate(from, to, direction, listener) {
        var a = 0, a1 = 0;
        if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
          do {
            listener.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
          } while ((a = (a + direction + 4) % 4) !== a1);
        } else {
          listener.point(to[0], to[1]);
        }
      }
      function visible(x, y) {
        return x0 <= x && x <= x1 && y0 <= y && y <= y1;
      }
      function point(x, y) {
        if (visible(x, y)) listener.point(x, y);
      }
      var x__, y__, v__, x_, y_, v_, first;
      function lineStart() {
        clip.point = linePoint;
        if (polygon) polygon.push(ring = []);
        first = true;
        v_ = false;
        x_ = y_ = NaN;
      }
      function lineEnd() {
        if (segments) {
          linePoint(x__, y__);
          if (v__ && v_) bufferListener.rejoin();
          segments.push(bufferListener.buffer());
        }
        clip.point = point;
        if (v_) listener.lineEnd();
      }
      function linePoint(x, y) {
        x = Math.max(-d3_geo_clipViewMAX, Math.min(d3_geo_clipViewMAX, x));
        y = Math.max(-d3_geo_clipViewMAX, Math.min(d3_geo_clipViewMAX, y));
        var v = visible(x, y);
        if (polygon) ring.push([ x, y ]);
        if (first) {
          x__ = x, y__ = y, v__ = v;
          first = false;
          if (v) {
            listener.lineStart();
            listener.point(x, y);
          }
        } else {
          if (v && v_) listener.point(x, y); else {
            var a = [ x_, y_ ], b = [ x, y ];
            if (clipLine(a, b)) {
              if (!v_) {
                listener.lineStart();
                listener.point(a[0], a[1]);
              }
              listener.point(b[0], b[1]);
              if (!v) listener.lineEnd();
            } else if (v) {
              listener.lineStart();
              listener.point(x, y);
            }
          }
        }
        x_ = x, y_ = y, v_ = v;
      }
      return clip;
    };
    function corner(p, direction) {
      return Math.abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3 : Math.abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1 : Math.abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
    }
    function compare(a, b) {
      return comparePoints(a.point, b.point);
    }
    function comparePoints(a, b) {
      var ca = corner(a, 1), cb = corner(b, 1);
      return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
    }
    function clipLine(a, b) {
      var dx = b[0] - a[0], dy = b[1] - a[1], t = [ 0, 1 ];
      if (Math.abs(dx) < ε && Math.abs(dy) < ε) return x0 <= a[0] && a[0] <= x1 && y0 <= a[1] && a[1] <= y1;
      if (d3_geo_clipViewT(x0 - a[0], dx, t) && d3_geo_clipViewT(a[0] - x1, -dx, t) && d3_geo_clipViewT(y0 - a[1], dy, t) && d3_geo_clipViewT(a[1] - y1, -dy, t)) {
        if (t[1] < 1) {
          b[0] = a[0] + t[1] * dx;
          b[1] = a[1] + t[1] * dy;
        }
        if (t[0] > 0) {
          a[0] += t[0] * dx;
          a[1] += t[0] * dy;
        }
        return true;
      }
      return false;
    }
  }
  function d3_geo_clipViewT(num, denominator, t) {
    if (Math.abs(denominator) < ε) return num <= 0;
    var u = num / denominator;
    if (denominator > 0) {
      if (u > t[1]) return false;
      if (u > t[0]) t[0] = u;
    } else {
      if (u < t[0]) return false;
      if (u < t[1]) t[1] = u;
    }
    return true;
  }
  function d3_geo_compose(a, b) {
    function compose(x, y) {
      return x = a(x, y), b(x[0], x[1]);
    }
    if (a.invert && b.invert) compose.invert = function(x, y) {
      return x = b.invert(x, y), x && a.invert(x[0], x[1]);
    };
    return compose;
  }
  function d3_geo_conic(projectAt) {
    var φ0 = 0, φ1 = π / 3, m = d3_geo_projectionMutator(projectAt), p = m(φ0, φ1);
    p.parallels = function(_) {
      if (!arguments.length) return [ φ0 / π * 180, φ1 / π * 180 ];
      return m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180);
    };
    return p;
  }
  function d3_geo_conicEqualArea(φ0, φ1) {
    var sinφ0 = Math.sin(φ0), n = (sinφ0 + Math.sin(φ1)) / 2, C = 1 + sinφ0 * (2 * n - sinφ0), ρ0 = Math.sqrt(C) / n;
    function forward(λ, φ) {
      var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
      return [ ρ * Math.sin(λ *= n), ρ0 - ρ * Math.cos(λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = ρ0 - y;
      return [ Math.atan2(x, ρ0_y) / n, d3_asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n)) ];
    };
    return forward;
  }
  (d3.geo.conicEqualArea = function() {
    return d3_geo_conic(d3_geo_conicEqualArea);
  }).raw = d3_geo_conicEqualArea;
  d3.geo.albers = function() {
    return d3.geo.conicEqualArea().rotate([ 96, 0 ]).center([ -.6, 38.7 ]).parallels([ 29.5, 45.5 ]).scale(1070);
  };
  d3.geo.albersUsa = function() {
    var lower48 = d3.geo.albers();
    var alaska = d3.geo.conicEqualArea().rotate([ 154, 0 ]).center([ -2, 58.5 ]).parallels([ 55, 65 ]);
    var hawaii = d3.geo.conicEqualArea().rotate([ 157, 0 ]).center([ -3, 19.9 ]).parallels([ 8, 18 ]);
    var point, pointStream = {
      point: function(x, y) {
        point = [ x, y ];
      }
    }, lower48Point, alaskaPoint, hawaiiPoint;
    function albersUsa(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      point = null;
      (lower48Point(x, y), point) || (alaskaPoint(x, y), point) || hawaiiPoint(x, y);
      return point;
    }
    albersUsa.invert = function(coordinates) {
      var k = lower48.scale(), t = lower48.translate(), x = (coordinates[0] - t[0]) / k, y = (coordinates[1] - t[1]) / k;
      return (y >= .12 && y < .234 && x >= -.425 && x < -.214 ? alaska : y >= .166 && y < .234 && x >= -.214 && x < -.115 ? hawaii : lower48).invert(coordinates);
    };
    albersUsa.stream = function(stream) {
      var lower48Stream = lower48.stream(stream), alaskaStream = alaska.stream(stream), hawaiiStream = hawaii.stream(stream);
      return {
        point: function(x, y) {
          lower48Stream.point(x, y);
          alaskaStream.point(x, y);
          hawaiiStream.point(x, y);
        },
        sphere: function() {
          lower48Stream.sphere();
          alaskaStream.sphere();
          hawaiiStream.sphere();
        },
        lineStart: function() {
          lower48Stream.lineStart();
          alaskaStream.lineStart();
          hawaiiStream.lineStart();
        },
        lineEnd: function() {
          lower48Stream.lineEnd();
          alaskaStream.lineEnd();
          hawaiiStream.lineEnd();
        },
        polygonStart: function() {
          lower48Stream.polygonStart();
          alaskaStream.polygonStart();
          hawaiiStream.polygonStart();
        },
        polygonEnd: function() {
          lower48Stream.polygonEnd();
          alaskaStream.polygonEnd();
          hawaiiStream.polygonEnd();
        }
      };
    };
    albersUsa.precision = function(_) {
      if (!arguments.length) return lower48.precision();
      lower48.precision(_);
      alaska.precision(_);
      hawaii.precision(_);
      return albersUsa;
    };
    albersUsa.scale = function(_) {
      if (!arguments.length) return lower48.scale();
      lower48.scale(_);
      alaska.scale(_ * .35);
      hawaii.scale(_);
      return albersUsa.translate(lower48.translate());
    };
    albersUsa.translate = function(_) {
      if (!arguments.length) return lower48.translate();
      var k = lower48.scale(), x = +_[0], y = +_[1];
      lower48Point = lower48.translate(_).clipExtent([ [ x - .455 * k, y - .238 * k ], [ x + .455 * k, y + .238 * k ] ]).stream(pointStream).point;
      alaskaPoint = alaska.translate([ x - .307 * k, y + .201 * k ]).clipExtent([ [ x - .425 * k + ε, y + .12 * k + ε ], [ x - .214 * k - ε, y + .234 * k - ε ] ]).stream(pointStream).point;
      hawaiiPoint = hawaii.translate([ x - .205 * k, y + .212 * k ]).clipExtent([ [ x - .214 * k + ε, y + .166 * k + ε ], [ x - .115 * k - ε, y + .234 * k - ε ] ]).stream(pointStream).point;
      return albersUsa;
    };
    return albersUsa.scale(1070);
  };
  var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_pathAreaPolygon = 0;
      d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
      d3_geo_pathAreaSum += Math.abs(d3_geo_pathAreaPolygon / 2);
    }
  };
  function d3_geo_pathAreaRingStart() {
    var x00, y00, x0, y0;
    d3_geo_pathArea.point = function(x, y) {
      d3_geo_pathArea.point = nextPoint;
      x00 = x0 = x, y00 = y0 = y;
    };
    function nextPoint(x, y) {
      d3_geo_pathAreaPolygon += y0 * x - x0 * y;
      x0 = x, y0 = y;
    }
    d3_geo_pathArea.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  var d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1;
  var d3_geo_pathBounds = {
    point: d3_geo_pathBoundsPoint,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop
  };
  function d3_geo_pathBoundsPoint(x, y) {
    if (x < d3_geo_pathBoundsX0) d3_geo_pathBoundsX0 = x;
    if (x > d3_geo_pathBoundsX1) d3_geo_pathBoundsX1 = x;
    if (y < d3_geo_pathBoundsY0) d3_geo_pathBoundsY0 = y;
    if (y > d3_geo_pathBoundsY1) d3_geo_pathBoundsY1 = y;
  }
  function d3_geo_pathBuffer() {
    var pointCircle = d3_geo_pathBufferCircle(4.5), buffer = [];
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointCircle = d3_geo_pathBufferCircle(_);
        return stream;
      },
      result: function() {
        if (buffer.length) {
          var result = buffer.join("");
          buffer = [];
          return result;
        }
      }
    };
    function point(x, y) {
      buffer.push("M", x, ",", y, pointCircle);
    }
    function pointLineStart(x, y) {
      buffer.push("M", x, ",", y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      buffer.push("L", x, ",", y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      buffer.push("Z");
    }
    return stream;
  }
  function d3_geo_pathBufferCircle(radius) {
    return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
  }
  var d3_geo_pathCentroid = {
    point: d3_geo_pathCentroidPoint,
    lineStart: d3_geo_pathCentroidLineStart,
    lineEnd: d3_geo_pathCentroidLineEnd,
    polygonStart: function() {
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
      d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
    }
  };
  function d3_geo_pathCentroidPoint(x, y) {
    d3_geo_centroidX0 += x;
    d3_geo_centroidY0 += y;
    ++d3_geo_centroidZ0;
  }
  function d3_geo_pathCentroidLineStart() {
    var x0, y0;
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    };
    function nextPoint(x, y) {
      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX1 += z * (x0 + x) / 2;
      d3_geo_centroidY1 += z * (y0 + y) / 2;
      d3_geo_centroidZ1 += z;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    }
  }
  function d3_geo_pathCentroidLineEnd() {
    d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
  }
  function d3_geo_pathCentroidRingStart() {
    var x00, y00, x0, y0;
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y);
    };
    function nextPoint(x, y) {
      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX1 += z * (x0 + x) / 2;
      d3_geo_centroidY1 += z * (y0 + y) / 2;
      d3_geo_centroidZ1 += z;
      z = y0 * x - x0 * y;
      d3_geo_centroidX2 += z * (x0 + x);
      d3_geo_centroidY2 += z * (y0 + y);
      d3_geo_centroidZ2 += z * 3;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    }
    d3_geo_pathCentroid.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  function d3_geo_pathContext(context) {
    var pointRadius = 4.5;
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointRadius = _;
        return stream;
      },
      result: d3_noop
    };
    function point(x, y) {
      context.moveTo(x, y);
      context.arc(x, y, pointRadius, 0, 2 * π);
    }
    function pointLineStart(x, y) {
      context.moveTo(x, y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      context.lineTo(x, y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      context.closePath();
    }
    return stream;
  }
  function d3_geo_resample(project) {
    var δ2 = .5, cosMinDistance = Math.cos(30 * d3_radians), maxDepth = 16;
    function resample(stream) {
      var λ00, φ00, x00, y00, a00, b00, c00, λ0, x0, y0, a0, b0, c0;
      var resample = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          stream.polygonStart();
          resample.lineStart = ringStart;
        },
        polygonEnd: function() {
          stream.polygonEnd();
          resample.lineStart = lineStart;
        }
      };
      function point(x, y) {
        x = project(x, y);
        stream.point(x[0], x[1]);
      }
      function lineStart() {
        x0 = NaN;
        resample.point = linePoint;
        stream.lineStart();
      }
      function linePoint(λ, φ) {
        var c = d3_geo_cartesian([ λ, φ ]), p = project(λ, φ);
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
        stream.point(x0, y0);
      }
      function lineEnd() {
        resample.point = point;
        stream.lineEnd();
      }
      function ringStart() {
        lineStart();
        resample.point = ringPoint;
        resample.lineEnd = ringEnd;
      }
      function ringPoint(λ, φ) {
        linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
        resample.point = linePoint;
      }
      function ringEnd() {
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
        resample.lineEnd = lineEnd;
        lineEnd();
      }
      return resample;
    }
    function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
      var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
      if (d2 > 4 * δ2 && depth--) {
        var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), φ2 = Math.asin(c /= m), λ2 = Math.abs(Math.abs(c) - 1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a), p = project(λ2, φ2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
        if (dz * dz / d2 > δ2 || Math.abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
          resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
          stream.point(x2, y2);
          resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
        }
      }
    }
    resample.precision = function(_) {
      if (!arguments.length) return Math.sqrt(δ2);
      maxDepth = (δ2 = _ * _) > 0 && 16;
      return resample;
    };
    return resample;
  }
  d3.geo.path = function() {
    var pointRadius = 4.5, projection, context, projectStream, contextStream, cacheStream;
    function path(object) {
      if (object) {
        if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
        if (!cacheStream || !cacheStream.valid) cacheStream = projectStream(contextStream);
        d3.geo.stream(object, cacheStream);
      }
      return contextStream.result();
    }
    path.area = function(object) {
      d3_geo_pathAreaSum = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathArea));
      return d3_geo_pathAreaSum;
    };
    path.centroid = function(object) {
      d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
      return d3_geo_centroidZ2 ? [ d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2 ] : d3_geo_centroidZ1 ? [ d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1 ] : d3_geo_centroidZ0 ? [ d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0 ] : [ NaN, NaN ];
    };
    path.bounds = function(object) {
      d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
      d3.geo.stream(object, projectStream(d3_geo_pathBounds));
      return [ [ d3_geo_pathBoundsX0, d3_geo_pathBoundsY0 ], [ d3_geo_pathBoundsX1, d3_geo_pathBoundsY1 ] ];
    };
    path.projection = function(_) {
      if (!arguments.length) return projection;
      projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
      return reset();
    };
    path.context = function(_) {
      if (!arguments.length) return context;
      contextStream = (context = _) == null ? new d3_geo_pathBuffer() : new d3_geo_pathContext(_);
      if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
      return reset();
    };
    path.pointRadius = function(_) {
      if (!arguments.length) return pointRadius;
      pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
      return path;
    };
    function reset() {
      cacheStream = null;
      return path;
    }
    return path.projection(d3.geo.albersUsa()).context(null);
  };
  function d3_geo_pathProjectStream(project) {
    var resample = d3_geo_resample(function(λ, φ) {
      return project([ λ * d3_degrees, φ * d3_degrees ]);
    });
    return function(stream) {
      stream = resample(stream);
      return {
        point: function(λ, φ) {
          stream.point(λ * d3_radians, φ * d3_radians);
        },
        sphere: function() {
          stream.sphere();
        },
        lineStart: function() {
          stream.lineStart();
        },
        lineEnd: function() {
          stream.lineEnd();
        },
        polygonStart: function() {
          stream.polygonStart();
        },
        polygonEnd: function() {
          stream.polygonEnd();
        }
      };
    };
  }
  d3.geo.projection = d3_geo_projection;
  d3.geo.projectionMutator = d3_geo_projectionMutator;
  function d3_geo_projection(project) {
    return d3_geo_projectionMutator(function() {
      return project;
    })();
  }
  function d3_geo_projectionMutator(projectAt) {
    var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x, y) {
      x = project(x, y);
      return [ x[0] * k + δx, δy - x[1] * k ];
    }), k = 150, x = 480, y = 250, λ = 0, φ = 0, δλ = 0, δφ = 0, δγ = 0, δx, δy, preclip = d3_geo_clipAntimeridian, postclip = d3_identity, clipAngle = null, clipExtent = null, stream;
    function projection(point) {
      point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
      return [ point[0] * k + δx, δy - point[1] * k ];
    }
    function invert(point) {
      point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
      return point && [ point[0] * d3_degrees, point[1] * d3_degrees ];
    }
    projection.stream = function(output) {
      if (stream) stream.valid = false;
      stream = d3_geo_projectionRadiansRotate(rotate, preclip(projectResample(postclip(output))));
      stream.valid = true;
      return stream;
    };
    projection.clipAngle = function(_) {
      if (!arguments.length) return clipAngle;
      preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
      return invalidate();
    };
    projection.clipExtent = function(_) {
      if (!arguments.length) return clipExtent;
      clipExtent = _;
      postclip = _ == null ? d3_identity : d3_geo_clipView(_[0][0], _[0][1], _[1][0], _[1][1]);
      return invalidate();
    };
    projection.scale = function(_) {
      if (!arguments.length) return k;
      k = +_;
      return reset();
    };
    projection.translate = function(_) {
      if (!arguments.length) return [ x, y ];
      x = +_[0];
      y = +_[1];
      return reset();
    };
    projection.center = function(_) {
      if (!arguments.length) return [ λ * d3_degrees, φ * d3_degrees ];
      λ = _[0] % 360 * d3_radians;
      φ = _[1] % 360 * d3_radians;
      return reset();
    };
    projection.rotate = function(_) {
      if (!arguments.length) return [ δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees ];
      δλ = _[0] % 360 * d3_radians;
      δφ = _[1] % 360 * d3_radians;
      δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
      return reset();
    };
    d3.rebind(projection, projectResample, "precision");
    function reset() {
      projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
      var center = project(λ, φ);
      δx = x - center[0] * k;
      δy = y + center[1] * k;
      return invalidate();
    }
    function invalidate() {
      if (stream) {
        stream.valid = false;
        stream = null;
      }
      return projection;
    }
    return function() {
      project = projectAt.apply(this, arguments);
      projection.invert = project.invert && invert;
      return reset();
    };
  }
  function d3_geo_projectionRadiansRotate(rotate, stream) {
    return {
      point: function(x, y) {
        y = rotate(x * d3_radians, y * d3_radians), x = y[0];
        stream.point(x > π ? x - 2 * π : x < -π ? x + 2 * π : x, y[1]);
      },
      sphere: function() {
        stream.sphere();
      },
      lineStart: function() {
        stream.lineStart();
      },
      lineEnd: function() {
        stream.lineEnd();
      },
      polygonStart: function() {
        stream.polygonStart();
      },
      polygonEnd: function() {
        stream.polygonEnd();
      }
    };
  }
  function d3_geo_equirectangular(λ, φ) {
    return [ λ, φ ];
  }
  (d3.geo.equirectangular = function() {
    return d3_geo_projection(d3_geo_equirectangular);
  }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
  d3.geo.rotation = function(rotate) {
    rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);
    function forward(coordinates) {
      coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    }
    forward.invert = function(coordinates) {
      coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    };
    return forward;
  };
  function d3_geo_rotation(δλ, δφ, δγ) {
    return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_equirectangular;
  }
  function d3_geo_forwardRotationλ(δλ) {
    return function(λ, φ) {
      return λ += δλ, [ λ > π ? λ - 2 * π : λ < -π ? λ + 2 * π : λ, φ ];
    };
  }
  function d3_geo_rotationλ(δλ) {
    var rotation = d3_geo_forwardRotationλ(δλ);
    rotation.invert = d3_geo_forwardRotationλ(-δλ);
    return rotation;
  }
  function d3_geo_rotationφγ(δφ, δγ) {
    var cosδφ = Math.cos(δφ), sinδφ = Math.sin(δφ), cosδγ = Math.cos(δγ), sinδγ = Math.sin(δγ);
    function rotation(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδφ + x * sinδφ;
      return [ Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), d3_asin(k * cosδγ + y * sinδγ) ];
    }
    rotation.invert = function(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδγ - y * sinδγ;
      return [ Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ), d3_asin(k * cosδφ - x * sinδφ) ];
    };
    return rotation;
  }
  d3.geo.circle = function() {
    var origin = [ 0, 0 ], angle, precision = 6, interpolate;
    function circle() {
      var center = typeof origin === "function" ? origin.apply(this, arguments) : origin, rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert, ring = [];
      interpolate(null, null, 1, {
        point: function(x, y) {
          ring.push(x = rotate(x, y));
          x[0] *= d3_degrees, x[1] *= d3_degrees;
        }
      });
      return {
        type: "Polygon",
        coordinates: [ ring ]
      };
    }
    circle.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return circle;
    };
    circle.angle = function(x) {
      if (!arguments.length) return angle;
      interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
      return circle;
    };
    circle.precision = function(_) {
      if (!arguments.length) return precision;
      interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
      return circle;
    };
    return circle.angle(90);
  };
  function d3_geo_circleInterpolate(radius, precision) {
    var cr = Math.cos(radius), sr = Math.sin(radius);
    return function(from, to, direction, listener) {
      if (from != null) {
        from = d3_geo_circleAngle(cr, from);
        to = d3_geo_circleAngle(cr, to);
        if (direction > 0 ? from < to : from > to) from += direction * 2 * π;
      } else {
        from = radius + direction * 2 * π;
        to = radius;
      }
      var point;
      for (var step = direction * precision, t = from; direction > 0 ? t > to : t < to; t -= step) {
        listener.point((point = d3_geo_spherical([ cr, -sr * Math.cos(t), -sr * Math.sin(t) ]))[0], point[1]);
      }
    };
  }
  function d3_geo_circleAngle(cr, point) {
    var a = d3_geo_cartesian(point);
    a[0] -= cr;
    d3_geo_cartesianNormalize(a);
    var angle = d3_acos(-a[1]);
    return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
  }
  d3.geo.distance = function(a, b) {
    var Δλ = (b[0] - a[0]) * d3_radians, φ0 = a[1] * d3_radians, φ1 = b[1] * d3_radians, sinΔλ = Math.sin(Δλ), cosΔλ = Math.cos(Δλ), sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1), t;
    return Math.atan2(Math.sqrt((t = cosφ1 * sinΔλ) * t + (t = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * t), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ);
  };
  d3.geo.graticule = function() {
    var x1, x0, X1, X0, y1, y0, Y1, Y0, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
    function graticule() {
      return {
        type: "MultiLineString",
        coordinates: lines()
      };
    }
    function lines() {
      return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) {
        return Math.abs(x % DX) > ε;
      }).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function(y) {
        return Math.abs(y % DY) > ε;
      }).map(y));
    }
    graticule.lines = function() {
      return lines().map(function(coordinates) {
        return {
          type: "LineString",
          coordinates: coordinates
        };
      });
    };
    graticule.outline = function() {
      return {
        type: "Polygon",
        coordinates: [ X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1)) ]
      };
    };
    graticule.extent = function(_) {
      if (!arguments.length) return graticule.minorExtent();
      return graticule.majorExtent(_).minorExtent(_);
    };
    graticule.majorExtent = function(_) {
      if (!arguments.length) return [ [ X0, Y0 ], [ X1, Y1 ] ];
      X0 = +_[0][0], X1 = +_[1][0];
      Y0 = +_[0][1], Y1 = +_[1][1];
      if (X0 > X1) _ = X0, X0 = X1, X1 = _;
      if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
      return graticule.precision(precision);
    };
    graticule.minorExtent = function(_) {
      if (!arguments.length) return [ [ x0, y0 ], [ x1, y1 ] ];
      x0 = +_[0][0], x1 = +_[1][0];
      y0 = +_[0][1], y1 = +_[1][1];
      if (x0 > x1) _ = x0, x0 = x1, x1 = _;
      if (y0 > y1) _ = y0, y0 = y1, y1 = _;
      return graticule.precision(precision);
    };
    graticule.step = function(_) {
      if (!arguments.length) return graticule.minorStep();
      return graticule.majorStep(_).minorStep(_);
    };
    graticule.majorStep = function(_) {
      if (!arguments.length) return [ DX, DY ];
      DX = +_[0], DY = +_[1];
      return graticule;
    };
    graticule.minorStep = function(_) {
      if (!arguments.length) return [ dx, dy ];
      dx = +_[0], dy = +_[1];
      return graticule;
    };
    graticule.precision = function(_) {
      if (!arguments.length) return precision;
      precision = +_;
      x = d3_geo_graticuleX(y0, y1, 90);
      y = d3_geo_graticuleY(x0, x1, precision);
      X = d3_geo_graticuleX(Y0, Y1, 90);
      Y = d3_geo_graticuleY(X0, X1, precision);
      return graticule;
    };
    return graticule.majorExtent([ [ -180, -90 + ε ], [ 180, 90 - ε ] ]).minorExtent([ [ -180, -80 - ε ], [ 180, 80 + ε ] ]);
  };
  function d3_geo_graticuleX(y0, y1, dy) {
    var y = d3.range(y0, y1 - ε, dy).concat(y1);
    return function(x) {
      return y.map(function(y) {
        return [ x, y ];
      });
    };
  }
  function d3_geo_graticuleY(x0, x1, dx) {
    var x = d3.range(x0, x1 - ε, dx).concat(x1);
    return function(y) {
      return x.map(function(x) {
        return [ x, y ];
      });
    };
  }
  function d3_source(d) {
    return d.source;
  }
  function d3_target(d) {
    return d.target;
  }
  d3.geo.greatArc = function() {
    var source = d3_source, source_, target = d3_target, target_;
    function greatArc() {
      return {
        type: "LineString",
        coordinates: [ source_ || source.apply(this, arguments), target_ || target.apply(this, arguments) ]
      };
    }
    greatArc.distance = function() {
      return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments));
    };
    greatArc.source = function(_) {
      if (!arguments.length) return source;
      source = _, source_ = typeof _ === "function" ? null : _;
      return greatArc;
    };
    greatArc.target = function(_) {
      if (!arguments.length) return target;
      target = _, target_ = typeof _ === "function" ? null : _;
      return greatArc;
    };
    greatArc.precision = function() {
      return arguments.length ? greatArc : 0;
    };
    return greatArc;
  };
  d3.geo.interpolate = function(source, target) {
    return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
  };
  function d3_geo_interpolate(x0, y0, x1, y1) {
    var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1), ky1 = cy1 * Math.sin(x1), d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))), k = 1 / Math.sin(d);
    var interpolate = d ? function(t) {
      var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
      return [ Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees ];
    } : function() {
      return [ x0 * d3_degrees, y0 * d3_degrees ];
    };
    interpolate.distance = d;
    return interpolate;
  }
  d3.geo.length = function(object) {
    d3_geo_lengthSum = 0;
    d3.geo.stream(object, d3_geo_length);
    return d3_geo_lengthSum;
  };
  var d3_geo_lengthSum;
  var d3_geo_length = {
    sphere: d3_noop,
    point: d3_noop,
    lineStart: d3_geo_lengthLineStart,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop
  };
  function d3_geo_lengthLineStart() {
    var λ0, sinφ0, cosφ0;
    d3_geo_length.point = function(λ, φ) {
      λ0 = λ * d3_radians, sinφ0 = Math.sin(φ *= d3_radians), cosφ0 = Math.cos(φ);
      d3_geo_length.point = nextPoint;
    };
    d3_geo_length.lineEnd = function() {
      d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
    };
    function nextPoint(λ, φ) {
      var sinφ = Math.sin(φ *= d3_radians), cosφ = Math.cos(φ), t = Math.abs((λ *= d3_radians) - λ0), cosΔλ = Math.cos(t);
      d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosφ * Math.sin(t)) * t + (t = cosφ0 * sinφ - sinφ0 * cosφ * cosΔλ) * t), sinφ0 * sinφ + cosφ0 * cosφ * cosΔλ);
      λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ;
    }
  }
  function d3_geo_azimuthal(scale, angle) {
    function azimuthal(λ, φ) {
      var cosλ = Math.cos(λ), cosφ = Math.cos(φ), k = scale(cosλ * cosφ);
      return [ k * cosφ * Math.sin(λ), k * Math.sin(φ) ];
    }
    azimuthal.invert = function(x, y) {
      var ρ = Math.sqrt(x * x + y * y), c = angle(ρ), sinc = Math.sin(c), cosc = Math.cos(c);
      return [ Math.atan2(x * sinc, ρ * cosc), Math.asin(ρ && y * sinc / ρ) ];
    };
    return azimuthal;
  }
  var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cosλcosφ) {
    return Math.sqrt(2 / (1 + cosλcosφ));
  }, function(ρ) {
    return 2 * Math.asin(ρ / 2);
  });
  (d3.geo.azimuthalEqualArea = function() {
    return d3_geo_projection(d3_geo_azimuthalEqualArea);
  }).raw = d3_geo_azimuthalEqualArea;
  var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cosλcosφ) {
    var c = Math.acos(cosλcosφ);
    return c && c / Math.sin(c);
  }, d3_identity);
  (d3.geo.azimuthalEquidistant = function() {
    return d3_geo_projection(d3_geo_azimuthalEquidistant);
  }).raw = d3_geo_azimuthalEquidistant;
  function d3_geo_conicConformal(φ0, φ1) {
    var cosφ0 = Math.cos(φ0), t = function(φ) {
      return Math.tan(π / 4 + φ / 2);
    }, n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)), F = cosφ0 * Math.pow(t(φ0), n) / n;
    if (!n) return d3_geo_mercator;
    function forward(λ, φ) {
      var ρ = Math.abs(Math.abs(φ) - π / 2) < ε ? 0 : F / Math.pow(t(φ), n);
      return [ ρ * Math.sin(n * λ), F - ρ * Math.cos(n * λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = F - y, ρ = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
      return [ Math.atan2(x, ρ0_y) / n, 2 * Math.atan(Math.pow(F / ρ, 1 / n)) - π / 2 ];
    };
    return forward;
  }
  (d3.geo.conicConformal = function() {
    return d3_geo_conic(d3_geo_conicConformal);
  }).raw = d3_geo_conicConformal;
  function d3_geo_conicEquidistant(φ0, φ1) {
    var cosφ0 = Math.cos(φ0), n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0), G = cosφ0 / n + φ0;
    if (Math.abs(n) < ε) return d3_geo_equirectangular;
    function forward(λ, φ) {
      var ρ = G - φ;
      return [ ρ * Math.sin(n * λ), G - ρ * Math.cos(n * λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = G - y;
      return [ Math.atan2(x, ρ0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y) ];
    };
    return forward;
  }
  (d3.geo.conicEquidistant = function() {
    return d3_geo_conic(d3_geo_conicEquidistant);
  }).raw = d3_geo_conicEquidistant;
  var d3_geo_gnomonic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / cosλcosφ;
  }, Math.atan);
  (d3.geo.gnomonic = function() {
    return d3_geo_projection(d3_geo_gnomonic);
  }).raw = d3_geo_gnomonic;
  function d3_geo_mercator(λ, φ) {
    return [ λ, Math.log(Math.tan(π / 4 + φ / 2)) ];
  }
  d3_geo_mercator.invert = function(x, y) {
    return [ x, 2 * Math.atan(Math.exp(y)) - π / 2 ];
  };
  function d3_geo_mercatorProjection(project) {
    var m = d3_geo_projection(project), scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, clipAuto;
    m.scale = function() {
      var v = scale.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };
    m.translate = function() {
      var v = translate.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };
    m.clipExtent = function(_) {
      var v = clipExtent.apply(m, arguments);
      if (v === m) {
        if (clipAuto = _ == null) {
          var k = π * scale(), t = translate();
          clipExtent([ [ t[0] - k, t[1] - k ], [ t[0] + k, t[1] + k ] ]);
        }
      } else if (clipAuto) {
        v = null;
      }
      return v;
    };
    return m.clipExtent(null);
  }
  (d3.geo.mercator = function() {
    return d3_geo_mercatorProjection(d3_geo_mercator);
  }).raw = d3_geo_mercator;
  var d3_geo_orthographic = d3_geo_azimuthal(function() {
    return 1;
  }, Math.asin);
  (d3.geo.orthographic = function() {
    return d3_geo_projection(d3_geo_orthographic);
  }).raw = d3_geo_orthographic;
  var d3_geo_stereographic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / (1 + cosλcosφ);
  }, function(ρ) {
    return 2 * Math.atan(ρ);
  });
  (d3.geo.stereographic = function() {
    return d3_geo_projection(d3_geo_stereographic);
  }).raw = d3_geo_stereographic;
  function d3_geo_transverseMercator(λ, φ) {
    var B = Math.cos(φ) * Math.sin(λ);
    return [ Math.log((1 + B) / (1 - B)) / 2, Math.atan2(Math.tan(φ), Math.cos(λ)) ];
  }
  d3_geo_transverseMercator.invert = function(x, y) {
    return [ Math.atan2(d3_sinh(x), Math.cos(y)), d3_asin(Math.sin(y) / d3_cosh(x)) ];
  };
  (d3.geo.transverseMercator = function() {
    return d3_geo_mercatorProjection(d3_geo_transverseMercator);
  }).raw = d3_geo_transverseMercator;
  d3.geom = {};
  d3.svg = {};
  function d3_svg_line(projection) {
    var x = d3_svg_lineX, y = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = .7;
    function line(data) {
      var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
      function segment() {
        segments.push("M", interpolate(projection(points), tension));
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points.push([ +fx.call(this, d, i), +fy.call(this, d, i) ]);
        } else if (points.length) {
          segment();
          points = [];
        }
      }
      if (points.length) segment();
      return segments.length ? segments.join("") : null;
    }
    line.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      return line;
    };
    line.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return line;
    };
    line.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return line;
    };
    line.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      return line;
    };
    line.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return line;
    };
    return line;
  }
  d3.svg.line = function() {
    return d3_svg_line(d3_identity);
  };
  function d3_svg_lineX(d) {
    return d[0];
  }
  function d3_svg_lineY(d) {
    return d[1];
  }
  var d3_svg_lineInterpolators = d3.map({
    linear: d3_svg_lineLinear,
    "linear-closed": d3_svg_lineLinearClosed,
    step: d3_svg_lineStep,
    "step-before": d3_svg_lineStepBefore,
    "step-after": d3_svg_lineStepAfter,
    basis: d3_svg_lineBasis,
    "basis-open": d3_svg_lineBasisOpen,
    "basis-closed": d3_svg_lineBasisClosed,
    bundle: d3_svg_lineBundle,
    cardinal: d3_svg_lineCardinal,
    "cardinal-open": d3_svg_lineCardinalOpen,
    "cardinal-closed": d3_svg_lineCardinalClosed,
    monotone: d3_svg_lineMonotone
  });
  d3_svg_lineInterpolators.forEach(function(key, value) {
    value.key = key;
    value.closed = /-closed$/.test(key);
  });
  function d3_svg_lineLinear(points) {
    return points.join("L");
  }
  function d3_svg_lineLinearClosed(points) {
    return d3_svg_lineLinear(points) + "Z";
  }
  function d3_svg_lineStep(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);
    if (n > 1) path.push("H", p[0]);
    return path.join("");
  }
  function d3_svg_lineStepBefore(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
    return path.join("");
  }
  function d3_svg_lineStepAfter(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
    return path.join("");
  }
  function d3_svg_lineCardinalOpen(points, tension) {
    return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1), d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineCardinalClosed(points, tension) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), 
    points), d3_svg_lineCardinalTangents([ points[points.length - 2] ].concat(points, [ points[1] ]), tension));
  }
  function d3_svg_lineCardinal(points, tension) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineHermite(points, tangents) {
    if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
      return d3_svg_lineLinear(points);
    }
    var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
    if (quad) {
      path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
      p0 = points[1];
      pi = 2;
    }
    if (tangents.length > 1) {
      t = tangents[1];
      p = points[pi];
      pi++;
      path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      for (var i = 2; i < tangents.length; i++, pi++) {
        p = points[pi];
        t = tangents[i];
        path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      }
    }
    if (quad) {
      var lp = points[pi];
      path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
    }
    return path;
  }
  function d3_svg_lineCardinalTangents(points, tension) {
    var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
    while (++i < n) {
      p0 = p1;
      p1 = p2;
      p2 = points[i];
      tangents.push([ a * (p2[0] - p0[0]), a * (p2[1] - p0[1]) ]);
    }
    return tangents;
  }
  function d3_svg_lineBasis(points) {
    if (points.length < 3) return d3_svg_lineLinear(points);
    var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [ x0, x0, x0, (pi = points[1])[0] ], py = [ y0, y0, y0, pi[1] ], path = [ x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
    points.push(points[n - 1]);
    while (++i <= n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    points.pop();
    path.push("L", pi);
    return path.join("");
  }
  function d3_svg_lineBasisOpen(points) {
    if (points.length < 4) return d3_svg_lineLinear(points);
    var path = [], i = -1, n = points.length, pi, px = [ 0 ], py = [ 0 ];
    while (++i < 3) {
      pi = points[i];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
    --i;
    while (++i < n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBasisClosed(points) {
    var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
    while (++i < 4) {
      pi = points[i % n];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path = [ d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
    --i;
    while (++i < m) {
      pi = points[i % n];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBundle(points, tension) {
    var n = points.length - 1;
    if (n) {
      var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
      while (++i <= n) {
        p = points[i];
        t = i / n;
        p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
        p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
      }
    }
    return d3_svg_lineBasis(points);
  }
  function d3_svg_lineDot4(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  var d3_svg_lineBasisBezier1 = [ 0, 2 / 3, 1 / 3, 0 ], d3_svg_lineBasisBezier2 = [ 0, 1 / 3, 2 / 3, 0 ], d3_svg_lineBasisBezier3 = [ 0, 1 / 6, 2 / 3, 1 / 6 ];
  function d3_svg_lineBasisBezier(path, x, y) {
    path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
  }
  function d3_svg_lineSlope(p0, p1) {
    return (p1[1] - p0[1]) / (p1[0] - p0[0]);
  }
  function d3_svg_lineFiniteDifferences(points) {
    var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
    while (++i < j) {
      m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
    }
    m[i] = d;
    return m;
  }
  function d3_svg_lineMonotoneTangents(points) {
    var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
    while (++i < j) {
      d = d3_svg_lineSlope(points[i], points[i + 1]);
      if (Math.abs(d) < 1e-6) {
        m[i] = m[i + 1] = 0;
      } else {
        a = m[i] / d;
        b = m[i + 1] / d;
        s = a * a + b * b;
        if (s > 9) {
          s = d * 3 / Math.sqrt(s);
          m[i] = s * a;
          m[i + 1] = s * b;
        }
      }
    }
    i = -1;
    while (++i <= j) {
      s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
      tangents.push([ s || 0, m[i] * s || 0 ]);
    }
    return tangents;
  }
  function d3_svg_lineMonotone(points) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
  }
  d3.geom.hull = function(vertices) {
    var x = d3_svg_lineX, y = d3_svg_lineY;
    if (arguments.length) return hull(vertices);
    function hull(data) {
      if (data.length < 3) return [];
      var fx = d3_functor(x), fy = d3_functor(y), n = data.length, vertices, plen = n - 1, points = [], stack = [], d, i, j, h = 0, x1, y1, x2, y2, u, v, a, sp;
      if (fx === d3_svg_lineX && y === d3_svg_lineY) vertices = data; else for (i = 0, 
      vertices = []; i < n; ++i) {
        vertices.push([ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ]);
      }
      for (i = 1; i < n; ++i) {
        if (vertices[i][1] < vertices[h][1] || vertices[i][1] == vertices[h][1] && vertices[i][0] < vertices[h][0]) h = i;
      }
      for (i = 0; i < n; ++i) {
        if (i === h) continue;
        y1 = vertices[i][1] - vertices[h][1];
        x1 = vertices[i][0] - vertices[h][0];
        points.push({
          angle: Math.atan2(y1, x1),
          index: i
        });
      }
      points.sort(function(a, b) {
        return a.angle - b.angle;
      });
      a = points[0].angle;
      v = points[0].index;
      u = 0;
      for (i = 1; i < plen; ++i) {
        j = points[i].index;
        if (a == points[i].angle) {
          x1 = vertices[v][0] - vertices[h][0];
          y1 = vertices[v][1] - vertices[h][1];
          x2 = vertices[j][0] - vertices[h][0];
          y2 = vertices[j][1] - vertices[h][1];
          if (x1 * x1 + y1 * y1 >= x2 * x2 + y2 * y2) {
            points[i].index = -1;
            continue;
          } else {
            points[u].index = -1;
          }
        }
        a = points[i].angle;
        u = i;
        v = j;
      }
      stack.push(h);
      for (i = 0, j = 0; i < 2; ++j) {
        if (points[j].index > -1) {
          stack.push(points[j].index);
          i++;
        }
      }
      sp = stack.length;
      for (;j < plen; ++j) {
        if (points[j].index < 0) continue;
        while (!d3_geom_hullCCW(stack[sp - 2], stack[sp - 1], points[j].index, vertices)) {
          --sp;
        }
        stack[sp++] = points[j].index;
      }
      var poly = [];
      for (i = sp - 1; i >= 0; --i) poly.push(data[stack[i]]);
      return poly;
    }
    hull.x = function(_) {
      return arguments.length ? (x = _, hull) : x;
    };
    hull.y = function(_) {
      return arguments.length ? (y = _, hull) : y;
    };
    return hull;
  };
  function d3_geom_hullCCW(i1, i2, i3, v) {
    var t, a, b, c, d, e, f;
    t = v[i1];
    a = t[0];
    b = t[1];
    t = v[i2];
    c = t[0];
    d = t[1];
    t = v[i3];
    e = t[0];
    f = t[1];
    return (f - b) * (c - a) - (d - b) * (e - a) > 0;
  }
  d3.geom.polygon = function(coordinates) {
    d3_subclass(coordinates, d3_geom_polygonPrototype);
    return coordinates;
  };
  var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];
  d3_geom_polygonPrototype.area = function() {
    var i = -1, n = this.length, a, b = this[n - 1], area = 0;
    while (++i < n) {
      a = b;
      b = this[i];
      area += a[1] * b[0] - a[0] * b[1];
    }
    return area * .5;
  };
  d3_geom_polygonPrototype.centroid = function(k) {
    var i = -1, n = this.length, x = 0, y = 0, a, b = this[n - 1], c;
    if (!arguments.length) k = -1 / (6 * this.area());
    while (++i < n) {
      a = b;
      b = this[i];
      c = a[0] * b[1] - b[0] * a[1];
      x += (a[0] + b[0]) * c;
      y += (a[1] + b[1]) * c;
    }
    return [ x * k, y * k ];
  };
  d3_geom_polygonPrototype.clip = function(subject) {
    var input, closed = d3_geom_polygonClosed(subject), i = -1, n = this.length - d3_geom_polygonClosed(this), j, m, a = this[n - 1], b, c, d;
    while (++i < n) {
      input = subject.slice();
      subject.length = 0;
      b = this[i];
      c = input[(m = input.length - closed) - 1];
      j = -1;
      while (++j < m) {
        d = input[j];
        if (d3_geom_polygonInside(d, a, b)) {
          if (!d3_geom_polygonInside(c, a, b)) {
            subject.push(d3_geom_polygonIntersect(c, d, a, b));
          }
          subject.push(d);
        } else if (d3_geom_polygonInside(c, a, b)) {
          subject.push(d3_geom_polygonIntersect(c, d, a, b));
        }
        c = d;
      }
      if (closed) subject.push(subject[0]);
      a = b;
    }
    return subject;
  };
  function d3_geom_polygonInside(p, a, b) {
    return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
  }
  function d3_geom_polygonIntersect(c, d, a, b) {
    var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
    return [ x1 + ua * x21, y1 + ua * y21 ];
  }
  function d3_geom_polygonClosed(coordinates) {
    var a = coordinates[0], b = coordinates[coordinates.length - 1];
    return !(a[0] - b[0] || a[1] - b[1]);
  }
  d3.geom.delaunay = function(vertices) {
    var edges = vertices.map(function() {
      return [];
    }), triangles = [];
    d3_geom_voronoiTessellate(vertices, function(e) {
      edges[e.region.l.index].push(vertices[e.region.r.index]);
    });
    edges.forEach(function(edge, i) {
      var v = vertices[i], cx = v[0], cy = v[1];
      edge.forEach(function(v) {
        v.angle = Math.atan2(v[0] - cx, v[1] - cy);
      });
      edge.sort(function(a, b) {
        return a.angle - b.angle;
      });
      for (var j = 0, m = edge.length - 1; j < m; j++) {
        triangles.push([ v, edge[j], edge[j + 1] ]);
      }
    });
    return triangles;
  };
  d3.geom.voronoi = function(points) {
    var x = d3_svg_lineX, y = d3_svg_lineY, clipPolygon = null;
    if (arguments.length) return voronoi(points);
    function voronoi(data) {
      var points, polygons = data.map(function() {
        return [];
      }), fx = d3_functor(x), fy = d3_functor(y), d, i, n = data.length, Z = 1e6;
      if (fx === d3_svg_lineX && fy === d3_svg_lineY) points = data; else for (points = new Array(n), 
      i = 0; i < n; ++i) {
        points[i] = [ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ];
      }
      d3_geom_voronoiTessellate(points, function(e) {
        var s1, s2, x1, x2, y1, y2;
        if (e.a === 1 && e.b >= 0) {
          s1 = e.ep.r;
          s2 = e.ep.l;
        } else {
          s1 = e.ep.l;
          s2 = e.ep.r;
        }
        if (e.a === 1) {
          y1 = s1 ? s1.y : -Z;
          x1 = e.c - e.b * y1;
          y2 = s2 ? s2.y : Z;
          x2 = e.c - e.b * y2;
        } else {
          x1 = s1 ? s1.x : -Z;
          y1 = e.c - e.a * x1;
          x2 = s2 ? s2.x : Z;
          y2 = e.c - e.a * x2;
        }
        var v1 = [ x1, y1 ], v2 = [ x2, y2 ];
        polygons[e.region.l.index].push(v1, v2);
        polygons[e.region.r.index].push(v1, v2);
      });
      polygons = polygons.map(function(polygon, i) {
        var cx = points[i][0], cy = points[i][1], angle = polygon.map(function(v) {
          return Math.atan2(v[0] - cx, v[1] - cy);
        }), order = d3.range(polygon.length).sort(function(a, b) {
          return angle[a] - angle[b];
        });
        return order.filter(function(d, i) {
          return !i || angle[d] - angle[order[i - 1]] > ε;
        }).map(function(d) {
          return polygon[d];
        });
      });
      polygons.forEach(function(polygon, i) {
        var n = polygon.length;
        if (!n) return polygon.push([ -Z, -Z ], [ -Z, Z ], [ Z, Z ], [ Z, -Z ]);
        if (n > 2) return;
        var p0 = points[i], p1 = polygon[0], p2 = polygon[1], x0 = p0[0], y0 = p0[1], x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1], dx = Math.abs(x2 - x1), dy = y2 - y1;
        if (Math.abs(dy) < ε) {
          var y = y0 < y1 ? -Z : Z;
          polygon.push([ -Z, y ], [ Z, y ]);
        } else if (dx < ε) {
          var x = x0 < x1 ? -Z : Z;
          polygon.push([ x, -Z ], [ x, Z ]);
        } else {
          var y = (x2 - x1) * (y1 - y0) < (x1 - x0) * (y2 - y1) ? Z : -Z, z = Math.abs(dy) - dx;
          if (Math.abs(z) < ε) {
            polygon.push([ dy < 0 ? y : -y, y ]);
          } else {
            if (z > 0) y *= -1;
            polygon.push([ -Z, y ], [ Z, y ]);
          }
        }
      });
      if (clipPolygon) for (i = 0; i < n; ++i) clipPolygon.clip(polygons[i]);
      for (i = 0; i < n; ++i) polygons[i].point = data[i];
      return polygons;
    }
    voronoi.x = function(_) {
      return arguments.length ? (x = _, voronoi) : x;
    };
    voronoi.y = function(_) {
      return arguments.length ? (y = _, voronoi) : y;
    };
    voronoi.clipExtent = function(_) {
      if (!arguments.length) return clipPolygon && [ clipPolygon[0], clipPolygon[2] ];
      if (_ == null) clipPolygon = null; else {
        var x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], y2 = +_[1][1];
        clipPolygon = d3.geom.polygon([ [ x1, y1 ], [ x1, y2 ], [ x2, y2 ], [ x2, y1 ] ]);
      }
      return voronoi;
    };
    voronoi.size = function(_) {
      if (!arguments.length) return clipPolygon && clipPolygon[2];
      return voronoi.clipExtent(_ && [ [ 0, 0 ], _ ]);
    };
    voronoi.links = function(data) {
      var points, graph = data.map(function() {
        return [];
      }), links = [], fx = d3_functor(x), fy = d3_functor(y), d, i, n = data.length;
      if (fx === d3_svg_lineX && fy === d3_svg_lineY) points = data; else for (points = new Array(n), 
      i = 0; i < n; ++i) {
        points[i] = [ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ];
      }
      d3_geom_voronoiTessellate(points, function(e) {
        var l = e.region.l.index, r = e.region.r.index;
        if (graph[l][r]) return;
        graph[l][r] = graph[r][l] = true;
        links.push({
          source: data[l],
          target: data[r]
        });
      });
      return links;
    };
    voronoi.triangles = function(data) {
      if (x === d3_svg_lineX && y === d3_svg_lineY) return d3.geom.delaunay(data);
      var points = new Array(n), fx = d3_functor(x), fy = d3_functor(y), d, i = -1, n = data.length;
      while (++i < n) {
        (points[i] = [ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ]).data = d;
      }
      return d3.geom.delaunay(points).map(function(triangle) {
        return triangle.map(function(point) {
          return point.data;
        });
      });
    };
    return voronoi;
  };
  var d3_geom_voronoiOpposite = {
    l: "r",
    r: "l"
  };
  function d3_geom_voronoiTessellate(points, callback) {
    var Sites = {
      list: points.map(function(v, i) {
        return {
          index: i,
          x: v[0],
          y: v[1]
        };
      }).sort(function(a, b) {
        return a.y < b.y ? -1 : a.y > b.y ? 1 : a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
      }),
      bottomSite: null
    };
    var EdgeList = {
      list: [],
      leftEnd: null,
      rightEnd: null,
      init: function() {
        EdgeList.leftEnd = EdgeList.createHalfEdge(null, "l");
        EdgeList.rightEnd = EdgeList.createHalfEdge(null, "l");
        EdgeList.leftEnd.r = EdgeList.rightEnd;
        EdgeList.rightEnd.l = EdgeList.leftEnd;
        EdgeList.list.unshift(EdgeList.leftEnd, EdgeList.rightEnd);
      },
      createHalfEdge: function(edge, side) {
        return {
          edge: edge,
          side: side,
          vertex: null,
          l: null,
          r: null
        };
      },
      insert: function(lb, he) {
        he.l = lb;
        he.r = lb.r;
        lb.r.l = he;
        lb.r = he;
      },
      leftBound: function(p) {
        var he = EdgeList.leftEnd;
        do {
          he = he.r;
        } while (he != EdgeList.rightEnd && Geom.rightOf(he, p));
        he = he.l;
        return he;
      },
      del: function(he) {
        he.l.r = he.r;
        he.r.l = he.l;
        he.edge = null;
      },
      right: function(he) {
        return he.r;
      },
      left: function(he) {
        return he.l;
      },
      leftRegion: function(he) {
        return he.edge == null ? Sites.bottomSite : he.edge.region[he.side];
      },
      rightRegion: function(he) {
        return he.edge == null ? Sites.bottomSite : he.edge.region[d3_geom_voronoiOpposite[he.side]];
      }
    };
    var Geom = {
      bisect: function(s1, s2) {
        var newEdge = {
          region: {
            l: s1,
            r: s2
          },
          ep: {
            l: null,
            r: null
          }
        };
        var dx = s2.x - s1.x, dy = s2.y - s1.y, adx = dx > 0 ? dx : -dx, ady = dy > 0 ? dy : -dy;
        newEdge.c = s1.x * dx + s1.y * dy + (dx * dx + dy * dy) * .5;
        if (adx > ady) {
          newEdge.a = 1;
          newEdge.b = dy / dx;
          newEdge.c /= dx;
        } else {
          newEdge.b = 1;
          newEdge.a = dx / dy;
          newEdge.c /= dy;
        }
        return newEdge;
      },
      intersect: function(el1, el2) {
        var e1 = el1.edge, e2 = el2.edge;
        if (!e1 || !e2 || e1.region.r == e2.region.r) {
          return null;
        }
        var d = e1.a * e2.b - e1.b * e2.a;
        if (Math.abs(d) < 1e-10) {
          return null;
        }
        var xint = (e1.c * e2.b - e2.c * e1.b) / d, yint = (e2.c * e1.a - e1.c * e2.a) / d, e1r = e1.region.r, e2r = e2.region.r, el, e;
        if (e1r.y < e2r.y || e1r.y == e2r.y && e1r.x < e2r.x) {
          el = el1;
          e = e1;
        } else {
          el = el2;
          e = e2;
        }
        var rightOfSite = xint >= e.region.r.x;
        if (rightOfSite && el.side === "l" || !rightOfSite && el.side === "r") {
          return null;
        }
        return {
          x: xint,
          y: yint
        };
      },
      rightOf: function(he, p) {
        var e = he.edge, topsite = e.region.r, rightOfSite = p.x > topsite.x;
        if (rightOfSite && he.side === "l") {
          return 1;
        }
        if (!rightOfSite && he.side === "r") {
          return 0;
        }
        if (e.a === 1) {
          var dyp = p.y - topsite.y, dxp = p.x - topsite.x, fast = 0, above = 0;
          if (!rightOfSite && e.b < 0 || rightOfSite && e.b >= 0) {
            above = fast = dyp >= e.b * dxp;
          } else {
            above = p.x + p.y * e.b > e.c;
            if (e.b < 0) {
              above = !above;
            }
            if (!above) {
              fast = 1;
            }
          }
          if (!fast) {
            var dxs = topsite.x - e.region.l.x;
            above = e.b * (dxp * dxp - dyp * dyp) < dxs * dyp * (1 + 2 * dxp / dxs + e.b * e.b);
            if (e.b < 0) {
              above = !above;
            }
          }
        } else {
          var yl = e.c - e.a * p.x, t1 = p.y - yl, t2 = p.x - topsite.x, t3 = yl - topsite.y;
          above = t1 * t1 > t2 * t2 + t3 * t3;
        }
        return he.side === "l" ? above : !above;
      },
      endPoint: function(edge, side, site) {
        edge.ep[side] = site;
        if (!edge.ep[d3_geom_voronoiOpposite[side]]) return;
        callback(edge);
      },
      distance: function(s, t) {
        var dx = s.x - t.x, dy = s.y - t.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    };
    var EventQueue = {
      list: [],
      insert: function(he, site, offset) {
        he.vertex = site;
        he.ystar = site.y + offset;
        for (var i = 0, list = EventQueue.list, l = list.length; i < l; i++) {
          var next = list[i];
          if (he.ystar > next.ystar || he.ystar == next.ystar && site.x > next.vertex.x) {
            continue;
          } else {
            break;
          }
        }
        list.splice(i, 0, he);
      },
      del: function(he) {
        for (var i = 0, ls = EventQueue.list, l = ls.length; i < l && ls[i] != he; ++i) {}
        ls.splice(i, 1);
      },
      empty: function() {
        return EventQueue.list.length === 0;
      },
      nextEvent: function(he) {
        for (var i = 0, ls = EventQueue.list, l = ls.length; i < l; ++i) {
          if (ls[i] == he) return ls[i + 1];
        }
        return null;
      },
      min: function() {
        var elem = EventQueue.list[0];
        return {
          x: elem.vertex.x,
          y: elem.ystar
        };
      },
      extractMin: function() {
        return EventQueue.list.shift();
      }
    };
    EdgeList.init();
    Sites.bottomSite = Sites.list.shift();
    var newSite = Sites.list.shift(), newIntStar;
    var lbnd, rbnd, llbnd, rrbnd, bisector;
    var bot, top, temp, p, v;
    var e, pm;
    while (true) {
      if (!EventQueue.empty()) {
        newIntStar = EventQueue.min();
      }
      if (newSite && (EventQueue.empty() || newSite.y < newIntStar.y || newSite.y == newIntStar.y && newSite.x < newIntStar.x)) {
        lbnd = EdgeList.leftBound(newSite);
        rbnd = EdgeList.right(lbnd);
        bot = EdgeList.rightRegion(lbnd);
        e = Geom.bisect(bot, newSite);
        bisector = EdgeList.createHalfEdge(e, "l");
        EdgeList.insert(lbnd, bisector);
        p = Geom.intersect(lbnd, bisector);
        if (p) {
          EventQueue.del(lbnd);
          EventQueue.insert(lbnd, p, Geom.distance(p, newSite));
        }
        lbnd = bisector;
        bisector = EdgeList.createHalfEdge(e, "r");
        EdgeList.insert(lbnd, bisector);
        p = Geom.intersect(bisector, rbnd);
        if (p) {
          EventQueue.insert(bisector, p, Geom.distance(p, newSite));
        }
        newSite = Sites.list.shift();
      } else if (!EventQueue.empty()) {
        lbnd = EventQueue.extractMin();
        llbnd = EdgeList.left(lbnd);
        rbnd = EdgeList.right(lbnd);
        rrbnd = EdgeList.right(rbnd);
        bot = EdgeList.leftRegion(lbnd);
        top = EdgeList.rightRegion(rbnd);
        v = lbnd.vertex;
        Geom.endPoint(lbnd.edge, lbnd.side, v);
        Geom.endPoint(rbnd.edge, rbnd.side, v);
        EdgeList.del(lbnd);
        EventQueue.del(rbnd);
        EdgeList.del(rbnd);
        pm = "l";
        if (bot.y > top.y) {
          temp = bot;
          bot = top;
          top = temp;
          pm = "r";
        }
        e = Geom.bisect(bot, top);
        bisector = EdgeList.createHalfEdge(e, pm);
        EdgeList.insert(llbnd, bisector);
        Geom.endPoint(e, d3_geom_voronoiOpposite[pm], v);
        p = Geom.intersect(llbnd, bisector);
        if (p) {
          EventQueue.del(llbnd);
          EventQueue.insert(llbnd, p, Geom.distance(p, bot));
        }
        p = Geom.intersect(bisector, rrbnd);
        if (p) {
          EventQueue.insert(bisector, p, Geom.distance(p, bot));
        }
      } else {
        break;
      }
    }
    for (lbnd = EdgeList.right(EdgeList.leftEnd); lbnd != EdgeList.rightEnd; lbnd = EdgeList.right(lbnd)) {
      callback(lbnd.edge);
    }
  }
  d3.geom.quadtree = function(points, x1, y1, x2, y2) {
    var x = d3_svg_lineX, y = d3_svg_lineY, compat;
    if (compat = arguments.length) {
      x = d3_geom_quadtreeCompatX;
      y = d3_geom_quadtreeCompatY;
      if (compat === 3) {
        y2 = y1;
        x2 = x1;
        y1 = x1 = 0;
      }
      return quadtree(points);
    }
    function quadtree(data) {
      var d, fx = d3_functor(x), fy = d3_functor(y), xs, ys, i, n, x1_, y1_, x2_, y2_;
      if (x1 != null) {
        x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
      } else {
        x2_ = y2_ = -(x1_ = y1_ = Infinity);
        xs = [], ys = [];
        n = data.length;
        if (compat) for (i = 0; i < n; ++i) {
          d = data[i];
          if (d.x < x1_) x1_ = d.x;
          if (d.y < y1_) y1_ = d.y;
          if (d.x > x2_) x2_ = d.x;
          if (d.y > y2_) y2_ = d.y;
          xs.push(d.x);
          ys.push(d.y);
        } else for (i = 0; i < n; ++i) {
          var x_ = +fx(d = data[i], i), y_ = +fy(d, i);
          if (x_ < x1_) x1_ = x_;
          if (y_ < y1_) y1_ = y_;
          if (x_ > x2_) x2_ = x_;
          if (y_ > y2_) y2_ = y_;
          xs.push(x_);
          ys.push(y_);
        }
      }
      var dx = x2_ - x1_, dy = y2_ - y1_;
      if (dx > dy) y2_ = y1_ + dx; else x2_ = x1_ + dy;
      function insert(n, d, x, y, x1, y1, x2, y2) {
        if (isNaN(x) || isNaN(y)) return;
        if (n.leaf) {
          var nx = n.x, ny = n.y;
          if (nx != null) {
            if (Math.abs(nx - x) + Math.abs(ny - y) < .01) {
              insertChild(n, d, x, y, x1, y1, x2, y2);
            } else {
              var nPoint = n.point;
              n.x = n.y = n.point = null;
              insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
              insertChild(n, d, x, y, x1, y1, x2, y2);
            }
          } else {
            n.x = x, n.y = y, n.point = d;
          }
        } else {
          insertChild(n, d, x, y, x1, y1, x2, y2);
        }
      }
      function insertChild(n, d, x, y, x1, y1, x2, y2) {
        var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, right = x >= sx, bottom = y >= sy, i = (bottom << 1) + right;
        n.leaf = false;
        n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
        if (right) x1 = sx; else x2 = sx;
        if (bottom) y1 = sy; else y2 = sy;
        insert(n, d, x, y, x1, y1, x2, y2);
      }
      var root = d3_geom_quadtreeNode();
      root.add = function(d) {
        insert(root, d, +fx(d, ++i), +fy(d, i), x1_, y1_, x2_, y2_);
      };
      root.visit = function(f) {
        d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_);
      };
      i = -1;
      if (x1 == null) {
        while (++i < n) {
          insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
        }
        --i;
      } else data.forEach(root.add);
      xs = ys = data = d = null;
      return root;
    }
    quadtree.x = function(_) {
      return arguments.length ? (x = _, quadtree) : x;
    };
    quadtree.y = function(_) {
      return arguments.length ? (y = _, quadtree) : y;
    };
    quadtree.extent = function(_) {
      if (!arguments.length) return x1 == null ? null : [ [ x1, y1 ], [ x2, y2 ] ];
      if (_ == null) x1 = y1 = x2 = y2 = null; else x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], 
      y2 = +_[1][1];
      return quadtree;
    };
    quadtree.size = function(_) {
      if (!arguments.length) return x1 == null ? null : [ x2 - x1, y2 - y1 ];
      if (_ == null) x1 = y1 = x2 = y2 = null; else x1 = y1 = 0, x2 = +_[0], y2 = +_[1];
      return quadtree;
    };
    return quadtree;
  };
  function d3_geom_quadtreeCompatX(d) {
    return d.x;
  }
  function d3_geom_quadtreeCompatY(d) {
    return d.y;
  }
  function d3_geom_quadtreeNode() {
    return {
      leaf: true,
      nodes: [],
      point: null,
      x: null,
      y: null
    };
  }
  function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
    if (!f(node, x1, y1, x2, y2)) {
      var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, children = node.nodes;
      if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
      if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
      if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
      if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
    }
  }
  d3.interpolateRgb = d3_interpolateRgb;
  function d3_interpolateRgb(a, b) {
    a = d3.rgb(a);
    b = d3.rgb(b);
    var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
    return function(t) {
      return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
    };
  }
  d3.interpolateObject = d3_interpolateObject;
  function d3_interpolateObject(a, b) {
    var i = {}, c = {}, k;
    for (k in a) {
      if (k in b) {
        i[k] = d3_interpolate(a[k], b[k]);
      } else {
        c[k] = a[k];
      }
    }
    for (k in b) {
      if (!(k in a)) {
        c[k] = b[k];
      }
    }
    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }
  d3.interpolateNumber = d3_interpolateNumber;
  function d3_interpolateNumber(a, b) {
    b -= a = +a;
    return function(t) {
      return a + b * t;
    };
  }
  d3.interpolateString = d3_interpolateString;
  function d3_interpolateString(a, b) {
    var m, i, j, s0 = 0, s1 = 0, s = [], q = [], n, o;
    a = a + "", b = b + "";
    d3_interpolate_number.lastIndex = 0;
    for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
      if (m.index) s.push(b.substring(s0, s1 = m.index));
      q.push({
        i: s.length,
        x: m[0]
      });
      s.push(null);
      s0 = d3_interpolate_number.lastIndex;
    }
    if (s0 < b.length) s.push(b.substring(s0));
    for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
      o = q[i];
      if (o.x == m[0]) {
        if (o.i) {
          if (s[o.i + 1] == null) {
            s[o.i - 1] += o.x;
            s.splice(o.i, 1);
            for (j = i + 1; j < n; ++j) q[j].i--;
          } else {
            s[o.i - 1] += o.x + s[o.i + 1];
            s.splice(o.i, 2);
            for (j = i + 1; j < n; ++j) q[j].i -= 2;
          }
        } else {
          if (s[o.i + 1] == null) {
            s[o.i] = o.x;
          } else {
            s[o.i] = o.x + s[o.i + 1];
            s.splice(o.i + 1, 1);
            for (j = i + 1; j < n; ++j) q[j].i--;
          }
        }
        q.splice(i, 1);
        n--;
        i--;
      } else {
        o.x = d3_interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
      }
    }
    while (i < n) {
      o = q.pop();
      if (s[o.i + 1] == null) {
        s[o.i] = o.x;
      } else {
        s[o.i] = o.x + s[o.i + 1];
        s.splice(o.i + 1, 1);
      }
      n--;
    }
    if (s.length === 1) {
      return s[0] == null ? (o = q[0].x, function(t) {
        return o(t) + "";
      }) : function() {
        return b;
      };
    }
    return function(t) {
      for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  }
  var d3_interpolate_number = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  d3.interpolate = d3_interpolate;
  function d3_interpolate(a, b) {
    var i = d3.interpolators.length, f;
    while (--i >= 0 && !(f = d3.interpolators[i](a, b))) ;
    return f;
  }
  d3.interpolators = [ function(a, b) {
    var t = typeof b;
    return (t === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_Color ? d3_interpolateRgb : t === "object" ? Array.isArray(b) ? d3_interpolateArray : d3_interpolateObject : d3_interpolateNumber)(a, b);
  } ];
  d3.interpolateArray = d3_interpolateArray;
  function d3_interpolateArray(a, b) {
    var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
    for (i = 0; i < n0; ++i) x.push(d3_interpolate(a[i], b[i]));
    for (;i < na; ++i) c[i] = a[i];
    for (;i < nb; ++i) c[i] = b[i];
    return function(t) {
      for (i = 0; i < n0; ++i) c[i] = x[i](t);
      return c;
    };
  }
  var d3_ease_default = function() {
    return d3_identity;
  };
  var d3_ease = d3.map({
    linear: d3_ease_default,
    poly: d3_ease_poly,
    quad: function() {
      return d3_ease_quad;
    },
    cubic: function() {
      return d3_ease_cubic;
    },
    sin: function() {
      return d3_ease_sin;
    },
    exp: function() {
      return d3_ease_exp;
    },
    circle: function() {
      return d3_ease_circle;
    },
    elastic: d3_ease_elastic,
    back: d3_ease_back,
    bounce: function() {
      return d3_ease_bounce;
    }
  });
  var d3_ease_mode = d3.map({
    "in": d3_identity,
    out: d3_ease_reverse,
    "in-out": d3_ease_reflect,
    "out-in": function(f) {
      return d3_ease_reflect(d3_ease_reverse(f));
    }
  });
  d3.ease = function(name) {
    var i = name.indexOf("-"), t = i >= 0 ? name.substring(0, i) : name, m = i >= 0 ? name.substring(i + 1) : "in";
    t = d3_ease.get(t) || d3_ease_default;
    m = d3_ease_mode.get(m) || d3_identity;
    return d3_ease_clamp(m(t.apply(null, Array.prototype.slice.call(arguments, 1))));
  };
  function d3_ease_clamp(f) {
    return function(t) {
      return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
    };
  }
  function d3_ease_reverse(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  }
  function d3_ease_reflect(f) {
    return function(t) {
      return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
    };
  }
  function d3_ease_quad(t) {
    return t * t;
  }
  function d3_ease_cubic(t) {
    return t * t * t;
  }
  function d3_ease_cubicInOut(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    var t2 = t * t, t3 = t2 * t;
    return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
  }
  function d3_ease_poly(e) {
    return function(t) {
      return Math.pow(t, e);
    };
  }
  function d3_ease_sin(t) {
    return 1 - Math.cos(t * π / 2);
  }
  function d3_ease_exp(t) {
    return Math.pow(2, 10 * (t - 1));
  }
  function d3_ease_circle(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
  function d3_ease_elastic(a, p) {
    var s;
    if (arguments.length < 2) p = .45;
    if (arguments.length) s = p / (2 * π) * Math.asin(1 / a); else a = 1, s = p / 4;
    return function(t) {
      return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * π / p);
    };
  }
  function d3_ease_back(s) {
    if (!s) s = 1.70158;
    return function(t) {
      return t * t * ((s + 1) * t - s);
    };
  }
  function d3_ease_bounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
  }
  d3.interpolateHcl = d3_interpolateHcl;
  function d3_interpolateHcl(a, b) {
    a = d3.hcl(a);
    b = d3.hcl(b);
    var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
    if (isNaN(bc)) bc = 0, ac = isNaN(ac) ? b.c : ac;
    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
    return function(t) {
      return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
    };
  }
  d3.interpolateHsl = d3_interpolateHsl;
  function d3_interpolateHsl(a, b) {
    a = d3.hsl(a);
    b = d3.hsl(b);
    var ah = a.h, as = a.s, al = a.l, bh = b.h - ah, bs = b.s - as, bl = b.l - al;
    if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
    return function(t) {
      return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + "";
    };
  }
  d3.interpolateLab = d3_interpolateLab;
  function d3_interpolateLab(a, b) {
    a = d3.lab(a);
    b = d3.lab(b);
    var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
    return function(t) {
      return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
    };
  }
  d3.interpolateRound = d3_interpolateRound;
  function d3_interpolateRound(a, b) {
    b -= a;
    return function(t) {
      return Math.round(a + b * t);
    };
  }
  d3.transform = function(string) {
    var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
    return (d3.transform = function(string) {
      if (string != null) {
        g.setAttribute("transform", string);
        var t = g.transform.baseVal.consolidate();
      }
      return new d3_transform(t ? t.matrix : d3_transformIdentity);
    })(string);
  };
  function d3_transform(m) {
    var r0 = [ m.a, m.b ], r1 = [ m.c, m.d ], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
    if (r0[0] * r1[1] < r1[0] * r0[1]) {
      r0[0] *= -1;
      r0[1] *= -1;
      kx *= -1;
      kz *= -1;
    }
    this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
    this.translate = [ m.e, m.f ];
    this.scale = [ kx, ky ];
    this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
  }
  d3_transform.prototype.toString = function() {
    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
  };
  function d3_transformDot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  function d3_transformNormalize(a) {
    var k = Math.sqrt(d3_transformDot(a, a));
    if (k) {
      a[0] /= k;
      a[1] /= k;
    }
    return k;
  }
  function d3_transformCombine(a, b, k) {
    a[0] += k * b[0];
    a[1] += k * b[1];
    return a;
  }
  var d3_transformIdentity = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
  d3.interpolateTransform = d3_interpolateTransform;
  function d3_interpolateTransform(a, b) {
    var s = [], q = [], n, A = d3.transform(a), B = d3.transform(b), ta = A.translate, tb = B.translate, ra = A.rotate, rb = B.rotate, wa = A.skew, wb = B.skew, ka = A.scale, kb = B.scale;
    if (ta[0] != tb[0] || ta[1] != tb[1]) {
      s.push("translate(", null, ",", null, ")");
      q.push({
        i: 1,
        x: d3_interpolateNumber(ta[0], tb[0])
      }, {
        i: 3,
        x: d3_interpolateNumber(ta[1], tb[1])
      });
    } else if (tb[0] || tb[1]) {
      s.push("translate(" + tb + ")");
    } else {
      s.push("");
    }
    if (ra != rb) {
      if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360;
      q.push({
        i: s.push(s.pop() + "rotate(", null, ")") - 2,
        x: d3_interpolateNumber(ra, rb)
      });
    } else if (rb) {
      s.push(s.pop() + "rotate(" + rb + ")");
    }
    if (wa != wb) {
      q.push({
        i: s.push(s.pop() + "skewX(", null, ")") - 2,
        x: d3_interpolateNumber(wa, wb)
      });
    } else if (wb) {
      s.push(s.pop() + "skewX(" + wb + ")");
    }
    if (ka[0] != kb[0] || ka[1] != kb[1]) {
      n = s.push(s.pop() + "scale(", null, ",", null, ")");
      q.push({
        i: n - 4,
        x: d3_interpolateNumber(ka[0], kb[0])
      }, {
        i: n - 2,
        x: d3_interpolateNumber(ka[1], kb[1])
      });
    } else if (kb[0] != 1 || kb[1] != 1) {
      s.push(s.pop() + "scale(" + kb + ")");
    }
    n = q.length;
    return function(t) {
      var i = -1, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  }
  function d3_uninterpolateNumber(a, b) {
    b = b - (a = +a) ? 1 / (b - a) : 0;
    return function(x) {
      return (x - a) * b;
    };
  }
  function d3_uninterpolateClamp(a, b) {
    b = b - (a = +a) ? 1 / (b - a) : 0;
    return function(x) {
      return Math.max(0, Math.min(1, (x - a) * b));
    };
  }
  d3.layout = {};
  d3.layout.bundle = function() {
    return function(links) {
      var paths = [], i = -1, n = links.length;
      while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
      return paths;
    };
  };
  function d3_layout_bundlePath(link) {
    var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [ start ];
    while (start !== lca) {
      start = start.parent;
      points.push(start);
    }
    var k = points.length;
    while (end !== lca) {
      points.splice(k, 0, end);
      end = end.parent;
    }
    return points;
  }
  function d3_layout_bundleAncestors(node) {
    var ancestors = [], parent = node.parent;
    while (parent != null) {
      ancestors.push(node);
      node = parent;
      parent = parent.parent;
    }
    ancestors.push(node);
    return ancestors;
  }
  function d3_layout_bundleLeastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
    while (aNode === bNode) {
      sharedNode = aNode;
      aNode = aNodes.pop();
      bNode = bNodes.pop();
    }
    return sharedNode;
  }
  d3.layout.chord = function() {
    var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
    function relayout() {
      var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
      chords = [];
      groups = [];
      k = 0, i = -1;
      while (++i < n) {
        x = 0, j = -1;
        while (++j < n) {
          x += matrix[i][j];
        }
        groupSums.push(x);
        subgroupIndex.push(d3.range(n));
        k += x;
      }
      if (sortGroups) {
        groupIndex.sort(function(a, b) {
          return sortGroups(groupSums[a], groupSums[b]);
        });
      }
      if (sortSubgroups) {
        subgroupIndex.forEach(function(d, i) {
          d.sort(function(a, b) {
            return sortSubgroups(matrix[i][a], matrix[i][b]);
          });
        });
      }
      k = (2 * π - padding * n) / k;
      x = 0, i = -1;
      while (++i < n) {
        x0 = x, j = -1;
        while (++j < n) {
          var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
          subgroups[di + "-" + dj] = {
            index: di,
            subindex: dj,
            startAngle: a0,
            endAngle: a1,
            value: v
          };
        }
        groups[di] = {
          index: di,
          startAngle: x0,
          endAngle: x,
          value: (x - x0) / k
        };
        x += padding;
      }
      i = -1;
      while (++i < n) {
        j = i - 1;
        while (++j < n) {
          var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
          if (source.value || target.value) {
            chords.push(source.value < target.value ? {
              source: target,
              target: source
            } : {
              source: source,
              target: target
            });
          }
        }
      }
      if (sortChords) resort();
    }
    function resort() {
      chords.sort(function(a, b) {
        return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
      });
    }
    chord.matrix = function(x) {
      if (!arguments.length) return matrix;
      n = (matrix = x) && matrix.length;
      chords = groups = null;
      return chord;
    };
    chord.padding = function(x) {
      if (!arguments.length) return padding;
      padding = x;
      chords = groups = null;
      return chord;
    };
    chord.sortGroups = function(x) {
      if (!arguments.length) return sortGroups;
      sortGroups = x;
      chords = groups = null;
      return chord;
    };
    chord.sortSubgroups = function(x) {
      if (!arguments.length) return sortSubgroups;
      sortSubgroups = x;
      chords = null;
      return chord;
    };
    chord.sortChords = function(x) {
      if (!arguments.length) return sortChords;
      sortChords = x;
      if (chords) resort();
      return chord;
    };
    chord.chords = function() {
      if (!chords) relayout();
      return chords;
    };
    chord.groups = function() {
      if (!groups) relayout();
      return groups;
    };
    return chord;
  };
  d3.layout.force = function() {
    var force = {}, event = d3.dispatch("start", "tick", "end"), size = [ 1, 1 ], drag, alpha, friction = .9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, gravity = .1, theta = .8, nodes = [], links = [], distances, strengths, charges;
    function repulse(node) {
      return function(quad, x1, _, x2) {
        if (quad.point !== node) {
          var dx = quad.cx - node.x, dy = quad.cy - node.y, dn = 1 / Math.sqrt(dx * dx + dy * dy);
          if ((x2 - x1) * dn < theta) {
            var k = quad.charge * dn * dn;
            node.px -= dx * k;
            node.py -= dy * k;
            return true;
          }
          if (quad.point && isFinite(dn)) {
            var k = quad.pointCharge * dn * dn;
            node.px -= dx * k;
            node.py -= dy * k;
          }
        }
        return !quad.charge;
      };
    }
    force.tick = function() {
      if ((alpha *= .99) < .005) {
        event.end({
          type: "end",
          alpha: alpha = 0
        });
        return true;
      }
      var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
      for (i = 0; i < m; ++i) {
        o = links[i];
        s = o.source;
        t = o.target;
        x = t.x - s.x;
        y = t.y - s.y;
        if (l = x * x + y * y) {
          l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
          x *= l;
          y *= l;
          t.x -= x * (k = s.weight / (t.weight + s.weight));
          t.y -= y * k;
          s.x += x * (k = 1 - k);
          s.y += y * k;
        }
      }
      if (k = alpha * gravity) {
        x = size[0] / 2;
        y = size[1] / 2;
        i = -1;
        if (k) while (++i < n) {
          o = nodes[i];
          o.x += (x - o.x) * k;
          o.y += (y - o.y) * k;
        }
      }
      if (charge) {
        d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
        i = -1;
        while (++i < n) {
          if (!(o = nodes[i]).fixed) {
            q.visit(repulse(o));
          }
        }
      }
      i = -1;
      while (++i < n) {
        o = nodes[i];
        if (o.fixed) {
          o.x = o.px;
          o.y = o.py;
        } else {
          o.x -= (o.px - (o.px = o.x)) * friction;
          o.y -= (o.py - (o.py = o.y)) * friction;
        }
      }
      event.tick({
        type: "tick",
        alpha: alpha
      });
    };
    force.nodes = function(x) {
      if (!arguments.length) return nodes;
      nodes = x;
      return force;
    };
    force.links = function(x) {
      if (!arguments.length) return links;
      links = x;
      return force;
    };
    force.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return force;
    };
    force.linkDistance = function(x) {
      if (!arguments.length) return linkDistance;
      linkDistance = typeof x === "function" ? x : +x;
      return force;
    };
    force.distance = force.linkDistance;
    force.linkStrength = function(x) {
      if (!arguments.length) return linkStrength;
      linkStrength = typeof x === "function" ? x : +x;
      return force;
    };
    force.friction = function(x) {
      if (!arguments.length) return friction;
      friction = +x;
      return force;
    };
    force.charge = function(x) {
      if (!arguments.length) return charge;
      charge = typeof x === "function" ? x : +x;
      return force;
    };
    force.gravity = function(x) {
      if (!arguments.length) return gravity;
      gravity = +x;
      return force;
    };
    force.theta = function(x) {
      if (!arguments.length) return theta;
      theta = +x;
      return force;
    };
    force.alpha = function(x) {
      if (!arguments.length) return alpha;
      x = +x;
      if (alpha) {
        if (x > 0) alpha = x; else alpha = 0;
      } else if (x > 0) {
        event.start({
          type: "start",
          alpha: alpha = x
        });
        d3.timer(force.tick);
      }
      return force;
    };
    force.start = function() {
      var i, j, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
      for (i = 0; i < n; ++i) {
        (o = nodes[i]).index = i;
        o.weight = 0;
      }
      for (i = 0; i < m; ++i) {
        o = links[i];
        if (typeof o.source == "number") o.source = nodes[o.source];
        if (typeof o.target == "number") o.target = nodes[o.target];
        ++o.source.weight;
        ++o.target.weight;
      }
      for (i = 0; i < n; ++i) {
        o = nodes[i];
        if (isNaN(o.x)) o.x = position("x", w);
        if (isNaN(o.y)) o.y = position("y", h);
        if (isNaN(o.px)) o.px = o.x;
        if (isNaN(o.py)) o.py = o.y;
      }
      distances = [];
      if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i); else for (i = 0; i < m; ++i) distances[i] = linkDistance;
      strengths = [];
      if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i); else for (i = 0; i < m; ++i) strengths[i] = linkStrength;
      charges = [];
      if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i); else for (i = 0; i < n; ++i) charges[i] = charge;
      function position(dimension, size) {
        var neighbors = neighbor(i), j = -1, m = neighbors.length, x;
        while (++j < m) if (!isNaN(x = neighbors[j][dimension])) return x;
        return Math.random() * size;
      }
      function neighbor() {
        if (!neighbors) {
          neighbors = [];
          for (j = 0; j < n; ++j) {
            neighbors[j] = [];
          }
          for (j = 0; j < m; ++j) {
            var o = links[j];
            neighbors[o.source.index].push(o.target);
            neighbors[o.target.index].push(o.source);
          }
        }
        return neighbors[i];
      }
      return force.resume();
    };
    force.resume = function() {
      return force.alpha(.1);
    };
    force.stop = function() {
      return force.alpha(0);
    };
    force.drag = function() {
      if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
      if (!arguments.length) return drag;
      this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
    };
    function dragmove(d) {
      d.px = d3.event.x, d.py = d3.event.y;
      force.resume();
    }
    return d3.rebind(force, event, "on");
  };
  function d3_layout_forceDragstart(d) {
    d.fixed |= 2;
  }
  function d3_layout_forceDragend(d) {
    d.fixed &= ~6;
  }
  function d3_layout_forceMouseover(d) {
    d.fixed |= 4;
    d.px = d.x, d.py = d.y;
  }
  function d3_layout_forceMouseout(d) {
    d.fixed &= ~4;
  }
  function d3_layout_forceAccumulate(quad, alpha, charges) {
    var cx = 0, cy = 0;
    quad.charge = 0;
    if (!quad.leaf) {
      var nodes = quad.nodes, n = nodes.length, i = -1, c;
      while (++i < n) {
        c = nodes[i];
        if (c == null) continue;
        d3_layout_forceAccumulate(c, alpha, charges);
        quad.charge += c.charge;
        cx += c.charge * c.cx;
        cy += c.charge * c.cy;
      }
    }
    if (quad.point) {
      if (!quad.leaf) {
        quad.point.x += Math.random() - .5;
        quad.point.y += Math.random() - .5;
      }
      var k = alpha * charges[quad.point.index];
      quad.charge += quad.pointCharge = k;
      cx += k * quad.point.x;
      cy += k * quad.point.y;
    }
    quad.cx = cx / quad.charge;
    quad.cy = cy / quad.charge;
  }
  var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1;
  d3.layout.hierarchy = function() {
    var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
    function recurse(node, depth, nodes) {
      var childs = children.call(hierarchy, node, depth);
      node.depth = depth;
      nodes.push(node);
      if (childs && (n = childs.length)) {
        var i = -1, n, c = node.children = [], v = 0, j = depth + 1, d;
        while (++i < n) {
          d = recurse(childs[i], j, nodes);
          d.parent = node;
          c.push(d);
          v += d.value;
        }
        if (sort) c.sort(sort);
        if (value) node.value = v;
      } else if (value) {
        node.value = +value.call(hierarchy, node, depth) || 0;
      }
      return node;
    }
    function revalue(node, depth) {
      var children = node.children, v = 0;
      if (children && (n = children.length)) {
        var i = -1, n, j = depth + 1;
        while (++i < n) v += revalue(children[i], j);
      } else if (value) {
        v = +value.call(hierarchy, node, depth) || 0;
      }
      if (value) node.value = v;
      return v;
    }
    function hierarchy(d) {
      var nodes = [];
      recurse(d, 0, nodes);
      return nodes;
    }
    hierarchy.sort = function(x) {
      if (!arguments.length) return sort;
      sort = x;
      return hierarchy;
    };
    hierarchy.children = function(x) {
      if (!arguments.length) return children;
      children = x;
      return hierarchy;
    };
    hierarchy.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return hierarchy;
    };
    hierarchy.revalue = function(root) {
      revalue(root, 0);
      return root;
    };
    return hierarchy;
  };
  function d3_layout_hierarchyRebind(object, hierarchy) {
    d3.rebind(object, hierarchy, "sort", "children", "value");
    object.nodes = object;
    object.links = d3_layout_hierarchyLinks;
    return object;
  }
  function d3_layout_hierarchyChildren(d) {
    return d.children;
  }
  function d3_layout_hierarchyValue(d) {
    return d.value;
  }
  function d3_layout_hierarchySort(a, b) {
    return b.value - a.value;
  }
  function d3_layout_hierarchyLinks(nodes) {
    return d3.merge(nodes.map(function(parent) {
      return (parent.children || []).map(function(child) {
        return {
          source: parent,
          target: child
        };
      });
    }));
  }
  d3.layout.partition = function() {
    var hierarchy = d3.layout.hierarchy(), size = [ 1, 1 ];
    function position(node, x, dx, dy) {
      var children = node.children;
      node.x = x;
      node.y = node.depth * dy;
      node.dx = dx;
      node.dy = dy;
      if (children && (n = children.length)) {
        var i = -1, n, c, d;
        dx = node.value ? dx / node.value : 0;
        while (++i < n) {
          position(c = children[i], x, d = c.value * dx, dy);
          x += d;
        }
      }
    }
    function depth(node) {
      var children = node.children, d = 0;
      if (children && (n = children.length)) {
        var i = -1, n;
        while (++i < n) d = Math.max(d, depth(children[i]));
      }
      return 1 + d;
    }
    function partition(d, i) {
      var nodes = hierarchy.call(this, d, i);
      position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
      return nodes;
    }
    partition.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return partition;
    };
    return d3_layout_hierarchyRebind(partition, hierarchy);
  };
  d3.layout.pie = function() {
    var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = 2 * π;
    function pie(data) {
      var values = data.map(function(d, i) {
        return +value.call(pie, d, i);
      });
      var a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle);
      var k = ((typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - a) / d3.sum(values);
      var index = d3.range(data.length);
      if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
        return values[j] - values[i];
      } : function(i, j) {
        return sort(data[i], data[j]);
      });
      var arcs = [];
      index.forEach(function(i) {
        var d;
        arcs[i] = {
          data: data[i],
          value: d = values[i],
          startAngle: a,
          endAngle: a += d * k
        };
      });
      return arcs;
    }
    pie.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return pie;
    };
    pie.sort = function(x) {
      if (!arguments.length) return sort;
      sort = x;
      return pie;
    };
    pie.startAngle = function(x) {
      if (!arguments.length) return startAngle;
      startAngle = x;
      return pie;
    };
    pie.endAngle = function(x) {
      if (!arguments.length) return endAngle;
      endAngle = x;
      return pie;
    };
    return pie;
  };
  var d3_layout_pieSortByValue = {};
  d3.layout.stack = function() {
    var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
    function stack(data, index) {
      var series = data.map(function(d, i) {
        return values.call(stack, d, i);
      });
      var points = series.map(function(d) {
        return d.map(function(v, i) {
          return [ x.call(stack, v, i), y.call(stack, v, i) ];
        });
      });
      var orders = order.call(stack, points, index);
      series = d3.permute(series, orders);
      points = d3.permute(points, orders);
      var offsets = offset.call(stack, points, index);
      var n = series.length, m = series[0].length, i, j, o;
      for (j = 0; j < m; ++j) {
        out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
        for (i = 1; i < n; ++i) {
          out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
        }
      }
      return data;
    }
    stack.values = function(x) {
      if (!arguments.length) return values;
      values = x;
      return stack;
    };
    stack.order = function(x) {
      if (!arguments.length) return order;
      order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
      return stack;
    };
    stack.offset = function(x) {
      if (!arguments.length) return offset;
      offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
      return stack;
    };
    stack.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      return stack;
    };
    stack.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      return stack;
    };
    stack.out = function(z) {
      if (!arguments.length) return out;
      out = z;
      return stack;
    };
    return stack;
  };
  function d3_layout_stackX(d) {
    return d.x;
  }
  function d3_layout_stackY(d) {
    return d.y;
  }
  function d3_layout_stackOut(d, y0, y) {
    d.y0 = y0;
    d.y = y;
  }
  var d3_layout_stackOrders = d3.map({
    "inside-out": function(data) {
      var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function(a, b) {
        return max[a] - max[b];
      }), top = 0, bottom = 0, tops = [], bottoms = [];
      for (i = 0; i < n; ++i) {
        j = index[i];
        if (top < bottom) {
          top += sums[j];
          tops.push(j);
        } else {
          bottom += sums[j];
          bottoms.push(j);
        }
      }
      return bottoms.reverse().concat(tops);
    },
    reverse: function(data) {
      return d3.range(data.length).reverse();
    },
    "default": d3_layout_stackOrderDefault
  });
  var d3_layout_stackOffsets = d3.map({
    silhouette: function(data) {
      var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o > max) max = o;
        sums.push(o);
      }
      for (j = 0; j < m; ++j) {
        y0[j] = (max - sums[j]) / 2;
      }
      return y0;
    },
    wiggle: function(data) {
      var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
      y0[0] = o = o0 = 0;
      for (j = 1; j < m; ++j) {
        for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
        for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
          for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
            s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
          }
          s2 += s3 * data[i][j][1];
        }
        y0[j] = o -= s1 ? s2 / s1 * dx : 0;
        if (o < o0) o0 = o;
      }
      for (j = 0; j < m; ++j) y0[j] -= o0;
      return y0;
    },
    expand: function(data) {
      var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o) for (i = 0; i < n; i++) data[i][j][1] /= o; else for (i = 0; i < n; i++) data[i][j][1] = k;
      }
      for (j = 0; j < m; ++j) y0[j] = 0;
      return y0;
    },
    zero: d3_layout_stackOffsetZero
  });
  function d3_layout_stackOrderDefault(data) {
    return d3.range(data.length);
  }
  function d3_layout_stackOffsetZero(data) {
    var j = -1, m = data[0].length, y0 = [];
    while (++j < m) y0[j] = 0;
    return y0;
  }
  function d3_layout_stackMaxIndex(array) {
    var i = 1, j = 0, v = array[0][1], k, n = array.length;
    for (;i < n; ++i) {
      if ((k = array[i][1]) > v) {
        j = i;
        v = k;
      }
    }
    return j;
  }
  function d3_layout_stackReduceSum(d) {
    return d.reduce(d3_layout_stackSum, 0);
  }
  function d3_layout_stackSum(p, d) {
    return p + d[1];
  }
  d3.layout.histogram = function() {
    var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
    function histogram(data, i) {
      var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
      while (++i < m) {
        bin = bins[i] = [];
        bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
        bin.y = 0;
      }
      if (m > 0) {
        i = -1;
        while (++i < n) {
          x = values[i];
          if (x >= range[0] && x <= range[1]) {
            bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
            bin.y += k;
            bin.push(data[i]);
          }
        }
      }
      return bins;
    }
    histogram.value = function(x) {
      if (!arguments.length) return valuer;
      valuer = x;
      return histogram;
    };
    histogram.range = function(x) {
      if (!arguments.length) return ranger;
      ranger = d3_functor(x);
      return histogram;
    };
    histogram.bins = function(x) {
      if (!arguments.length) return binner;
      binner = typeof x === "number" ? function(range) {
        return d3_layout_histogramBinFixed(range, x);
      } : d3_functor(x);
      return histogram;
    };
    histogram.frequency = function(x) {
      if (!arguments.length) return frequency;
      frequency = !!x;
      return histogram;
    };
    return histogram;
  };
  function d3_layout_histogramBinSturges(range, values) {
    return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
  }
  function d3_layout_histogramBinFixed(range, n) {
    var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
    while (++x <= n) f[x] = m * x + b;
    return f;
  }
  function d3_layout_histogramRange(values) {
    return [ d3.min(values), d3.max(values) ];
  }
  d3.layout.tree = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ], nodeSize = false;
    function tree(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0];
      function firstWalk(node, previousSibling) {
        var children = node.children, layout = node._tree;
        if (children && (n = children.length)) {
          var n, firstChild = children[0], previousChild, ancestor = firstChild, child, i = -1;
          while (++i < n) {
            child = children[i];
            firstWalk(child, previousChild);
            ancestor = apportion(child, previousChild, ancestor);
            previousChild = child;
          }
          d3_layout_treeShift(node);
          var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
          if (previousSibling) {
            layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
            layout.mod = layout.prelim - midpoint;
          } else {
            layout.prelim = midpoint;
          }
        } else {
          if (previousSibling) {
            layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
          }
        }
      }
      function secondWalk(node, x) {
        node.x = node._tree.prelim + x;
        var children = node.children;
        if (children && (n = children.length)) {
          var i = -1, n;
          x += node._tree.mod;
          while (++i < n) {
            secondWalk(children[i], x);
          }
        }
      }
      function apportion(node, previousSibling, ancestor) {
        if (previousSibling) {
          var vip = node, vop = node, vim = previousSibling, vom = node.parent.children[0], sip = vip._tree.mod, sop = vop._tree.mod, sim = vim._tree.mod, som = vom._tree.mod, shift;
          while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
            vom = d3_layout_treeLeft(vom);
            vop = d3_layout_treeRight(vop);
            vop._tree.ancestor = node;
            shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
            if (shift > 0) {
              d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
              sip += shift;
              sop += shift;
            }
            sim += vim._tree.mod;
            sip += vip._tree.mod;
            som += vom._tree.mod;
            sop += vop._tree.mod;
          }
          if (vim && !d3_layout_treeRight(vop)) {
            vop._tree.thread = vim;
            vop._tree.mod += sim - sop;
          }
          if (vip && !d3_layout_treeLeft(vom)) {
            vom._tree.thread = vip;
            vom._tree.mod += sip - som;
            ancestor = node;
          }
        }
        return ancestor;
      }
      d3_layout_treeVisitAfter(root, function(node, previousSibling) {
        node._tree = {
          ancestor: node,
          prelim: 0,
          mod: 0,
          change: 0,
          shift: 0,
          number: previousSibling ? previousSibling._tree.number + 1 : 0
        };
      });
      firstWalk(root);
      secondWalk(root, -root._tree.prelim);
      var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost), right = d3_layout_treeSearch(root, d3_layout_treeRightmost), deep = d3_layout_treeSearch(root, d3_layout_treeDeepest), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2, y1 = deep.depth || 1;
      d3_layout_treeVisitAfter(root, nodeSize ? function(node) {
        node.x *= size[0];
        node.y = node.depth * size[1];
        delete node._tree;
      } : function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = node.depth / y1 * size[1];
        delete node._tree;
      });
      return nodes;
    }
    tree.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return tree;
    };
    tree.size = function(x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null;
      return tree;
    };
    tree.nodeSize = function(x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) != null;
      return tree;
    };
    return d3_layout_hierarchyRebind(tree, hierarchy);
  };
  function d3_layout_treeSeparation(a, b) {
    return a.parent == b.parent ? 1 : 2;
  }
  function d3_layout_treeLeft(node) {
    var children = node.children;
    return children && children.length ? children[0] : node._tree.thread;
  }
  function d3_layout_treeRight(node) {
    var children = node.children, n;
    return children && (n = children.length) ? children[n - 1] : node._tree.thread;
  }
  function d3_layout_treeSearch(node, compare) {
    var children = node.children;
    if (children && (n = children.length)) {
      var child, n, i = -1;
      while (++i < n) {
        if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
          node = child;
        }
      }
    }
    return node;
  }
  function d3_layout_treeRightmost(a, b) {
    return a.x - b.x;
  }
  function d3_layout_treeLeftmost(a, b) {
    return b.x - a.x;
  }
  function d3_layout_treeDeepest(a, b) {
    return a.depth - b.depth;
  }
  function d3_layout_treeVisitAfter(node, callback) {
    function visit(node, previousSibling) {
      var children = node.children;
      if (children && (n = children.length)) {
        var child, previousChild = null, i = -1, n;
        while (++i < n) {
          child = children[i];
          visit(child, previousChild);
          previousChild = child;
        }
      }
      callback(node, previousSibling);
    }
    visit(node, null);
  }
  function d3_layout_treeShift(node) {
    var shift = 0, change = 0, children = node.children, i = children.length, child;
    while (--i >= 0) {
      child = children[i]._tree;
      child.prelim += shift;
      child.mod += shift;
      shift += child.shift + (change += child.change);
    }
  }
  function d3_layout_treeMove(ancestor, node, shift) {
    ancestor = ancestor._tree;
    node = node._tree;
    var change = shift / (node.number - ancestor.number);
    ancestor.change += change;
    node.change -= change;
    node.shift += shift;
    node.prelim += shift;
    node.mod += shift;
  }
  function d3_layout_treeAncestor(vim, node, ancestor) {
    return vim._tree.ancestor.parent == node.parent ? vim._tree.ancestor : ancestor;
  }
  d3.layout.pack = function() {
    var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [ 1, 1 ], radius;
    function pack(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0], w = size[0], h = size[1], r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function() {
        return radius;
      };
      root.x = root.y = 0;
      d3_layout_treeVisitAfter(root, function(d) {
        d.r = +r(d.value);
      });
      d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
      if (padding) {
        var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
        d3_layout_treeVisitAfter(root, function(d) {
          d.r += dr;
        });
        d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
        d3_layout_treeVisitAfter(root, function(d) {
          d.r -= dr;
        });
      }
      d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));
      return nodes;
    }
    pack.size = function(_) {
      if (!arguments.length) return size;
      size = _;
      return pack;
    };
    pack.radius = function(_) {
      if (!arguments.length) return radius;
      radius = _ == null || typeof _ === "function" ? _ : +_;
      return pack;
    };
    pack.padding = function(_) {
      if (!arguments.length) return padding;
      padding = +_;
      return pack;
    };
    return d3_layout_hierarchyRebind(pack, hierarchy);
  };
  function d3_layout_packSort(a, b) {
    return a.value - b.value;
  }
  function d3_layout_packInsert(a, b) {
    var c = a._pack_next;
    a._pack_next = b;
    b._pack_prev = a;
    b._pack_next = c;
    c._pack_prev = b;
  }
  function d3_layout_packSplice(a, b) {
    a._pack_next = b;
    b._pack_prev = a;
  }
  function d3_layout_packIntersects(a, b) {
    var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
    return .999 * dr * dr > dx * dx + dy * dy;
  }
  function d3_layout_packSiblings(node) {
    if (!(nodes = node.children) || !(n = nodes.length)) return;
    var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
    function bound(node) {
      xMin = Math.min(node.x - node.r, xMin);
      xMax = Math.max(node.x + node.r, xMax);
      yMin = Math.min(node.y - node.r, yMin);
      yMax = Math.max(node.y + node.r, yMax);
    }
    nodes.forEach(d3_layout_packLink);
    a = nodes[0];
    a.x = -a.r;
    a.y = 0;
    bound(a);
    if (n > 1) {
      b = nodes[1];
      b.x = b.r;
      b.y = 0;
      bound(b);
      if (n > 2) {
        c = nodes[2];
        d3_layout_packPlace(a, b, c);
        bound(c);
        d3_layout_packInsert(a, c);
        a._pack_prev = c;
        d3_layout_packInsert(c, b);
        b = a._pack_next;
        for (i = 3; i < n; i++) {
          d3_layout_packPlace(a, b, c = nodes[i]);
          var isect = 0, s1 = 1, s2 = 1;
          for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
            if (d3_layout_packIntersects(j, c)) {
              isect = 1;
              break;
            }
          }
          if (isect == 1) {
            for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
              if (d3_layout_packIntersects(k, c)) {
                break;
              }
            }
          }
          if (isect) {
            if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j); else d3_layout_packSplice(a = k, b);
            i--;
          } else {
            d3_layout_packInsert(a, c);
            b = c;
            bound(c);
          }
        }
      }
    }
    var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
    for (i = 0; i < n; i++) {
      c = nodes[i];
      c.x -= cx;
      c.y -= cy;
      cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
    }
    node.r = cr;
    nodes.forEach(d3_layout_packUnlink);
  }
  function d3_layout_packLink(node) {
    node._pack_next = node._pack_prev = node;
  }
  function d3_layout_packUnlink(node) {
    delete node._pack_next;
    delete node._pack_prev;
  }
  function d3_layout_packTransform(node, x, y, k) {
    var children = node.children;
    node.x = x += k * node.x;
    node.y = y += k * node.y;
    node.r *= k;
    if (children) {
      var i = -1, n = children.length;
      while (++i < n) d3_layout_packTransform(children[i], x, y, k);
    }
  }
  function d3_layout_packPlace(a, b, c) {
    var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
    if (db && (dx || dy)) {
      var da = b.r + c.r, dc = dx * dx + dy * dy;
      da *= da;
      db *= db;
      var x = .5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
      c.x = a.x + x * dx + y * dy;
      c.y = a.y + x * dy - y * dx;
    } else {
      c.x = a.x + db;
      c.y = a.y;
    }
  }
  d3.layout.cluster = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ], nodeSize = false;
    function cluster(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0;
      d3_layout_treeVisitAfter(root, function(node) {
        var children = node.children;
        if (children && children.length) {
          node.x = d3_layout_clusterX(children);
          node.y = d3_layout_clusterY(children);
        } else {
          node.x = previousNode ? x += separation(node, previousNode) : 0;
          node.y = 0;
          previousNode = node;
        }
      });
      var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
      d3_layout_treeVisitAfter(root, nodeSize ? function(node) {
        node.x = (node.x - root.x) * size[0];
        node.y = (root.y - node.y) * size[1];
      } : function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
      });
      return nodes;
    }
    cluster.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return cluster;
    };
    cluster.size = function(x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null;
      return cluster;
    };
    cluster.nodeSize = function(x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) != null;
      return cluster;
    };
    return d3_layout_hierarchyRebind(cluster, hierarchy);
  };
  function d3_layout_clusterY(children) {
    return 1 + d3.max(children, function(child) {
      return child.y;
    });
  }
  function d3_layout_clusterX(children) {
    return children.reduce(function(x, child) {
      return x + child.x;
    }, 0) / children.length;
  }
  function d3_layout_clusterLeft(node) {
    var children = node.children;
    return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
  }
  function d3_layout_clusterRight(node) {
    var children = node.children, n;
    return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
  }
  d3.layout.treemap = function() {
    var hierarchy = d3.layout.hierarchy(), round = Math.round, size = [ 1, 1 ], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, mode = "squarify", ratio = .5 * (1 + Math.sqrt(5));
    function scale(children, k) {
      var i = -1, n = children.length, child, area;
      while (++i < n) {
        area = (child = children[i]).value * (k < 0 ? 0 : k);
        child.area = isNaN(area) || area <= 0 ? 0 : area;
      }
    }
    function squarify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy), n;
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while ((n = remaining.length) > 0) {
          row.push(child = remaining[n - 1]);
          row.area += child.area;
          if (mode !== "squarify" || (score = worst(row, u)) <= best) {
            remaining.pop();
            best = score;
          } else {
            row.area -= row.pop().area;
            position(row, u, rect, false);
            u = Math.min(rect.dx, rect.dy);
            row.length = row.area = 0;
            best = Infinity;
          }
        }
        if (row.length) {
          position(row, u, rect, true);
          row.length = row.area = 0;
        }
        children.forEach(squarify);
      }
    }
    function stickify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), remaining = children.slice(), child, row = [];
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while (child = remaining.pop()) {
          row.push(child);
          row.area += child.area;
          if (child.z != null) {
            position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
            row.length = row.area = 0;
          }
        }
        children.forEach(stickify);
      }
    }
    function worst(row, u) {
      var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
      while (++i < n) {
        if (!(r = row[i].area)) continue;
        if (r < rmin) rmin = r;
        if (r > rmax) rmax = r;
      }
      s *= s;
      u *= u;
      return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
    }
    function position(row, u, rect, flush) {
      var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
      if (u == rect.dx) {
        if (flush || v > rect.dy) v = rect.dy;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dy = v;
          x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
        }
        o.z = true;
        o.dx += rect.x + rect.dx - x;
        rect.y += v;
        rect.dy -= v;
      } else {
        if (flush || v > rect.dx) v = rect.dx;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dx = v;
          y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
        }
        o.z = false;
        o.dy += rect.y + rect.dy - y;
        rect.x += v;
        rect.dx -= v;
      }
    }
    function treemap(d) {
      var nodes = stickies || hierarchy(d), root = nodes[0];
      root.x = 0;
      root.y = 0;
      root.dx = size[0];
      root.dy = size[1];
      if (stickies) hierarchy.revalue(root);
      scale([ root ], root.dx * root.dy / root.value);
      (stickies ? stickify : squarify)(root);
      if (sticky) stickies = nodes;
      return nodes;
    }
    treemap.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return treemap;
    };
    treemap.padding = function(x) {
      if (!arguments.length) return padding;
      function padFunction(node) {
        var p = x.call(treemap, node, node.depth);
        return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [ p, p, p, p ] : p);
      }
      function padConstant(node) {
        return d3_layout_treemapPad(node, x);
      }
      var type;
      pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [ x, x, x, x ], 
      padConstant) : padConstant;
      return treemap;
    };
    treemap.round = function(x) {
      if (!arguments.length) return round != Number;
      round = x ? Math.round : Number;
      return treemap;
    };
    treemap.sticky = function(x) {
      if (!arguments.length) return sticky;
      sticky = x;
      stickies = null;
      return treemap;
    };
    treemap.ratio = function(x) {
      if (!arguments.length) return ratio;
      ratio = x;
      return treemap;
    };
    treemap.mode = function(x) {
      if (!arguments.length) return mode;
      mode = x + "";
      return treemap;
    };
    return d3_layout_hierarchyRebind(treemap, hierarchy);
  };
  function d3_layout_treemapPadNull(node) {
    return {
      x: node.x,
      y: node.y,
      dx: node.dx,
      dy: node.dy
    };
  }
  function d3_layout_treemapPad(node, padding) {
    var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
    if (dx < 0) {
      x += dx / 2;
      dx = 0;
    }
    if (dy < 0) {
      y += dy / 2;
      dy = 0;
    }
    return {
      x: x,
      y: y,
      dx: dx,
      dy: dy
    };
  }
  d3.random = {
    normal: function(µ, σ) {
      var n = arguments.length;
      if (n < 2) σ = 1;
      if (n < 1) µ = 0;
      return function() {
        var x, y, r;
        do {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          r = x * x + y * y;
        } while (!r || r > 1);
        return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
      };
    },
    logNormal: function() {
      var random = d3.random.normal.apply(d3, arguments);
      return function() {
        return Math.exp(random());
      };
    },
    irwinHall: function(m) {
      return function() {
        for (var s = 0, j = 0; j < m; j++) s += Math.random();
        return s / m;
      };
    }
  };
  d3.scale = {};
  function d3_scaleExtent(domain) {
    var start = domain[0], stop = domain[domain.length - 1];
    return start < stop ? [ start, stop ] : [ stop, start ];
  }
  function d3_scaleRange(scale) {
    return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
  }
  function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
    var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
    return function(x) {
      return i(u(x));
    };
  }
  function d3_scale_nice(domain, nice) {
    var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
    if (x1 < x0) {
      dx = i0, i0 = i1, i1 = dx;
      dx = x0, x0 = x1, x1 = dx;
    }
    domain[i0] = nice.floor(x0);
    domain[i1] = nice.ceil(x1);
    return domain;
  }
  function d3_scale_niceStep(step) {
    return step ? {
      floor: function(x) {
        return Math.floor(x / step) * step;
      },
      ceil: function(x) {
        return Math.ceil(x / step) * step;
      }
    } : d3_scale_niceIdentity;
  }
  var d3_scale_niceIdentity = {
    floor: d3_identity,
    ceil: d3_identity
  };
  function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
    var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
    if (domain[k] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }
    while (++j <= k) {
      u.push(uninterpolate(domain[j - 1], domain[j]));
      i.push(interpolate(range[j - 1], range[j]));
    }
    return function(x) {
      var j = d3.bisect(domain, x, 1, k) - 1;
      return i[j](u[j](x));
    };
  }
  d3.scale.linear = function() {
    return d3_scale_linear([ 0, 1 ], [ 0, 1 ], d3_interpolate, false);
  };
  function d3_scale_linear(domain, range, interpolate, clamp) {
    var output, input;
    function rescale() {
      var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
      output = linear(domain, range, uninterpolate, interpolate);
      input = linear(range, domain, uninterpolate, d3_interpolate);
      return scale;
    }
    function scale(x) {
      return output(x);
    }
    scale.invert = function(y) {
      return input(y);
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(Number);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.rangeRound = function(x) {
      return scale.range(x).interpolate(d3_interpolateRound);
    };
    scale.clamp = function(x) {
      if (!arguments.length) return clamp;
      clamp = x;
      return rescale();
    };
    scale.interpolate = function(x) {
      if (!arguments.length) return interpolate;
      interpolate = x;
      return rescale();
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    scale.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    scale.nice = function(m) {
      d3_scale_linearNice(domain, m);
      return rescale();
    };
    scale.copy = function() {
      return d3_scale_linear(domain, range, interpolate, clamp);
    };
    return rescale();
  }
  function d3_scale_linearRebind(scale, linear) {
    return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
  }
  function d3_scale_linearNice(domain, m) {
    return d3_scale_nice(domain, d3_scale_niceStep(m ? d3_scale_linearTickRange(domain, m)[2] : d3_scale_linearNiceStep(domain)));
  }
  function d3_scale_linearNiceStep(domain) {
    var extent = d3_scaleExtent(domain), span = extent[1] - extent[0];
    return Math.pow(10, Math.round(Math.log(span) / Math.LN10) - 1);
  }
  function d3_scale_linearTickRange(domain, m) {
    var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
    if (err <= .15) step *= 10; else if (err <= .35) step *= 5; else if (err <= .75) step *= 2;
    extent[0] = Math.ceil(extent[0] / step) * step;
    extent[1] = Math.floor(extent[1] / step) * step + step * .5;
    extent[2] = step;
    return extent;
  }
  function d3_scale_linearTicks(domain, m) {
    return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
  }
  function d3_scale_linearTickFormat(domain, m, format) {
    var precision = -Math.floor(Math.log(d3_scale_linearTickRange(domain, m)[2]) / Math.LN10 + .01);
    return d3.format(format ? format.replace(d3_format_re, function(a, b, c, d, e, f, g, h, i, j) {
      return [ b, c, d, e, f, g, h, i || "." + (precision - (j === "%") * 2), j ].join("");
    }) : ",." + precision + "f");
  }
  d3.scale.log = function() {
    return d3_scale_log(d3.scale.linear().domain([ 0, 1 ]), 10, true, [ 1, 10 ]);
  };
  function d3_scale_log(linear, base, positive, domain) {
    function log(x) {
      return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base);
    }
    function pow(x) {
      return positive ? Math.pow(base, x) : -Math.pow(base, -x);
    }
    function scale(x) {
      return linear(log(x));
    }
    scale.invert = function(x) {
      return pow(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      positive = x[0] >= 0;
      linear.domain((domain = x.map(Number)).map(log));
      return scale;
    };
    scale.base = function(_) {
      if (!arguments.length) return base;
      base = +_;
      linear.domain(domain.map(log));
      return scale;
    };
    scale.nice = function() {
      var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
      linear.domain(niced);
      domain = niced.map(pow);
      return scale;
    };
    scale.ticks = function() {
      var extent = d3_scaleExtent(domain), ticks = [], u = extent[0], v = extent[1], i = Math.floor(log(u)), j = Math.ceil(log(v)), n = base % 1 ? 2 : base;
      if (isFinite(j - i)) {
        if (positive) {
          for (;i < j; i++) for (var k = 1; k < n; k++) ticks.push(pow(i) * k);
          ticks.push(pow(i));
        } else {
          ticks.push(pow(i));
          for (;i++ < j; ) for (var k = n - 1; k > 0; k--) ticks.push(pow(i) * k);
        }
        for (i = 0; ticks[i] < u; i++) {}
        for (j = ticks.length; ticks[j - 1] > v; j--) {}
        ticks = ticks.slice(i, j);
      }
      return ticks;
    };
    scale.tickFormat = function(n, format) {
      if (!arguments.length) return d3_scale_logFormat;
      if (arguments.length < 2) format = d3_scale_logFormat; else if (typeof format !== "function") format = d3.format(format);
      var k = Math.max(.1, n / scale.ticks().length), f = positive ? (e = 1e-12, Math.ceil) : (e = -1e-12, 
      Math.floor), e;
      return function(d) {
        return d / pow(f(log(d) + e)) <= k ? format(d) : "";
      };
    };
    scale.copy = function() {
      return d3_scale_log(linear.copy(), base, positive, domain);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  var d3_scale_logFormat = d3.format(".0e"), d3_scale_logNiceNegative = {
    floor: function(x) {
      return -Math.ceil(-x);
    },
    ceil: function(x) {
      return -Math.floor(-x);
    }
  };
  d3.scale.pow = function() {
    return d3_scale_pow(d3.scale.linear(), 1, [ 0, 1 ]);
  };
  function d3_scale_pow(linear, exponent, domain) {
    var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
    function scale(x) {
      return linear(powp(x));
    }
    scale.invert = function(x) {
      return powb(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      linear.domain((domain = x.map(Number)).map(powp));
      return scale;
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    scale.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    scale.nice = function(m) {
      return scale.domain(d3_scale_linearNice(domain, m));
    };
    scale.exponent = function(x) {
      if (!arguments.length) return exponent;
      powp = d3_scale_powPow(exponent = x);
      powb = d3_scale_powPow(1 / exponent);
      linear.domain(domain.map(powp));
      return scale;
    };
    scale.copy = function() {
      return d3_scale_pow(linear.copy(), exponent, domain);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  function d3_scale_powPow(e) {
    return function(x) {
      return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
    };
  }
  d3.scale.sqrt = function() {
    return d3.scale.pow().exponent(.5);
  };
  d3.scale.ordinal = function() {
    return d3_scale_ordinal([], {
      t: "range",
      a: [ [] ]
    });
  };
  function d3_scale_ordinal(domain, ranger) {
    var index, range, rangeBand;
    function scale(x) {
      return range[((index.get(x) || index.set(x, domain.push(x))) - 1) % range.length];
    }
    function steps(start, step) {
      return d3.range(domain.length).map(function(i) {
        return start + step * i;
      });
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = [];
      index = new d3_Map();
      var i = -1, n = x.length, xi;
      while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
      return scale[ranger.t].apply(scale, ranger.a);
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      rangeBand = 0;
      ranger = {
        t: "range",
        a: arguments
      };
      return scale;
    };
    scale.rangePoints = function(x, padding) {
      if (arguments.length < 2) padding = 0;
      var start = x[0], stop = x[1], step = (stop - start) / (Math.max(1, domain.length - 1) + padding);
      range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
      rangeBand = 0;
      ranger = {
        t: "rangePoints",
        a: arguments
      };
      return scale;
    };
    scale.rangeBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
      range = steps(start + step * outerPadding, step);
      if (reverse) range.reverse();
      rangeBand = step * (1 - padding);
      ranger = {
        t: "rangeBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeRoundBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding)), error = stop - start - (domain.length - padding) * step;
      range = steps(start + Math.round(error / 2), step);
      if (reverse) range.reverse();
      rangeBand = Math.round(step * (1 - padding));
      ranger = {
        t: "rangeRoundBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeBand = function() {
      return rangeBand;
    };
    scale.rangeExtent = function() {
      return d3_scaleExtent(ranger.a[0]);
    };
    scale.copy = function() {
      return d3_scale_ordinal(domain, ranger);
    };
    return scale.domain(domain);
  }
  d3.scale.category10 = function() {
    return d3.scale.ordinal().range(d3_category10);
  };
  d3.scale.category20 = function() {
    return d3.scale.ordinal().range(d3_category20);
  };
  d3.scale.category20b = function() {
    return d3.scale.ordinal().range(d3_category20b);
  };
  d3.scale.category20c = function() {
    return d3.scale.ordinal().range(d3_category20c);
  };
  var d3_category10 = [ 2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175 ].map(d3_rgbString);
  var d3_category20 = [ 2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725 ].map(d3_rgbString);
  var d3_category20b = [ 3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654 ].map(d3_rgbString);
  var d3_category20c = [ 3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081 ].map(d3_rgbString);
  d3.scale.quantile = function() {
    return d3_scale_quantile([], []);
  };
  function d3_scale_quantile(domain, range) {
    var thresholds;
    function rescale() {
      var k = 0, q = range.length;
      thresholds = [];
      while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
      return scale;
    }
    function scale(x) {
      if (!isNaN(x = +x)) return range[d3.bisect(thresholds, x)];
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.filter(function(d) {
        return !isNaN(d);
      }).sort(d3.ascending);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.quantiles = function() {
      return thresholds;
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      return y < 0 ? [ NaN, NaN ] : [ y > 0 ? thresholds[y - 1] : domain[0], y < thresholds.length ? thresholds[y] : domain[domain.length - 1] ];
    };
    scale.copy = function() {
      return d3_scale_quantile(domain, range);
    };
    return rescale();
  }
  d3.scale.quantize = function() {
    return d3_scale_quantize(0, 1, [ 0, 1 ]);
  };
  function d3_scale_quantize(x0, x1, range) {
    var kx, i;
    function scale(x) {
      return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
    }
    function rescale() {
      kx = range.length / (x1 - x0);
      i = range.length - 1;
      return scale;
    }
    scale.domain = function(x) {
      if (!arguments.length) return [ x0, x1 ];
      x0 = +x[0];
      x1 = +x[x.length - 1];
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      y = y < 0 ? NaN : y / kx + x0;
      return [ y, y + 1 / kx ];
    };
    scale.copy = function() {
      return d3_scale_quantize(x0, x1, range);
    };
    return rescale();
  }
  d3.scale.threshold = function() {
    return d3_scale_threshold([ .5 ], [ 0, 1 ]);
  };
  function d3_scale_threshold(domain, range) {
    function scale(x) {
      if (x <= x) return range[d3.bisect(domain, x)];
    }
    scale.domain = function(_) {
      if (!arguments.length) return domain;
      domain = _;
      return scale;
    };
    scale.range = function(_) {
      if (!arguments.length) return range;
      range = _;
      return scale;
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      return [ domain[y - 1], domain[y] ];
    };
    scale.copy = function() {
      return d3_scale_threshold(domain, range);
    };
    return scale;
  }
  d3.scale.identity = function() {
    return d3_scale_identity([ 0, 1 ]);
  };
  function d3_scale_identity(domain) {
    function identity(x) {
      return +x;
    }
    identity.invert = identity;
    identity.domain = identity.range = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(identity);
      return identity;
    };
    identity.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    identity.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    identity.copy = function() {
      return d3_scale_identity(domain);
    };
    return identity;
  }
  d3.svg.arc = function() {
    var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
    function arc() {
      var r0 = innerRadius.apply(this, arguments), r1 = outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset, a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset, da = (a1 < a0 && (da = a0, 
      a0 = a1, a1 = da), a1 - a0), df = da < π ? "0" : "1", c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      return da >= d3_svg_arcMax ? r0 ? "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "M0," + r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + -r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + r0 + "Z" : "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "Z" : r0 ? "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L" + r0 * c1 + "," + r0 * s1 + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0 + "Z" : "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L0,0" + "Z";
    }
    arc.innerRadius = function(v) {
      if (!arguments.length) return innerRadius;
      innerRadius = d3_functor(v);
      return arc;
    };
    arc.outerRadius = function(v) {
      if (!arguments.length) return outerRadius;
      outerRadius = d3_functor(v);
      return arc;
    };
    arc.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return arc;
    };
    arc.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return arc;
    };
    arc.centroid = function() {
      var r = (innerRadius.apply(this, arguments) + outerRadius.apply(this, arguments)) / 2, a = (startAngle.apply(this, arguments) + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
      return [ Math.cos(a) * r, Math.sin(a) * r ];
    };
    return arc;
  };
  var d3_svg_arcOffset = -π / 2, d3_svg_arcMax = 2 * π - 1e-6;
  function d3_svg_arcInnerRadius(d) {
    return d.innerRadius;
  }
  function d3_svg_arcOuterRadius(d) {
    return d.outerRadius;
  }
  function d3_svg_arcStartAngle(d) {
    return d.startAngle;
  }
  function d3_svg_arcEndAngle(d) {
    return d.endAngle;
  }
  d3.svg.line.radial = function() {
    var line = d3_svg_line(d3_svg_lineRadial);
    line.radius = line.x, delete line.x;
    line.angle = line.y, delete line.y;
    return line;
  };
  function d3_svg_lineRadial(points) {
    var point, i = -1, n = points.length, r, a;
    while (++i < n) {
      point = points[i];
      r = point[0];
      a = point[1] + d3_svg_arcOffset;
      point[0] = r * Math.cos(a);
      point[1] = r * Math.sin(a);
    }
    return points;
  }
  function d3_svg_area(projection) {
    var x0 = d3_svg_lineX, x1 = d3_svg_lineX, y0 = 0, y1 = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = "L", tension = .7;
    function area(data) {
      var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
        return x;
      } : d3_functor(x1), fy1 = y0 === y1 ? function() {
        return y;
      } : d3_functor(y1), x, y;
      function segment() {
        segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points0.push([ x = +fx0.call(this, d, i), y = +fy0.call(this, d, i) ]);
          points1.push([ +fx1.call(this, d, i), +fy1.call(this, d, i) ]);
        } else if (points0.length) {
          segment();
          points0 = [];
          points1 = [];
        }
      }
      if (points0.length) segment();
      return segments.length ? segments.join("") : null;
    }
    area.x = function(_) {
      if (!arguments.length) return x1;
      x0 = x1 = _;
      return area;
    };
    area.x0 = function(_) {
      if (!arguments.length) return x0;
      x0 = _;
      return area;
    };
    area.x1 = function(_) {
      if (!arguments.length) return x1;
      x1 = _;
      return area;
    };
    area.y = function(_) {
      if (!arguments.length) return y1;
      y0 = y1 = _;
      return area;
    };
    area.y0 = function(_) {
      if (!arguments.length) return y0;
      y0 = _;
      return area;
    };
    area.y1 = function(_) {
      if (!arguments.length) return y1;
      y1 = _;
      return area;
    };
    area.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return area;
    };
    area.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      interpolateReverse = interpolate.reverse || interpolate;
      L = interpolate.closed ? "M" : "L";
      return area;
    };
    area.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return area;
    };
    return area;
  }
  d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
  d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
  d3.svg.area = function() {
    return d3_svg_area(d3_identity);
  };
  d3.svg.area.radial = function() {
    var area = d3_svg_area(d3_svg_lineRadial);
    area.radius = area.x, delete area.x;
    area.innerRadius = area.x0, delete area.x0;
    area.outerRadius = area.x1, delete area.x1;
    area.angle = area.y, delete area.y;
    area.startAngle = area.y0, delete area.y0;
    area.endAngle = area.y1, delete area.y1;
    return area;
  };
  d3.svg.chord = function() {
    var source = d3_source, target = d3_target, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
    function chord(d, i) {
      var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
      return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
    }
    function subgroup(self, f, d, i) {
      var subgroup = f.call(self, d, i), r = radius.call(self, subgroup, i), a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset, a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
      return {
        r: r,
        a0: a0,
        a1: a1,
        p0: [ r * Math.cos(a0), r * Math.sin(a0) ],
        p1: [ r * Math.cos(a1), r * Math.sin(a1) ]
      };
    }
    function equals(a, b) {
      return a.a0 == b.a0 && a.a1 == b.a1;
    }
    function arc(r, p, a) {
      return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
    }
    function curve(r0, p0, r1, p1) {
      return "Q 0,0 " + p1;
    }
    chord.radius = function(v) {
      if (!arguments.length) return radius;
      radius = d3_functor(v);
      return chord;
    };
    chord.source = function(v) {
      if (!arguments.length) return source;
      source = d3_functor(v);
      return chord;
    };
    chord.target = function(v) {
      if (!arguments.length) return target;
      target = d3_functor(v);
      return chord;
    };
    chord.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return chord;
    };
    chord.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return chord;
    };
    return chord;
  };
  function d3_svg_chordRadius(d) {
    return d.radius;
  }
  d3.svg.diagonal = function() {
    var source = d3_source, target = d3_target, projection = d3_svg_diagonalProjection;
    function diagonal(d, i) {
      var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [ p0, {
        x: p0.x,
        y: m
      }, {
        x: p3.x,
        y: m
      }, p3 ];
      p = p.map(projection);
      return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
    }
    diagonal.source = function(x) {
      if (!arguments.length) return source;
      source = d3_functor(x);
      return diagonal;
    };
    diagonal.target = function(x) {
      if (!arguments.length) return target;
      target = d3_functor(x);
      return diagonal;
    };
    diagonal.projection = function(x) {
      if (!arguments.length) return projection;
      projection = x;
      return diagonal;
    };
    return diagonal;
  };
  function d3_svg_diagonalProjection(d) {
    return [ d.x, d.y ];
  }
  d3.svg.diagonal.radial = function() {
    var diagonal = d3.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
    diagonal.projection = function(x) {
      return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
    };
    return diagonal;
  };
  function d3_svg_diagonalRadialProjection(projection) {
    return function() {
      var d = projection.apply(this, arguments), r = d[0], a = d[1] + d3_svg_arcOffset;
      return [ r * Math.cos(a), r * Math.sin(a) ];
    };
  }
  d3.svg.symbol = function() {
    var type = d3_svg_symbolType, size = d3_svg_symbolSize;
    function symbol(d, i) {
      return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
    }
    symbol.type = function(x) {
      if (!arguments.length) return type;
      type = d3_functor(x);
      return symbol;
    };
    symbol.size = function(x) {
      if (!arguments.length) return size;
      size = d3_functor(x);
      return symbol;
    };
    return symbol;
  };
  function d3_svg_symbolSize() {
    return 64;
  }
  function d3_svg_symbolType() {
    return "circle";
  }
  function d3_svg_symbolCircle(size) {
    var r = Math.sqrt(size / π);
    return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
  }
  var d3_svg_symbols = d3.map({
    circle: d3_svg_symbolCircle,
    cross: function(size) {
      var r = Math.sqrt(size / 5) / 2;
      return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
    },
    diamond: function(size) {
      var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
      return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
    },
    square: function(size) {
      var r = Math.sqrt(size) / 2;
      return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
    },
    "triangle-down": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
    },
    "triangle-up": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
    }
  });
  d3.svg.symbolTypes = d3_svg_symbols.keys();
  var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
  function d3_transition(groups, id) {
    d3_subclass(groups, d3_transitionPrototype);
    groups.id = id;
    return groups;
  }
  var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit;
  d3_transitionPrototype.call = d3_selectionPrototype.call;
  d3_transitionPrototype.empty = d3_selectionPrototype.empty;
  d3_transitionPrototype.node = d3_selectionPrototype.node;
  d3_transitionPrototype.size = d3_selectionPrototype.size;
  d3.transition = function(selection) {
    return arguments.length ? d3_transitionInheritId ? selection.transition() : selection : d3_selectionRoot.transition();
  };
  d3.transition.prototype = d3_transitionPrototype;
  d3_transitionPrototype.select = function(selector) {
    var id = this.id, subgroups = [], subgroup, subnode, node;
    selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          d3_transitionNode(subnode, i, id, node.__transition__[id]);
          subgroup.push(subnode);
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_transition(subgroups, id);
  };
  d3_transitionPrototype.selectAll = function(selector) {
    var id = this.id, subgroups = [], subgroup, subnodes, node, subnode, transition;
    selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          transition = node.__transition__[id];
          subnodes = selector.call(node, node.__data__, i, j);
          subgroups.push(subgroup = []);
          for (var k = -1, o = subnodes.length; ++k < o; ) {
            if (subnode = subnodes[k]) d3_transitionNode(subnode, k, id, transition);
            subgroup.push(subnode);
          }
        }
      }
    }
    return d3_transition(subgroups, id);
  };
  d3_transitionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i)) {
          subgroup.push(node);
        }
      }
    }
    return d3_transition(subgroups, this.id);
  };
  d3_transitionPrototype.tween = function(name, tween) {
    var id = this.id;
    if (arguments.length < 2) return this.node().__transition__[id].tween.get(name);
    return d3_selection_each(this, tween == null ? function(node) {
      node.__transition__[id].tween.remove(name);
    } : function(node) {
      node.__transition__[id].tween.set(name, tween);
    });
  };
  function d3_transition_tween(groups, name, value, tween) {
    var id = groups.id;
    return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
    } : (value = tween(value), function(node) {
      node.__transition__[id].tween.set(name, value);
    }));
  }
  d3_transitionPrototype.attr = function(nameNS, value) {
    if (arguments.length < 2) {
      for (value in nameNS) this.attr(value, nameNS[value]);
      return this;
    }
    var interpolate = nameNS == "transform" ? d3_interpolateTransform : d3_interpolate, name = d3.ns.qualify(nameNS);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    function attrTween(b) {
      return b == null ? attrNull : (b += "", function() {
        var a = this.getAttribute(name), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttribute(name, i(t));
        });
      });
    }
    function attrTweenNS(b) {
      return b == null ? attrNullNS : (b += "", function() {
        var a = this.getAttributeNS(name.space, name.local), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttributeNS(name.space, name.local, i(t));
        });
      });
    }
    return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween);
  };
  d3_transitionPrototype.attrTween = function(nameNS, tween) {
    var name = d3.ns.qualify(nameNS);
    function attrTween(d, i) {
      var f = tween.call(this, d, i, this.getAttribute(name));
      return f && function(t) {
        this.setAttribute(name, f(t));
      };
    }
    function attrTweenNS(d, i) {
      var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
      return f && function(t) {
        this.setAttributeNS(name.space, name.local, f(t));
      };
    }
    return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
  };
  d3_transitionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.style(priority, name[priority], value);
        return this;
      }
      priority = "";
    }
    function styleNull() {
      this.style.removeProperty(name);
    }
    function styleString(b) {
      return b == null ? styleNull : (b += "", function() {
        var a = d3_window.getComputedStyle(this, null).getPropertyValue(name), i;
        return a !== b && (i = d3_interpolate(a, b), function(t) {
          this.style.setProperty(name, i(t), priority);
        });
      });
    }
    return d3_transition_tween(this, "style." + name, value, styleString);
  };
  d3_transitionPrototype.styleTween = function(name, tween, priority) {
    if (arguments.length < 3) priority = "";
    function styleTween(d, i) {
      var f = tween.call(this, d, i, d3_window.getComputedStyle(this, null).getPropertyValue(name));
      return f && function(t) {
        this.style.setProperty(name, f(t), priority);
      };
    }
    return this.tween("style." + name, styleTween);
  };
  d3_transitionPrototype.text = function(value) {
    return d3_transition_tween(this, "text", value, d3_transition_text);
  };
  function d3_transition_text(b) {
    if (b == null) b = "";
    return function() {
      this.textContent = b;
    };
  }
  d3_transitionPrototype.remove = function() {
    return this.each("end.transition", function() {
      var p;
      if (!this.__transition__ && (p = this.parentNode)) p.removeChild(this);
    });
  };
  d3_transitionPrototype.ease = function(value) {
    var id = this.id;
    if (arguments.length < 1) return this.node().__transition__[id].ease;
    if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
    return d3_selection_each(this, function(node) {
      node.__transition__[id].ease = value;
    });
  };
  d3_transitionPrototype.delay = function(value) {
    var id = this.id;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].delay = value.call(node, node.__data__, i, j) | 0;
    } : (value |= 0, function(node) {
      node.__transition__[id].delay = value;
    }));
  };
  d3_transitionPrototype.duration = function(value) {
    var id = this.id;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].duration = Math.max(1, value.call(node, node.__data__, i, j) | 0);
    } : (value = Math.max(1, value | 0), function(node) {
      node.__transition__[id].duration = value;
    }));
  };
  d3_transitionPrototype.each = function(type, listener) {
    var id = this.id;
    if (arguments.length < 2) {
      var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
      d3_transitionInheritId = id;
      d3_selection_each(this, function(node, i, j) {
        d3_transitionInherit = node.__transition__[id];
        type.call(node, node.__data__, i, j);
      });
      d3_transitionInherit = inherit;
      d3_transitionInheritId = inheritId;
    } else {
      d3_selection_each(this, function(node) {
        var transition = node.__transition__[id];
        (transition.event || (transition.event = d3.dispatch("start", "end"))).on(type, listener);
      });
    }
    return this;
  };
  d3_transitionPrototype.transition = function() {
    var id0 = this.id, id1 = ++d3_transitionId, subgroups = [], subgroup, group, node, transition;
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          transition = Object.create(node.__transition__[id0]);
          transition.delay += transition.duration;
          d3_transitionNode(node, i, id1, transition);
        }
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, id1);
  };
  function d3_transitionNode(node, i, id, inherit) {
    var lock = node.__transition__ || (node.__transition__ = {
      active: 0,
      count: 0
    }), transition = lock[id];
    if (!transition) {
      var time = inherit.time;
      transition = lock[id] = {
        tween: new d3_Map(),
        time: time,
        ease: inherit.ease,
        delay: inherit.delay,
        duration: inherit.duration
      };
      ++lock.count;
      d3.timer(function(elapsed) {
        var d = node.__data__, ease = transition.ease, delay = transition.delay, duration = transition.duration, tweened = [];
        if (delay <= elapsed) return start(elapsed);
        d3_timer_replace(start, delay, time);
        function start(elapsed) {
          if (lock.active > id) return stop();
          lock.active = id;
          transition.event && transition.event.start.call(node, d, i);
          transition.tween.forEach(function(key, value) {
            if (value = value.call(node, d, i)) {
              tweened.push(value);
            }
          });
          if (tick(elapsed)) return 1;
          d3_timer_replace(tick, 0, time);
        }
        function tick(elapsed) {
          if (lock.active !== id) return stop();
          var t = (elapsed - delay) / duration, e = ease(t), n = tweened.length;
          while (n > 0) {
            tweened[--n].call(node, e);
          }
          if (t >= 1) {
            stop();
            transition.event && transition.event.end.call(node, d, i);
            return 1;
          }
        }
        function stop() {
          if (--lock.count) delete lock[id]; else delete node.__transition__;
          return 1;
        }
      }, 0, time);
    }
  }
  d3.svg.axis = function() {
    var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, tickMajorSize = 6, tickMinorSize = 6, tickEndSize = 6, tickPadding = 3, tickArguments_ = [ 10 ], tickValues = null, tickFormat_, tickSubdivide = 0;
    function axis(g) {
      g.each(function() {
        var g = d3.select(this);
        var ticks = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain() : tickValues, tickFormat = tickFormat_ == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String : tickFormat_;
        var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide), subtick = g.selectAll(".tick.minor").data(subticks, String), subtickEnter = subtick.enter().insert("line", ".tick").attr("class", "tick minor").style("opacity", 1e-6), subtickExit = d3.transition(subtick.exit()).style("opacity", 1e-6).remove(), subtickUpdate = d3.transition(subtick).style("opacity", 1);
        var tick = g.selectAll(".tick.major").data(ticks, String), tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick major").style("opacity", 1e-6), tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(), tickUpdate = d3.transition(tick).style("opacity", 1), tickTransform;
        var range = d3_scaleRange(scale), path = g.selectAll(".domain").data([ 0 ]), pathUpdate = (path.enter().append("path").attr("class", "domain"), 
        d3.transition(path));
        var scale1 = scale.copy(), scale0 = this.__chart__ || scale1;
        this.__chart__ = scale1;
        tickEnter.append("line");
        tickEnter.append("text");
        var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text").text(tickFormat), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text");
        switch (orient) {
         case "bottom":
          {
            tickTransform = d3_svg_axisX;
            subtickEnter.attr("y2", tickMinorSize);
            subtickUpdate.attr("x2", 0).attr("y2", tickMinorSize);
            lineEnter.attr("y2", tickMajorSize);
            textEnter.attr("y", Math.max(tickMajorSize, 0) + tickPadding);
            lineUpdate.attr("x2", 0).attr("y2", tickMajorSize);
            textUpdate.attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding);
            text.attr("dy", ".71em").style("text-anchor", "middle");
            pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
            break;
          }

         case "top":
          {
            tickTransform = d3_svg_axisX;
            subtickEnter.attr("y2", -tickMinorSize);
            subtickUpdate.attr("x2", 0).attr("y2", -tickMinorSize);
            lineEnter.attr("y2", -tickMajorSize);
            textEnter.attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
            lineUpdate.attr("x2", 0).attr("y2", -tickMajorSize);
            textUpdate.attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
            text.attr("dy", "0em").style("text-anchor", "middle");
            pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
            break;
          }

         case "left":
          {
            tickTransform = d3_svg_axisY;
            subtickEnter.attr("x2", -tickMinorSize);
            subtickUpdate.attr("x2", -tickMinorSize).attr("y2", 0);
            lineEnter.attr("x2", -tickMajorSize);
            textEnter.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
            lineUpdate.attr("x2", -tickMajorSize).attr("y2", 0);
            textUpdate.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", 0);
            text.attr("dy", ".32em").style("text-anchor", "end");
            pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
            break;
          }

         case "right":
          {
            tickTransform = d3_svg_axisY;
            subtickEnter.attr("x2", tickMinorSize);
            subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
            lineEnter.attr("x2", tickMajorSize);
            textEnter.attr("x", Math.max(tickMajorSize, 0) + tickPadding);
            lineUpdate.attr("x2", tickMajorSize).attr("y2", 0);
            textUpdate.attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0);
            text.attr("dy", ".32em").style("text-anchor", "start");
            pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
            break;
          }
        }
        if (scale.rangeBand) {
          var dx = scale1.rangeBand() / 2, x = function(d) {
            return scale1(d) + dx;
          };
          tickEnter.call(tickTransform, x);
          tickUpdate.call(tickTransform, x);
        } else {
          tickEnter.call(tickTransform, scale0);
          tickUpdate.call(tickTransform, scale1);
          tickExit.call(tickTransform, scale1);
          subtickEnter.call(tickTransform, scale0);
          subtickUpdate.call(tickTransform, scale1);
          subtickExit.call(tickTransform, scale1);
        }
      });
    }
    axis.scale = function(x) {
      if (!arguments.length) return scale;
      scale = x;
      return axis;
    };
    axis.orient = function(x) {
      if (!arguments.length) return orient;
      orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
      return axis;
    };
    axis.ticks = function() {
      if (!arguments.length) return tickArguments_;
      tickArguments_ = arguments;
      return axis;
    };
    axis.tickValues = function(x) {
      if (!arguments.length) return tickValues;
      tickValues = x;
      return axis;
    };
    axis.tickFormat = function(x) {
      if (!arguments.length) return tickFormat_;
      tickFormat_ = x;
      return axis;
    };
    axis.tickSize = function(x, y) {
      if (!arguments.length) return tickMajorSize;
      var n = arguments.length - 1;
      tickMajorSize = +x;
      tickMinorSize = n > 1 ? +y : tickMajorSize;
      tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
      return axis;
    };
    axis.tickPadding = function(x) {
      if (!arguments.length) return tickPadding;
      tickPadding = +x;
      return axis;
    };
    axis.tickSubdivide = function(x) {
      if (!arguments.length) return tickSubdivide;
      tickSubdivide = +x;
      return axis;
    };
    return axis;
  };
  var d3_svg_axisDefaultOrient = "bottom", d3_svg_axisOrients = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  };
  function d3_svg_axisX(selection, x) {
    selection.attr("transform", function(d) {
      return "translate(" + x(d) + ",0)";
    });
  }
  function d3_svg_axisY(selection, y) {
    selection.attr("transform", function(d) {
      return "translate(0," + y(d) + ")";
    });
  }
  function d3_svg_axisSubdivide(scale, ticks, m) {
    subticks = [];
    if (m && ticks.length > 1) {
      var extent = d3_scaleExtent(scale.domain()), subticks, i = -1, n = ticks.length, d = (ticks[1] - ticks[0]) / ++m, j, v;
      while (++i < n) {
        for (j = m; --j > 0; ) {
          if ((v = +ticks[i] - j * d) >= extent[0]) {
            subticks.push(v);
          }
        }
      }
      for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1]; ) {
        subticks.push(v);
      }
    }
    return subticks;
  }
  d3.svg.brush = function() {
    var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null, y = null, resizes = d3_svg_brushResizes[0], extent = [ [ 0, 0 ], [ 0, 0 ] ], clamp = [ true, true ], extentDomain;
    function brush(g) {
      g.each(function() {
        var g = d3.select(this), bg = g.selectAll(".background").data([ 0 ]), fg = g.selectAll(".extent").data([ 0 ]), tz = g.selectAll(".resize").data(resizes, String), e;
        g.style("pointer-events", "all").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
        bg.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
        fg.enter().append("rect").attr("class", "extent").style("cursor", "move");
        tz.enter().append("g").attr("class", function(d) {
          return "resize " + d;
        }).style("cursor", function(d) {
          return d3_svg_brushCursor[d];
        }).append("rect").attr("x", function(d) {
          return /[ew]$/.test(d) ? -3 : null;
        }).attr("y", function(d) {
          return /^[ns]/.test(d) ? -3 : null;
        }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
        tz.style("display", brush.empty() ? "none" : null);
        tz.exit().remove();
        if (x) {
          e = d3_scaleRange(x);
          bg.attr("x", e[0]).attr("width", e[1] - e[0]);
          redrawX(g);
        }
        if (y) {
          e = d3_scaleRange(y);
          bg.attr("y", e[0]).attr("height", e[1] - e[0]);
          redrawY(g);
        }
        redraw(g);
      });
    }
    function redraw(g) {
      g.selectAll(".resize").attr("transform", function(d) {
        return "translate(" + extent[+/e$/.test(d)][0] + "," + extent[+/^s/.test(d)][1] + ")";
      });
    }
    function redrawX(g) {
      g.select(".extent").attr("x", extent[0][0]);
      g.selectAll(".extent,.n>rect,.s>rect").attr("width", extent[1][0] - extent[0][0]);
    }
    function redrawY(g) {
      g.select(".extent").attr("y", extent[0][1]);
      g.selectAll(".extent,.e>rect,.w>rect").attr("height", extent[1][1] - extent[0][1]);
    }
    function brushstart() {
      var target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), dragRestore = d3_event_dragSuppress(), center, origin = mouse(), offset;
      var w = d3.select(d3_window).on("keydown.brush", keydown).on("keyup.brush", keyup);
      if (d3.event.changedTouches) {
        w.on("touchmove.brush", brushmove).on("touchend.brush", brushend);
      } else {
        w.on("mousemove.brush", brushmove).on("mouseup.brush", brushend);
      }
      if (dragging) {
        origin[0] = extent[0][0] - origin[0];
        origin[1] = extent[0][1] - origin[1];
      } else if (resizing) {
        var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
        offset = [ extent[1 - ex][0] - origin[0], extent[1 - ey][1] - origin[1] ];
        origin[0] = extent[ex][0];
        origin[1] = extent[ey][1];
      } else if (d3.event.altKey) center = origin.slice();
      g.style("pointer-events", "none").selectAll(".resize").style("display", null);
      d3.select("body").style("cursor", eventTarget.style("cursor"));
      event_({
        type: "brushstart"
      });
      brushmove();
      function mouse() {
        var touches = d3.event.changedTouches;
        return touches ? d3.touches(target, touches)[0] : d3.mouse(target);
      }
      function keydown() {
        if (d3.event.keyCode == 32) {
          if (!dragging) {
            center = null;
            origin[0] -= extent[1][0];
            origin[1] -= extent[1][1];
            dragging = 2;
          }
          d3_eventPreventDefault();
        }
      }
      function keyup() {
        if (d3.event.keyCode == 32 && dragging == 2) {
          origin[0] += extent[1][0];
          origin[1] += extent[1][1];
          dragging = 0;
          d3_eventPreventDefault();
        }
      }
      function brushmove() {
        var point = mouse(), moved = false;
        if (offset) {
          point[0] += offset[0];
          point[1] += offset[1];
        }
        if (!dragging) {
          if (d3.event.altKey) {
            if (!center) center = [ (extent[0][0] + extent[1][0]) / 2, (extent[0][1] + extent[1][1]) / 2 ];
            origin[0] = extent[+(point[0] < center[0])][0];
            origin[1] = extent[+(point[1] < center[1])][1];
          } else center = null;
        }
        if (resizingX && move1(point, x, 0)) {
          redrawX(g);
          moved = true;
        }
        if (resizingY && move1(point, y, 1)) {
          redrawY(g);
          moved = true;
        }
        if (moved) {
          redraw(g);
          event_({
            type: "brush",
            mode: dragging ? "move" : "resize"
          });
        }
      }
      function move1(point, scale, i) {
        var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], size = extent[1][i] - extent[0][i], min, max;
        if (dragging) {
          r0 -= position;
          r1 -= size + position;
        }
        min = clamp[i] ? Math.max(r0, Math.min(r1, point[i])) : point[i];
        if (dragging) {
          max = (min += position) + size;
        } else {
          if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
          if (position < min) {
            max = min;
            min = position;
          } else {
            max = position;
          }
        }
        if (extent[0][i] !== min || extent[1][i] !== max) {
          extentDomain = null;
          extent[0][i] = min;
          extent[1][i] = max;
          return true;
        }
      }
      function brushend() {
        brushmove();
        g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
        d3.select("body").style("cursor", null);
        w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
        dragRestore();
        event_({
          type: "brushend"
        });
      }
    }
    brush.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.clamp = function(z) {
      if (!arguments.length) return x && y ? clamp : x || y ? clamp[+!x] : null;
      if (x && y) clamp = [ !!z[0], !!z[1] ]; else if (x || y) clamp[+!x] = !!z;
      return brush;
    };
    brush.extent = function(z) {
      var x0, x1, y0, y1, t;
      if (!arguments.length) {
        z = extentDomain || extent;
        if (x) {
          x0 = z[0][0], x1 = z[1][0];
          if (!extentDomain) {
            x0 = extent[0][0], x1 = extent[1][0];
            if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
            if (x1 < x0) t = x0, x0 = x1, x1 = t;
          }
        }
        if (y) {
          y0 = z[0][1], y1 = z[1][1];
          if (!extentDomain) {
            y0 = extent[0][1], y1 = extent[1][1];
            if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
            if (y1 < y0) t = y0, y0 = y1, y1 = t;
          }
        }
        return x && y ? [ [ x0, y0 ], [ x1, y1 ] ] : x ? [ x0, x1 ] : y && [ y0, y1 ];
      }
      extentDomain = [ [ 0, 0 ], [ 0, 0 ] ];
      if (x) {
        x0 = z[0], x1 = z[1];
        if (y) x0 = x0[0], x1 = x1[0];
        extentDomain[0][0] = x0, extentDomain[1][0] = x1;
        if (x.invert) x0 = x(x0), x1 = x(x1);
        if (x1 < x0) t = x0, x0 = x1, x1 = t;
        extent[0][0] = x0 | 0, extent[1][0] = x1 | 0;
      }
      if (y) {
        y0 = z[0], y1 = z[1];
        if (x) y0 = y0[1], y1 = y1[1];
        extentDomain[0][1] = y0, extentDomain[1][1] = y1;
        if (y.invert) y0 = y(y0), y1 = y(y1);
        if (y1 < y0) t = y0, y0 = y1, y1 = t;
        extent[0][1] = y0 | 0, extent[1][1] = y1 | 0;
      }
      return brush;
    };
    brush.clear = function() {
      extentDomain = null;
      extent[0][0] = extent[0][1] = extent[1][0] = extent[1][1] = 0;
      return brush;
    };
    brush.empty = function() {
      return x && extent[0][0] === extent[1][0] || y && extent[0][1] === extent[1][1];
    };
    return d3.rebind(brush, event, "on");
  };
  var d3_svg_brushCursor = {
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
  };
  var d3_svg_brushResizes = [ [ "n", "e", "s", "w", "nw", "ne", "se", "sw" ], [ "e", "w" ], [ "n", "s" ], [] ];
  d3.time = {};
  var d3_time = Date, d3_time_daySymbols = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  function d3_time_utc() {
    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
  }
  d3_time_utc.prototype = {
    getDate: function() {
      return this._.getUTCDate();
    },
    getDay: function() {
      return this._.getUTCDay();
    },
    getFullYear: function() {
      return this._.getUTCFullYear();
    },
    getHours: function() {
      return this._.getUTCHours();
    },
    getMilliseconds: function() {
      return this._.getUTCMilliseconds();
    },
    getMinutes: function() {
      return this._.getUTCMinutes();
    },
    getMonth: function() {
      return this._.getUTCMonth();
    },
    getSeconds: function() {
      return this._.getUTCSeconds();
    },
    getTime: function() {
      return this._.getTime();
    },
    getTimezoneOffset: function() {
      return 0;
    },
    valueOf: function() {
      return this._.valueOf();
    },
    setDate: function() {
      d3_time_prototype.setUTCDate.apply(this._, arguments);
    },
    setDay: function() {
      d3_time_prototype.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function() {
      d3_time_prototype.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function() {
      d3_time_prototype.setUTCHours.apply(this._, arguments);
    },
    setMilliseconds: function() {
      d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
    },
    setMinutes: function() {
      d3_time_prototype.setUTCMinutes.apply(this._, arguments);
    },
    setMonth: function() {
      d3_time_prototype.setUTCMonth.apply(this._, arguments);
    },
    setSeconds: function() {
      d3_time_prototype.setUTCSeconds.apply(this._, arguments);
    },
    setTime: function() {
      d3_time_prototype.setTime.apply(this._, arguments);
    }
  };
  var d3_time_prototype = Date.prototype;
  var d3_time_formatDateTime = "%a %b %e %X %Y", d3_time_formatDate = "%m/%d/%Y", d3_time_formatTime = "%H:%M:%S";
  var d3_time_days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], d3_time_dayAbbreviations = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ], d3_time_months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], d3_time_monthAbbreviations = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  function d3_time_interval(local, step, number) {
    function round(date) {
      var d0 = local(date), d1 = offset(d0, 1);
      return date - d0 < d1 - date ? d0 : d1;
    }
    function ceil(date) {
      step(date = local(new d3_time(date - 1)), 1);
      return date;
    }
    function offset(date, k) {
      step(date = new d3_time(+date), k);
      return date;
    }
    function range(t0, t1, dt) {
      var time = ceil(t0), times = [];
      if (dt > 1) {
        while (time < t1) {
          if (!(number(time) % dt)) times.push(new Date(+time));
          step(time, 1);
        }
      } else {
        while (time < t1) times.push(new Date(+time)), step(time, 1);
      }
      return times;
    }
    function range_utc(t0, t1, dt) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time_utc();
        utc._ = t0;
        return range(utc, t1, dt);
      } finally {
        d3_time = Date;
      }
    }
    local.floor = local;
    local.round = round;
    local.ceil = ceil;
    local.offset = offset;
    local.range = range;
    var utc = local.utc = d3_time_interval_utc(local);
    utc.floor = utc;
    utc.round = d3_time_interval_utc(round);
    utc.ceil = d3_time_interval_utc(ceil);
    utc.offset = d3_time_interval_utc(offset);
    utc.range = range_utc;
    return local;
  }
  function d3_time_interval_utc(method) {
    return function(date, k) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time_utc();
        utc._ = date;
        return method(utc, k)._;
      } finally {
        d3_time = Date;
      }
    };
  }
  d3.time.year = d3_time_interval(function(date) {
    date = d3.time.day(date);
    date.setMonth(0, 1);
    return date;
  }, function(date, offset) {
    date.setFullYear(date.getFullYear() + offset);
  }, function(date) {
    return date.getFullYear();
  });
  d3.time.years = d3.time.year.range;
  d3.time.years.utc = d3.time.year.utc.range;
  d3.time.day = d3_time_interval(function(date) {
    var day = new d3_time(2e3, 0);
    day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    return day;
  }, function(date, offset) {
    date.setDate(date.getDate() + offset);
  }, function(date) {
    return date.getDate() - 1;
  });
  d3.time.days = d3.time.day.range;
  d3.time.days.utc = d3.time.day.utc.range;
  d3.time.dayOfYear = function(date) {
    var year = d3.time.year(date);
    return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
  };
  d3_time_daySymbols.forEach(function(day, i) {
    day = day.toLowerCase();
    i = 7 - i;
    var interval = d3.time[day] = d3_time_interval(function(date) {
      (date = d3.time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
      return date;
    }, function(date, offset) {
      date.setDate(date.getDate() + Math.floor(offset) * 7);
    }, function(date) {
      var day = d3.time.year(date).getDay();
      return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
    });
    d3.time[day + "s"] = interval.range;
    d3.time[day + "s"].utc = interval.utc.range;
    d3.time[day + "OfYear"] = function(date) {
      var day = d3.time.year(date).getDay();
      return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7);
    };
  });
  d3.time.week = d3.time.sunday;
  d3.time.weeks = d3.time.sunday.range;
  d3.time.weeks.utc = d3.time.sunday.utc.range;
  d3.time.weekOfYear = d3.time.sundayOfYear;
  d3.time.format = function(template) {
    var n = template.length;
    function format(date) {
      var string = [], i = -1, j = 0, c, p, f;
      while (++i < n) {
        if (template.charCodeAt(i) === 37) {
          string.push(template.substring(j, i));
          if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
          if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(template.substring(j, i));
      return string.join("");
    }
    format.parse = function(string) {
      var d = {
        y: 1900,
        m: 0,
        d: 1,
        H: 0,
        M: 0,
        S: 0,
        L: 0
      }, i = d3_time_parse(d, template, string, 0);
      if (i != string.length) return null;
      if ("p" in d) d.H = d.H % 12 + d.p * 12;
      var date = new d3_time();
      if ("j" in d) date.setFullYear(d.y, 0, d.j); else if ("w" in d && ("W" in d || "U" in d)) {
        date.setFullYear(d.y, 0, 1);
        date.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7 : d.w + d.U * 7 - (date.getDay() + 6) % 7);
      } else date.setFullYear(d.y, d.m, d.d);
      date.setHours(d.H, d.M, d.S, d.L);
      return date;
    };
    format.toString = function() {
      return template;
    };
    return format;
  };
  function d3_time_parse(date, template, string, j) {
    var c, p, i = 0, n = template.length, m = string.length;
    while (i < n) {
      if (j >= m) return -1;
      c = template.charCodeAt(i++);
      if (c === 37) {
        p = d3_time_parsers[template.charAt(i++)];
        if (!p || (j = p(date, string, j)) < 0) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function d3_time_formatRe(names) {
    return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
  }
  function d3_time_formatLookup(names) {
    var map = new d3_Map(), i = -1, n = names.length;
    while (++i < n) map.set(names[i].toLowerCase(), i);
    return map;
  }
  function d3_time_formatPad(value, fill, width) {
    var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }
  var d3_time_dayRe = d3_time_formatRe(d3_time_days), d3_time_dayLookup = d3_time_formatLookup(d3_time_days), d3_time_dayAbbrevRe = d3_time_formatRe(d3_time_dayAbbreviations), d3_time_dayAbbrevLookup = d3_time_formatLookup(d3_time_dayAbbreviations), d3_time_monthRe = d3_time_formatRe(d3_time_months), d3_time_monthLookup = d3_time_formatLookup(d3_time_months), d3_time_monthAbbrevRe = d3_time_formatRe(d3_time_monthAbbreviations), d3_time_monthAbbrevLookup = d3_time_formatLookup(d3_time_monthAbbreviations), d3_time_percentRe = /^%/;
  var d3_time_formatPads = {
    "-": "",
    _: " ",
    "0": "0"
  };
  var d3_time_formats = {
    a: function(d) {
      return d3_time_dayAbbreviations[d.getDay()];
    },
    A: function(d) {
      return d3_time_days[d.getDay()];
    },
    b: function(d) {
      return d3_time_monthAbbreviations[d.getMonth()];
    },
    B: function(d) {
      return d3_time_months[d.getMonth()];
    },
    c: d3.time.format(d3_time_formatDateTime),
    d: function(d, p) {
      return d3_time_formatPad(d.getDate(), p, 2);
    },
    e: function(d, p) {
      return d3_time_formatPad(d.getDate(), p, 2);
    },
    H: function(d, p) {
      return d3_time_formatPad(d.getHours(), p, 2);
    },
    I: function(d, p) {
      return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
    },
    j: function(d, p) {
      return d3_time_formatPad(1 + d3.time.dayOfYear(d), p, 3);
    },
    L: function(d, p) {
      return d3_time_formatPad(d.getMilliseconds(), p, 3);
    },
    m: function(d, p) {
      return d3_time_formatPad(d.getMonth() + 1, p, 2);
    },
    M: function(d, p) {
      return d3_time_formatPad(d.getMinutes(), p, 2);
    },
    p: function(d) {
      return d.getHours() >= 12 ? "PM" : "AM";
    },
    S: function(d, p) {
      return d3_time_formatPad(d.getSeconds(), p, 2);
    },
    U: function(d, p) {
      return d3_time_formatPad(d3.time.sundayOfYear(d), p, 2);
    },
    w: function(d) {
      return d.getDay();
    },
    W: function(d, p) {
      return d3_time_formatPad(d3.time.mondayOfYear(d), p, 2);
    },
    x: d3.time.format(d3_time_formatDate),
    X: d3.time.format(d3_time_formatTime),
    y: function(d, p) {
      return d3_time_formatPad(d.getFullYear() % 100, p, 2);
    },
    Y: function(d, p) {
      return d3_time_formatPad(d.getFullYear() % 1e4, p, 4);
    },
    Z: d3_time_zone,
    "%": function() {
      return "%";
    }
  };
  var d3_time_parsers = {
    a: d3_time_parseWeekdayAbbrev,
    A: d3_time_parseWeekday,
    b: d3_time_parseMonthAbbrev,
    B: d3_time_parseMonth,
    c: d3_time_parseLocaleFull,
    d: d3_time_parseDay,
    e: d3_time_parseDay,
    H: d3_time_parseHour24,
    I: d3_time_parseHour24,
    j: d3_time_parseDayOfYear,
    L: d3_time_parseMilliseconds,
    m: d3_time_parseMonthNumber,
    M: d3_time_parseMinutes,
    p: d3_time_parseAmPm,
    S: d3_time_parseSeconds,
    U: d3_time_parseWeekNumberSunday,
    w: d3_time_parseWeekdayNumber,
    W: d3_time_parseWeekNumberMonday,
    x: d3_time_parseLocaleDate,
    X: d3_time_parseLocaleTime,
    y: d3_time_parseYear,
    Y: d3_time_parseFullYear,
    "%": d3_time_parseLiteralPercent
  };
  function d3_time_parseWeekdayAbbrev(date, string, i) {
    d3_time_dayAbbrevRe.lastIndex = 0;
    var n = d3_time_dayAbbrevRe.exec(string.substring(i));
    return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function d3_time_parseWeekday(date, string, i) {
    d3_time_dayRe.lastIndex = 0;
    var n = d3_time_dayRe.exec(string.substring(i));
    return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function d3_time_parseWeekdayNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 1));
    return n ? (date.w = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseWeekNumberSunday(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i));
    return n ? (date.U = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseWeekNumberMonday(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i));
    return n ? (date.W = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseMonthAbbrev(date, string, i) {
    d3_time_monthAbbrevRe.lastIndex = 0;
    var n = d3_time_monthAbbrevRe.exec(string.substring(i));
    return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function d3_time_parseMonth(date, string, i) {
    d3_time_monthRe.lastIndex = 0;
    var n = d3_time_monthRe.exec(string.substring(i));
    return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function d3_time_parseLocaleFull(date, string, i) {
    return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
  }
  function d3_time_parseLocaleDate(date, string, i) {
    return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
  }
  function d3_time_parseLocaleTime(date, string, i) {
    return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
  }
  function d3_time_parseFullYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 4));
    return n ? (date.y = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1;
  }
  function d3_time_expandYear(d) {
    return d + (d > 68 ? 1900 : 2e3);
  }
  function d3_time_parseMonthNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.m = n[0] - 1, i + n[0].length) : -1;
  }
  function d3_time_parseDay(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.d = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseDayOfYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 3));
    return n ? (date.j = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseHour24(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.H = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseMinutes(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.M = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseSeconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.S = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseMilliseconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 3));
    return n ? (date.L = +n[0], i + n[0].length) : -1;
  }
  var d3_time_numberRe = /^\s*\d+/;
  function d3_time_parseAmPm(date, string, i) {
    var n = d3_time_amPmLookup.get(string.substring(i, i += 2).toLowerCase());
    return n == null ? -1 : (date.p = n, i);
  }
  var d3_time_amPmLookup = d3.map({
    am: 0,
    pm: 1
  });
  function d3_time_zone(d) {
    var z = d.getTimezoneOffset(), zs = z > 0 ? "-" : "+", zh = ~~(Math.abs(z) / 60), zm = Math.abs(z) % 60;
    return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2);
  }
  function d3_time_parseLiteralPercent(date, string, i) {
    d3_time_percentRe.lastIndex = 0;
    var n = d3_time_percentRe.exec(string.substring(i, i + 1));
    return n ? i + n[0].length : -1;
  }
  d3.time.format.utc = function(template) {
    var local = d3.time.format(template);
    function format(date) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time();
        utc._ = date;
        return local(utc);
      } finally {
        d3_time = Date;
      }
    }
    format.parse = function(string) {
      try {
        d3_time = d3_time_utc;
        var date = local.parse(string);
        return date && date._;
      } finally {
        d3_time = Date;
      }
    };
    format.toString = local.toString;
    return format;
  };
  var d3_time_formatIso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
  d3.time.format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso;
  function d3_time_formatIsoNative(date) {
    return date.toISOString();
  }
  d3_time_formatIsoNative.parse = function(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  };
  d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
  d3.time.second = d3_time_interval(function(date) {
    return new d3_time(Math.floor(date / 1e3) * 1e3);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 1e3);
  }, function(date) {
    return date.getSeconds();
  });
  d3.time.seconds = d3.time.second.range;
  d3.time.seconds.utc = d3.time.second.utc.range;
  d3.time.minute = d3_time_interval(function(date) {
    return new d3_time(Math.floor(date / 6e4) * 6e4);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 6e4);
  }, function(date) {
    return date.getMinutes();
  });
  d3.time.minutes = d3.time.minute.range;
  d3.time.minutes.utc = d3.time.minute.utc.range;
  d3.time.hour = d3_time_interval(function(date) {
    var timezone = date.getTimezoneOffset() / 60;
    return new d3_time((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 36e5);
  }, function(date) {
    return date.getHours();
  });
  d3.time.hours = d3.time.hour.range;
  d3.time.hours.utc = d3.time.hour.utc.range;
  d3.time.month = d3_time_interval(function(date) {
    date = d3.time.day(date);
    date.setDate(1);
    return date;
  }, function(date, offset) {
    date.setMonth(date.getMonth() + offset);
  }, function(date) {
    return date.getMonth();
  });
  d3.time.months = d3.time.month.range;
  d3.time.months.utc = d3.time.month.utc.range;
  function d3_time_scale(linear, methods, format) {
    function scale(x) {
      return linear(x);
    }
    scale.invert = function(x) {
      return d3_time_scaleDate(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
      linear.domain(x);
      return scale;
    };
    scale.nice = function(m) {
      return scale.domain(d3_scale_nice(scale.domain(), m));
    };
    scale.ticks = function(m, k) {
      var extent = d3_scaleExtent(scale.domain());
      if (typeof m !== "function") {
        var span = extent[1] - extent[0], target = span / m, i = d3.bisect(d3_time_scaleSteps, target);
        if (i == d3_time_scaleSteps.length) return methods.year(extent, m);
        if (!i) return linear.ticks(m).map(d3_time_scaleDate);
        if (target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target) --i;
        m = methods[i];
        k = m[1];
        m = m[0].range;
      }
      return m(extent[0], new Date(+extent[1] + 1), k);
    };
    scale.tickFormat = function() {
      return format;
    };
    scale.copy = function() {
      return d3_time_scale(linear.copy(), methods, format);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  function d3_time_scaleDate(t) {
    return new Date(t);
  }
  function d3_time_scaleFormat(formats) {
    return function(date) {
      var i = formats.length - 1, f = formats[i];
      while (!f[1](date)) f = formats[--i];
      return f[0](date);
    };
  }
  function d3_time_scaleSetYear(y) {
    var d = new Date(y, 0, 1);
    d.setFullYear(y);
    return d;
  }
  function d3_time_scaleGetYear(d) {
    var y = d.getFullYear(), d0 = d3_time_scaleSetYear(y), d1 = d3_time_scaleSetYear(y + 1);
    return y + (d - d0) / (d1 - d0);
  }
  var d3_time_scaleSteps = [ 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6 ];
  var d3_time_scaleLocalMethods = [ [ d3.time.second, 1 ], [ d3.time.second, 5 ], [ d3.time.second, 15 ], [ d3.time.second, 30 ], [ d3.time.minute, 1 ], [ d3.time.minute, 5 ], [ d3.time.minute, 15 ], [ d3.time.minute, 30 ], [ d3.time.hour, 1 ], [ d3.time.hour, 3 ], [ d3.time.hour, 6 ], [ d3.time.hour, 12 ], [ d3.time.day, 1 ], [ d3.time.day, 2 ], [ d3.time.week, 1 ], [ d3.time.month, 1 ], [ d3.time.month, 3 ], [ d3.time.year, 1 ] ];
  var d3_time_scaleLocalFormats = [ [ d3.time.format("%Y"), d3_true ], [ d3.time.format("%B"), function(d) {
    return d.getMonth();
  } ], [ d3.time.format("%b %d"), function(d) {
    return d.getDate() != 1;
  } ], [ d3.time.format("%a %d"), function(d) {
    return d.getDay() && d.getDate() != 1;
  } ], [ d3.time.format("%I %p"), function(d) {
    return d.getHours();
  } ], [ d3.time.format("%I:%M"), function(d) {
    return d.getMinutes();
  } ], [ d3.time.format(":%S"), function(d) {
    return d.getSeconds();
  } ], [ d3.time.format(".%L"), function(d) {
    return d.getMilliseconds();
  } ] ];
  var d3_time_scaleLinear = d3.scale.linear(), d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);
  d3_time_scaleLocalMethods.year = function(extent, m) {
    return d3_time_scaleLinear.domain(extent.map(d3_time_scaleGetYear)).ticks(m).map(d3_time_scaleSetYear);
  };
  d3.time.scale = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
  };
  var d3_time_scaleUTCMethods = d3_time_scaleLocalMethods.map(function(m) {
    return [ m[0].utc, m[1] ];
  });
  var d3_time_scaleUTCFormats = [ [ d3.time.format.utc("%Y"), d3_true ], [ d3.time.format.utc("%B"), function(d) {
    return d.getUTCMonth();
  } ], [ d3.time.format.utc("%b %d"), function(d) {
    return d.getUTCDate() != 1;
  } ], [ d3.time.format.utc("%a %d"), function(d) {
    return d.getUTCDay() && d.getUTCDate() != 1;
  } ], [ d3.time.format.utc("%I %p"), function(d) {
    return d.getUTCHours();
  } ], [ d3.time.format.utc("%I:%M"), function(d) {
    return d.getUTCMinutes();
  } ], [ d3.time.format.utc(":%S"), function(d) {
    return d.getUTCSeconds();
  } ], [ d3.time.format.utc(".%L"), function(d) {
    return d.getUTCMilliseconds();
  } ] ];
  var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);
  function d3_time_scaleUTCSetYear(y) {
    var d = new Date(Date.UTC(y, 0, 1));
    d.setUTCFullYear(y);
    return d;
  }
  function d3_time_scaleUTCGetYear(d) {
    var y = d.getUTCFullYear(), d0 = d3_time_scaleUTCSetYear(y), d1 = d3_time_scaleUTCSetYear(y + 1);
    return y + (d - d0) / (d1 - d0);
  }
  d3_time_scaleUTCMethods.year = function(extent, m) {
    return d3_time_scaleLinear.domain(extent.map(d3_time_scaleUTCGetYear)).ticks(m).map(d3_time_scaleUTCSetYear);
  };
  d3.time.scale.utc = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
  };
  d3.text = d3_xhrType(function(request) {
    return request.responseText;
  });
  d3.json = function(url, callback) {
    return d3_xhr(url, "application/json", d3_json, callback);
  };
  function d3_json(request) {
    return JSON.parse(request.responseText);
  }
  d3.html = function(url, callback) {
    return d3_xhr(url, "text/html", d3_html, callback);
  };
  function d3_html(request) {
    var range = d3_document.createRange();
    range.selectNode(d3_document.body);
    return range.createContextualFragment(request.responseText);
  }
  d3.xml = d3_xhrType(function(request) {
    return request.responseXML;
  });
  return d3;
}();
},{}],2:[function(require,module,exports){
require("./d3");
module.exports = d3;
(function () { delete this.d3; })(); // unset global

},{"./d3":1}],3:[function(require,module,exports){
//     Underscore.js 1.5.1
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.5.1';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value == null ? _.identity : value);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var result;
    var timeout = null;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

},{}],"asite":[function(require,module,exports){
module.exports=require('CLQAaQ');
},{}],5:[function(require,module,exports){
/**
 * CoffeeScript Compiler v1.6.3
 * http://coffeescript.org
 *
 * Copyright 2011, Jeremy Ashkenas
 * Released under the MIT License
 */
!function(root){var CoffeeScript=function(){function require(e){return require[e]}return require["./helpers"]=function(){var e={},t={exports:e};return function(){var t,n,i,s,r,o;e.starts=function(e,t,n){return t===e.substr(n,t.length)},e.ends=function(e,t,n){var i;return i=t.length,t===e.substr(e.length-i-(n||0),i)},e.repeat=r=function(e,t){var n;for(n="";t>0;)1&t&&(n+=e),t>>>=1,e+=e;return n},e.compact=function(e){var t,n,i,s;for(s=[],n=0,i=e.length;i>n;n++)t=e[n],t&&s.push(t);return s},e.count=function(e,t){var n,i;if(n=i=0,!t.length)return 1/0;for(;i=1+e.indexOf(t,i);)n++;return n},e.merge=function(e,t){return n(n({},e),t)},n=e.extend=function(e,t){var n,i;for(n in t)i=t[n],e[n]=i;return e},e.flatten=i=function(e){var t,n,s,r;for(n=[],s=0,r=e.length;r>s;s++)t=e[s],t instanceof Array?n=n.concat(i(t)):n.push(t);return n},e.del=function(e,t){var n;return n=e[t],delete e[t],n},e.last=s=function(e,t){return e[e.length-(t||0)-1]},e.some=null!=(o=Array.prototype.some)?o:function(e){var t,n,i;for(n=0,i=this.length;i>n;n++)if(t=this[n],e(t))return!0;return!1},e.invertLiterate=function(e){var t,n,i;return i=!0,n=function(){var n,s,r,o;for(r=e.split("\n"),o=[],n=0,s=r.length;s>n;n++)t=r[n],i&&/^([ ]{4}|[ ]{0,3}\t)/.test(t)?o.push(t):(i=/^\s*$/.test(t))?o.push(t):o.push("# "+t);return o}(),n.join("\n")},t=function(e,t){return t?{first_line:e.first_line,first_column:e.first_column,last_line:t.last_line,last_column:t.last_column}:e},e.addLocationDataFn=function(e,n){return function(i){return"object"==typeof i&&i.updateLocationDataIfMissing&&i.updateLocationDataIfMissing(t(e,n)),i}},e.locationDataToString=function(e){var t;return"2"in e&&"first_line"in e[2]?t=e[2]:"first_line"in e&&(t=e),t?""+(t.first_line+1)+":"+(t.first_column+1)+"-"+(""+(t.last_line+1)+":"+(t.last_column+1)):"No location data"},e.baseFileName=function(e,t,n){var i,s;return null==t&&(t=!1),null==n&&(n=!1),s=n?/\\|\//:/\//,i=e.split(s),e=i[i.length-1],t?(i=e.split("."),i.pop(),"coffee"===i[i.length-1]&&i.length>1&&i.pop(),i.join(".")):e},e.isCoffee=function(e){return/\.((lit)?coffee|coffee\.md)$/.test(e)},e.isLiterate=function(e){return/\.(litcoffee|coffee\.md)$/.test(e)},e.throwSyntaxError=function(e,t){var n;throw null==t.last_line&&(t.last_line=t.first_line),null==t.last_column&&(t.last_column=t.first_column),n=new SyntaxError(e),n.location=t,n},e.prettyErrorMessage=function(e,t,n,i){var s,o,a,c,h,l,u,p,d,f,m;return e.location?(m=e.location,h=m.first_line,c=m.first_column,u=m.last_line,l=m.last_column,s=n.split("\n")[h],f=c,a=h===u?l+1:s.length,p=r(" ",f)+r("^",a-f),i&&(o=function(e){return"[1;31m"+e+"[0m"},s=s.slice(0,f)+o(s.slice(f,a))+s.slice(a),p=o(p)),d=""+t+":"+(h+1)+":"+(c+1)+": error: "+e.message+"\n"+s+"\n"+p):e.stack||""+e}}.call(this),t.exports}(),require["./rewriter"]=function(){var e={},t={exports:e};return function(){var t,n,i,s,r,o,a,c,h,l,u,p,d,f,m,b,k,g,y=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1},v=[].slice;for(d=function(e,t){var n;return n=[e,t],n.generated=!0,n},e.Rewriter=function(){function e(){}return e.prototype.rewrite=function(e){return this.tokens=e,this.removeLeadingNewlines(),this.removeMidExpressionNewlines(),this.closeOpenCalls(),this.closeOpenIndexes(),this.addImplicitIndentation(),this.tagPostfixConditionals(),this.addImplicitBracesAndParens(),this.addLocationDataToGeneratedTokens(),this.tokens},e.prototype.scanTokens=function(e){var t,n,i;for(i=this.tokens,t=0;n=i[t];)t+=e.call(this,n,t,i);return!0},e.prototype.detectEnd=function(e,t,n){var r,o,a,c,h;for(a=this.tokens,r=0;o=a[e];){if(0===r&&t.call(this,o,e))return n.call(this,o,e);if(!o||0>r)return n.call(this,o,e-1);c=o[0],y.call(s,c)>=0?r+=1:(h=o[0],y.call(i,h)>=0&&(r-=1)),e+=1}return e-1},e.prototype.removeLeadingNewlines=function(){var e,t,n,i,s;for(s=this.tokens,e=n=0,i=s.length;i>n&&(t=s[e][0],"TERMINATOR"===t);e=++n);return e?this.tokens.splice(0,e):void 0},e.prototype.removeMidExpressionNewlines=function(){return this.scanTokens(function(e,t,i){var s;return"TERMINATOR"===e[0]&&(s=this.tag(t+1),y.call(n,s)>=0)?(i.splice(t,1),0):1})},e.prototype.closeOpenCalls=function(){var e,t;return t=function(e,t){var n;return")"===(n=e[0])||"CALL_END"===n||"OUTDENT"===e[0]&&")"===this.tag(t-1)},e=function(e,t){return this.tokens["OUTDENT"===e[0]?t-1:t][0]="CALL_END"},this.scanTokens(function(n,i){return"CALL_START"===n[0]&&this.detectEnd(i+1,t,e),1})},e.prototype.closeOpenIndexes=function(){var e,t;return t=function(e){var t;return"]"===(t=e[0])||"INDEX_END"===t},e=function(e){return e[0]="INDEX_END"},this.scanTokens(function(n,i){return"INDEX_START"===n[0]&&this.detectEnd(i+1,t,e),1})},e.prototype.matchTags=function(){var e,t,n,i,s,r,o;for(t=arguments[0],i=2<=arguments.length?v.call(arguments,1):[],e=0,n=s=0,r=i.length;r>=0?r>s:s>r;n=r>=0?++s:--s){for(;"HERECOMMENT"===this.tag(t+n+e);)e+=2;if(null!=i[n]&&("string"==typeof i[n]&&(i[n]=[i[n]]),o=this.tag(t+n+e),y.call(i[n],o)<0))return!1}return!0},e.prototype.looksObjectish=function(e){return this.matchTags(e,"@",null,":")||this.matchTags(e,null,":")},e.prototype.findTagsBackwards=function(e,t){var n,r,o,a,c,h,u;for(n=[];e>=0&&(n.length||(a=this.tag(e),y.call(t,a)<0&&(c=this.tag(e),y.call(s,c)<0||this.tokens[e].generated)&&(h=this.tag(e),y.call(l,h)<0)));)r=this.tag(e),y.call(i,r)>=0&&n.push(this.tag(e)),o=this.tag(e),y.call(s,o)>=0&&n.length&&n.pop(),e-=1;return u=this.tag(e),y.call(t,u)>=0},e.prototype.addImplicitBracesAndParens=function(){var e;return e=[],this.scanTokens(function(t,n,h){var u,p,f,m,b,k,g,v,w,T,C,F,L,N,x,E,D,S,R,A,I,_,$,O,j,M;if(A=t[0],T=(n>0?h[n-1]:[])[0],v=(n<h.length-1?h[n+1]:[])[0],x=function(){return e[e.length-1]},E=n,f=function(e){return n-E+e},m=function(){var e,t;return null!=(e=x())?null!=(t=e[2])?t.ours:void 0:void 0},b=function(){var e;return m()&&"("===(null!=(e=x())?e[0]:void 0)},g=function(){var e;return m()&&"{"===(null!=(e=x())?e[0]:void 0)},k=function(){var e;return m&&"CONTROL"===(null!=(e=x())?e[0]:void 0)},D=function(t){var i;return i=null!=t?t:n,e.push(["(",i,{ours:!0}]),h.splice(i,0,d("CALL_START","(")),null==t?n+=1:void 0},u=function(){return e.pop(),h.splice(n,0,d("CALL_END",")")),n+=1},S=function(t,i){var s;return null==i&&(i=!0),s=null!=t?t:n,e.push(["{",s,{sameLine:!0,startsLine:i,ours:!0}]),h.splice(s,0,d("{",d(new String("{")))),null==t?n+=1:void 0},p=function(t){return t=null!=t?t:n,e.pop(),h.splice(t,0,d("}","}")),n+=1},b()&&("IF"===A||"TRY"===A||"FINALLY"===A||"CATCH"===A||"CLASS"===A||"SWITCH"===A))return e.push(["CONTROL",n,{ours:!0}]),f(1);if("INDENT"===A&&m()){if("=>"!==T&&"->"!==T&&"["!==T&&"("!==T&&","!==T&&"{"!==T&&"TRY"!==T&&"ELSE"!==T&&"="!==T)for(;b();)u();return k()&&e.pop(),e.push([A,n]),f(1)}if(y.call(s,A)>=0)return e.push([A,n]),f(1);if(y.call(i,A)>=0){for(;m();)b()?u():g()?p():e.pop();e.pop()}if((y.call(a,A)>=0&&t.spaced&&!t.stringEnd||"?"===A&&n>0&&!h[n-1].spaced)&&(y.call(r,v)>=0||y.call(c,v)>=0&&!(null!=(I=h[n+1])?I.spaced:void 0)&&!(null!=(_=h[n+1])?_.newLine:void 0)))return"?"===A&&(A=t[0]="FUNC_EXIST"),D(n+1),f(2);if(y.call(a,A)>=0&&this.matchTags(n+1,"INDENT",null,":")&&!this.findTagsBackwards(n,["CLASS","EXTENDS","IF","CATCH","SWITCH","LEADING_WHEN","FOR","WHILE","UNTIL"]))return D(n+1),e.push(["INDENT",n+2]),f(3);if(":"===A){for(C="@"===this.tag(n-2)?n-2:n-1;"HERECOMMENT"===this.tag(C-2);)C-=2;return R=0===C||($=this.tag(C-1),y.call(l,$)>=0)||h[C-1].newLine,x()&&(O=x(),N=O[0],L=O[1],("{"===N||"INDENT"===N&&"{"===this.tag(L-1))&&(R||","===this.tag(C-1)||"{"===this.tag(C-1)))?f(1):(S(C,!!R),f(2))}if("OUTDENT"===T&&b()&&("."===A||"?."===A||"::"===A||"?::"===A))return u(),f(1);if(g()&&y.call(l,A)>=0&&(x()[2].sameLine=!1),y.call(o,A)>=0)for(;m();)if(j=x(),N=j[0],L=j[1],M=j[2],F=M.sameLine,R=M.startsLine,b()&&","!==T)u();else if(g()&&F&&!R)p();else{if(!g()||"TERMINATOR"!==A||","===T||R&&this.looksObjectish(n+1))break;p()}if(","===A&&!this.looksObjectish(n+1)&&g()&&("TERMINATOR"!==v||!this.looksObjectish(n+2)))for(w="OUTDENT"===v?1:0;g();)p(n+w);return f(1)})},e.prototype.addLocationDataToGeneratedTokens=function(){return this.scanTokens(function(e,t,n){var i,s,r,o,a,c;return e[2]?1:e.generated||e.explicit?("{"===e[0]&&(r=null!=(a=n[t+1])?a[2]:void 0)?(s=r.first_line,i=r.first_column):(o=null!=(c=n[t-1])?c[2]:void 0)?(s=o.last_line,i=o.last_column):s=i=0,e[2]={first_line:s,first_column:i,last_line:s,last_column:i},1):1})},e.prototype.addImplicitIndentation=function(){var e,t,n,i,s;return s=n=i=null,t=function(e){var t,n;return";"!==e[1]&&(t=e[0],y.call(u,t)>=0)&&!("ELSE"===e[0]&&"THEN"!==s)&&!!("CATCH"!==(n=e[0])&&"FINALLY"!==n||"->"!==s&&"=>"!==s)},e=function(e,t){return this.tokens.splice(","===this.tag(t-1)?t-1:t,0,i)},this.scanTokens(function(r,o,a){var c,h,l,u,d;if(h=r[0],"TERMINATOR"===h&&"THEN"===this.tag(o+1))return a.splice(o,1),0;if("ELSE"===h&&"OUTDENT"!==this.tag(o-1))return a.splice.apply(a,[o,0].concat(v.call(this.indentation()))),2;if("CATCH"===h)for(c=l=1;2>=l;c=++l)if("OUTDENT"===(u=this.tag(o+c))||"TERMINATOR"===u||"FINALLY"===u)return a.splice.apply(a,[o+c,0].concat(v.call(this.indentation()))),2+c;return y.call(p,h)>=0&&"INDENT"!==this.tag(o+1)&&("ELSE"!==h||"IF"!==this.tag(o+1))?(s=h,d=this.indentation(!0),n=d[0],i=d[1],"THEN"===s&&(n.fromThen=!0),a.splice(o+1,0,n),this.detectEnd(o+2,t,e),"THEN"===h&&a.splice(o,1),1):1})},e.prototype.tagPostfixConditionals=function(){var e,t,n;return n=null,t=function(e,t){var n,i;return i=e[0],n=this.tokens[t-1][0],"TERMINATOR"===i||"INDENT"===i&&y.call(p,n)<0},e=function(e){return"INDENT"!==e[0]||e.generated&&!e.fromThen?n[0]="POST_"+n[0]:void 0},this.scanTokens(function(i,s){return"IF"!==i[0]?1:(n=i,this.detectEnd(s+1,t,e),1)})},e.prototype.indentation=function(e){var t,n;return null==e&&(e=!1),t=["INDENT",2],n=["OUTDENT",2],e&&(t.generated=n.generated=!0),e||(t.explicit=n.explicit=!0),[t,n]},e.prototype.generate=d,e.prototype.tag=function(e){var t;return null!=(t=this.tokens[e])?t[0]:void 0},e}(),t=[["(",")"],["[","]"],["{","}"],["INDENT","OUTDENT"],["CALL_START","CALL_END"],["PARAM_START","PARAM_END"],["INDEX_START","INDEX_END"]],e.INVERSES=h={},s=[],i=[],b=0,k=t.length;k>b;b++)g=t[b],f=g[0],m=g[1],s.push(h[m]=f),i.push(h[f]=m);n=["CATCH","WHEN","ELSE","FINALLY"].concat(i),a=["IDENTIFIER","SUPER",")","CALL_END","]","INDEX_END","@","THIS"],r=["IDENTIFIER","NUMBER","STRING","JS","REGEX","NEW","PARAM_START","CLASS","IF","TRY","SWITCH","THIS","BOOL","NULL","UNDEFINED","UNARY","SUPER","THROW","@","->","=>","[","(","{","--","++"],c=["+","-"],o=["POST_IF","FOR","WHILE","UNTIL","WHEN","BY","LOOP","TERMINATOR"],p=["ELSE","->","=>","TRY","FINALLY","THEN"],u=["TERMINATOR","CATCH","FINALLY","ELSE","OUTDENT","LEADING_WHEN"],l=["TERMINATOR","INDENT","OUTDENT"]}.call(this),t.exports}(),require["./lexer"]=function(){var e={},t={exports:e};return function(){var t,n,i,s,r,o,a,c,h,l,u,p,d,f,m,b,k,g,y,v,w,T,C,F,L,N,x,E,D,S,R,A,I,_,$,O,j,M,B,V,P,U,q,H,G,W,X,Y,K,z,J,Z,Q,et=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};Z=require("./rewriter"),O=Z.Rewriter,g=Z.INVERSES,Q=require("./helpers"),H=Q.count,z=Q.starts,q=Q.compact,X=Q.last,K=Q.repeat,G=Q.invertLiterate,Y=Q.locationDataToString,J=Q.throwSyntaxError,e.Lexer=L=function(){function e(){}return e.prototype.tokenize=function(e,t){var n,i,s,r;for(null==t&&(t={}),this.literate=t.literate,this.indent=0,this.indebt=0,this.outdebt=0,this.indents=[],this.ends=[],this.tokens=[],this.chunkLine=t.line||0,this.chunkColumn=t.column||0,e=this.clean(e),i=0;this.chunk=e.slice(i);)n=this.identifierToken()||this.commentToken()||this.whitespaceToken()||this.lineToken()||this.heredocToken()||this.stringToken()||this.numberToken()||this.regexToken()||this.jsToken()||this.literalToken(),r=this.getLineAndColumnFromChunk(n),this.chunkLine=r[0],this.chunkColumn=r[1],i+=n;return this.closeIndentation(),(s=this.ends.pop())&&this.error("missing "+s),t.rewrite===!1?this.tokens:(new O).rewrite(this.tokens)},e.prototype.clean=function(e){return e.charCodeAt(0)===t&&(e=e.slice(1)),e=e.replace(/\r/g,"").replace(V,""),U.test(e)&&(e="\n"+e,this.chunkLine--),this.literate&&(e=G(e)),e},e.prototype.identifierToken=function(){var e,t,n,i,s,c,h,l,u,p,d,f,m,k;return(h=b.exec(this.chunk))?(c=h[0],i=h[1],e=h[2],s=i.length,l=void 0,"own"===i&&"FOR"===this.tag()?(this.token("OWN",i),i.length):(n=e||(u=X(this.tokens))&&("."===(f=u[0])||"?."===f||"::"===f||"?::"===f||!u.spaced&&"@"===u[0]),p="IDENTIFIER",!n&&(et.call(w,i)>=0||et.call(a,i)>=0)&&(p=i.toUpperCase(),"WHEN"===p&&(m=this.tag(),et.call(T,m)>=0)?p="LEADING_WHEN":"FOR"===p?this.seenFor=!0:"UNLESS"===p?p="IF":et.call(P,p)>=0?p="UNARY":et.call(_,p)>=0&&("INSTANCEOF"!==p&&this.seenFor?(p="FOR"+p,this.seenFor=!1):(p="RELATION","!"===this.value()&&(l=this.tokens.pop(),i="!"+i)))),et.call(v,i)>=0&&(n?(p="IDENTIFIER",i=new String(i),i.reserved=!0):et.call($,i)>=0&&this.error('reserved word "'+i+'"')),n||(et.call(r,i)>=0&&(i=o[i]),p=function(){switch(i){case"!":return"UNARY";case"==":case"!=":return"COMPARE";case"&&":case"||":return"LOGIC";case"true":case"false":return"BOOL";case"break":case"continue":return"STATEMENT";default:return p}}()),d=this.token(p,i,0,s),l&&(k=[l[2].first_line,l[2].first_column],d[2].first_line=k[0],d[2].first_column=k[1]),e&&(t=c.lastIndexOf(":"),this.token(":",":",t,e.length)),c.length)):0},e.prototype.numberToken=function(){var e,t,n,i,s;return(n=R.exec(this.chunk))?(i=n[0],/^0[BOX]/.test(i)?this.error("radix prefix '"+i+"' must be lowercase"):/E/.test(i)&&!/^0x/.test(i)?this.error("exponential notation '"+i+"' must be indicated with a lowercase 'e'"):/^0\d*[89]/.test(i)?this.error("decimal literal '"+i+"' must not be prefixed with '0'"):/^0\d+/.test(i)&&this.error("octal literal '"+i+"' must be prefixed with '0o'"),t=i.length,(s=/^0o([0-7]+)/.exec(i))&&(i="0x"+parseInt(s[1],8).toString(16)),(e=/^0b([01]+)/.exec(i))&&(i="0x"+parseInt(e[1],2).toString(16)),this.token("NUMBER",i,0,t),t):0},e.prototype.stringToken=function(){var e,t,n;switch(this.chunk.charAt(0)){case"'":if(!(e=M.exec(this.chunk)))return 0;n=e[0],this.token("STRING",n.replace(x,"\\\n"),0,n.length);break;case'"':if(!(n=this.balancedString(this.chunk,'"')))return 0;0<n.indexOf("#{",1)?this.interpolateString(n.slice(1,-1),{strOffset:1,lexedLength:n.length}):this.token("STRING",this.escapeLines(n,0,n.length));break;default:return 0}return(t=/^(?:\\.|[^\\])*\\(?:0[0-7]|[1-7])/.test(n))&&this.error("octal escape sequences "+n+" are not allowed"),n.length},e.prototype.heredocToken=function(){var e,t,n,i;return(n=u.exec(this.chunk))?(t=n[0],i=t.charAt(0),e=this.sanitizeHeredoc(n[2],{quote:i,indent:null}),'"'===i&&0<=e.indexOf("#{")?this.interpolateString(e,{heredoc:!0,strOffset:3,lexedLength:t.length}):this.token("STRING",this.makeString(e,i,!0),0,t.length),t.length):0},e.prototype.commentToken=function(){var e,t,n;return(n=this.chunk.match(c))?(e=n[0],t=n[1],t&&this.token("HERECOMMENT",this.sanitizeHeredoc(t,{herecomment:!0,indent:K(" ",this.indent)}),0,e.length),e.length):0},e.prototype.jsToken=function(){var e,t;return"`"===this.chunk.charAt(0)&&(e=y.exec(this.chunk))?(this.token("JS",(t=e[0]).slice(1,-1),0,t.length),t.length):0},e.prototype.regexToken=function(){var e,t,n,i,s,r,o;return"/"!==this.chunk.charAt(0)?0:(n=f.exec(this.chunk))?t=this.heregexToken(n):(i=X(this.tokens),i&&(r=i[0],et.call(i.spaced?D:S,r)>=0)?0:(n=I.exec(this.chunk))?(o=n,n=o[0],s=o[1],e=o[2],"/*"===s.slice(0,2)&&this.error("regular expressions cannot begin with `*`"),"//"===s&&(s="/(?:)/"),this.token("REGEX",""+s+e,0,n.length),n.length):0)},e.prototype.heregexToken=function(e){var t,n,i,s,r,o,a,c,h,l,u,p,d,f,b,k;if(s=e[0],t=e[1],n=e[2],0>t.indexOf("#{"))return a=t.replace(m,"").replace(/\//g,"\\/"),a.match(/^\*/)&&this.error("regular expressions cannot begin with `*`"),this.token("REGEX","/"+(a||"(?:)")+"/"+n,0,s.length),s.length;for(this.token("IDENTIFIER","RegExp",0,0),this.token("CALL_START","(",0,0),l=[],f=this.interpolateString(t,{regex:!0}),p=0,d=f.length;d>p;p++){if(h=f[p],c=h[0],u=h[1],"TOKENS"===c)l.push.apply(l,u);else if("NEOSTRING"===c){if(!(u=u.replace(m,"")))continue;u=u.replace(/\\/g,"\\\\"),h[0]="STRING",h[1]=this.makeString(u,'"',!0),l.push(h)}else this.error("Unexpected "+c);o=X(this.tokens),r=["+","+"],r[2]=o[2],l.push(r)}return l.pop(),"STRING"!==(null!=(b=l[0])?b[0]:void 0)&&(this.token("STRING",'""',0,0),this.token("+","+",0,0)),(k=this.tokens).push.apply(k,l),n&&(i=s.lastIndexOf(n),this.token(",",",",i,0),this.token("STRING",'"'+n+'"',i,n.length)),this.token(")",")",s.length-1,0),s.length},e.prototype.lineToken=function(){var e,t,n,i,s;if(!(n=E.exec(this.chunk)))return 0;if(t=n[0],this.seenFor=!1,s=t.length-1-t.lastIndexOf("\n"),i=this.unfinished(),s-this.indebt===this.indent)return i?this.suppressNewlines():this.newlineToken(0),t.length;if(s>this.indent){if(i)return this.indebt=s-this.indent,this.suppressNewlines(),t.length;e=s-this.indent+this.outdebt,this.token("INDENT",e,t.length-s,s),this.indents.push(e),this.ends.push("OUTDENT"),this.outdebt=this.indebt=0}else this.indebt=0,this.outdentToken(this.indent-s,i,t.length);return this.indent=s,t.length},e.prototype.outdentToken=function(e,t,n){for(var i,s;e>0;)s=this.indents.length-1,void 0===this.indents[s]?e=0:this.indents[s]===this.outdebt?(e-=this.outdebt,this.outdebt=0):this.indents[s]<this.outdebt?(this.outdebt-=this.indents[s],e-=this.indents[s]):(i=this.indents.pop()+this.outdebt,e-=i,this.outdebt=0,this.pair("OUTDENT"),this.token("OUTDENT",i,0,n));for(i&&(this.outdebt-=e);";"===this.value();)this.tokens.pop();return"TERMINATOR"===this.tag()||t||this.token("TERMINATOR","\n",n,0),this},e.prototype.whitespaceToken=function(){var e,t,n;return(e=U.exec(this.chunk))||(t="\n"===this.chunk.charAt(0))?(n=X(this.tokens),n&&(n[e?"spaced":"newLine"]=!0),e?e[0].length:0):0},e.prototype.newlineToken=function(e){for(;";"===this.value();)this.tokens.pop();return"TERMINATOR"!==this.tag()&&this.token("TERMINATOR","\n",e,0),this},e.prototype.suppressNewlines=function(){return"\\"===this.value()&&this.tokens.pop(),this},e.prototype.literalToken=function(){var e,t,n,r,o,a,c,u;if((e=A.exec(this.chunk))?(r=e[0],s.test(r)&&this.tagParameters()):r=this.chunk.charAt(0),n=r,t=X(this.tokens),"="===r&&t&&(!t[1].reserved&&(o=t[1],et.call(v,o)>=0)&&this.error('reserved word "'+this.value()+"\" can't be assigned"),"||"===(a=t[1])||"&&"===a))return t[0]="COMPOUND_ASSIGN",t[1]+="=",r.length;if(";"===r)this.seenFor=!1,n="TERMINATOR";else if(et.call(N,r)>=0)n="MATH";else if(et.call(h,r)>=0)n="COMPARE";else if(et.call(l,r)>=0)n="COMPOUND_ASSIGN";else if(et.call(P,r)>=0)n="UNARY";else if(et.call(j,r)>=0)n="SHIFT";else if(et.call(F,r)>=0||"?"===r&&(null!=t?t.spaced:void 0))n="LOGIC";else if(t&&!t.spaced)if("("===r&&(c=t[0],et.call(i,c)>=0))"?"===t[0]&&(t[0]="FUNC_EXIST"),n="CALL_START";else if("["===r&&(u=t[0],et.call(k,u)>=0))switch(n="INDEX_START",t[0]){case"?":t[0]="INDEX_SOAK"}switch(r){case"(":case"{":case"[":this.ends.push(g[r]);break;case")":case"}":case"]":this.pair(r)}return this.token(n,r),r.length},e.prototype.sanitizeHeredoc=function(e,t){var n,i,s,r,o;if(s=t.indent,i=t.herecomment){if(p.test(e)&&this.error('block comment cannot contain "*/", starting'),e.indexOf("\n")<0)return e}else for(;r=d.exec(e);)n=r[1],(null===s||0<(o=n.length)&&o<s.length)&&(s=n);return s&&(e=e.replace(RegExp("\\n"+s,"g"),"\n")),i||(e=e.replace(/^\n/,"")),e},e.prototype.tagParameters=function(){var e,t,n,i;if(")"!==this.tag())return this;for(t=[],i=this.tokens,e=i.length,i[--e][0]="PARAM_END";n=i[--e];)switch(n[0]){case")":t.push(n);break;case"(":case"CALL_START":if(!t.length)return"("===n[0]?(n[0]="PARAM_START",this):this;t.pop()}return this},e.prototype.closeIndentation=function(){return this.outdentToken(this.indent)},e.prototype.balancedString=function(e,t){var n,i,s,r,o,a,c,h;for(n=0,a=[t],i=c=1,h=e.length;h>=1?h>c:c>h;i=h>=1?++c:--c)if(n)--n;else{switch(s=e.charAt(i)){case"\\":++n;continue;case t:if(a.pop(),!a.length)return e.slice(0,+i+1||9e9);t=a[a.length-1];continue}"}"!==t||'"'!==s&&"'"!==s?"}"===t&&"/"===s&&(r=f.exec(e.slice(i))||I.exec(e.slice(i)))?n+=r[0].length-1:"}"===t&&"{"===s?a.push(t="}"):'"'===t&&"#"===o&&"{"===s&&a.push(t="}"):a.push(t=s),o=s}return this.error("missing "+a.pop()+", starting")},e.prototype.interpolateString=function(t,n){var i,s,r,o,a,c,h,l,u,p,d,f,m,b,k,g,y,v,w,T,C,F,L,N,x,E,D,S;for(null==n&&(n={}),r=n.heredoc,y=n.regex,m=n.offsetInChunk,w=n.strOffset,u=n.lexedLength,m=m||0,w=w||0,u=u||t.length,r&&t.length>0&&"\n"===t[0]&&(t=t.slice(1),w++),F=[],b=0,o=-1;l=t.charAt(o+=1);)"\\"!==l?"#"===l&&"{"===t.charAt(o+1)&&(s=this.balancedString(t.slice(o+1),"}"))&&(o>b&&F.push(this.makeToken("NEOSTRING",t.slice(b,o),w+b)),a=s.slice(1,-1),a.length&&(E=this.getLineAndColumnFromChunk(w+o+1),p=E[0],i=E[1],f=(new e).tokenize(a,{line:p,column:i,rewrite:!1}),g=f.pop(),"TERMINATOR"===(null!=(D=f[0])?D[0]:void 0)&&(g=f.shift()),(h=f.length)&&(h>1&&(f.unshift(this.makeToken("(","(",w+o+1,0)),f.push(this.makeToken(")",")",w+o+1+a.length,0))),F.push(["TOKENS",f]))),o+=s.length,b=o+1):o+=1;if(o>b&&b<t.length&&F.push(this.makeToken("NEOSTRING",t.slice(b),w+b)),y)return F;if(!F.length)return this.token("STRING",'""',m,u);for("NEOSTRING"!==F[0][0]&&F.unshift(this.makeToken("NEOSTRING","",m)),(c=F.length>1)&&this.token("(","(",m,0),o=N=0,x=F.length;x>N;o=++N)C=F[o],T=C[0],L=C[1],o&&(o&&(k=this.token("+","+")),d="TOKENS"===T?L[0]:C,k[2]={first_line:d[2].first_line,first_column:d[2].first_column,last_line:d[2].first_line,last_column:d[2].first_column}),"TOKENS"===T?(S=this.tokens).push.apply(S,L):"NEOSTRING"===T?(C[0]="STRING",C[1]=this.makeString(L,'"',r),this.tokens.push(C)):this.error("Unexpected "+T);return c&&(v=this.makeToken(")",")",m+u,0),v.stringEnd=!0,this.tokens.push(v)),F},e.prototype.pair=function(e){var t,n;return e!==(n=X(this.ends))?("OUTDENT"!==n&&this.error("unmatched "+e),this.indent-=t=X(this.indents),this.outdentToken(t,!0),this.pair(e)):this.ends.pop()},e.prototype.getLineAndColumnFromChunk=function(e){var t,n,i,s;return 0===e?[this.chunkLine,this.chunkColumn]:(s=e>=this.chunk.length?this.chunk:this.chunk.slice(0,+(e-1)+1||9e9),n=H(s,"\n"),t=this.chunkColumn,n>0?(i=s.split("\n"),t=X(i).length):t+=s.length,[this.chunkLine+n,t])},e.prototype.makeToken=function(e,t,n,i){var s,r,o,a,c;return null==n&&(n=0),null==i&&(i=t.length),r={},a=this.getLineAndColumnFromChunk(n),r.first_line=a[0],r.first_column=a[1],s=Math.max(0,i-1),c=this.getLineAndColumnFromChunk(n+s),r.last_line=c[0],r.last_column=c[1],o=[e,t,r]},e.prototype.token=function(e,t,n,i){var s;return s=this.makeToken(e,t,n,i),this.tokens.push(s),s},e.prototype.tag=function(e,t){var n;return(n=X(this.tokens,e))&&(t?n[0]=t:n[0])},e.prototype.value=function(e,t){var n;return(n=X(this.tokens,e))&&(t?n[1]=t:n[1])},e.prototype.unfinished=function(){var e;return C.test(this.chunk)||"\\"===(e=this.tag())||"."===e||"?."===e||"?::"===e||"UNARY"===e||"MATH"===e||"+"===e||"-"===e||"SHIFT"===e||"RELATION"===e||"COMPARE"===e||"LOGIC"===e||"THROW"===e||"EXTENDS"===e},e.prototype.escapeLines=function(e,t){return e.replace(x,t?"\\n":"")},e.prototype.makeString=function(e,t,n){return e?(e=e.replace(/\\([\s\S])/g,function(e,n){return"\n"===n||n===t?n:e}),e=e.replace(RegExp(""+t,"g"),"\\$&"),t+this.escapeLines(e,n)+t):t+t},e.prototype.error=function(e){return J(e,{first_line:this.chunkLine,first_column:this.chunkColumn})},e}(),w=["true","false","null","this","new","delete","typeof","in","instanceof","return","throw","break","continue","debugger","if","else","switch","for","while","do","try","catch","finally","class","extends","super"],a=["undefined","then","unless","until","loop","of","by","when"],o={and:"&&",or:"||",is:"==",isnt:"!=",not:"!",yes:"true",no:"false",on:"true",off:"false"},r=function(){var e;e=[];for(W in o)e.push(W);return e}(),a=a.concat(r),$=["case","default","function","var","void","with","const","let","enum","export","import","native","__hasProp","__extends","__slice","__bind","__indexOf","implements","interface","package","private","protected","public","static","yield"],B=["arguments","eval"],v=w.concat($).concat(B),e.RESERVED=$.concat(w).concat(a).concat(B),e.STRICT_PROSCRIBED=B,t=65279,b=/^([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)([^\n\S]*:(?!:))?/,R=/^0b[01]+|^0o[0-7]+|^0x[\da-f]+|^\d*\.?\d+(?:e[+-]?\d+)?/i,u=/^("""|''')([\s\S]*?)(?:\n[^\n\S]*)?\1/,A=/^(?:[-=]>|[-+*\/%<>&|^!?=]=|>>>=?|([-+:])\1|([&|<>])\2=?|\?(\.|::)|\.{2,3})/,U=/^[^\n\S]+/,c=/^###([^#][\s\S]*?)(?:###[^\n\S]*|(?:###)$)|^(?:\s*#(?!##[^#]).*)+/,s=/^[-=]>/,E=/^(?:\n[^\n\S]*)+/,M=/^'[^\\']*(?:\\.[^\\']*)*'/,y=/^`[^\\`]*(?:\\.[^\\`]*)*`/,I=/^(\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)([imgy]{0,4})(?!\w)/,f=/^\/{3}([\s\S]+?)\/{3}([imgy]{0,4})(?!\w)/,m=/\s+(?:#.*)?/g,x=/\n/g,d=/\n+([^\n\S]*)/g,p=/\*\//,C=/^\s*(?:,|\??\.(?![.\d])|::)/,V=/\s+$/,l=["-=","+=","/=","*=","%=","||=","&&=","?=","<<=",">>=",">>>=","&=","^=","|="],P=["!","~","NEW","TYPEOF","DELETE","DO"],F=["&&","||","&","|","^"],j=["<<",">>",">>>"],h=["==","!=","<",">","<=",">="],N=["*","/","%"],_=["IN","OF","INSTANCEOF"],n=["TRUE","FALSE"],D=["NUMBER","REGEX","BOOL","NULL","UNDEFINED","++","--"],S=D.concat(")","}","THIS","IDENTIFIER","STRING","]"),i=["IDENTIFIER","STRING","REGEX",")","]","}","?","::","@","THIS","SUPER"],k=i.concat("NUMBER","BOOL","NULL","UNDEFINED"),T=["INDENT","OUTDENT","TERMINATOR"]}.call(this),t.exports}(),require["./parser"]=function(){var e={},t={exports:e},n=function(){function e(){this.yy={}}var t={trace:function(){},yy:{},symbols_:{error:2,Root:3,Body:4,Block:5,TERMINATOR:6,Line:7,Expression:8,Statement:9,Return:10,Comment:11,STATEMENT:12,Value:13,Invocation:14,Code:15,Operation:16,Assign:17,If:18,Try:19,While:20,For:21,Switch:22,Class:23,Throw:24,INDENT:25,OUTDENT:26,Identifier:27,IDENTIFIER:28,AlphaNumeric:29,NUMBER:30,STRING:31,Literal:32,JS:33,REGEX:34,DEBUGGER:35,UNDEFINED:36,NULL:37,BOOL:38,Assignable:39,"=":40,AssignObj:41,ObjAssignable:42,":":43,ThisProperty:44,RETURN:45,HERECOMMENT:46,PARAM_START:47,ParamList:48,PARAM_END:49,FuncGlyph:50,"->":51,"=>":52,OptComma:53,",":54,Param:55,ParamVar:56,"...":57,Array:58,Object:59,Splat:60,SimpleAssignable:61,Accessor:62,Parenthetical:63,Range:64,This:65,".":66,"?.":67,"::":68,"?::":69,Index:70,INDEX_START:71,IndexValue:72,INDEX_END:73,INDEX_SOAK:74,Slice:75,"{":76,AssignList:77,"}":78,CLASS:79,EXTENDS:80,OptFuncExist:81,Arguments:82,SUPER:83,FUNC_EXIST:84,CALL_START:85,CALL_END:86,ArgList:87,THIS:88,"@":89,"[":90,"]":91,RangeDots:92,"..":93,Arg:94,SimpleArgs:95,TRY:96,Catch:97,FINALLY:98,CATCH:99,THROW:100,"(":101,")":102,WhileSource:103,WHILE:104,WHEN:105,UNTIL:106,Loop:107,LOOP:108,ForBody:109,FOR:110,ForStart:111,ForSource:112,ForVariables:113,OWN:114,ForValue:115,FORIN:116,FOROF:117,BY:118,SWITCH:119,Whens:120,ELSE:121,When:122,LEADING_WHEN:123,IfBlock:124,IF:125,POST_IF:126,UNARY:127,"-":128,"+":129,"--":130,"++":131,"?":132,MATH:133,SHIFT:134,COMPARE:135,LOGIC:136,RELATION:137,COMPOUND_ASSIGN:138,$accept:0,$end:1},terminals_:{2:"error",6:"TERMINATOR",12:"STATEMENT",25:"INDENT",26:"OUTDENT",28:"IDENTIFIER",30:"NUMBER",31:"STRING",33:"JS",34:"REGEX",35:"DEBUGGER",36:"UNDEFINED",37:"NULL",38:"BOOL",40:"=",43:":",45:"RETURN",46:"HERECOMMENT",47:"PARAM_START",49:"PARAM_END",51:"->",52:"=>",54:",",57:"...",66:".",67:"?.",68:"::",69:"?::",71:"INDEX_START",73:"INDEX_END",74:"INDEX_SOAK",76:"{",78:"}",79:"CLASS",80:"EXTENDS",83:"SUPER",84:"FUNC_EXIST",85:"CALL_START",86:"CALL_END",88:"THIS",89:"@",90:"[",91:"]",93:"..",96:"TRY",98:"FINALLY",99:"CATCH",100:"THROW",101:"(",102:")",104:"WHILE",105:"WHEN",106:"UNTIL",108:"LOOP",110:"FOR",114:"OWN",116:"FORIN",117:"FOROF",118:"BY",119:"SWITCH",121:"ELSE",123:"LEADING_WHEN",125:"IF",126:"POST_IF",127:"UNARY",128:"-",129:"+",130:"--",131:"++",132:"?",133:"MATH",134:"SHIFT",135:"COMPARE",136:"LOGIC",137:"RELATION",138:"COMPOUND_ASSIGN"},productions_:[0,[3,0],[3,1],[3,2],[4,1],[4,3],[4,2],[7,1],[7,1],[9,1],[9,1],[9,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[5,2],[5,3],[27,1],[29,1],[29,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[17,3],[17,4],[17,5],[41,1],[41,3],[41,5],[41,1],[42,1],[42,1],[42,1],[10,2],[10,1],[11,1],[15,5],[15,2],[50,1],[50,1],[53,0],[53,1],[48,0],[48,1],[48,3],[48,4],[48,6],[55,1],[55,2],[55,3],[56,1],[56,1],[56,1],[56,1],[60,2],[61,1],[61,2],[61,2],[61,1],[39,1],[39,1],[39,1],[13,1],[13,1],[13,1],[13,1],[13,1],[62,2],[62,2],[62,2],[62,2],[62,1],[62,1],[70,3],[70,2],[72,1],[72,1],[59,4],[77,0],[77,1],[77,3],[77,4],[77,6],[23,1],[23,2],[23,3],[23,4],[23,2],[23,3],[23,4],[23,5],[14,3],[14,3],[14,1],[14,2],[81,0],[81,1],[82,2],[82,4],[65,1],[65,1],[44,2],[58,2],[58,4],[92,1],[92,1],[64,5],[75,3],[75,2],[75,2],[75,1],[87,1],[87,3],[87,4],[87,4],[87,6],[94,1],[94,1],[95,1],[95,3],[19,2],[19,3],[19,4],[19,5],[97,3],[97,3],[97,2],[24,2],[63,3],[63,5],[103,2],[103,4],[103,2],[103,4],[20,2],[20,2],[20,2],[20,1],[107,2],[107,2],[21,2],[21,2],[21,2],[109,2],[109,2],[111,2],[111,3],[115,1],[115,1],[115,1],[115,1],[113,1],[113,3],[112,2],[112,2],[112,4],[112,4],[112,4],[112,6],[112,6],[22,5],[22,7],[22,4],[22,6],[120,1],[120,2],[122,3],[122,4],[124,3],[124,5],[18,1],[18,3],[18,3],[18,3],[16,2],[16,2],[16,2],[16,2],[16,2],[16,2],[16,2],[16,2],[16,3],[16,3],[16,3],[16,3],[16,3],[16,3],[16,3],[16,3],[16,5],[16,4],[16,3]],performAction:function(e,t,n,i,s,r,o){var a=r.length-1;switch(s){case 1:return this.$=i.addLocationDataFn(o[a],o[a])(new i.Block);case 2:return this.$=r[a];case 3:return this.$=r[a-1];case 4:this.$=i.addLocationDataFn(o[a],o[a])(i.Block.wrap([r[a]]));break;case 5:this.$=i.addLocationDataFn(o[a-2],o[a])(r[a-2].push(r[a]));break;case 6:this.$=r[a-1];break;case 7:this.$=r[a];break;case 8:this.$=r[a];break;case 9:this.$=r[a];break;case 10:this.$=r[a];break;case 11:this.$=i.addLocationDataFn(o[a],o[a])(new i.Literal(r[a]));break;case 12:this.$=r[a];break;case 13:this.$=r[a];break;case 14:this.$=r[a];break;case 15:this.$=r[a];break;case 16:this.$=r[a];break;case 17:this.$=r[a];break;case 18:this.$=r[a];break;case 19:this.$=r[a];break;case 20:this.$=r[a];break;case 21:this.$=r[a];break;case 22:this.$=r[a];break;case 23:this.$=r[a];break;case 24:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Block);break;case 25:this.$=i.addLocationDataFn(o[a-2],o[a])(r[a-1]);break;case 26:this.$=i.addLocationDataFn(o[a],o[a])(new i.Literal(r[a]));break;case 27:this.$=i.addLocationDataFn(o[a],o[a])(new i.Literal(r[a]));break;case 28:this.$=i.addLocationDataFn(o[a],o[a])(new i.Literal(r[a]));break;case 29:this.$=r[a];break;case 30:this.$=i.addLocationDataFn(o[a],o[a])(new i.Literal(r[a]));break;case 31:this.$=i.addLocationDataFn(o[a],o[a])(new i.Literal(r[a]));break;case 32:this.$=i.addLocationDataFn(o[a],o[a])(new i.Literal(r[a]));break;case 33:this.$=i.addLocationDataFn(o[a],o[a])(new i.Undefined);break;case 34:this.$=i.addLocationDataFn(o[a],o[a])(new i.Null);break;case 35:this.$=i.addLocationDataFn(o[a],o[a])(new i.Bool(r[a]));break;case 36:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Assign(r[a-2],r[a]));break;case 37:this.$=i.addLocationDataFn(o[a-3],o[a])(new i.Assign(r[a-3],r[a]));break;case 38:this.$=i.addLocationDataFn(o[a-4],o[a])(new i.Assign(r[a-4],r[a-1]));break;case 39:this.$=i.addLocationDataFn(o[a],o[a])(new i.Value(r[a]));break;case 40:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Assign(i.addLocationDataFn(o[a-2])(new i.Value(r[a-2])),r[a],"object"));break;case 41:this.$=i.addLocationDataFn(o[a-4],o[a])(new i.Assign(i.addLocationDataFn(o[a-4])(new i.Value(r[a-4])),r[a-1],"object"));break;case 42:this.$=r[a];break;case 43:this.$=r[a];break;case 44:this.$=r[a];break;case 45:this.$=r[a];break;case 46:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Return(r[a]));break;case 47:this.$=i.addLocationDataFn(o[a],o[a])(new i.Return);break;case 48:this.$=i.addLocationDataFn(o[a],o[a])(new i.Comment(r[a]));break;case 49:this.$=i.addLocationDataFn(o[a-4],o[a])(new i.Code(r[a-3],r[a],r[a-1]));break;case 50:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Code([],r[a],r[a-1]));
break;case 51:this.$=i.addLocationDataFn(o[a],o[a])("func");break;case 52:this.$=i.addLocationDataFn(o[a],o[a])("boundfunc");break;case 53:this.$=r[a];break;case 54:this.$=r[a];break;case 55:this.$=i.addLocationDataFn(o[a],o[a])([]);break;case 56:this.$=i.addLocationDataFn(o[a],o[a])([r[a]]);break;case 57:this.$=i.addLocationDataFn(o[a-2],o[a])(r[a-2].concat(r[a]));break;case 58:this.$=i.addLocationDataFn(o[a-3],o[a])(r[a-3].concat(r[a]));break;case 59:this.$=i.addLocationDataFn(o[a-5],o[a])(r[a-5].concat(r[a-2]));break;case 60:this.$=i.addLocationDataFn(o[a],o[a])(new i.Param(r[a]));break;case 61:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Param(r[a-1],null,!0));break;case 62:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Param(r[a-2],r[a]));break;case 63:this.$=r[a];break;case 64:this.$=r[a];break;case 65:this.$=r[a];break;case 66:this.$=r[a];break;case 67:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Splat(r[a-1]));break;case 68:this.$=i.addLocationDataFn(o[a],o[a])(new i.Value(r[a]));break;case 69:this.$=i.addLocationDataFn(o[a-1],o[a])(r[a-1].add(r[a]));break;case 70:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Value(r[a-1],[].concat(r[a])));break;case 71:this.$=r[a];break;case 72:this.$=r[a];break;case 73:this.$=i.addLocationDataFn(o[a],o[a])(new i.Value(r[a]));break;case 74:this.$=i.addLocationDataFn(o[a],o[a])(new i.Value(r[a]));break;case 75:this.$=r[a];break;case 76:this.$=i.addLocationDataFn(o[a],o[a])(new i.Value(r[a]));break;case 77:this.$=i.addLocationDataFn(o[a],o[a])(new i.Value(r[a]));break;case 78:this.$=i.addLocationDataFn(o[a],o[a])(new i.Value(r[a]));break;case 79:this.$=r[a];break;case 80:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Access(r[a]));break;case 81:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Access(r[a],"soak"));break;case 82:this.$=i.addLocationDataFn(o[a-1],o[a])([i.addLocationDataFn(o[a-1])(new i.Access(new i.Literal("prototype"))),i.addLocationDataFn(o[a])(new i.Access(r[a]))]);break;case 83:this.$=i.addLocationDataFn(o[a-1],o[a])([i.addLocationDataFn(o[a-1])(new i.Access(new i.Literal("prototype"),"soak")),i.addLocationDataFn(o[a])(new i.Access(r[a]))]);break;case 84:this.$=i.addLocationDataFn(o[a],o[a])(new i.Access(new i.Literal("prototype")));break;case 85:this.$=r[a];break;case 86:this.$=i.addLocationDataFn(o[a-2],o[a])(r[a-1]);break;case 87:this.$=i.addLocationDataFn(o[a-1],o[a])(i.extend(r[a],{soak:!0}));break;case 88:this.$=i.addLocationDataFn(o[a],o[a])(new i.Index(r[a]));break;case 89:this.$=i.addLocationDataFn(o[a],o[a])(new i.Slice(r[a]));break;case 90:this.$=i.addLocationDataFn(o[a-3],o[a])(new i.Obj(r[a-2],r[a-3].generated));break;case 91:this.$=i.addLocationDataFn(o[a],o[a])([]);break;case 92:this.$=i.addLocationDataFn(o[a],o[a])([r[a]]);break;case 93:this.$=i.addLocationDataFn(o[a-2],o[a])(r[a-2].concat(r[a]));break;case 94:this.$=i.addLocationDataFn(o[a-3],o[a])(r[a-3].concat(r[a]));break;case 95:this.$=i.addLocationDataFn(o[a-5],o[a])(r[a-5].concat(r[a-2]));break;case 96:this.$=i.addLocationDataFn(o[a],o[a])(new i.Class);break;case 97:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Class(null,null,r[a]));break;case 98:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Class(null,r[a]));break;case 99:this.$=i.addLocationDataFn(o[a-3],o[a])(new i.Class(null,r[a-1],r[a]));break;case 100:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Class(r[a]));break;case 101:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Class(r[a-1],null,r[a]));break;case 102:this.$=i.addLocationDataFn(o[a-3],o[a])(new i.Class(r[a-2],r[a]));break;case 103:this.$=i.addLocationDataFn(o[a-4],o[a])(new i.Class(r[a-3],r[a-1],r[a]));break;case 104:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Call(r[a-2],r[a],r[a-1]));break;case 105:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Call(r[a-2],r[a],r[a-1]));break;case 106:this.$=i.addLocationDataFn(o[a],o[a])(new i.Call("super",[new i.Splat(new i.Literal("arguments"))]));break;case 107:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Call("super",r[a]));break;case 108:this.$=i.addLocationDataFn(o[a],o[a])(!1);break;case 109:this.$=i.addLocationDataFn(o[a],o[a])(!0);break;case 110:this.$=i.addLocationDataFn(o[a-1],o[a])([]);break;case 111:this.$=i.addLocationDataFn(o[a-3],o[a])(r[a-2]);break;case 112:this.$=i.addLocationDataFn(o[a],o[a])(new i.Value(new i.Literal("this")));break;case 113:this.$=i.addLocationDataFn(o[a],o[a])(new i.Value(new i.Literal("this")));break;case 114:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Value(i.addLocationDataFn(o[a-1])(new i.Literal("this")),[i.addLocationDataFn(o[a])(new i.Access(r[a]))],"this"));break;case 115:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Arr([]));break;case 116:this.$=i.addLocationDataFn(o[a-3],o[a])(new i.Arr(r[a-2]));break;case 117:this.$=i.addLocationDataFn(o[a],o[a])("inclusive");break;case 118:this.$=i.addLocationDataFn(o[a],o[a])("exclusive");break;case 119:this.$=i.addLocationDataFn(o[a-4],o[a])(new i.Range(r[a-3],r[a-1],r[a-2]));break;case 120:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Range(r[a-2],r[a],r[a-1]));break;case 121:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Range(r[a-1],null,r[a]));break;case 122:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Range(null,r[a],r[a-1]));break;case 123:this.$=i.addLocationDataFn(o[a],o[a])(new i.Range(null,null,r[a]));break;case 124:this.$=i.addLocationDataFn(o[a],o[a])([r[a]]);break;case 125:this.$=i.addLocationDataFn(o[a-2],o[a])(r[a-2].concat(r[a]));break;case 126:this.$=i.addLocationDataFn(o[a-3],o[a])(r[a-3].concat(r[a]));break;case 127:this.$=i.addLocationDataFn(o[a-3],o[a])(r[a-2]);break;case 128:this.$=i.addLocationDataFn(o[a-5],o[a])(r[a-5].concat(r[a-2]));break;case 129:this.$=r[a];break;case 130:this.$=r[a];break;case 131:this.$=r[a];break;case 132:this.$=i.addLocationDataFn(o[a-2],o[a])([].concat(r[a-2],r[a]));break;case 133:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Try(r[a]));break;case 134:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Try(r[a-1],r[a][0],r[a][1]));break;case 135:this.$=i.addLocationDataFn(o[a-3],o[a])(new i.Try(r[a-2],null,null,r[a]));break;case 136:this.$=i.addLocationDataFn(o[a-4],o[a])(new i.Try(r[a-3],r[a-2][0],r[a-2][1],r[a]));break;case 137:this.$=i.addLocationDataFn(o[a-2],o[a])([r[a-1],r[a]]);break;case 138:this.$=i.addLocationDataFn(o[a-2],o[a])([i.addLocationDataFn(o[a-1])(new i.Value(r[a-1])),r[a]]);break;case 139:this.$=i.addLocationDataFn(o[a-1],o[a])([null,r[a]]);break;case 140:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Throw(r[a]));break;case 141:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Parens(r[a-1]));break;case 142:this.$=i.addLocationDataFn(o[a-4],o[a])(new i.Parens(r[a-2]));break;case 143:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.While(r[a]));break;case 144:this.$=i.addLocationDataFn(o[a-3],o[a])(new i.While(r[a-2],{guard:r[a]}));break;case 145:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.While(r[a],{invert:!0}));break;case 146:this.$=i.addLocationDataFn(o[a-3],o[a])(new i.While(r[a-2],{invert:!0,guard:r[a]}));break;case 147:this.$=i.addLocationDataFn(o[a-1],o[a])(r[a-1].addBody(r[a]));break;case 148:this.$=i.addLocationDataFn(o[a-1],o[a])(r[a].addBody(i.addLocationDataFn(o[a-1])(i.Block.wrap([r[a-1]]))));break;case 149:this.$=i.addLocationDataFn(o[a-1],o[a])(r[a].addBody(i.addLocationDataFn(o[a-1])(i.Block.wrap([r[a-1]]))));break;case 150:this.$=i.addLocationDataFn(o[a],o[a])(r[a]);break;case 151:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.While(i.addLocationDataFn(o[a-1])(new i.Literal("true"))).addBody(r[a]));break;case 152:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.While(i.addLocationDataFn(o[a-1])(new i.Literal("true"))).addBody(i.addLocationDataFn(o[a])(i.Block.wrap([r[a]]))));break;case 153:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.For(r[a-1],r[a]));break;case 154:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.For(r[a-1],r[a]));break;case 155:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.For(r[a],r[a-1]));break;case 156:this.$=i.addLocationDataFn(o[a-1],o[a])({source:i.addLocationDataFn(o[a])(new i.Value(r[a]))});break;case 157:this.$=i.addLocationDataFn(o[a-1],o[a])(function(){return r[a].own=r[a-1].own,r[a].name=r[a-1][0],r[a].index=r[a-1][1],r[a]}());break;case 158:this.$=i.addLocationDataFn(o[a-1],o[a])(r[a]);break;case 159:this.$=i.addLocationDataFn(o[a-2],o[a])(function(){return r[a].own=!0,r[a]}());break;case 160:this.$=r[a];break;case 161:this.$=r[a];break;case 162:this.$=i.addLocationDataFn(o[a],o[a])(new i.Value(r[a]));break;case 163:this.$=i.addLocationDataFn(o[a],o[a])(new i.Value(r[a]));break;case 164:this.$=i.addLocationDataFn(o[a],o[a])([r[a]]);break;case 165:this.$=i.addLocationDataFn(o[a-2],o[a])([r[a-2],r[a]]);break;case 166:this.$=i.addLocationDataFn(o[a-1],o[a])({source:r[a]});break;case 167:this.$=i.addLocationDataFn(o[a-1],o[a])({source:r[a],object:!0});break;case 168:this.$=i.addLocationDataFn(o[a-3],o[a])({source:r[a-2],guard:r[a]});break;case 169:this.$=i.addLocationDataFn(o[a-3],o[a])({source:r[a-2],guard:r[a],object:!0});break;case 170:this.$=i.addLocationDataFn(o[a-3],o[a])({source:r[a-2],step:r[a]});break;case 171:this.$=i.addLocationDataFn(o[a-5],o[a])({source:r[a-4],guard:r[a-2],step:r[a]});break;case 172:this.$=i.addLocationDataFn(o[a-5],o[a])({source:r[a-4],step:r[a-2],guard:r[a]});break;case 173:this.$=i.addLocationDataFn(o[a-4],o[a])(new i.Switch(r[a-3],r[a-1]));break;case 174:this.$=i.addLocationDataFn(o[a-6],o[a])(new i.Switch(r[a-5],r[a-3],r[a-1]));break;case 175:this.$=i.addLocationDataFn(o[a-3],o[a])(new i.Switch(null,r[a-1]));break;case 176:this.$=i.addLocationDataFn(o[a-5],o[a])(new i.Switch(null,r[a-3],r[a-1]));break;case 177:this.$=r[a];break;case 178:this.$=i.addLocationDataFn(o[a-1],o[a])(r[a-1].concat(r[a]));break;case 179:this.$=i.addLocationDataFn(o[a-2],o[a])([[r[a-1],r[a]]]);break;case 180:this.$=i.addLocationDataFn(o[a-3],o[a])([[r[a-2],r[a-1]]]);break;case 181:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.If(r[a-1],r[a],{type:r[a-2]}));break;case 182:this.$=i.addLocationDataFn(o[a-4],o[a])(r[a-4].addElse(new i.If(r[a-1],r[a],{type:r[a-2]})));break;case 183:this.$=r[a];break;case 184:this.$=i.addLocationDataFn(o[a-2],o[a])(r[a-2].addElse(r[a]));break;case 185:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.If(r[a],i.addLocationDataFn(o[a-2])(i.Block.wrap([r[a-2]])),{type:r[a-1],statement:!0}));break;case 186:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.If(r[a],i.addLocationDataFn(o[a-2])(i.Block.wrap([r[a-2]])),{type:r[a-1],statement:!0}));break;case 187:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Op(r[a-1],r[a]));break;case 188:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Op("-",r[a]));break;case 189:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Op("+",r[a]));break;case 190:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Op("--",r[a]));break;case 191:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Op("++",r[a]));break;case 192:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Op("--",r[a-1],null,!0));break;case 193:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Op("++",r[a-1],null,!0));break;case 194:this.$=i.addLocationDataFn(o[a-1],o[a])(new i.Existence(r[a-1]));break;case 195:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Op("+",r[a-2],r[a]));break;case 196:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Op("-",r[a-2],r[a]));break;case 197:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Op(r[a-1],r[a-2],r[a]));break;case 198:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Op(r[a-1],r[a-2],r[a]));break;case 199:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Op(r[a-1],r[a-2],r[a]));break;case 200:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Op(r[a-1],r[a-2],r[a]));break;case 201:this.$=i.addLocationDataFn(o[a-2],o[a])(function(){return"!"===r[a-1].charAt(0)?new i.Op(r[a-1].slice(1),r[a-2],r[a]).invert():new i.Op(r[a-1],r[a-2],r[a])}());break;case 202:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Assign(r[a-2],r[a],r[a-1]));break;case 203:this.$=i.addLocationDataFn(o[a-4],o[a])(new i.Assign(r[a-4],r[a-1],r[a-3]));break;case 204:this.$=i.addLocationDataFn(o[a-3],o[a])(new i.Assign(r[a-3],r[a],r[a-2]));break;case 205:this.$=i.addLocationDataFn(o[a-2],o[a])(new i.Extends(r[a-2],r[a]))}},table:[{1:[2,1],3:1,4:2,5:3,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,5],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[3]},{1:[2,2],6:[1,74]},{6:[1,75]},{1:[2,4],6:[2,4],26:[2,4],102:[2,4]},{4:77,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,26:[1,76],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,7],6:[2,7],26:[2,7],102:[2,7],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,8],6:[2,8],26:[2,8],102:[2,8],103:90,104:[1,65],106:[1,66],109:91,110:[1,68],111:69,126:[1,89]},{1:[2,12],6:[2,12],25:[2,12],26:[2,12],49:[2,12],54:[2,12],57:[2,12],62:93,66:[1,95],67:[1,96],68:[1,97],69:[1,98],70:99,71:[1,100],73:[2,12],74:[1,101],78:[2,12],81:92,84:[1,94],85:[2,108],86:[2,12],91:[2,12],93:[2,12],102:[2,12],104:[2,12],105:[2,12],106:[2,12],110:[2,12],118:[2,12],126:[2,12],128:[2,12],129:[2,12],132:[2,12],133:[2,12],134:[2,12],135:[2,12],136:[2,12],137:[2,12]},{1:[2,13],6:[2,13],25:[2,13],26:[2,13],49:[2,13],54:[2,13],57:[2,13],62:103,66:[1,95],67:[1,96],68:[1,97],69:[1,98],70:99,71:[1,100],73:[2,13],74:[1,101],78:[2,13],81:102,84:[1,94],85:[2,108],86:[2,13],91:[2,13],93:[2,13],102:[2,13],104:[2,13],105:[2,13],106:[2,13],110:[2,13],118:[2,13],126:[2,13],128:[2,13],129:[2,13],132:[2,13],133:[2,13],134:[2,13],135:[2,13],136:[2,13],137:[2,13]},{1:[2,14],6:[2,14],25:[2,14],26:[2,14],49:[2,14],54:[2,14],57:[2,14],73:[2,14],78:[2,14],86:[2,14],91:[2,14],93:[2,14],102:[2,14],104:[2,14],105:[2,14],106:[2,14],110:[2,14],118:[2,14],126:[2,14],128:[2,14],129:[2,14],132:[2,14],133:[2,14],134:[2,14],135:[2,14],136:[2,14],137:[2,14]},{1:[2,15],6:[2,15],25:[2,15],26:[2,15],49:[2,15],54:[2,15],57:[2,15],73:[2,15],78:[2,15],86:[2,15],91:[2,15],93:[2,15],102:[2,15],104:[2,15],105:[2,15],106:[2,15],110:[2,15],118:[2,15],126:[2,15],128:[2,15],129:[2,15],132:[2,15],133:[2,15],134:[2,15],135:[2,15],136:[2,15],137:[2,15]},{1:[2,16],6:[2,16],25:[2,16],26:[2,16],49:[2,16],54:[2,16],57:[2,16],73:[2,16],78:[2,16],86:[2,16],91:[2,16],93:[2,16],102:[2,16],104:[2,16],105:[2,16],106:[2,16],110:[2,16],118:[2,16],126:[2,16],128:[2,16],129:[2,16],132:[2,16],133:[2,16],134:[2,16],135:[2,16],136:[2,16],137:[2,16]},{1:[2,17],6:[2,17],25:[2,17],26:[2,17],49:[2,17],54:[2,17],57:[2,17],73:[2,17],78:[2,17],86:[2,17],91:[2,17],93:[2,17],102:[2,17],104:[2,17],105:[2,17],106:[2,17],110:[2,17],118:[2,17],126:[2,17],128:[2,17],129:[2,17],132:[2,17],133:[2,17],134:[2,17],135:[2,17],136:[2,17],137:[2,17]},{1:[2,18],6:[2,18],25:[2,18],26:[2,18],49:[2,18],54:[2,18],57:[2,18],73:[2,18],78:[2,18],86:[2,18],91:[2,18],93:[2,18],102:[2,18],104:[2,18],105:[2,18],106:[2,18],110:[2,18],118:[2,18],126:[2,18],128:[2,18],129:[2,18],132:[2,18],133:[2,18],134:[2,18],135:[2,18],136:[2,18],137:[2,18]},{1:[2,19],6:[2,19],25:[2,19],26:[2,19],49:[2,19],54:[2,19],57:[2,19],73:[2,19],78:[2,19],86:[2,19],91:[2,19],93:[2,19],102:[2,19],104:[2,19],105:[2,19],106:[2,19],110:[2,19],118:[2,19],126:[2,19],128:[2,19],129:[2,19],132:[2,19],133:[2,19],134:[2,19],135:[2,19],136:[2,19],137:[2,19]},{1:[2,20],6:[2,20],25:[2,20],26:[2,20],49:[2,20],54:[2,20],57:[2,20],73:[2,20],78:[2,20],86:[2,20],91:[2,20],93:[2,20],102:[2,20],104:[2,20],105:[2,20],106:[2,20],110:[2,20],118:[2,20],126:[2,20],128:[2,20],129:[2,20],132:[2,20],133:[2,20],134:[2,20],135:[2,20],136:[2,20],137:[2,20]},{1:[2,21],6:[2,21],25:[2,21],26:[2,21],49:[2,21],54:[2,21],57:[2,21],73:[2,21],78:[2,21],86:[2,21],91:[2,21],93:[2,21],102:[2,21],104:[2,21],105:[2,21],106:[2,21],110:[2,21],118:[2,21],126:[2,21],128:[2,21],129:[2,21],132:[2,21],133:[2,21],134:[2,21],135:[2,21],136:[2,21],137:[2,21]},{1:[2,22],6:[2,22],25:[2,22],26:[2,22],49:[2,22],54:[2,22],57:[2,22],73:[2,22],78:[2,22],86:[2,22],91:[2,22],93:[2,22],102:[2,22],104:[2,22],105:[2,22],106:[2,22],110:[2,22],118:[2,22],126:[2,22],128:[2,22],129:[2,22],132:[2,22],133:[2,22],134:[2,22],135:[2,22],136:[2,22],137:[2,22]},{1:[2,23],6:[2,23],25:[2,23],26:[2,23],49:[2,23],54:[2,23],57:[2,23],73:[2,23],78:[2,23],86:[2,23],91:[2,23],93:[2,23],102:[2,23],104:[2,23],105:[2,23],106:[2,23],110:[2,23],118:[2,23],126:[2,23],128:[2,23],129:[2,23],132:[2,23],133:[2,23],134:[2,23],135:[2,23],136:[2,23],137:[2,23]},{1:[2,9],6:[2,9],26:[2,9],102:[2,9],104:[2,9],106:[2,9],110:[2,9],126:[2,9]},{1:[2,10],6:[2,10],26:[2,10],102:[2,10],104:[2,10],106:[2,10],110:[2,10],126:[2,10]},{1:[2,11],6:[2,11],26:[2,11],102:[2,11],104:[2,11],106:[2,11],110:[2,11],126:[2,11]},{1:[2,75],6:[2,75],25:[2,75],26:[2,75],40:[1,104],49:[2,75],54:[2,75],57:[2,75],66:[2,75],67:[2,75],68:[2,75],69:[2,75],71:[2,75],73:[2,75],74:[2,75],78:[2,75],84:[2,75],85:[2,75],86:[2,75],91:[2,75],93:[2,75],102:[2,75],104:[2,75],105:[2,75],106:[2,75],110:[2,75],118:[2,75],126:[2,75],128:[2,75],129:[2,75],132:[2,75],133:[2,75],134:[2,75],135:[2,75],136:[2,75],137:[2,75]},{1:[2,76],6:[2,76],25:[2,76],26:[2,76],49:[2,76],54:[2,76],57:[2,76],66:[2,76],67:[2,76],68:[2,76],69:[2,76],71:[2,76],73:[2,76],74:[2,76],78:[2,76],84:[2,76],85:[2,76],86:[2,76],91:[2,76],93:[2,76],102:[2,76],104:[2,76],105:[2,76],106:[2,76],110:[2,76],118:[2,76],126:[2,76],128:[2,76],129:[2,76],132:[2,76],133:[2,76],134:[2,76],135:[2,76],136:[2,76],137:[2,76]},{1:[2,77],6:[2,77],25:[2,77],26:[2,77],49:[2,77],54:[2,77],57:[2,77],66:[2,77],67:[2,77],68:[2,77],69:[2,77],71:[2,77],73:[2,77],74:[2,77],78:[2,77],84:[2,77],85:[2,77],86:[2,77],91:[2,77],93:[2,77],102:[2,77],104:[2,77],105:[2,77],106:[2,77],110:[2,77],118:[2,77],126:[2,77],128:[2,77],129:[2,77],132:[2,77],133:[2,77],134:[2,77],135:[2,77],136:[2,77],137:[2,77]},{1:[2,78],6:[2,78],25:[2,78],26:[2,78],49:[2,78],54:[2,78],57:[2,78],66:[2,78],67:[2,78],68:[2,78],69:[2,78],71:[2,78],73:[2,78],74:[2,78],78:[2,78],84:[2,78],85:[2,78],86:[2,78],91:[2,78],93:[2,78],102:[2,78],104:[2,78],105:[2,78],106:[2,78],110:[2,78],118:[2,78],126:[2,78],128:[2,78],129:[2,78],132:[2,78],133:[2,78],134:[2,78],135:[2,78],136:[2,78],137:[2,78]},{1:[2,79],6:[2,79],25:[2,79],26:[2,79],49:[2,79],54:[2,79],57:[2,79],66:[2,79],67:[2,79],68:[2,79],69:[2,79],71:[2,79],73:[2,79],74:[2,79],78:[2,79],84:[2,79],85:[2,79],86:[2,79],91:[2,79],93:[2,79],102:[2,79],104:[2,79],105:[2,79],106:[2,79],110:[2,79],118:[2,79],126:[2,79],128:[2,79],129:[2,79],132:[2,79],133:[2,79],134:[2,79],135:[2,79],136:[2,79],137:[2,79]},{1:[2,106],6:[2,106],25:[2,106],26:[2,106],49:[2,106],54:[2,106],57:[2,106],66:[2,106],67:[2,106],68:[2,106],69:[2,106],71:[2,106],73:[2,106],74:[2,106],78:[2,106],82:105,84:[2,106],85:[1,106],86:[2,106],91:[2,106],93:[2,106],102:[2,106],104:[2,106],105:[2,106],106:[2,106],110:[2,106],118:[2,106],126:[2,106],128:[2,106],129:[2,106],132:[2,106],133:[2,106],134:[2,106],135:[2,106],136:[2,106],137:[2,106]},{6:[2,55],25:[2,55],27:110,28:[1,73],44:111,48:107,49:[2,55],54:[2,55],55:108,56:109,58:112,59:113,76:[1,70],89:[1,114],90:[1,115]},{5:116,25:[1,5]},{8:117,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:119,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:120,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{13:122,14:123,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:124,44:63,58:47,59:48,61:121,63:25,64:26,65:27,76:[1,70],83:[1,28],88:[1,58],89:[1,59],90:[1,57],101:[1,56]},{13:122,14:123,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:124,44:63,58:47,59:48,61:125,63:25,64:26,65:27,76:[1,70],83:[1,28],88:[1,58],89:[1,59],90:[1,57],101:[1,56]},{1:[2,72],6:[2,72],25:[2,72],26:[2,72],40:[2,72],49:[2,72],54:[2,72],57:[2,72],66:[2,72],67:[2,72],68:[2,72],69:[2,72],71:[2,72],73:[2,72],74:[2,72],78:[2,72],80:[1,129],84:[2,72],85:[2,72],86:[2,72],91:[2,72],93:[2,72],102:[2,72],104:[2,72],105:[2,72],106:[2,72],110:[2,72],118:[2,72],126:[2,72],128:[2,72],129:[2,72],130:[1,126],131:[1,127],132:[2,72],133:[2,72],134:[2,72],135:[2,72],136:[2,72],137:[2,72],138:[1,128]},{1:[2,183],6:[2,183],25:[2,183],26:[2,183],49:[2,183],54:[2,183],57:[2,183],73:[2,183],78:[2,183],86:[2,183],91:[2,183],93:[2,183],102:[2,183],104:[2,183],105:[2,183],106:[2,183],110:[2,183],118:[2,183],121:[1,130],126:[2,183],128:[2,183],129:[2,183],132:[2,183],133:[2,183],134:[2,183],135:[2,183],136:[2,183],137:[2,183]},{5:131,25:[1,5]},{5:132,25:[1,5]},{1:[2,150],6:[2,150],25:[2,150],26:[2,150],49:[2,150],54:[2,150],57:[2,150],73:[2,150],78:[2,150],86:[2,150],91:[2,150],93:[2,150],102:[2,150],104:[2,150],105:[2,150],106:[2,150],110:[2,150],118:[2,150],126:[2,150],128:[2,150],129:[2,150],132:[2,150],133:[2,150],134:[2,150],135:[2,150],136:[2,150],137:[2,150]},{5:133,25:[1,5]},{8:134,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,135],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,96],5:136,6:[2,96],13:122,14:123,25:[1,5],26:[2,96],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:124,44:63,49:[2,96],54:[2,96],57:[2,96],58:47,59:48,61:138,63:25,64:26,65:27,73:[2,96],76:[1,70],78:[2,96],80:[1,137],83:[1,28],86:[2,96],88:[1,58],89:[1,59],90:[1,57],91:[2,96],93:[2,96],101:[1,56],102:[2,96],104:[2,96],105:[2,96],106:[2,96],110:[2,96],118:[2,96],126:[2,96],128:[2,96],129:[2,96],132:[2,96],133:[2,96],134:[2,96],135:[2,96],136:[2,96],137:[2,96]},{8:139,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,47],6:[2,47],8:140,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,26:[2,47],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],102:[2,47],103:39,104:[2,47],106:[2,47],107:40,108:[1,67],109:41,110:[2,47],111:69,119:[1,42],124:37,125:[1,64],126:[2,47],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,48],6:[2,48],25:[2,48],26:[2,48],54:[2,48],78:[2,48],102:[2,48],104:[2,48],106:[2,48],110:[2,48],126:[2,48]},{1:[2,73],6:[2,73],25:[2,73],26:[2,73],40:[2,73],49:[2,73],54:[2,73],57:[2,73],66:[2,73],67:[2,73],68:[2,73],69:[2,73],71:[2,73],73:[2,73],74:[2,73],78:[2,73],84:[2,73],85:[2,73],86:[2,73],91:[2,73],93:[2,73],102:[2,73],104:[2,73],105:[2,73],106:[2,73],110:[2,73],118:[2,73],126:[2,73],128:[2,73],129:[2,73],132:[2,73],133:[2,73],134:[2,73],135:[2,73],136:[2,73],137:[2,73]},{1:[2,74],6:[2,74],25:[2,74],26:[2,74],40:[2,74],49:[2,74],54:[2,74],57:[2,74],66:[2,74],67:[2,74],68:[2,74],69:[2,74],71:[2,74],73:[2,74],74:[2,74],78:[2,74],84:[2,74],85:[2,74],86:[2,74],91:[2,74],93:[2,74],102:[2,74],104:[2,74],105:[2,74],106:[2,74],110:[2,74],118:[2,74],126:[2,74],128:[2,74],129:[2,74],132:[2,74],133:[2,74],134:[2,74],135:[2,74],136:[2,74],137:[2,74]},{1:[2,29],6:[2,29],25:[2,29],26:[2,29],49:[2,29],54:[2,29],57:[2,29],66:[2,29],67:[2,29],68:[2,29],69:[2,29],71:[2,29],73:[2,29],74:[2,29],78:[2,29],84:[2,29],85:[2,29],86:[2,29],91:[2,29],93:[2,29],102:[2,29],104:[2,29],105:[2,29],106:[2,29],110:[2,29],118:[2,29],126:[2,29],128:[2,29],129:[2,29],132:[2,29],133:[2,29],134:[2,29],135:[2,29],136:[2,29],137:[2,29]},{1:[2,30],6:[2,30],25:[2,30],26:[2,30],49:[2,30],54:[2,30],57:[2,30],66:[2,30],67:[2,30],68:[2,30],69:[2,30],71:[2,30],73:[2,30],74:[2,30],78:[2,30],84:[2,30],85:[2,30],86:[2,30],91:[2,30],93:[2,30],102:[2,30],104:[2,30],105:[2,30],106:[2,30],110:[2,30],118:[2,30],126:[2,30],128:[2,30],129:[2,30],132:[2,30],133:[2,30],134:[2,30],135:[2,30],136:[2,30],137:[2,30]},{1:[2,31],6:[2,31],25:[2,31],26:[2,31],49:[2,31],54:[2,31],57:[2,31],66:[2,31],67:[2,31],68:[2,31],69:[2,31],71:[2,31],73:[2,31],74:[2,31],78:[2,31],84:[2,31],85:[2,31],86:[2,31],91:[2,31],93:[2,31],102:[2,31],104:[2,31],105:[2,31],106:[2,31],110:[2,31],118:[2,31],126:[2,31],128:[2,31],129:[2,31],132:[2,31],133:[2,31],134:[2,31],135:[2,31],136:[2,31],137:[2,31]},{1:[2,32],6:[2,32],25:[2,32],26:[2,32],49:[2,32],54:[2,32],57:[2,32],66:[2,32],67:[2,32],68:[2,32],69:[2,32],71:[2,32],73:[2,32],74:[2,32],78:[2,32],84:[2,32],85:[2,32],86:[2,32],91:[2,32],93:[2,32],102:[2,32],104:[2,32],105:[2,32],106:[2,32],110:[2,32],118:[2,32],126:[2,32],128:[2,32],129:[2,32],132:[2,32],133:[2,32],134:[2,32],135:[2,32],136:[2,32],137:[2,32]},{1:[2,33],6:[2,33],25:[2,33],26:[2,33],49:[2,33],54:[2,33],57:[2,33],66:[2,33],67:[2,33],68:[2,33],69:[2,33],71:[2,33],73:[2,33],74:[2,33],78:[2,33],84:[2,33],85:[2,33],86:[2,33],91:[2,33],93:[2,33],102:[2,33],104:[2,33],105:[2,33],106:[2,33],110:[2,33],118:[2,33],126:[2,33],128:[2,33],129:[2,33],132:[2,33],133:[2,33],134:[2,33],135:[2,33],136:[2,33],137:[2,33]},{1:[2,34],6:[2,34],25:[2,34],26:[2,34],49:[2,34],54:[2,34],57:[2,34],66:[2,34],67:[2,34],68:[2,34],69:[2,34],71:[2,34],73:[2,34],74:[2,34],78:[2,34],84:[2,34],85:[2,34],86:[2,34],91:[2,34],93:[2,34],102:[2,34],104:[2,34],105:[2,34],106:[2,34],110:[2,34],118:[2,34],126:[2,34],128:[2,34],129:[2,34],132:[2,34],133:[2,34],134:[2,34],135:[2,34],136:[2,34],137:[2,34]},{1:[2,35],6:[2,35],25:[2,35],26:[2,35],49:[2,35],54:[2,35],57:[2,35],66:[2,35],67:[2,35],68:[2,35],69:[2,35],71:[2,35],73:[2,35],74:[2,35],78:[2,35],84:[2,35],85:[2,35],86:[2,35],91:[2,35],93:[2,35],102:[2,35],104:[2,35],105:[2,35],106:[2,35],110:[2,35],118:[2,35],126:[2,35],128:[2,35],129:[2,35],132:[2,35],133:[2,35],134:[2,35],135:[2,35],136:[2,35],137:[2,35]},{4:141,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,142],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:143,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,147],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],87:145,88:[1,58],89:[1,59],90:[1,57],91:[1,144],94:146,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,112],6:[2,112],25:[2,112],26:[2,112],49:[2,112],54:[2,112],57:[2,112],66:[2,112],67:[2,112],68:[2,112],69:[2,112],71:[2,112],73:[2,112],74:[2,112],78:[2,112],84:[2,112],85:[2,112],86:[2,112],91:[2,112],93:[2,112],102:[2,112],104:[2,112],105:[2,112],106:[2,112],110:[2,112],118:[2,112],126:[2,112],128:[2,112],129:[2,112],132:[2,112],133:[2,112],134:[2,112],135:[2,112],136:[2,112],137:[2,112]},{1:[2,113],6:[2,113],25:[2,113],26:[2,113],27:149,28:[1,73],49:[2,113],54:[2,113],57:[2,113],66:[2,113],67:[2,113],68:[2,113],69:[2,113],71:[2,113],73:[2,113],74:[2,113],78:[2,113],84:[2,113],85:[2,113],86:[2,113],91:[2,113],93:[2,113],102:[2,113],104:[2,113],105:[2,113],106:[2,113],110:[2,113],118:[2,113],126:[2,113],128:[2,113],129:[2,113],132:[2,113],133:[2,113],134:[2,113],135:[2,113],136:[2,113],137:[2,113]},{25:[2,51]},{25:[2,52]},{1:[2,68],6:[2,68],25:[2,68],26:[2,68],40:[2,68],49:[2,68],54:[2,68],57:[2,68],66:[2,68],67:[2,68],68:[2,68],69:[2,68],71:[2,68],73:[2,68],74:[2,68],78:[2,68],80:[2,68],84:[2,68],85:[2,68],86:[2,68],91:[2,68],93:[2,68],102:[2,68],104:[2,68],105:[2,68],106:[2,68],110:[2,68],118:[2,68],126:[2,68],128:[2,68],129:[2,68],130:[2,68],131:[2,68],132:[2,68],133:[2,68],134:[2,68],135:[2,68],136:[2,68],137:[2,68],138:[2,68]},{1:[2,71],6:[2,71],25:[2,71],26:[2,71],40:[2,71],49:[2,71],54:[2,71],57:[2,71],66:[2,71],67:[2,71],68:[2,71],69:[2,71],71:[2,71],73:[2,71],74:[2,71],78:[2,71],80:[2,71],84:[2,71],85:[2,71],86:[2,71],91:[2,71],93:[2,71],102:[2,71],104:[2,71],105:[2,71],106:[2,71],110:[2,71],118:[2,71],126:[2,71],128:[2,71],129:[2,71],130:[2,71],131:[2,71],132:[2,71],133:[2,71],134:[2,71],135:[2,71],136:[2,71],137:[2,71],138:[2,71]},{8:150,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:151,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:152,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{5:153,8:154,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,5],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{27:159,28:[1,73],44:160,58:161,59:162,64:155,76:[1,70],89:[1,114],90:[1,57],113:156,114:[1,157],115:158},{112:163,116:[1,164],117:[1,165]},{6:[2,91],11:169,25:[2,91],27:170,28:[1,73],29:171,30:[1,71],31:[1,72],41:167,42:168,44:172,46:[1,46],54:[2,91],77:166,78:[2,91],89:[1,114]},{1:[2,27],6:[2,27],25:[2,27],26:[2,27],43:[2,27],49:[2,27],54:[2,27],57:[2,27],66:[2,27],67:[2,27],68:[2,27],69:[2,27],71:[2,27],73:[2,27],74:[2,27],78:[2,27],84:[2,27],85:[2,27],86:[2,27],91:[2,27],93:[2,27],102:[2,27],104:[2,27],105:[2,27],106:[2,27],110:[2,27],118:[2,27],126:[2,27],128:[2,27],129:[2,27],132:[2,27],133:[2,27],134:[2,27],135:[2,27],136:[2,27],137:[2,27]},{1:[2,28],6:[2,28],25:[2,28],26:[2,28],43:[2,28],49:[2,28],54:[2,28],57:[2,28],66:[2,28],67:[2,28],68:[2,28],69:[2,28],71:[2,28],73:[2,28],74:[2,28],78:[2,28],84:[2,28],85:[2,28],86:[2,28],91:[2,28],93:[2,28],102:[2,28],104:[2,28],105:[2,28],106:[2,28],110:[2,28],118:[2,28],126:[2,28],128:[2,28],129:[2,28],132:[2,28],133:[2,28],134:[2,28],135:[2,28],136:[2,28],137:[2,28]},{1:[2,26],6:[2,26],25:[2,26],26:[2,26],40:[2,26],43:[2,26],49:[2,26],54:[2,26],57:[2,26],66:[2,26],67:[2,26],68:[2,26],69:[2,26],71:[2,26],73:[2,26],74:[2,26],78:[2,26],80:[2,26],84:[2,26],85:[2,26],86:[2,26],91:[2,26],93:[2,26],102:[2,26],104:[2,26],105:[2,26],106:[2,26],110:[2,26],116:[2,26],117:[2,26],118:[2,26],126:[2,26],128:[2,26],129:[2,26],130:[2,26],131:[2,26],132:[2,26],133:[2,26],134:[2,26],135:[2,26],136:[2,26],137:[2,26],138:[2,26]},{1:[2,6],6:[2,6],7:173,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,26:[2,6],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],102:[2,6],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,3]},{1:[2,24],6:[2,24],25:[2,24],26:[2,24],49:[2,24],54:[2,24],57:[2,24],73:[2,24],78:[2,24],86:[2,24],91:[2,24],93:[2,24],98:[2,24],99:[2,24],102:[2,24],104:[2,24],105:[2,24],106:[2,24],110:[2,24],118:[2,24],121:[2,24],123:[2,24],126:[2,24],128:[2,24],129:[2,24],132:[2,24],133:[2,24],134:[2,24],135:[2,24],136:[2,24],137:[2,24]},{6:[1,74],26:[1,174]},{1:[2,194],6:[2,194],25:[2,194],26:[2,194],49:[2,194],54:[2,194],57:[2,194],73:[2,194],78:[2,194],86:[2,194],91:[2,194],93:[2,194],102:[2,194],104:[2,194],105:[2,194],106:[2,194],110:[2,194],118:[2,194],126:[2,194],128:[2,194],129:[2,194],132:[2,194],133:[2,194],134:[2,194],135:[2,194],136:[2,194],137:[2,194]},{8:175,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:176,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:177,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:178,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:179,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:180,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:181,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:182,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,149],6:[2,149],25:[2,149],26:[2,149],49:[2,149],54:[2,149],57:[2,149],73:[2,149],78:[2,149],86:[2,149],91:[2,149],93:[2,149],102:[2,149],104:[2,149],105:[2,149],106:[2,149],110:[2,149],118:[2,149],126:[2,149],128:[2,149],129:[2,149],132:[2,149],133:[2,149],134:[2,149],135:[2,149],136:[2,149],137:[2,149]},{1:[2,154],6:[2,154],25:[2,154],26:[2,154],49:[2,154],54:[2,154],57:[2,154],73:[2,154],78:[2,154],86:[2,154],91:[2,154],93:[2,154],102:[2,154],104:[2,154],105:[2,154],106:[2,154],110:[2,154],118:[2,154],126:[2,154],128:[2,154],129:[2,154],132:[2,154],133:[2,154],134:[2,154],135:[2,154],136:[2,154],137:[2,154]},{8:183,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,148],6:[2,148],25:[2,148],26:[2,148],49:[2,148],54:[2,148],57:[2,148],73:[2,148],78:[2,148],86:[2,148],91:[2,148],93:[2,148],102:[2,148],104:[2,148],105:[2,148],106:[2,148],110:[2,148],118:[2,148],126:[2,148],128:[2,148],129:[2,148],132:[2,148],133:[2,148],134:[2,148],135:[2,148],136:[2,148],137:[2,148]},{1:[2,153],6:[2,153],25:[2,153],26:[2,153],49:[2,153],54:[2,153],57:[2,153],73:[2,153],78:[2,153],86:[2,153],91:[2,153],93:[2,153],102:[2,153],104:[2,153],105:[2,153],106:[2,153],110:[2,153],118:[2,153],126:[2,153],128:[2,153],129:[2,153],132:[2,153],133:[2,153],134:[2,153],135:[2,153],136:[2,153],137:[2,153]},{82:184,85:[1,106]},{1:[2,69],6:[2,69],25:[2,69],26:[2,69],40:[2,69],49:[2,69],54:[2,69],57:[2,69],66:[2,69],67:[2,69],68:[2,69],69:[2,69],71:[2,69],73:[2,69],74:[2,69],78:[2,69],80:[2,69],84:[2,69],85:[2,69],86:[2,69],91:[2,69],93:[2,69],102:[2,69],104:[2,69],105:[2,69],106:[2,69],110:[2,69],118:[2,69],126:[2,69],128:[2,69],129:[2,69],130:[2,69],131:[2,69],132:[2,69],133:[2,69],134:[2,69],135:[2,69],136:[2,69],137:[2,69],138:[2,69]},{85:[2,109]},{27:185,28:[1,73]},{27:186,28:[1,73]},{1:[2,84],6:[2,84],25:[2,84],26:[2,84],27:187,28:[1,73],40:[2,84],49:[2,84],54:[2,84],57:[2,84],66:[2,84],67:[2,84],68:[2,84],69:[2,84],71:[2,84],73:[2,84],74:[2,84],78:[2,84],80:[2,84],84:[2,84],85:[2,84],86:[2,84],91:[2,84],93:[2,84],102:[2,84],104:[2,84],105:[2,84],106:[2,84],110:[2,84],118:[2,84],126:[2,84],128:[2,84],129:[2,84],130:[2,84],131:[2,84],132:[2,84],133:[2,84],134:[2,84],135:[2,84],136:[2,84],137:[2,84],138:[2,84]},{27:188,28:[1,73]},{1:[2,85],6:[2,85],25:[2,85],26:[2,85],40:[2,85],49:[2,85],54:[2,85],57:[2,85],66:[2,85],67:[2,85],68:[2,85],69:[2,85],71:[2,85],73:[2,85],74:[2,85],78:[2,85],80:[2,85],84:[2,85],85:[2,85],86:[2,85],91:[2,85],93:[2,85],102:[2,85],104:[2,85],105:[2,85],106:[2,85],110:[2,85],118:[2,85],126:[2,85],128:[2,85],129:[2,85],130:[2,85],131:[2,85],132:[2,85],133:[2,85],134:[2,85],135:[2,85],136:[2,85],137:[2,85],138:[2,85]},{8:190,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],57:[1,194],58:47,59:48,61:36,63:25,64:26,65:27,72:189,75:191,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],92:192,93:[1,193],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{70:195,71:[1,100],74:[1,101]},{82:196,85:[1,106]},{1:[2,70],6:[2,70],25:[2,70],26:[2,70],40:[2,70],49:[2,70],54:[2,70],57:[2,70],66:[2,70],67:[2,70],68:[2,70],69:[2,70],71:[2,70],73:[2,70],74:[2,70],78:[2,70],80:[2,70],84:[2,70],85:[2,70],86:[2,70],91:[2,70],93:[2,70],102:[2,70],104:[2,70],105:[2,70],106:[2,70],110:[2,70],118:[2,70],126:[2,70],128:[2,70],129:[2,70],130:[2,70],131:[2,70],132:[2,70],133:[2,70],134:[2,70],135:[2,70],136:[2,70],137:[2,70],138:[2,70]},{6:[1,198],8:197,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,199],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,107],6:[2,107],25:[2,107],26:[2,107],49:[2,107],54:[2,107],57:[2,107],66:[2,107],67:[2,107],68:[2,107],69:[2,107],71:[2,107],73:[2,107],74:[2,107],78:[2,107],84:[2,107],85:[2,107],86:[2,107],91:[2,107],93:[2,107],102:[2,107],104:[2,107],105:[2,107],106:[2,107],110:[2,107],118:[2,107],126:[2,107],128:[2,107],129:[2,107],132:[2,107],133:[2,107],134:[2,107],135:[2,107],136:[2,107],137:[2,107]},{8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,147],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],86:[1,200],87:201,88:[1,58],89:[1,59],90:[1,57],94:146,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,53],25:[2,53],49:[1,203],53:205,54:[1,204]},{6:[2,56],25:[2,56],26:[2,56],49:[2,56],54:[2,56]},{6:[2,60],25:[2,60],26:[2,60],40:[1,207],49:[2,60],54:[2,60],57:[1,206]},{6:[2,63],25:[2,63],26:[2,63],40:[2,63],49:[2,63],54:[2,63],57:[2,63]},{6:[2,64],25:[2,64],26:[2,64],40:[2,64],49:[2,64],54:[2,64],57:[2,64]},{6:[2,65],25:[2,65],26:[2,65],40:[2,65],49:[2,65],54:[2,65],57:[2,65]},{6:[2,66],25:[2,66],26:[2,66],40:[2,66],49:[2,66],54:[2,66],57:[2,66]},{27:149,28:[1,73]},{8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,147],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],87:145,88:[1,58],89:[1,59],90:[1,57],91:[1,144],94:146,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,50],6:[2,50],25:[2,50],26:[2,50],49:[2,50],54:[2,50],57:[2,50],73:[2,50],78:[2,50],86:[2,50],91:[2,50],93:[2,50],102:[2,50],104:[2,50],105:[2,50],106:[2,50],110:[2,50],118:[2,50],126:[2,50],128:[2,50],129:[2,50],132:[2,50],133:[2,50],134:[2,50],135:[2,50],136:[2,50],137:[2,50]},{1:[2,187],6:[2,187],25:[2,187],26:[2,187],49:[2,187],54:[2,187],57:[2,187],73:[2,187],78:[2,187],86:[2,187],91:[2,187],93:[2,187],102:[2,187],103:87,104:[2,187],105:[2,187],106:[2,187],109:88,110:[2,187],111:69,118:[2,187],126:[2,187],128:[2,187],129:[2,187],132:[1,78],133:[2,187],134:[2,187],135:[2,187],136:[2,187],137:[2,187]},{103:90,104:[1,65],106:[1,66],109:91,110:[1,68],111:69,126:[1,89]},{1:[2,188],6:[2,188],25:[2,188],26:[2,188],49:[2,188],54:[2,188],57:[2,188],73:[2,188],78:[2,188],86:[2,188],91:[2,188],93:[2,188],102:[2,188],103:87,104:[2,188],105:[2,188],106:[2,188],109:88,110:[2,188],111:69,118:[2,188],126:[2,188],128:[2,188],129:[2,188],132:[1,78],133:[2,188],134:[2,188],135:[2,188],136:[2,188],137:[2,188]},{1:[2,189],6:[2,189],25:[2,189],26:[2,189],49:[2,189],54:[2,189],57:[2,189],73:[2,189],78:[2,189],86:[2,189],91:[2,189],93:[2,189],102:[2,189],103:87,104:[2,189],105:[2,189],106:[2,189],109:88,110:[2,189],111:69,118:[2,189],126:[2,189],128:[2,189],129:[2,189],132:[1,78],133:[2,189],134:[2,189],135:[2,189],136:[2,189],137:[2,189]},{1:[2,190],6:[2,190],25:[2,190],26:[2,190],49:[2,190],54:[2,190],57:[2,190],66:[2,72],67:[2,72],68:[2,72],69:[2,72],71:[2,72],73:[2,190],74:[2,72],78:[2,190],84:[2,72],85:[2,72],86:[2,190],91:[2,190],93:[2,190],102:[2,190],104:[2,190],105:[2,190],106:[2,190],110:[2,190],118:[2,190],126:[2,190],128:[2,190],129:[2,190],132:[2,190],133:[2,190],134:[2,190],135:[2,190],136:[2,190],137:[2,190]},{62:93,66:[1,95],67:[1,96],68:[1,97],69:[1,98],70:99,71:[1,100],74:[1,101],81:92,84:[1,94],85:[2,108]},{62:103,66:[1,95],67:[1,96],68:[1,97],69:[1,98],70:99,71:[1,100],74:[1,101],81:102,84:[1,94],85:[2,108]},{66:[2,75],67:[2,75],68:[2,75],69:[2,75],71:[2,75],74:[2,75],84:[2,75],85:[2,75]},{1:[2,191],6:[2,191],25:[2,191],26:[2,191],49:[2,191],54:[2,191],57:[2,191],66:[2,72],67:[2,72],68:[2,72],69:[2,72],71:[2,72],73:[2,191],74:[2,72],78:[2,191],84:[2,72],85:[2,72],86:[2,191],91:[2,191],93:[2,191],102:[2,191],104:[2,191],105:[2,191],106:[2,191],110:[2,191],118:[2,191],126:[2,191],128:[2,191],129:[2,191],132:[2,191],133:[2,191],134:[2,191],135:[2,191],136:[2,191],137:[2,191]},{1:[2,192],6:[2,192],25:[2,192],26:[2,192],49:[2,192],54:[2,192],57:[2,192],73:[2,192],78:[2,192],86:[2,192],91:[2,192],93:[2,192],102:[2,192],104:[2,192],105:[2,192],106:[2,192],110:[2,192],118:[2,192],126:[2,192],128:[2,192],129:[2,192],132:[2,192],133:[2,192],134:[2,192],135:[2,192],136:[2,192],137:[2,192]},{1:[2,193],6:[2,193],25:[2,193],26:[2,193],49:[2,193],54:[2,193],57:[2,193],73:[2,193],78:[2,193],86:[2,193],91:[2,193],93:[2,193],102:[2,193],104:[2,193],105:[2,193],106:[2,193],110:[2,193],118:[2,193],126:[2,193],128:[2,193],129:[2,193],132:[2,193],133:[2,193],134:[2,193],135:[2,193],136:[2,193],137:[2,193]},{6:[1,210],8:208,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,209],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:211,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{5:212,25:[1,5],125:[1,213]},{1:[2,133],6:[2,133],25:[2,133],26:[2,133],49:[2,133],54:[2,133],57:[2,133],73:[2,133],78:[2,133],86:[2,133],91:[2,133],93:[2,133],97:214,98:[1,215],99:[1,216],102:[2,133],104:[2,133],105:[2,133],106:[2,133],110:[2,133],118:[2,133],126:[2,133],128:[2,133],129:[2,133],132:[2,133],133:[2,133],134:[2,133],135:[2,133],136:[2,133],137:[2,133]},{1:[2,147],6:[2,147],25:[2,147],26:[2,147],49:[2,147],54:[2,147],57:[2,147],73:[2,147],78:[2,147],86:[2,147],91:[2,147],93:[2,147],102:[2,147],104:[2,147],105:[2,147],106:[2,147],110:[2,147],118:[2,147],126:[2,147],128:[2,147],129:[2,147],132:[2,147],133:[2,147],134:[2,147],135:[2,147],136:[2,147],137:[2,147]},{1:[2,155],6:[2,155],25:[2,155],26:[2,155],49:[2,155],54:[2,155],57:[2,155],73:[2,155],78:[2,155],86:[2,155],91:[2,155],93:[2,155],102:[2,155],104:[2,155],105:[2,155],106:[2,155],110:[2,155],118:[2,155],126:[2,155],128:[2,155],129:[2,155],132:[2,155],133:[2,155],134:[2,155],135:[2,155],136:[2,155],137:[2,155]},{25:[1,217],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{120:218,122:219,123:[1,220]},{1:[2,97],6:[2,97],25:[2,97],26:[2,97],49:[2,97],54:[2,97],57:[2,97],73:[2,97],78:[2,97],86:[2,97],91:[2,97],93:[2,97],102:[2,97],104:[2,97],105:[2,97],106:[2,97],110:[2,97],118:[2,97],126:[2,97],128:[2,97],129:[2,97],132:[2,97],133:[2,97],134:[2,97],135:[2,97],136:[2,97],137:[2,97]},{8:221,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,100],5:222,6:[2,100],25:[1,5],26:[2,100],49:[2,100],54:[2,100],57:[2,100],66:[2,72],67:[2,72],68:[2,72],69:[2,72],71:[2,72],73:[2,100],74:[2,72],78:[2,100],80:[1,223],84:[2,72],85:[2,72],86:[2,100],91:[2,100],93:[2,100],102:[2,100],104:[2,100],105:[2,100],106:[2,100],110:[2,100],118:[2,100],126:[2,100],128:[2,100],129:[2,100],132:[2,100],133:[2,100],134:[2,100],135:[2,100],136:[2,100],137:[2,100]},{1:[2,140],6:[2,140],25:[2,140],26:[2,140],49:[2,140],54:[2,140],57:[2,140],73:[2,140],78:[2,140],86:[2,140],91:[2,140],93:[2,140],102:[2,140],103:87,104:[2,140],105:[2,140],106:[2,140],109:88,110:[2,140],111:69,118:[2,140],126:[2,140],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,46],6:[2,46],26:[2,46],102:[2,46],103:87,104:[2,46],106:[2,46],109:88,110:[2,46],111:69,126:[2,46],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[1,74],102:[1,224]},{4:225,7:4,8:6,9:7,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,129],25:[2,129],54:[2,129],57:[1,227],91:[2,129],92:226,93:[1,193],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,115],6:[2,115],25:[2,115],26:[2,115],40:[2,115],49:[2,115],54:[2,115],57:[2,115],66:[2,115],67:[2,115],68:[2,115],69:[2,115],71:[2,115],73:[2,115],74:[2,115],78:[2,115],84:[2,115],85:[2,115],86:[2,115],91:[2,115],93:[2,115],102:[2,115],104:[2,115],105:[2,115],106:[2,115],110:[2,115],116:[2,115],117:[2,115],118:[2,115],126:[2,115],128:[2,115],129:[2,115],132:[2,115],133:[2,115],134:[2,115],135:[2,115],136:[2,115],137:[2,115]},{6:[2,53],25:[2,53],53:228,54:[1,229],91:[2,53]},{6:[2,124],25:[2,124],26:[2,124],54:[2,124],86:[2,124],91:[2,124]},{8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,147],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],87:230,88:[1,58],89:[1,59],90:[1,57],94:146,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,130],25:[2,130],26:[2,130],54:[2,130],86:[2,130],91:[2,130]},{1:[2,114],6:[2,114],25:[2,114],26:[2,114],40:[2,114],43:[2,114],49:[2,114],54:[2,114],57:[2,114],66:[2,114],67:[2,114],68:[2,114],69:[2,114],71:[2,114],73:[2,114],74:[2,114],78:[2,114],80:[2,114],84:[2,114],85:[2,114],86:[2,114],91:[2,114],93:[2,114],102:[2,114],104:[2,114],105:[2,114],106:[2,114],110:[2,114],116:[2,114],117:[2,114],118:[2,114],126:[2,114],128:[2,114],129:[2,114],130:[2,114],131:[2,114],132:[2,114],133:[2,114],134:[2,114],135:[2,114],136:[2,114],137:[2,114],138:[2,114]},{5:231,25:[1,5],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,143],6:[2,143],25:[2,143],26:[2,143],49:[2,143],54:[2,143],57:[2,143],73:[2,143],78:[2,143],86:[2,143],91:[2,143],93:[2,143],102:[2,143],103:87,104:[1,65],105:[1,232],106:[1,66],109:88,110:[1,68],111:69,118:[2,143],126:[2,143],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,145],6:[2,145],25:[2,145],26:[2,145],49:[2,145],54:[2,145],57:[2,145],73:[2,145],78:[2,145],86:[2,145],91:[2,145],93:[2,145],102:[2,145],103:87,104:[1,65],105:[1,233],106:[1,66],109:88,110:[1,68],111:69,118:[2,145],126:[2,145],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,151],6:[2,151],25:[2,151],26:[2,151],49:[2,151],54:[2,151],57:[2,151],73:[2,151],78:[2,151],86:[2,151],91:[2,151],93:[2,151],102:[2,151],104:[2,151],105:[2,151],106:[2,151],110:[2,151],118:[2,151],126:[2,151],128:[2,151],129:[2,151],132:[2,151],133:[2,151],134:[2,151],135:[2,151],136:[2,151],137:[2,151]},{1:[2,152],6:[2,152],25:[2,152],26:[2,152],49:[2,152],54:[2,152],57:[2,152],73:[2,152],78:[2,152],86:[2,152],91:[2,152],93:[2,152],102:[2,152],103:87,104:[1,65],105:[2,152],106:[1,66],109:88,110:[1,68],111:69,118:[2,152],126:[2,152],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,156],6:[2,156],25:[2,156],26:[2,156],49:[2,156],54:[2,156],57:[2,156],73:[2,156],78:[2,156],86:[2,156],91:[2,156],93:[2,156],102:[2,156],104:[2,156],105:[2,156],106:[2,156],110:[2,156],118:[2,156],126:[2,156],128:[2,156],129:[2,156],132:[2,156],133:[2,156],134:[2,156],135:[2,156],136:[2,156],137:[2,156]},{116:[2,158],117:[2,158]},{27:159,28:[1,73],44:160,58:161,59:162,76:[1,70],89:[1,114],90:[1,115],113:234,115:158},{54:[1,235],116:[2,164],117:[2,164]},{54:[2,160],116:[2,160],117:[2,160]},{54:[2,161],116:[2,161],117:[2,161]},{54:[2,162],116:[2,162],117:[2,162]},{54:[2,163],116:[2,163],117:[2,163]},{1:[2,157],6:[2,157],25:[2,157],26:[2,157],49:[2,157],54:[2,157],57:[2,157],73:[2,157],78:[2,157],86:[2,157],91:[2,157],93:[2,157],102:[2,157],104:[2,157],105:[2,157],106:[2,157],110:[2,157],118:[2,157],126:[2,157],128:[2,157],129:[2,157],132:[2,157],133:[2,157],134:[2,157],135:[2,157],136:[2,157],137:[2,157]},{8:236,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:237,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,53],25:[2,53],53:238,54:[1,239],78:[2,53]},{6:[2,92],25:[2,92],26:[2,92],54:[2,92],78:[2,92]},{6:[2,39],25:[2,39],26:[2,39],43:[1,240],54:[2,39],78:[2,39]},{6:[2,42],25:[2,42],26:[2,42],54:[2,42],78:[2,42]},{6:[2,43],25:[2,43],26:[2,43],43:[2,43],54:[2,43],78:[2,43]},{6:[2,44],25:[2,44],26:[2,44],43:[2,44],54:[2,44],78:[2,44]},{6:[2,45],25:[2,45],26:[2,45],43:[2,45],54:[2,45],78:[2,45]},{1:[2,5],6:[2,5],26:[2,5],102:[2,5]},{1:[2,25],6:[2,25],25:[2,25],26:[2,25],49:[2,25],54:[2,25],57:[2,25],73:[2,25],78:[2,25],86:[2,25],91:[2,25],93:[2,25],98:[2,25],99:[2,25],102:[2,25],104:[2,25],105:[2,25],106:[2,25],110:[2,25],118:[2,25],121:[2,25],123:[2,25],126:[2,25],128:[2,25],129:[2,25],132:[2,25],133:[2,25],134:[2,25],135:[2,25],136:[2,25],137:[2,25]},{1:[2,195],6:[2,195],25:[2,195],26:[2,195],49:[2,195],54:[2,195],57:[2,195],73:[2,195],78:[2,195],86:[2,195],91:[2,195],93:[2,195],102:[2,195],103:87,104:[2,195],105:[2,195],106:[2,195],109:88,110:[2,195],111:69,118:[2,195],126:[2,195],128:[2,195],129:[2,195],132:[1,78],133:[1,81],134:[2,195],135:[2,195],136:[2,195],137:[2,195]},{1:[2,196],6:[2,196],25:[2,196],26:[2,196],49:[2,196],54:[2,196],57:[2,196],73:[2,196],78:[2,196],86:[2,196],91:[2,196],93:[2,196],102:[2,196],103:87,104:[2,196],105:[2,196],106:[2,196],109:88,110:[2,196],111:69,118:[2,196],126:[2,196],128:[2,196],129:[2,196],132:[1,78],133:[1,81],134:[2,196],135:[2,196],136:[2,196],137:[2,196]},{1:[2,197],6:[2,197],25:[2,197],26:[2,197],49:[2,197],54:[2,197],57:[2,197],73:[2,197],78:[2,197],86:[2,197],91:[2,197],93:[2,197],102:[2,197],103:87,104:[2,197],105:[2,197],106:[2,197],109:88,110:[2,197],111:69,118:[2,197],126:[2,197],128:[2,197],129:[2,197],132:[1,78],133:[2,197],134:[2,197],135:[2,197],136:[2,197],137:[2,197]},{1:[2,198],6:[2,198],25:[2,198],26:[2,198],49:[2,198],54:[2,198],57:[2,198],73:[2,198],78:[2,198],86:[2,198],91:[2,198],93:[2,198],102:[2,198],103:87,104:[2,198],105:[2,198],106:[2,198],109:88,110:[2,198],111:69,118:[2,198],126:[2,198],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[2,198],135:[2,198],136:[2,198],137:[2,198]},{1:[2,199],6:[2,199],25:[2,199],26:[2,199],49:[2,199],54:[2,199],57:[2,199],73:[2,199],78:[2,199],86:[2,199],91:[2,199],93:[2,199],102:[2,199],103:87,104:[2,199],105:[2,199],106:[2,199],109:88,110:[2,199],111:69,118:[2,199],126:[2,199],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[2,199],136:[2,199],137:[1,85]},{1:[2,200],6:[2,200],25:[2,200],26:[2,200],49:[2,200],54:[2,200],57:[2,200],73:[2,200],78:[2,200],86:[2,200],91:[2,200],93:[2,200],102:[2,200],103:87,104:[2,200],105:[2,200],106:[2,200],109:88,110:[2,200],111:69,118:[2,200],126:[2,200],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[2,200],137:[1,85]},{1:[2,201],6:[2,201],25:[2,201],26:[2,201],49:[2,201],54:[2,201],57:[2,201],73:[2,201],78:[2,201],86:[2,201],91:[2,201],93:[2,201],102:[2,201],103:87,104:[2,201],105:[2,201],106:[2,201],109:88,110:[2,201],111:69,118:[2,201],126:[2,201],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[2,201],136:[2,201],137:[2,201]},{1:[2,186],6:[2,186],25:[2,186],26:[2,186],49:[2,186],54:[2,186],57:[2,186],73:[2,186],78:[2,186],86:[2,186],91:[2,186],93:[2,186],102:[2,186],103:87,104:[1,65],105:[2,186],106:[1,66],109:88,110:[1,68],111:69,118:[2,186],126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,185],6:[2,185],25:[2,185],26:[2,185],49:[2,185],54:[2,185],57:[2,185],73:[2,185],78:[2,185],86:[2,185],91:[2,185],93:[2,185],102:[2,185],103:87,104:[1,65],105:[2,185],106:[1,66],109:88,110:[1,68],111:69,118:[2,185],126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,104],6:[2,104],25:[2,104],26:[2,104],49:[2,104],54:[2,104],57:[2,104],66:[2,104],67:[2,104],68:[2,104],69:[2,104],71:[2,104],73:[2,104],74:[2,104],78:[2,104],84:[2,104],85:[2,104],86:[2,104],91:[2,104],93:[2,104],102:[2,104],104:[2,104],105:[2,104],106:[2,104],110:[2,104],118:[2,104],126:[2,104],128:[2,104],129:[2,104],132:[2,104],133:[2,104],134:[2,104],135:[2,104],136:[2,104],137:[2,104]},{1:[2,80],6:[2,80],25:[2,80],26:[2,80],40:[2,80],49:[2,80],54:[2,80],57:[2,80],66:[2,80],67:[2,80],68:[2,80],69:[2,80],71:[2,80],73:[2,80],74:[2,80],78:[2,80],80:[2,80],84:[2,80],85:[2,80],86:[2,80],91:[2,80],93:[2,80],102:[2,80],104:[2,80],105:[2,80],106:[2,80],110:[2,80],118:[2,80],126:[2,80],128:[2,80],129:[2,80],130:[2,80],131:[2,80],132:[2,80],133:[2,80],134:[2,80],135:[2,80],136:[2,80],137:[2,80],138:[2,80]},{1:[2,81],6:[2,81],25:[2,81],26:[2,81],40:[2,81],49:[2,81],54:[2,81],57:[2,81],66:[2,81],67:[2,81],68:[2,81],69:[2,81],71:[2,81],73:[2,81],74:[2,81],78:[2,81],80:[2,81],84:[2,81],85:[2,81],86:[2,81],91:[2,81],93:[2,81],102:[2,81],104:[2,81],105:[2,81],106:[2,81],110:[2,81],118:[2,81],126:[2,81],128:[2,81],129:[2,81],130:[2,81],131:[2,81],132:[2,81],133:[2,81],134:[2,81],135:[2,81],136:[2,81],137:[2,81],138:[2,81]},{1:[2,82],6:[2,82],25:[2,82],26:[2,82],40:[2,82],49:[2,82],54:[2,82],57:[2,82],66:[2,82],67:[2,82],68:[2,82],69:[2,82],71:[2,82],73:[2,82],74:[2,82],78:[2,82],80:[2,82],84:[2,82],85:[2,82],86:[2,82],91:[2,82],93:[2,82],102:[2,82],104:[2,82],105:[2,82],106:[2,82],110:[2,82],118:[2,82],126:[2,82],128:[2,82],129:[2,82],130:[2,82],131:[2,82],132:[2,82],133:[2,82],134:[2,82],135:[2,82],136:[2,82],137:[2,82],138:[2,82]},{1:[2,83],6:[2,83],25:[2,83],26:[2,83],40:[2,83],49:[2,83],54:[2,83],57:[2,83],66:[2,83],67:[2,83],68:[2,83],69:[2,83],71:[2,83],73:[2,83],74:[2,83],78:[2,83],80:[2,83],84:[2,83],85:[2,83],86:[2,83],91:[2,83],93:[2,83],102:[2,83],104:[2,83],105:[2,83],106:[2,83],110:[2,83],118:[2,83],126:[2,83],128:[2,83],129:[2,83],130:[2,83],131:[2,83],132:[2,83],133:[2,83],134:[2,83],135:[2,83],136:[2,83],137:[2,83],138:[2,83]},{73:[1,241]},{57:[1,194],73:[2,88],92:242,93:[1,193],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{73:[2,89]},{8:243,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,73:[2,123],76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{12:[2,117],28:[2,117],30:[2,117],31:[2,117],33:[2,117],34:[2,117],35:[2,117],36:[2,117],37:[2,117],38:[2,117],45:[2,117],46:[2,117],47:[2,117],51:[2,117],52:[2,117],73:[2,117],76:[2,117],79:[2,117],83:[2,117],88:[2,117],89:[2,117],90:[2,117],96:[2,117],100:[2,117],101:[2,117],104:[2,117],106:[2,117],108:[2,117],110:[2,117],119:[2,117],125:[2,117],127:[2,117],128:[2,117],129:[2,117],130:[2,117],131:[2,117]},{12:[2,118],28:[2,118],30:[2,118],31:[2,118],33:[2,118],34:[2,118],35:[2,118],36:[2,118],37:[2,118],38:[2,118],45:[2,118],46:[2,118],47:[2,118],51:[2,118],52:[2,118],73:[2,118],76:[2,118],79:[2,118],83:[2,118],88:[2,118],89:[2,118],90:[2,118],96:[2,118],100:[2,118],101:[2,118],104:[2,118],106:[2,118],108:[2,118],110:[2,118],119:[2,118],125:[2,118],127:[2,118],128:[2,118],129:[2,118],130:[2,118],131:[2,118]},{1:[2,87],6:[2,87],25:[2,87],26:[2,87],40:[2,87],49:[2,87],54:[2,87],57:[2,87],66:[2,87],67:[2,87],68:[2,87],69:[2,87],71:[2,87],73:[2,87],74:[2,87],78:[2,87],80:[2,87],84:[2,87],85:[2,87],86:[2,87],91:[2,87],93:[2,87],102:[2,87],104:[2,87],105:[2,87],106:[2,87],110:[2,87],118:[2,87],126:[2,87],128:[2,87],129:[2,87],130:[2,87],131:[2,87],132:[2,87],133:[2,87],134:[2,87],135:[2,87],136:[2,87],137:[2,87],138:[2,87]},{1:[2,105],6:[2,105],25:[2,105],26:[2,105],49:[2,105],54:[2,105],57:[2,105],66:[2,105],67:[2,105],68:[2,105],69:[2,105],71:[2,105],73:[2,105],74:[2,105],78:[2,105],84:[2,105],85:[2,105],86:[2,105],91:[2,105],93:[2,105],102:[2,105],104:[2,105],105:[2,105],106:[2,105],110:[2,105],118:[2,105],126:[2,105],128:[2,105],129:[2,105],132:[2,105],133:[2,105],134:[2,105],135:[2,105],136:[2,105],137:[2,105]},{1:[2,36],6:[2,36],25:[2,36],26:[2,36],49:[2,36],54:[2,36],57:[2,36],73:[2,36],78:[2,36],86:[2,36],91:[2,36],93:[2,36],102:[2,36],103:87,104:[2,36],105:[2,36],106:[2,36],109:88,110:[2,36],111:69,118:[2,36],126:[2,36],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{8:244,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:245,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,110],6:[2,110],25:[2,110],26:[2,110],49:[2,110],54:[2,110],57:[2,110],66:[2,110],67:[2,110],68:[2,110],69:[2,110],71:[2,110],73:[2,110],74:[2,110],78:[2,110],84:[2,110],85:[2,110],86:[2,110],91:[2,110],93:[2,110],102:[2,110],104:[2,110],105:[2,110],106:[2,110],110:[2,110],118:[2,110],126:[2,110],128:[2,110],129:[2,110],132:[2,110],133:[2,110],134:[2,110],135:[2,110],136:[2,110],137:[2,110]},{6:[2,53],25:[2,53],53:246,54:[1,229],86:[2,53]},{6:[2,129],25:[2,129],26:[2,129],54:[2,129],57:[1,247],86:[2,129],91:[2,129],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{50:248,51:[1,60],52:[1,61]},{6:[2,54],25:[2,54],26:[2,54],27:110,28:[1,73],44:111,55:249,56:109,58:112,59:113,76:[1,70],89:[1,114],90:[1,115]},{6:[1,250],25:[1,251]},{6:[2,61],25:[2,61],26:[2,61],49:[2,61],54:[2,61]},{8:252,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,202],6:[2,202],25:[2,202],26:[2,202],49:[2,202],54:[2,202],57:[2,202],73:[2,202],78:[2,202],86:[2,202],91:[2,202],93:[2,202],102:[2,202],103:87,104:[2,202],105:[2,202],106:[2,202],109:88,110:[2,202],111:69,118:[2,202],126:[2,202],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{8:253,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:254,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,205],6:[2,205],25:[2,205],26:[2,205],49:[2,205],54:[2,205],57:[2,205],73:[2,205],78:[2,205],86:[2,205],91:[2,205],93:[2,205],102:[2,205],103:87,104:[2,205],105:[2,205],106:[2,205],109:88,110:[2,205],111:69,118:[2,205],126:[2,205],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,184],6:[2,184],25:[2,184],26:[2,184],49:[2,184],54:[2,184],57:[2,184],73:[2,184],78:[2,184],86:[2,184],91:[2,184],93:[2,184],102:[2,184],104:[2,184],105:[2,184],106:[2,184],110:[2,184],118:[2,184],126:[2,184],128:[2,184],129:[2,184],132:[2,184],133:[2,184],134:[2,184],135:[2,184],136:[2,184],137:[2,184]},{8:255,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,134],6:[2,134],25:[2,134],26:[2,134],49:[2,134],54:[2,134],57:[2,134],73:[2,134],78:[2,134],86:[2,134],91:[2,134],93:[2,134],98:[1,256],102:[2,134],104:[2,134],105:[2,134],106:[2,134],110:[2,134],118:[2,134],126:[2,134],128:[2,134],129:[2,134],132:[2,134],133:[2,134],134:[2,134],135:[2,134],136:[2,134],137:[2,134]},{5:257,25:[1,5]},{5:260,25:[1,5],27:258,28:[1,73],59:259,76:[1,70]},{120:261,122:219,123:[1,220]},{26:[1,262],121:[1,263],122:264,123:[1,220]},{26:[2,177],121:[2,177],123:[2,177]},{8:266,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],95:265,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,98],5:267,6:[2,98],25:[1,5],26:[2,98],49:[2,98],54:[2,98],57:[2,98],73:[2,98],78:[2,98],86:[2,98],91:[2,98],93:[2,98],102:[2,98],103:87,104:[1,65],105:[2,98],106:[1,66],109:88,110:[1,68],111:69,118:[2,98],126:[2,98],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,101],6:[2,101],25:[2,101],26:[2,101],49:[2,101],54:[2,101],57:[2,101],73:[2,101],78:[2,101],86:[2,101],91:[2,101],93:[2,101],102:[2,101],104:[2,101],105:[2,101],106:[2,101],110:[2,101],118:[2,101],126:[2,101],128:[2,101],129:[2,101],132:[2,101],133:[2,101],134:[2,101],135:[2,101],136:[2,101],137:[2,101]},{8:268,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,141],6:[2,141],25:[2,141],26:[2,141],49:[2,141],54:[2,141],57:[2,141],66:[2,141],67:[2,141],68:[2,141],69:[2,141],71:[2,141],73:[2,141],74:[2,141],78:[2,141],84:[2,141],85:[2,141],86:[2,141],91:[2,141],93:[2,141],102:[2,141],104:[2,141],105:[2,141],106:[2,141],110:[2,141],118:[2,141],126:[2,141],128:[2,141],129:[2,141],132:[2,141],133:[2,141],134:[2,141],135:[2,141],136:[2,141],137:[2,141]},{6:[1,74],26:[1,269]},{8:270,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,67],12:[2,118],25:[2,67],28:[2,118],30:[2,118],31:[2,118],33:[2,118],34:[2,118],35:[2,118],36:[2,118],37:[2,118],38:[2,118],45:[2,118],46:[2,118],47:[2,118],51:[2,118],52:[2,118],54:[2,67],76:[2,118],79:[2,118],83:[2,118],88:[2,118],89:[2,118],90:[2,118],91:[2,67],96:[2,118],100:[2,118],101:[2,118],104:[2,118],106:[2,118],108:[2,118],110:[2,118],119:[2,118],125:[2,118],127:[2,118],128:[2,118],129:[2,118],130:[2,118],131:[2,118]},{6:[1,272],25:[1,273],91:[1,271]},{6:[2,54],8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[2,54],26:[2,54],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],86:[2,54],88:[1,58],89:[1,59],90:[1,57],91:[2,54],94:274,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,53],25:[2,53],26:[2,53],53:275,54:[1,229]},{1:[2,181],6:[2,181],25:[2,181],26:[2,181],49:[2,181],54:[2,181],57:[2,181],73:[2,181],78:[2,181],86:[2,181],91:[2,181],93:[2,181],102:[2,181],104:[2,181],105:[2,181],106:[2,181],110:[2,181],118:[2,181],121:[2,181],126:[2,181],128:[2,181],129:[2,181],132:[2,181],133:[2,181],134:[2,181],135:[2,181],136:[2,181],137:[2,181]},{8:276,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:277,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{116:[2,159],117:[2,159]},{27:159,28:[1,73],44:160,58:161,59:162,76:[1,70],89:[1,114],90:[1,115],115:278},{1:[2,166],6:[2,166],25:[2,166],26:[2,166],49:[2,166],54:[2,166],57:[2,166],73:[2,166],78:[2,166],86:[2,166],91:[2,166],93:[2,166],102:[2,166],103:87,104:[2,166],105:[1,279],106:[2,166],109:88,110:[2,166],111:69,118:[1,280],126:[2,166],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,167],6:[2,167],25:[2,167],26:[2,167],49:[2,167],54:[2,167],57:[2,167],73:[2,167],78:[2,167],86:[2,167],91:[2,167],93:[2,167],102:[2,167],103:87,104:[2,167],105:[1,281],106:[2,167],109:88,110:[2,167],111:69,118:[2,167],126:[2,167],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[1,283],25:[1,284],78:[1,282]},{6:[2,54],11:169,25:[2,54],26:[2,54],27:170,28:[1,73],29:171,30:[1,71],31:[1,72],41:285,42:168,44:172,46:[1,46],78:[2,54],89:[1,114]},{8:286,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,287],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,86],6:[2,86],25:[2,86],26:[2,86],40:[2,86],49:[2,86],54:[2,86],57:[2,86],66:[2,86],67:[2,86],68:[2,86],69:[2,86],71:[2,86],73:[2,86],74:[2,86],78:[2,86],80:[2,86],84:[2,86],85:[2,86],86:[2,86],91:[2,86],93:[2,86],102:[2,86],104:[2,86],105:[2,86],106:[2,86],110:[2,86],118:[2,86],126:[2,86],128:[2,86],129:[2,86],130:[2,86],131:[2,86],132:[2,86],133:[2,86],134:[2,86],135:[2,86],136:[2,86],137:[2,86],138:[2,86]},{8:288,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,73:[2,121],76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{73:[2,122],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,37],6:[2,37],25:[2,37],26:[2,37],49:[2,37],54:[2,37],57:[2,37],73:[2,37],78:[2,37],86:[2,37],91:[2,37],93:[2,37],102:[2,37],103:87,104:[2,37],105:[2,37],106:[2,37],109:88,110:[2,37],111:69,118:[2,37],126:[2,37],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{26:[1,289],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[1,272],25:[1,273],86:[1,290]},{6:[2,67],25:[2,67],26:[2,67],54:[2,67],86:[2,67],91:[2,67]},{5:291,25:[1,5]},{6:[2,57],25:[2,57],26:[2,57],49:[2,57],54:[2,57]},{27:110,28:[1,73],44:111,55:292,56:109,58:112,59:113,76:[1,70],89:[1,114],90:[1,115]},{6:[2,55],25:[2,55],26:[2,55],27:110,28:[1,73],44:111,48:293,54:[2,55],55:108,56:109,58:112,59:113,76:[1,70],89:[1,114],90:[1,115]},{6:[2,62],25:[2,62],26:[2,62],49:[2,62],54:[2,62],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{26:[1,294],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,204],6:[2,204],25:[2,204],26:[2,204],49:[2,204],54:[2,204],57:[2,204],73:[2,204],78:[2,204],86:[2,204],91:[2,204],93:[2,204],102:[2,204],103:87,104:[2,204],105:[2,204],106:[2,204],109:88,110:[2,204],111:69,118:[2,204],126:[2,204],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{5:295,25:[1,5],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{5:296,25:[1,5]},{1:[2,135],6:[2,135],25:[2,135],26:[2,135],49:[2,135],54:[2,135],57:[2,135],73:[2,135],78:[2,135],86:[2,135],91:[2,135],93:[2,135],102:[2,135],104:[2,135],105:[2,135],106:[2,135],110:[2,135],118:[2,135],126:[2,135],128:[2,135],129:[2,135],132:[2,135],133:[2,135],134:[2,135],135:[2,135],136:[2,135],137:[2,135]},{5:297,25:[1,5]},{5:298,25:[1,5]},{1:[2,139],6:[2,139],25:[2,139],26:[2,139],49:[2,139],54:[2,139],57:[2,139],73:[2,139],78:[2,139],86:[2,139],91:[2,139],93:[2,139],98:[2,139],102:[2,139],104:[2,139],105:[2,139],106:[2,139],110:[2,139],118:[2,139],126:[2,139],128:[2,139],129:[2,139],132:[2,139],133:[2,139],134:[2,139],135:[2,139],136:[2,139],137:[2,139]},{26:[1,299],121:[1,300],122:264,123:[1,220]},{1:[2,175],6:[2,175],25:[2,175],26:[2,175],49:[2,175],54:[2,175],57:[2,175],73:[2,175],78:[2,175],86:[2,175],91:[2,175],93:[2,175],102:[2,175],104:[2,175],105:[2,175],106:[2,175],110:[2,175],118:[2,175],126:[2,175],128:[2,175],129:[2,175],132:[2,175],133:[2,175],134:[2,175],135:[2,175],136:[2,175],137:[2,175]},{5:301,25:[1,5]},{26:[2,178],121:[2,178],123:[2,178]},{5:302,25:[1,5],54:[1,303]},{25:[2,131],54:[2,131],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,99],6:[2,99],25:[2,99],26:[2,99],49:[2,99],54:[2,99],57:[2,99],73:[2,99],78:[2,99],86:[2,99],91:[2,99],93:[2,99],102:[2,99],104:[2,99],105:[2,99],106:[2,99],110:[2,99],118:[2,99],126:[2,99],128:[2,99],129:[2,99],132:[2,99],133:[2,99],134:[2,99],135:[2,99],136:[2,99],137:[2,99]},{1:[2,102],5:304,6:[2,102],25:[1,5],26:[2,102],49:[2,102],54:[2,102],57:[2,102],73:[2,102],78:[2,102],86:[2,102],91:[2,102],93:[2,102],102:[2,102],103:87,104:[1,65],105:[2,102],106:[1,66],109:88,110:[1,68],111:69,118:[2,102],126:[2,102],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{102:[1,305]},{91:[1,306],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,116],6:[2,116],25:[2,116],26:[2,116],40:[2,116],49:[2,116],54:[2,116],57:[2,116],66:[2,116],67:[2,116],68:[2,116],69:[2,116],71:[2,116],73:[2,116],74:[2,116],78:[2,116],84:[2,116],85:[2,116],86:[2,116],91:[2,116],93:[2,116],102:[2,116],104:[2,116],105:[2,116],106:[2,116],110:[2,116],116:[2,116],117:[2,116],118:[2,116],126:[2,116],128:[2,116],129:[2,116],132:[2,116],133:[2,116],134:[2,116],135:[2,116],136:[2,116],137:[2,116]},{8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],94:307,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:202,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,25:[1,147],27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,60:148,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],87:308,88:[1,58],89:[1,59],90:[1,57],94:146,96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[2,125],25:[2,125],26:[2,125],54:[2,125],86:[2,125],91:[2,125]},{6:[1,272],25:[1,273],26:[1,309]},{1:[2,144],6:[2,144],25:[2,144],26:[2,144],49:[2,144],54:[2,144],57:[2,144],73:[2,144],78:[2,144],86:[2,144],91:[2,144],93:[2,144],102:[2,144],103:87,104:[1,65],105:[2,144],106:[1,66],109:88,110:[1,68],111:69,118:[2,144],126:[2,144],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,146],6:[2,146],25:[2,146],26:[2,146],49:[2,146],54:[2,146],57:[2,146],73:[2,146],78:[2,146],86:[2,146],91:[2,146],93:[2,146],102:[2,146],103:87,104:[1,65],105:[2,146],106:[1,66],109:88,110:[1,68],111:69,118:[2,146],126:[2,146],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{116:[2,165],117:[2,165]},{8:310,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:311,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:312,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,90],6:[2,90],25:[2,90],26:[2,90],40:[2,90],49:[2,90],54:[2,90],57:[2,90],66:[2,90],67:[2,90],68:[2,90],69:[2,90],71:[2,90],73:[2,90],74:[2,90],78:[2,90],84:[2,90],85:[2,90],86:[2,90],91:[2,90],93:[2,90],102:[2,90],104:[2,90],105:[2,90],106:[2,90],110:[2,90],116:[2,90],117:[2,90],118:[2,90],126:[2,90],128:[2,90],129:[2,90],132:[2,90],133:[2,90],134:[2,90],135:[2,90],136:[2,90],137:[2,90]},{11:169,27:170,28:[1,73],29:171,30:[1,71],31:[1,72],41:313,42:168,44:172,46:[1,46],89:[1,114]},{6:[2,91],11:169,25:[2,91],26:[2,91],27:170,28:[1,73],29:171,30:[1,71],31:[1,72],41:167,42:168,44:172,46:[1,46],54:[2,91],77:314,89:[1,114]},{6:[2,93],25:[2,93],26:[2,93],54:[2,93],78:[2,93]},{6:[2,40],25:[2,40],26:[2,40],54:[2,40],78:[2,40],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{8:315,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{73:[2,120],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,38],6:[2,38],25:[2,38],26:[2,38],49:[2,38],54:[2,38],57:[2,38],73:[2,38],78:[2,38],86:[2,38],91:[2,38],93:[2,38],102:[2,38],104:[2,38],105:[2,38],106:[2,38],110:[2,38],118:[2,38],126:[2,38],128:[2,38],129:[2,38],132:[2,38],133:[2,38],134:[2,38],135:[2,38],136:[2,38],137:[2,38]},{1:[2,111],6:[2,111],25:[2,111],26:[2,111],49:[2,111],54:[2,111],57:[2,111],66:[2,111],67:[2,111],68:[2,111],69:[2,111],71:[2,111],73:[2,111],74:[2,111],78:[2,111],84:[2,111],85:[2,111],86:[2,111],91:[2,111],93:[2,111],102:[2,111],104:[2,111],105:[2,111],106:[2,111],110:[2,111],118:[2,111],126:[2,111],128:[2,111],129:[2,111],132:[2,111],133:[2,111],134:[2,111],135:[2,111],136:[2,111],137:[2,111]},{1:[2,49],6:[2,49],25:[2,49],26:[2,49],49:[2,49],54:[2,49],57:[2,49],73:[2,49],78:[2,49],86:[2,49],91:[2,49],93:[2,49],102:[2,49],104:[2,49],105:[2,49],106:[2,49],110:[2,49],118:[2,49],126:[2,49],128:[2,49],129:[2,49],132:[2,49],133:[2,49],134:[2,49],135:[2,49],136:[2,49],137:[2,49]},{6:[2,58],25:[2,58],26:[2,58],49:[2,58],54:[2,58]},{6:[2,53],25:[2,53],26:[2,53],53:316,54:[1,204]},{1:[2,203],6:[2,203],25:[2,203],26:[2,203],49:[2,203],54:[2,203],57:[2,203],73:[2,203],78:[2,203],86:[2,203],91:[2,203],93:[2,203],102:[2,203],104:[2,203],105:[2,203],106:[2,203],110:[2,203],118:[2,203],126:[2,203],128:[2,203],129:[2,203],132:[2,203],133:[2,203],134:[2,203],135:[2,203],136:[2,203],137:[2,203]},{1:[2,182],6:[2,182],25:[2,182],26:[2,182],49:[2,182],54:[2,182],57:[2,182],73:[2,182],78:[2,182],86:[2,182],91:[2,182],93:[2,182],102:[2,182],104:[2,182],105:[2,182],106:[2,182],110:[2,182],118:[2,182],121:[2,182],126:[2,182],128:[2,182],129:[2,182],132:[2,182],133:[2,182],134:[2,182],135:[2,182],136:[2,182],137:[2,182]},{1:[2,136],6:[2,136],25:[2,136],26:[2,136],49:[2,136],54:[2,136],57:[2,136],73:[2,136],78:[2,136],86:[2,136],91:[2,136],93:[2,136],102:[2,136],104:[2,136],105:[2,136],106:[2,136],110:[2,136],118:[2,136],126:[2,136],128:[2,136],129:[2,136],132:[2,136],133:[2,136],134:[2,136],135:[2,136],136:[2,136],137:[2,136]},{1:[2,137],6:[2,137],25:[2,137],26:[2,137],49:[2,137],54:[2,137],57:[2,137],73:[2,137],78:[2,137],86:[2,137],91:[2,137],93:[2,137],98:[2,137],102:[2,137],104:[2,137],105:[2,137],106:[2,137],110:[2,137],118:[2,137],126:[2,137],128:[2,137],129:[2,137],132:[2,137],133:[2,137],134:[2,137],135:[2,137],136:[2,137],137:[2,137]},{1:[2,138],6:[2,138],25:[2,138],26:[2,138],49:[2,138],54:[2,138],57:[2,138],73:[2,138],78:[2,138],86:[2,138],91:[2,138],93:[2,138],98:[2,138],102:[2,138],104:[2,138],105:[2,138],106:[2,138],110:[2,138],118:[2,138],126:[2,138],128:[2,138],129:[2,138],132:[2,138],133:[2,138],134:[2,138],135:[2,138],136:[2,138],137:[2,138]},{1:[2,173],6:[2,173],25:[2,173],26:[2,173],49:[2,173],54:[2,173],57:[2,173],73:[2,173],78:[2,173],86:[2,173],91:[2,173],93:[2,173],102:[2,173],104:[2,173],105:[2,173],106:[2,173],110:[2,173],118:[2,173],126:[2,173],128:[2,173],129:[2,173],132:[2,173],133:[2,173],134:[2,173],135:[2,173],136:[2,173],137:[2,173]},{5:317,25:[1,5]},{26:[1,318]},{6:[1,319],26:[2,179],121:[2,179],123:[2,179]},{8:320,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{1:[2,103],6:[2,103],25:[2,103],26:[2,103],49:[2,103],54:[2,103],57:[2,103],73:[2,103],78:[2,103],86:[2,103],91:[2,103],93:[2,103],102:[2,103],104:[2,103],105:[2,103],106:[2,103],110:[2,103],118:[2,103],126:[2,103],128:[2,103],129:[2,103],132:[2,103],133:[2,103],134:[2,103],135:[2,103],136:[2,103],137:[2,103]},{1:[2,142],6:[2,142],25:[2,142],26:[2,142],49:[2,142],54:[2,142],57:[2,142],66:[2,142],67:[2,142],68:[2,142],69:[2,142],71:[2,142],73:[2,142],74:[2,142],78:[2,142],84:[2,142],85:[2,142],86:[2,142],91:[2,142],93:[2,142],102:[2,142],104:[2,142],105:[2,142],106:[2,142],110:[2,142],118:[2,142],126:[2,142],128:[2,142],129:[2,142],132:[2,142],133:[2,142],134:[2,142],135:[2,142],136:[2,142],137:[2,142]},{1:[2,119],6:[2,119],25:[2,119],26:[2,119],49:[2,119],54:[2,119],57:[2,119],66:[2,119],67:[2,119],68:[2,119],69:[2,119],71:[2,119],73:[2,119],74:[2,119],78:[2,119],84:[2,119],85:[2,119],86:[2,119],91:[2,119],93:[2,119],102:[2,119],104:[2,119],105:[2,119],106:[2,119],110:[2,119],118:[2,119],126:[2,119],128:[2,119],129:[2,119],132:[2,119],133:[2,119],134:[2,119],135:[2,119],136:[2,119],137:[2,119]},{6:[2,126],25:[2,126],26:[2,126],54:[2,126],86:[2,126],91:[2,126]},{6:[2,53],25:[2,53],26:[2,53],53:321,54:[1,229]},{6:[2,127],25:[2,127],26:[2,127],54:[2,127],86:[2,127],91:[2,127]},{1:[2,168],6:[2,168],25:[2,168],26:[2,168],49:[2,168],54:[2,168],57:[2,168],73:[2,168],78:[2,168],86:[2,168],91:[2,168],93:[2,168],102:[2,168],103:87,104:[2,168],105:[2,168],106:[2,168],109:88,110:[2,168],111:69,118:[1,322],126:[2,168],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,170],6:[2,170],25:[2,170],26:[2,170],49:[2,170],54:[2,170],57:[2,170],73:[2,170],78:[2,170],86:[2,170],91:[2,170],93:[2,170],102:[2,170],103:87,104:[2,170],105:[1,323],106:[2,170],109:88,110:[2,170],111:69,118:[2,170],126:[2,170],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,169],6:[2,169],25:[2,169],26:[2,169],49:[2,169],54:[2,169],57:[2,169],73:[2,169],78:[2,169],86:[2,169],91:[2,169],93:[2,169],102:[2,169],103:87,104:[2,169],105:[2,169],106:[2,169],109:88,110:[2,169],111:69,118:[2,169],126:[2,169],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[2,94],25:[2,94],26:[2,94],54:[2,94],78:[2,94]},{6:[2,53],25:[2,53],26:[2,53],53:324,54:[1,239]},{26:[1,325],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[1,250],25:[1,251],26:[1,326]},{26:[1,327]},{1:[2,176],6:[2,176],25:[2,176],26:[2,176],49:[2,176],54:[2,176],57:[2,176],73:[2,176],78:[2,176],86:[2,176],91:[2,176],93:[2,176],102:[2,176],104:[2,176],105:[2,176],106:[2,176],110:[2,176],118:[2,176],126:[2,176],128:[2,176],129:[2,176],132:[2,176],133:[2,176],134:[2,176],135:[2,176],136:[2,176],137:[2,176]},{26:[2,180],121:[2,180],123:[2,180]},{25:[2,132],54:[2,132],103:87,104:[1,65],106:[1,66],109:88,110:[1,68],111:69,126:[1,86],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[1,272],25:[1,273],26:[1,328]},{8:329,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{8:330,9:118,10:20,11:21,12:[1,22],13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:16,22:17,23:18,24:19,27:62,28:[1,73],29:49,30:[1,71],31:[1,72],32:24,33:[1,50],34:[1,51],35:[1,52],36:[1,53],37:[1,54],38:[1,55],39:23,44:63,45:[1,45],46:[1,46],47:[1,29],50:30,51:[1,60],52:[1,61],58:47,59:48,61:36,63:25,64:26,65:27,76:[1,70],79:[1,43],83:[1,28],88:[1,58],89:[1,59],90:[1,57],96:[1,38],100:[1,44],101:[1,56],103:39,104:[1,65],106:[1,66],107:40,108:[1,67],109:41,110:[1,68],111:69,119:[1,42],124:37,125:[1,64],127:[1,31],128:[1,32],129:[1,33],130:[1,34],131:[1,35]},{6:[1,283],25:[1,284],26:[1,331]},{6:[2,41],25:[2,41],26:[2,41],54:[2,41],78:[2,41]},{6:[2,59],25:[2,59],26:[2,59],49:[2,59],54:[2,59]},{1:[2,174],6:[2,174],25:[2,174],26:[2,174],49:[2,174],54:[2,174],57:[2,174],73:[2,174],78:[2,174],86:[2,174],91:[2,174],93:[2,174],102:[2,174],104:[2,174],105:[2,174],106:[2,174],110:[2,174],118:[2,174],126:[2,174],128:[2,174],129:[2,174],132:[2,174],133:[2,174],134:[2,174],135:[2,174],136:[2,174],137:[2,174]},{6:[2,128],25:[2,128],26:[2,128],54:[2,128],86:[2,128],91:[2,128]},{1:[2,171],6:[2,171],25:[2,171],26:[2,171],49:[2,171],54:[2,171],57:[2,171],73:[2,171],78:[2,171],86:[2,171],91:[2,171],93:[2,171],102:[2,171],103:87,104:[2,171],105:[2,171],106:[2,171],109:88,110:[2,171],111:69,118:[2,171],126:[2,171],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{1:[2,172],6:[2,172],25:[2,172],26:[2,172],49:[2,172],54:[2,172],57:[2,172],73:[2,172],78:[2,172],86:[2,172],91:[2,172],93:[2,172],102:[2,172],103:87,104:[2,172],105:[2,172],106:[2,172],109:88,110:[2,172],111:69,118:[2,172],126:[2,172],128:[1,80],129:[1,79],132:[1,78],133:[1,81],134:[1,82],135:[1,83],136:[1,84],137:[1,85]},{6:[2,95],25:[2,95],26:[2,95],54:[2,95],78:[2,95]}],defaultActions:{60:[2,51],61:[2,52],75:[2,3],94:[2,109],191:[2,89]},parseError:function(e){throw new Error(e)
},parse:function(e){function t(){var e;return e=n.lexer.lex()||1,"number"!=typeof e&&(e=n.symbols_[e]||e),e}var n=this,i=[0],s=[null],r=[],o=this.table,a="",c=0,h=0,l=0;this.lexer.setInput(e),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var u=this.lexer.yylloc;r.push(u);var p=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var d,f,m,b,k,g,y,v,w,T={};;){if(m=i[i.length-1],this.defaultActions[m]?b=this.defaultActions[m]:((null===d||"undefined"==typeof d)&&(d=t()),b=o[m]&&o[m][d]),"undefined"==typeof b||!b.length||!b[0]){var C="";if(!l){w=[];for(g in o[m])this.terminals_[g]&&g>2&&w.push("'"+this.terminals_[g]+"'");C=this.lexer.showPosition?"Parse error on line "+(c+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+w.join(", ")+", got '"+(this.terminals_[d]||d)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==d?"end of input":"'"+(this.terminals_[d]||d)+"'"),this.parseError(C,{text:this.lexer.match,token:this.terminals_[d]||d,line:this.lexer.yylineno,loc:u,expected:w})}}if(b[0]instanceof Array&&b.length>1)throw new Error("Parse Error: multiple actions possible at state: "+m+", token: "+d);switch(b[0]){case 1:i.push(d),s.push(this.lexer.yytext),r.push(this.lexer.yylloc),i.push(b[1]),d=null,f?(d=f,f=null):(h=this.lexer.yyleng,a=this.lexer.yytext,c=this.lexer.yylineno,u=this.lexer.yylloc,l>0&&l--);break;case 2:if(y=this.productions_[b[1]][1],T.$=s[s.length-y],T._$={first_line:r[r.length-(y||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(y||1)].first_column,last_column:r[r.length-1].last_column},p&&(T._$.range=[r[r.length-(y||1)].range[0],r[r.length-1].range[1]]),k=this.performAction.call(T,a,h,c,this.yy,b[1],s,r),"undefined"!=typeof k)return k;y&&(i=i.slice(0,2*-1*y),s=s.slice(0,-1*y),r=r.slice(0,-1*y)),i.push(this.productions_[b[1]][0]),s.push(T.$),r.push(T._$),v=o[i[i.length-2]][i[i.length-1]],i.push(v);break;case 3:return!0}}return!0}};return e.prototype=t,t.Parser=e,new e}();return"undefined"!=typeof require&&"undefined"!=typeof e&&(e.parser=n,e.Parser=n.Parser,e.parse=function(){return n.parse.apply(n,arguments)},e.main=function(t){t[1]||(console.log("Usage: "+t[0]+" FILE"),process.exit(1));var n=require("fs").readFileSync(require("path").normalize(t[1]),"utf8");return e.parser.parse(n)},"undefined"!=typeof t&&require.main===t&&e.main(process.argv.slice(1))),t.exports}(),require["./scope"]=function(){var e={},t={exports:e};return function(){var t,n,i,s;s=require("./helpers"),n=s.extend,i=s.last,e.Scope=t=function(){function e(t,n,i){this.parent=t,this.expressions=n,this.method=i,this.variables=[{name:"arguments",type:"arguments"}],this.positions={},this.parent||(e.root=this)}return e.root=null,e.prototype.add=function(e,t,n){return this.shared&&!n?this.parent.add(e,t,n):Object.prototype.hasOwnProperty.call(this.positions,e)?this.variables[this.positions[e]].type=t:this.positions[e]=this.variables.push({name:e,type:t})-1},e.prototype.namedMethod=function(){var e;return(null!=(e=this.method)?e.name:void 0)||!this.parent?this.method:this.parent.namedMethod()},e.prototype.find=function(e){return this.check(e)?!0:(this.add(e,"var"),!1)},e.prototype.parameter=function(e){return this.shared&&this.parent.check(e,!0)?void 0:this.add(e,"param")},e.prototype.check=function(e){var t;return!!(this.type(e)||(null!=(t=this.parent)?t.check(e):void 0))},e.prototype.temporary=function(e,t){return e.length>1?"_"+e+(t>1?t-1:""):"_"+(t+parseInt(e,36)).toString(36).replace(/\d/g,"a")},e.prototype.type=function(e){var t,n,i,s;for(s=this.variables,n=0,i=s.length;i>n;n++)if(t=s[n],t.name===e)return t.type;return null},e.prototype.freeVariable=function(e,t){var n,i;for(null==t&&(t=!0),n=0;this.check(i=this.temporary(e,n));)n++;return t&&this.add(i,"var",!0),i},e.prototype.assign=function(e,t){return this.add(e,{value:t,assigned:!0},!0),this.hasAssignments=!0},e.prototype.hasDeclarations=function(){return!!this.declaredVariables().length},e.prototype.declaredVariables=function(){var e,t,n,i,s,r;for(e=[],t=[],r=this.variables,i=0,s=r.length;s>i;i++)n=r[i],"var"===n.type&&("_"===n.name.charAt(0)?t:e).push(n.name);return e.sort().concat(t.sort())},e.prototype.assignedVariables=function(){var e,t,n,i,s;for(i=this.variables,s=[],t=0,n=i.length;n>t;t++)e=i[t],e.type.assigned&&s.push(""+e.name+" = "+e.type.value);return s},e}()}.call(this),t.exports}(),require["./nodes"]=function(){var e={},t={exports:e};return function(){var t,n,i,s,r,o,a,c,h,l,u,p,d,f,m,b,k,g,y,v,w,T,C,F,L,N,x,E,D,S,R,A,I,_,$,O,j,M,B,V,P,U,q,H,G,W,X,Y,K,z,J,Z,Q,et,tt,nt,it,st,rt,ot,at,ct,ht,lt,ut,pt,dt,ft,mt,bt,kt,gt={}.hasOwnProperty,yt=function(e,t){function n(){this.constructor=e}for(var i in t)gt.call(t,i)&&(e[i]=t[i]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e},vt=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1},wt=[].slice;Error.stackTraceLimit=1/0,V=require("./scope").Scope,ft=require("./lexer"),$=ft.RESERVED,B=ft.STRICT_PROSCRIBED,mt=require("./helpers"),Q=mt.compact,it=mt.flatten,nt=mt.extend,at=mt.merge,et=mt.del,lt=mt.starts,tt=mt.ends,rt=mt.last,ht=mt.some,Z=mt.addLocationDataFn,ot=mt.locationDataToString,ut=mt.throwSyntaxError,e.extend=nt,e.addLocationDataFn=Z,J=function(){return!0},S=function(){return!1},G=function(){return this},D=function(){return this.negated=!this.negated,this},e.CodeFragment=l=function(){function e(e,t){var n;this.code=""+t,this.locationData=null!=e?e.locationData:void 0,this.type=(null!=e?null!=(n=e.constructor)?n.name:void 0:void 0)||"unknown"}return e.prototype.toString=function(){return""+this.code+(this.locationData?": "+ot(this.locationData):"")},e}(),st=function(e){var t;return function(){var n,i,s;for(s=[],n=0,i=e.length;i>n;n++)t=e[n],s.push(t.code);return s}().join("")},e.Base=s=function(){function e(){}return e.prototype.compile=function(e,t){return st(this.compileToFragments(e,t))},e.prototype.compileToFragments=function(e,t){var n;return e=nt({},e),t&&(e.level=t),n=this.unfoldSoak(e)||this,n.tab=e.indent,e.level!==N&&n.isStatement(e)?n.compileClosure(e):n.compileNode(e)},e.prototype.compileClosure=function(e){var t;return(t=this.jumps())&&t.error("cannot use a pure statement in an expression"),e.sharedScope=!0,c.wrap(this).compileNode(e)},e.prototype.cache=function(e,t,n){var s,r;return this.isComplex()?(s=new x(n||e.scope.freeVariable("ref")),r=new i(s,this),t?[r.compileToFragments(e,t),[this.makeCode(s.value)]]:[r,s]):(s=t?this.compileToFragments(e,t):this,[s,s])},e.prototype.cacheToCodeFragments=function(e){return[st(e[0]),st(e[1])]},e.prototype.makeReturn=function(e){var t;return t=this.unwrapAll(),e?new o(new x(""+e+".push"),[t]):new j(t)},e.prototype.contains=function(e){var t;return t=void 0,this.traverseChildren(!1,function(n){return e(n)?(t=n,!1):void 0}),t},e.prototype.lastNonComment=function(e){var t;for(t=e.length;t--;)if(!(e[t]instanceof u))return e[t];return null},e.prototype.toString=function(e,t){var n;return null==e&&(e=""),null==t&&(t=this.constructor.name),n="\n"+e+t,this.soak&&(n+="?"),this.eachChild(function(t){return n+=t.toString(e+H)}),n},e.prototype.eachChild=function(e){var t,n,i,s,r,o,a,c;if(!this.children)return this;for(a=this.children,i=0,r=a.length;r>i;i++)if(t=a[i],this[t])for(c=it([this[t]]),s=0,o=c.length;o>s;s++)if(n=c[s],e(n)===!1)return this;return this},e.prototype.traverseChildren=function(e,t){return this.eachChild(function(n){var i;return i=t(n),i!==!1?n.traverseChildren(e,t):void 0})},e.prototype.invert=function(){return new A("!",this)},e.prototype.unwrapAll=function(){var e;for(e=this;e!==(e=e.unwrap()););return e},e.prototype.children=[],e.prototype.isStatement=S,e.prototype.jumps=S,e.prototype.isComplex=J,e.prototype.isChainable=S,e.prototype.isAssignable=S,e.prototype.unwrap=G,e.prototype.unfoldSoak=S,e.prototype.assigns=S,e.prototype.updateLocationDataIfMissing=function(e){return this.locationData||(this.locationData=e),this.eachChild(function(t){return t.updateLocationDataIfMissing(e)})},e.prototype.error=function(e){return ut(e,this.locationData)},e.prototype.makeCode=function(e){return new l(this,e)},e.prototype.wrapInBraces=function(e){return[].concat(this.makeCode("("),e,this.makeCode(")"))},e.prototype.joinFragmentArrays=function(e,t){var n,i,s,r,o;for(n=[],s=r=0,o=e.length;o>r;s=++r)i=e[s],s&&n.push(this.makeCode(t)),n=n.concat(i);return n},e}(),e.Block=r=function(e){function t(e){this.expressions=Q(it(e||[]))}return yt(t,e),t.prototype.children=["expressions"],t.prototype.push=function(e){return this.expressions.push(e),this},t.prototype.pop=function(){return this.expressions.pop()},t.prototype.unshift=function(e){return this.expressions.unshift(e),this},t.prototype.unwrap=function(){return 1===this.expressions.length?this.expressions[0]:this},t.prototype.isEmpty=function(){return!this.expressions.length},t.prototype.isStatement=function(e){var t,n,i,s;for(s=this.expressions,n=0,i=s.length;i>n;n++)if(t=s[n],t.isStatement(e))return!0;return!1},t.prototype.jumps=function(e){var t,n,i,s;for(s=this.expressions,n=0,i=s.length;i>n;n++)if(t=s[n],t.jumps(e))return t},t.prototype.makeReturn=function(e){var t,n;for(n=this.expressions.length;n--;)if(t=this.expressions[n],!(t instanceof u)){this.expressions[n]=t.makeReturn(e),t instanceof j&&!t.expression&&this.expressions.splice(n,1);break}return this},t.prototype.compileToFragments=function(e,n){return null==e&&(e={}),e.scope?t.__super__.compileToFragments.call(this,e,n):this.compileRoot(e)},t.prototype.compileNode=function(e){var n,i,s,r,o,a,c,h,l;for(this.tab=e.indent,a=e.level===N,i=[],l=this.expressions,r=c=0,h=l.length;h>c;r=++c)o=l[r],o=o.unwrapAll(),o=o.unfoldSoak(e)||o,o instanceof t?i.push(o.compileNode(e)):a?(o.front=!0,s=o.compileToFragments(e),o.isStatement(e)||(s.unshift(this.makeCode(""+this.tab)),s.push(this.makeCode(";"))),i.push(s)):i.push(o.compileToFragments(e,C));return a?this.spaced?[].concat(this.joinFragmentArrays(i,"\n\n"),this.makeCode("\n")):this.joinFragmentArrays(i,"\n"):(n=i.length?this.joinFragmentArrays(i,", "):[this.makeCode("void 0")],i.length>1&&e.level>=C?this.wrapInBraces(n):n)},t.prototype.compileRoot=function(e){var t,n,i,s,r,o,a,c,h,l;for(e.indent=e.bare?"":H,e.level=N,this.spaced=!0,e.scope=new V(null,this,null),l=e.locals||[],c=0,h=l.length;h>c;c++)s=l[c],e.scope.parameter(s);return r=[],e.bare||(o=function(){var e,n,s,r;for(s=this.expressions,r=[],i=e=0,n=s.length;n>e&&(t=s[i],t.unwrap()instanceof u);i=++e)r.push(t);return r}.call(this),a=this.expressions.slice(o.length),this.expressions=o,o.length&&(r=this.compileNode(at(e,{indent:""})),r.push(this.makeCode("\n"))),this.expressions=a),n=this.compileWithDeclarations(e),e.bare?n:[].concat(r,this.makeCode("(function() {\n"),n,this.makeCode("\n}).call(this);\n"))},t.prototype.compileWithDeclarations=function(e){var t,n,i,s,r,o,a,c,h,l,p,d,f,m;for(s=[],o=[],d=this.expressions,r=l=0,p=d.length;p>l&&(i=d[r],i=i.unwrap(),i instanceof u||i instanceof x);r=++l);return e=at(e,{level:N}),r&&(a=this.expressions.splice(r,9e9),f=[this.spaced,!1],h=f[0],this.spaced=f[1],m=[this.compileNode(e),h],s=m[0],this.spaced=m[1],this.expressions=a),o=this.compileNode(e),c=e.scope,c.expressions===this&&(n=e.scope.hasDeclarations(),t=c.hasAssignments,n||t?(r&&s.push(this.makeCode("\n")),s.push(this.makeCode(""+this.tab+"var ")),n&&s.push(this.makeCode(c.declaredVariables().join(", "))),t&&(n&&s.push(this.makeCode(",\n"+(this.tab+H))),s.push(this.makeCode(c.assignedVariables().join(",\n"+(this.tab+H))))),s.push(this.makeCode(";\n"+(this.spaced?"\n":"")))):s.length&&o.length&&s.push(this.makeCode("\n"))),s.concat(o)},t.wrap=function(e){return 1===e.length&&e[0]instanceof t?e[0]:new t(e)},t}(s),e.Literal=x=function(e){function t(e){this.value=e}return yt(t,e),t.prototype.makeReturn=function(){return this.isStatement()?this:t.__super__.makeReturn.apply(this,arguments)},t.prototype.isAssignable=function(){return m.test(this.value)},t.prototype.isStatement=function(){var e;return"break"===(e=this.value)||"continue"===e||"debugger"===e},t.prototype.isComplex=S,t.prototype.assigns=function(e){return e===this.value},t.prototype.jumps=function(e){return"break"!==this.value||(null!=e?e.loop:void 0)||(null!=e?e.block:void 0)?"continue"!==this.value||(null!=e?e.loop:void 0)?void 0:this:this},t.prototype.compileNode=function(e){var t,n,i;return n="this"===this.value?(null!=(i=e.scope.method)?i.bound:void 0)?e.scope.method.context:this.value:this.value.reserved?'"'+this.value+'"':this.value,t=this.isStatement()?""+this.tab+n+";":n,[this.makeCode(t)]},t.prototype.toString=function(){return' "'+this.value+'"'},t}(s),e.Undefined=function(e){function t(){return bt=t.__super__.constructor.apply(this,arguments)}return yt(t,e),t.prototype.isAssignable=S,t.prototype.isComplex=S,t.prototype.compileNode=function(e){return[this.makeCode(e.level>=w?"(void 0)":"void 0")]},t}(s),e.Null=function(e){function t(){return kt=t.__super__.constructor.apply(this,arguments)}return yt(t,e),t.prototype.isAssignable=S,t.prototype.isComplex=S,t.prototype.compileNode=function(){return[this.makeCode("null")]},t}(s),e.Bool=function(e){function t(e){this.val=e}return yt(t,e),t.prototype.isAssignable=S,t.prototype.isComplex=S,t.prototype.compileNode=function(){return[this.makeCode(this.val)]},t}(s),e.Return=j=function(e){function t(e){e&&!e.unwrap().isUndefined&&(this.expression=e)}return yt(t,e),t.prototype.children=["expression"],t.prototype.isStatement=J,t.prototype.makeReturn=G,t.prototype.jumps=G,t.prototype.compileToFragments=function(e,n){var i,s;return i=null!=(s=this.expression)?s.makeReturn():void 0,!i||i instanceof t?t.__super__.compileToFragments.call(this,e,n):i.compileToFragments(e,n)},t.prototype.compileNode=function(e){var t;return t=[],t.push(this.makeCode(this.tab+("return"+(this.expression?" ":"")))),this.expression&&(t=t.concat(this.expression.compileToFragments(e,L))),t.push(this.makeCode(";")),t},t}(s),e.Value=K=function(e){function t(e,n,i){return!n&&e instanceof t?e:(this.base=e,this.properties=n||[],i&&(this[i]=!0),this)}return yt(t,e),t.prototype.children=["base","properties"],t.prototype.add=function(e){return this.properties=this.properties.concat(e),this},t.prototype.hasProperties=function(){return!!this.properties.length},t.prototype.isArray=function(){return!this.properties.length&&this.base instanceof n},t.prototype.isComplex=function(){return this.hasProperties()||this.base.isComplex()},t.prototype.isAssignable=function(){return this.hasProperties()||this.base.isAssignable()},t.prototype.isSimpleNumber=function(){return this.base instanceof x&&M.test(this.base.value)},t.prototype.isString=function(){return this.base instanceof x&&k.test(this.base.value)},t.prototype.isAtomic=function(){var e,t,n,i;for(i=this.properties.concat(this.base),t=0,n=i.length;n>t;t++)if(e=i[t],e.soak||e instanceof o)return!1;return!0},t.prototype.isStatement=function(e){return!this.properties.length&&this.base.isStatement(e)},t.prototype.assigns=function(e){return!this.properties.length&&this.base.assigns(e)},t.prototype.jumps=function(e){return!this.properties.length&&this.base.jumps(e)},t.prototype.isObject=function(e){return this.properties.length?!1:this.base instanceof R&&(!e||this.base.generated)},t.prototype.isSplice=function(){return rt(this.properties)instanceof P},t.prototype.unwrap=function(){return this.properties.length?this:this.base},t.prototype.cacheReference=function(e){var n,s,r,o;return r=rt(this.properties),this.properties.length<2&&!this.base.isComplex()&&!(null!=r?r.isComplex():void 0)?[this,this]:(n=new t(this.base,this.properties.slice(0,-1)),n.isComplex()&&(s=new x(e.scope.freeVariable("base")),n=new t(new _(new i(s,n)))),r?(r.isComplex()&&(o=new x(e.scope.freeVariable("name")),r=new v(new i(o,r.index)),o=new v(o)),[n.add(r),new t(s||n.base,[o||r])]):[n,s])},t.prototype.compileNode=function(e){var t,n,i,s,r;for(this.base.front=this.front,i=this.properties,t=this.base.compileToFragments(e,i.length?w:null),(this.base instanceof _||i.length)&&M.test(st(t))&&t.push(this.makeCode(".")),s=0,r=i.length;r>s;s++)n=i[s],t.push.apply(t,n.compileToFragments(e));return t},t.prototype.unfoldSoak=function(e){var n=this;return null!=this.unfoldedSoak?this.unfoldedSoak:this.unfoldedSoak=function(){var s,r,o,a,c,h,l,u,d,f;if(o=n.base.unfoldSoak(e))return(d=o.body.properties).push.apply(d,n.properties),o;for(f=n.properties,r=l=0,u=f.length;u>l;r=++l)if(a=f[r],a.soak)return a.soak=!1,s=new t(n.base,n.properties.slice(0,r)),h=new t(n.base,n.properties.slice(r)),s.isComplex()&&(c=new x(e.scope.freeVariable("ref")),s=new _(new i(c,s)),h.base=c),new g(new p(s),h,{soak:!0});return!1}()},t}(s),e.Comment=u=function(e){function t(e){this.comment=e}return yt(t,e),t.prototype.isStatement=J,t.prototype.makeReturn=G,t.prototype.compileNode=function(e,t){var n;return n="/*"+ct(this.comment,this.tab)+(vt.call(this.comment,"\n")>=0?"\n"+this.tab:"")+"*/\n",(t||e.level)===N&&(n=e.indent+n),[this.makeCode(n)]},t}(s),e.Call=o=function(e){function n(e,t,n){this.args=null!=t?t:[],this.soak=n,this.isNew=!1,this.isSuper="super"===e,this.variable=this.isSuper?null:e}return yt(n,e),n.prototype.children=["variable","args"],n.prototype.newInstance=function(){var e,t;return e=(null!=(t=this.variable)?t.base:void 0)||this.variable,e instanceof n&&!e.isNew?e.newInstance():this.isNew=!0,this},n.prototype.superReference=function(e){var n,i;return i=e.scope.namedMethod(),(null!=i?i.klass:void 0)?(n=[new t(new x("__super__"))],i["static"]&&n.push(new t(new x("constructor"))),n.push(new t(new x(i.name))),new K(new x(i.klass),n).compile(e)):(null!=i?i.ctor:void 0)?""+i.name+".__super__.constructor":this.error("cannot call super outside of an instance method.")},n.prototype.superThis=function(e){var t;return t=e.scope.method,t&&!t.klass&&t.context||"this"},n.prototype.unfoldSoak=function(e){var t,i,s,r,o,a,c,h,l;if(this.soak){if(this.variable){if(i=pt(e,this,"variable"))return i;h=new K(this.variable).cacheReference(e),s=h[0],o=h[1]}else s=new x(this.superReference(e)),o=new K(s);return o=new n(o,this.args),o.isNew=this.isNew,s=new x("typeof "+s.compile(e)+' === "function"'),new g(s,new K(o),{soak:!0})}for(t=this,r=[];;)if(t.variable instanceof n)r.push(t),t=t.variable;else{if(!(t.variable instanceof K))break;if(r.push(t),!((t=t.variable.base)instanceof n))break}for(l=r.reverse(),a=0,c=l.length;c>a;a++)t=l[a],i&&(t.variable instanceof n?t.variable=i:t.variable.base=i),i=pt(e,t,"variable");return i},n.prototype.compileNode=function(e){var t,n,i,s,r,o,a,c,h,l;if(null!=(h=this.variable)&&(h.front=this.front),s=U.compileSplattedArray(e,this.args,!0),s.length)return this.compileSplat(e,s);for(i=[],l=this.args,n=a=0,c=l.length;c>a;n=++a)t=l[n],n&&i.push(this.makeCode(", ")),i.push.apply(i,t.compileToFragments(e,C));return r=[],this.isSuper?(o=this.superReference(e)+(".call("+this.superThis(e)),i.length&&(o+=", "),r.push(this.makeCode(o))):(this.isNew&&r.push(this.makeCode("new ")),r.push.apply(r,this.variable.compileToFragments(e,w)),r.push(this.makeCode("("))),r.push.apply(r,i),r.push(this.makeCode(")")),r},n.prototype.compileSplat=function(e,t){var n,i,s,r,o,a;return this.isSuper?[].concat(this.makeCode(""+this.superReference(e)+".apply("+this.superThis(e)+", "),t,this.makeCode(")")):this.isNew?(r=this.tab+H,[].concat(this.makeCode("(function(func, args, ctor) {\n"+r+"ctor.prototype = func.prototype;\n"+r+"var child = new ctor, result = func.apply(child, args);\n"+r+"return Object(result) === result ? result : child;\n"+this.tab+"})("),this.variable.compileToFragments(e,C),this.makeCode(", "),t,this.makeCode(", function(){})"))):(n=[],i=new K(this.variable),(o=i.properties.pop())&&i.isComplex()?(a=e.scope.freeVariable("ref"),n=n.concat(this.makeCode("("+a+" = "),i.compileToFragments(e,C),this.makeCode(")"),o.compileToFragments(e))):(s=i.compileToFragments(e,w),M.test(st(s))&&(s=this.wrapInBraces(s)),o?(a=st(s),s.push.apply(s,o.compileToFragments(e))):a="null",n=n.concat(s)),n=n.concat(this.makeCode(".apply("+a+", "),t,this.makeCode(")")))},n}(s),e.Extends=d=function(e){function t(e,t){this.child=e,this.parent=t}return yt(t,e),t.prototype.children=["child","parent"],t.prototype.compileToFragments=function(e){return new o(new K(new x(dt("extends"))),[this.child,this.parent]).compileToFragments(e)},t}(s),e.Access=t=function(e){function t(e,t){this.name=e,this.name.asKey=!0,this.soak="soak"===t}return yt(t,e),t.prototype.children=["name"],t.prototype.compileToFragments=function(e){var t;return t=this.name.compileToFragments(e),m.test(st(t))?t.unshift(this.makeCode(".")):(t.unshift(this.makeCode("[")),t.push(this.makeCode("]"))),t},t.prototype.isComplex=S,t}(s),e.Index=v=function(e){function t(e){this.index=e}return yt(t,e),t.prototype.children=["index"],t.prototype.compileToFragments=function(e){return[].concat(this.makeCode("["),this.index.compileToFragments(e,L),this.makeCode("]"))},t.prototype.isComplex=function(){return this.index.isComplex()},t}(s),e.Range=O=function(e){function t(e,t,n){this.from=e,this.to=t,this.exclusive="exclusive"===n,this.equals=this.exclusive?"":"="}return yt(t,e),t.prototype.children=["from","to"],t.prototype.compileVariables=function(e){var t,n,i,s,r;return e=at(e,{top:!0}),n=this.cacheToCodeFragments(this.from.cache(e,C)),this.fromC=n[0],this.fromVar=n[1],i=this.cacheToCodeFragments(this.to.cache(e,C)),this.toC=i[0],this.toVar=i[1],(t=et(e,"step"))&&(s=this.cacheToCodeFragments(t.cache(e,C)),this.step=s[0],this.stepVar=s[1]),r=[this.fromVar.match(M),this.toVar.match(M)],this.fromNum=r[0],this.toNum=r[1],this.stepVar?this.stepNum=this.stepVar.match(M):void 0},t.prototype.compileNode=function(e){var t,n,i,s,r,o,a,c,h,l,u,p,d,f;return this.fromVar||this.compileVariables(e),e.index?(a=this.fromNum&&this.toNum,r=et(e,"index"),o=et(e,"name"),h=o&&o!==r,p=""+r+" = "+this.fromC,this.toC!==this.toVar&&(p+=", "+this.toC),this.step!==this.stepVar&&(p+=", "+this.step),d=[""+r+" <"+this.equals,""+r+" >"+this.equals],c=d[0],s=d[1],n=this.stepNum?+this.stepNum>0?""+c+" "+this.toVar:""+s+" "+this.toVar:a?(f=[+this.fromNum,+this.toNum],i=f[0],u=f[1],f,u>=i?""+c+" "+u:""+s+" "+u):(t=this.stepVar?""+this.stepVar+" > 0":""+this.fromVar+" <= "+this.toVar,""+t+" ? "+c+" "+this.toVar+" : "+s+" "+this.toVar),l=this.stepVar?""+r+" += "+this.stepVar:a?h?u>=i?"++"+r:"--"+r:u>=i?""+r+"++":""+r+"--":h?""+t+" ? ++"+r+" : --"+r:""+t+" ? "+r+"++ : "+r+"--",h&&(p=""+o+" = "+p),h&&(l=""+o+" = "+l),[this.makeCode(""+p+"; "+n+"; "+l)]):this.compileArray(e)},t.prototype.compileArray=function(e){var t,n,i,s,r,o,a,c,h,l,u,p,d;return this.fromNum&&this.toNum&&Math.abs(this.fromNum-this.toNum)<=20?(h=function(){d=[];for(var e=p=+this.fromNum,t=+this.toNum;t>=p?t>=e:e>=t;t>=p?e++:e--)d.push(e);return d}.apply(this),this.exclusive&&h.pop(),[this.makeCode("["+h.join(", ")+"]")]):(o=this.tab+H,r=e.scope.freeVariable("i"),l=e.scope.freeVariable("results"),c="\n"+o+l+" = [];",this.fromNum&&this.toNum?(e.index=r,n=st(this.compileNode(e))):(u=""+r+" = "+this.fromC+(this.toC!==this.toVar?", "+this.toC:""),i=""+this.fromVar+" <= "+this.toVar,n="var "+u+"; "+i+" ? "+r+" <"+this.equals+" "+this.toVar+" : "+r+" >"+this.equals+" "+this.toVar+"; "+i+" ? "+r+"++ : "+r+"--"),a="{ "+l+".push("+r+"); }\n"+o+"return "+l+";\n"+e.indent,s=function(e){return null!=e?e.contains(function(e){return e instanceof x&&"arguments"===e.value&&!e.asKey}):void 0},(s(this.from)||s(this.to))&&(t=", arguments"),[this.makeCode("(function() {"+c+"\n"+o+"for ("+n+")"+a+"}).apply(this"+(null!=t?t:"")+")")])},t}(s),e.Slice=P=function(e){function t(e){this.range=e,t.__super__.constructor.call(this)}return yt(t,e),t.prototype.children=["range"],t.prototype.compileNode=function(e){var t,n,i,s,r,o,a;return a=this.range,r=a.to,i=a.from,s=i&&i.compileToFragments(e,L)||[this.makeCode("0")],r&&(t=r.compileToFragments(e,L),n=st(t),(this.range.exclusive||-1!==+n)&&(o=", "+(this.range.exclusive?n:M.test(n)?""+(+n+1):(t=r.compileToFragments(e,w),"+"+st(t)+" + 1 || 9e9")))),[this.makeCode(".slice("+st(s)+(o||"")+")")]},t}(s),e.Obj=R=function(e){function t(e,t){this.generated=null!=t?t:!1,this.objects=this.properties=e||[]}return yt(t,e),t.prototype.children=["properties"],t.prototype.compileNode=function(e){var t,n,s,r,o,a,c,h,l,p,d,f,m;if(l=this.properties,!l.length)return[this.makeCode(this.front?"({})":"{}")];if(this.generated)for(p=0,f=l.length;f>p;p++)c=l[p],c instanceof K&&c.error("cannot have an implicit value in an implicit object");for(s=e.indent+=H,a=this.lastNonComment(this.properties),t=[],n=d=0,m=l.length;m>d;n=++d)h=l[n],o=n===l.length-1?"":h===a||h instanceof u?"\n":",\n",r=h instanceof u?"":s,h instanceof i&&h.variable instanceof K&&h.variable.hasProperties()&&h.variable.error("Invalid object key"),h instanceof K&&h["this"]&&(h=new i(h.properties[0].name,h,"object")),h instanceof u||(h instanceof i||(h=new i(h,h,"object")),(h.variable.base||h.variable).asKey=!0),r&&t.push(this.makeCode(r)),t.push.apply(t,h.compileToFragments(e,N)),o&&t.push(this.makeCode(o));return t.unshift(this.makeCode("{"+(l.length&&"\n"))),t.push(this.makeCode(""+(l.length&&"\n"+this.tab)+"}")),this.front?this.wrapInBraces(t):t},t.prototype.assigns=function(e){var t,n,i,s;for(s=this.properties,n=0,i=s.length;i>n;n++)if(t=s[n],t.assigns(e))return!0;return!1},t}(s),e.Arr=n=function(e){function t(e){this.objects=e||[]}return yt(t,e),t.prototype.children=["objects"],t.prototype.compileNode=function(e){var t,n,i,s,r,o,a;if(!this.objects.length)return[this.makeCode("[]")];if(e.indent+=H,t=U.compileSplattedArray(e,this.objects),t.length)return t;for(t=[],n=function(){var t,n,i,s;for(i=this.objects,s=[],t=0,n=i.length;n>t;t++)r=i[t],s.push(r.compileToFragments(e,C));return s}.call(this),s=o=0,a=n.length;a>o;s=++o)i=n[s],s&&t.push(this.makeCode(", ")),t.push.apply(t,i);return st(t).indexOf("\n")>=0?(t.unshift(this.makeCode("[\n"+e.indent)),t.push(this.makeCode("\n"+this.tab+"]"))):(t.unshift(this.makeCode("[")),t.push(this.makeCode("]"))),t},t.prototype.assigns=function(e){var t,n,i,s;for(s=this.objects,n=0,i=s.length;i>n;n++)if(t=s[n],t.assigns(e))return!0;return!1},t}(s),e.Class=a=function(e){function n(e,t,n){this.variable=e,this.parent=t,this.body=null!=n?n:new r,this.boundFuncs=[],this.body.classBody=!0}return yt(n,e),n.prototype.children=["variable","parent","body"],n.prototype.determineName=function(){var e,n;return this.variable?(e=(n=rt(this.variable.properties))?n instanceof t&&n.name.value:this.variable.base.value,vt.call(B,e)>=0&&this.variable.error("class variable name may not be "+e),e&&(e=m.test(e)&&e)):null},n.prototype.setContext=function(e){return this.body.traverseChildren(!1,function(t){return t.classBody?!1:t instanceof x&&"this"===t.value?t.value=e:t instanceof h&&(t.klass=e,t.bound)?t.context=e:void 0})},n.prototype.addBoundFunctions=function(e){var n,i,s,r,o;for(o=this.boundFuncs,s=0,r=o.length;r>s;s++)n=o[s],i=new K(new x("this"),[new t(n)]).compile(e),this.ctor.body.unshift(new x(""+i+" = "+dt("bind")+"("+i+", this)"))},n.prototype.addProperties=function(e,n,s){var r,o,a,c,l;return l=e.base.properties.slice(0),a=function(){var e;for(e=[];r=l.shift();)r instanceof i&&(o=r.variable.base,delete r.context,c=r.value,"constructor"===o.value?(this.ctor&&r.error("cannot define more than one constructor in a class"),c.bound&&r.error("cannot define a constructor as a bound function"),c instanceof h?r=this.ctor=c:(this.externalCtor=s.scope.freeVariable("class"),r=new i(new x(this.externalCtor),c))):r.variable["this"]?(c["static"]=!0,c.bound&&(c.context=n)):(r.variable=new K(new x(n),[new t(new x("prototype")),new t(o)]),c instanceof h&&c.bound&&(this.boundFuncs.push(o),c.bound=!1))),e.push(r);return e}.call(this),Q(a)},n.prototype.walkBody=function(e,t){var i=this;return this.traverseChildren(!1,function(s){var o,a,c,h,l,u,p;if(o=!0,s instanceof n)return!1;if(s instanceof r){for(p=a=s.expressions,c=l=0,u=p.length;u>l;c=++l)h=p[c],h instanceof K&&h.isObject(!0)&&(o=!1,a[c]=i.addProperties(h,e,t));s.expressions=a=it(a)}return o&&!(s instanceof n)})},n.prototype.hoistDirectivePrologue=function(){var e,t,n;for(t=0,e=this.body.expressions;(n=e[t])&&n instanceof u||n instanceof K&&n.isString();)++t;return this.directives=e.splice(0,t)},n.prototype.ensureConstructor=function(e,t){var n,s,r;return n=!this.ctor,this.ctor||(this.ctor=new h),this.ctor.ctor=this.ctor.name=e,this.ctor.klass=null,this.ctor.noReturn=!0,n?(this.parent&&(r=new x(""+e+".__super__.constructor.apply(this, arguments)")),this.externalCtor&&(r=new x(""+this.externalCtor+".apply(this, arguments)")),r&&(s=new x(t.scope.freeVariable("ref")),this.ctor.body.unshift(new i(s,r))),this.addBoundFunctions(t),r&&(this.ctor.body.push(s),this.ctor.body.makeReturn()),this.body.expressions.unshift(this.ctor)):this.addBoundFunctions(t)},n.prototype.compileNode=function(e){var t,n,s,r,o,a,l;return n=this.determineName(),o=n||"_Class",o.reserved&&(o="_"+o),r=new x(o),this.hoistDirectivePrologue(),this.setContext(o),this.walkBody(o,e),this.ensureConstructor(o,e),this.body.spaced=!0,this.ctor instanceof h||this.body.expressions.unshift(this.ctor),this.body.expressions.push(r),(l=this.body.expressions).unshift.apply(l,this.directives),t=c.wrap(this.body),this.parent&&(this.superClass=new x(e.scope.freeVariable("super",!1)),this.body.expressions.unshift(new d(r,this.superClass)),t.args.push(this.parent),a=t.variable.params||t.variable.base.params,a.push(new I(this.superClass))),s=new _(t,!0),this.variable&&(s=new i(this.variable,s)),s.compileToFragments(e)},n}(s),e.Assign=i=function(e){function n(e,t,n,i){var s,r,o;this.variable=e,this.value=t,this.context=n,this.param=i&&i.param,this.subpattern=i&&i.subpattern,o=r=this.variable.unwrapAll().value,s=vt.call(B,o)>=0,s&&"object"!==this.context&&this.variable.error('variable name may not be "'+r+'"')}return yt(n,e),n.prototype.children=["variable","value"],n.prototype.isStatement=function(e){return(null!=e?e.level:void 0)===N&&null!=this.context&&vt.call(this.context,"?")>=0},n.prototype.assigns=function(e){return this["object"===this.context?"value":"variable"].assigns(e)},n.prototype.unfoldSoak=function(e){return pt(e,this,"variable")},n.prototype.compileNode=function(e){var t,n,i,s,r,o,a,c,l,u,p;if(i=this.variable instanceof K){if(this.variable.isArray()||this.variable.isObject())return this.compilePatternMatch(e);if(this.variable.isSplice())return this.compileSplice(e);if("||="===(c=this.context)||"&&="===c||"?="===c)return this.compileConditional(e)}return n=this.variable.compileToFragments(e,C),r=st(n),this.context||(a=this.variable.unwrapAll(),a.isAssignable()||this.variable.error('"'+this.variable.compile(e)+'" cannot be assigned'),("function"==typeof a.hasProperties?a.hasProperties():void 0)||(this.param?e.scope.add(r,"var"):e.scope.find(r))),this.value instanceof h&&(s=E.exec(r))&&(s[1]&&(this.value.klass=s[1]),this.value.name=null!=(l=null!=(u=null!=(p=s[2])?p:s[3])?u:s[4])?l:s[5]),o=this.value.compileToFragments(e,C),"object"===this.context?n.concat(this.makeCode(": "),o):(t=n.concat(this.makeCode(" "+(this.context||"=")+" "),o),e.level<=C?t:this.wrapInBraces(t))},n.prototype.compilePatternMatch=function(e){var i,s,r,o,a,c,h,l,u,p,d,f,b,k,g,y,w,T,L,E,D,S,R,A,I,O,j,M;if(y=e.level===N,T=this.value,d=this.variable.base.objects,!(f=d.length))return r=T.compileToFragments(e),e.level>=F?this.wrapInBraces(r):r;if(h=this.variable.isObject(),y&&1===f&&!((p=d[0])instanceof U))return p instanceof n?(R=p,A=R.variable,c=A.base,p=R.value):c=h?p["this"]?p.properties[0].name:p:new x(0),i=m.test(c.unwrap().value||0),T=new K(T),T.properties.push(new(i?t:v)(c)),I=p.unwrap().value,vt.call($,I)>=0&&p.error("assignment to a reserved word: "+p.compile(e)),new n(p,T,null,{param:this.param}).compileToFragments(e,N);for(L=T.compileToFragments(e,C),E=st(L),s=[],g=!1,(!m.test(E)||this.variable.assigns(E))&&(s.push([this.makeCode(""+(b=e.scope.freeVariable("ref"))+" = ")].concat(wt.call(L))),L=[this.makeCode(b)],E=b),a=D=0,S=d.length;S>D;a=++D)p=d[a],c=a,h&&(p instanceof n?(O=p,j=O.variable,c=j.base,p=O.value):p.base instanceof _?(M=new K(p.unwrapAll()).cacheReference(e),p=M[0],c=M[1]):c=p["this"]?p.properties[0].name:p),!g&&p instanceof U?(u=p.name.unwrap().value,p=p.unwrap(),w=""+f+" <= "+E+".length ? "+dt("slice")+".call("+E+", "+a,(k=f-a-1)?(l=e.scope.freeVariable("i"),w+=", "+l+" = "+E+".length - "+k+") : ("+l+" = "+a+", [])"):w+=") : []",w=new x(w),g=""+l+"++"):(u=p.unwrap().value,p instanceof U&&p.error("multiple splats are disallowed in an assignment"),"number"==typeof c?(c=new x(g||c),i=!1):i=h&&m.test(c.unwrap().value||0),w=new K(new x(E),[new(i?t:v)(c)])),null!=u&&vt.call($,u)>=0&&p.error("assignment to a reserved word: "+p.compile(e)),s.push(new n(p,w,null,{param:this.param,subpattern:!0}).compileToFragments(e,C));
return y||this.subpattern||s.push(L),o=this.joinFragmentArrays(s,", "),e.level<C?o:this.wrapInBraces(o)},n.prototype.compileConditional=function(e){var t,i,s;return s=this.variable.cacheReference(e),t=s[0],i=s[1],!t.properties.length&&t.base instanceof x&&"this"!==t.base.value&&!e.scope.check(t.base.value)&&this.variable.error('the variable "'+t.base.value+"\" can't be assigned with "+this.context+" because it has not been declared before"),vt.call(this.context,"?")>=0&&(e.isExistentialEquals=!0),new A(this.context.slice(0,-1),t,new n(i,this.value,"=")).compileToFragments(e)},n.prototype.compileSplice=function(e){var t,n,i,s,r,o,a,c,h,l,u,p;return l=this.variable.properties.pop().range,i=l.from,a=l.to,n=l.exclusive,o=this.variable.compile(e),i?(u=this.cacheToCodeFragments(i.cache(e,F)),s=u[0],r=u[1]):s=r="0",a?(null!=i?i.isSimpleNumber():void 0)&&a.isSimpleNumber()?(a=+a.compile(e)-+r,n||(a+=1)):(a=a.compile(e,w)+" - "+r,n||(a+=" + 1")):a="9e9",p=this.value.cache(e,C),c=p[0],h=p[1],t=[].concat(this.makeCode("[].splice.apply("+o+", ["+s+", "+a+"].concat("),c,this.makeCode(")), "),h),e.level>N?this.wrapInBraces(t):t},n}(s),e.Code=h=function(e){function t(e,t,n){this.params=e||[],this.body=t||new r,this.bound="boundfunc"===n,this.bound&&(this.context="_this")}return yt(t,e),t.prototype.children=["params","body"],t.prototype.isStatement=function(){return!!this.ctor},t.prototype.jumps=S,t.prototype.compileNode=function(e){var t,s,r,o,a,c,h,l,u,p,d,f,m,b,k,y,v,T,C,F,L,N,E,D,S,R,I,_,$;for(e.scope=new V(e.scope,this.body,this),e.scope.shared=et(e,"sharedScope"),e.indent+=H,delete e.bare,delete e.isExistentialEquals,u=[],r=[],this.eachParamName(function(t){return e.scope.check(t)?void 0:e.scope.parameter(t)}),S=this.params,k=0,C=S.length;C>k;k++)if(l=S[k],l.splat){for(R=this.params,y=0,F=R.length;F>y;y++)h=R[y].name,h["this"]&&(h=h.properties[0].name),h.value&&e.scope.add(h.value,"var",!0);d=new i(new K(new n(function(){var t,n,i,s;for(i=this.params,s=[],t=0,n=i.length;n>t;t++)h=i[t],s.push(h.asReference(e));return s}.call(this))),new K(new x("arguments")));break}for(I=this.params,v=0,L=I.length;L>v;v++)l=I[v],l.isComplex()?(m=p=l.asReference(e),l.value&&(m=new A("?",p,l.value)),r.push(new i(new K(l.name),m,"=",{param:!0}))):(p=l,l.value&&(c=new x(p.name.value+" == null"),m=new i(new K(l.name),l.value,"="),r.push(new g(c,m)))),d||u.push(p);for(b=this.body.isEmpty(),d&&r.unshift(d),r.length&&(_=this.body.expressions).unshift.apply(_,r),o=T=0,N=u.length;N>T;o=++T)h=u[o],u[o]=h.compileToFragments(e),e.scope.parameter(st(u[o]));for(f=[],this.eachParamName(function(e,t){return vt.call(f,e)>=0&&t.error("multiple parameters named '"+e+"'"),f.push(e)}),b||this.noReturn||this.body.makeReturn(),this.bound&&((null!=($=e.scope.parent.method)?$.bound:void 0)?this.bound=this.context=e.scope.parent.method.context:this["static"]||e.scope.parent.assign("_this","this")),a=e.indent,s="function",this.ctor&&(s+=" "+this.name),s+="(",t=[this.makeCode(s)],o=D=0,E=u.length;E>D;o=++D)h=u[o],o&&t.push(this.makeCode(", ")),t.push.apply(t,h);return t.push(this.makeCode(") {")),this.body.isEmpty()||(t=t.concat(this.makeCode("\n"),this.body.compileWithDeclarations(e),this.makeCode("\n"+this.tab))),t.push(this.makeCode("}")),this.ctor?[this.makeCode(this.tab)].concat(wt.call(t)):this.front||e.level>=w?this.wrapInBraces(t):t},t.prototype.eachParamName=function(e){var t,n,i,s,r;for(s=this.params,r=[],n=0,i=s.length;i>n;n++)t=s[n],r.push(t.eachName(e));return r},t.prototype.traverseChildren=function(e,n){return e?t.__super__.traverseChildren.call(this,e,n):void 0},t}(s),e.Param=I=function(e){function t(e,t,n){var i;this.name=e,this.value=t,this.splat=n,i=e=this.name.unwrapAll().value,vt.call(B,i)>=0&&this.name.error('parameter name "'+e+'" is not allowed')}return yt(t,e),t.prototype.children=["name","value"],t.prototype.compileToFragments=function(e){return this.name.compileToFragments(e,C)},t.prototype.asReference=function(e){var t;return this.reference?this.reference:(t=this.name,t["this"]?(t=t.properties[0].name,t.value.reserved&&(t=new x(e.scope.freeVariable(t.value)))):t.isComplex()&&(t=new x(e.scope.freeVariable("arg"))),t=new K(t),this.splat&&(t=new U(t)),this.reference=t)},t.prototype.isComplex=function(){return this.name.isComplex()},t.prototype.eachName=function(e,t){var n,s,r,o,a,c;if(null==t&&(t=this.name),n=function(t){var n;return n=t.properties[0].name,n.value.reserved?void 0:e(n.value,n)},t instanceof x)return e(t.value,t);if(t instanceof K)return n(t);for(c=t.objects,o=0,a=c.length;a>o;o++)r=c[o],r instanceof i?this.eachName(e,r.value.unwrap()):r instanceof U?(s=r.name.unwrap(),e(s.value,s)):r instanceof K?r.isArray()||r.isObject()?this.eachName(e,r.base):r["this"]?n(r):e(r.base.value,r.base):r.error("illegal parameter "+r.compile())},t}(s),e.Splat=U=function(e){function t(e){this.name=e.compile?e:new x(e)}return yt(t,e),t.prototype.children=["name"],t.prototype.isAssignable=J,t.prototype.assigns=function(e){return this.name.assigns(e)},t.prototype.compileToFragments=function(e){return this.name.compileToFragments(e)},t.prototype.unwrap=function(){return this.name},t.compileSplattedArray=function(e,n,i){var s,r,o,a,c,h,l,u,p,d;for(l=-1;(u=n[++l])&&!(u instanceof t););if(l>=n.length)return[];if(1===n.length)return u=n[0],c=u.compileToFragments(e,C),i?c:[].concat(u.makeCode(""+dt("slice")+".call("),c,u.makeCode(")"));for(s=n.slice(l),h=p=0,d=s.length;d>p;h=++p)u=s[h],o=u.compileToFragments(e,C),s[h]=u instanceof t?[].concat(u.makeCode(""+dt("slice")+".call("),o,u.makeCode(")")):[].concat(u.makeCode("["),o,u.makeCode("]"));return 0===l?(u=n[0],a=u.joinFragmentArrays(s.slice(1),", "),s[0].concat(u.makeCode(".concat("),a,u.makeCode(")"))):(r=function(){var t,i,s,r;for(s=n.slice(0,l),r=[],t=0,i=s.length;i>t;t++)u=s[t],r.push(u.compileToFragments(e,C));return r}(),r=n[0].joinFragmentArrays(r,", "),a=n[l].joinFragmentArrays(s,", "),[].concat(n[0].makeCode("["),r,n[l].makeCode("].concat("),a,rt(n).makeCode(")")))},t}(s),e.While=z=function(e){function t(e,t){this.condition=(null!=t?t.invert:void 0)?e.invert():e,this.guard=null!=t?t.guard:void 0}return yt(t,e),t.prototype.children=["condition","guard","body"],t.prototype.isStatement=J,t.prototype.makeReturn=function(e){return e?t.__super__.makeReturn.apply(this,arguments):(this.returns=!this.jumps({loop:!0}),this)},t.prototype.addBody=function(e){return this.body=e,this},t.prototype.jumps=function(){var e,t,n,i;if(e=this.body.expressions,!e.length)return!1;for(n=0,i=e.length;i>n;n++)if(t=e[n],t.jumps({loop:!0}))return t;return!1},t.prototype.compileNode=function(e){var t,n,i,s;return e.indent+=H,s="",n=this.body,n.isEmpty()?n=this.makeCode(""):(this.returns&&(n.makeReturn(i=e.scope.freeVariable("results")),s=""+this.tab+i+" = [];\n"),this.guard&&(n.expressions.length>1?n.expressions.unshift(new g(new _(this.guard).invert(),new x("continue"))):this.guard&&(n=r.wrap([new g(this.guard,n)]))),n=[].concat(this.makeCode("\n"),n.compileToFragments(e,N),this.makeCode("\n"+this.tab))),t=[].concat(this.makeCode(s+this.tab+"while ("),this.condition.compileToFragments(e,L),this.makeCode(") {"),n,this.makeCode("}")),this.returns&&t.push(this.makeCode("\n"+this.tab+"return "+i+";")),t},t}(s),e.Op=A=function(e){function t(e,t,i,s){if("in"===e)return new y(t,i);if("do"===e)return this.generateDo(t);if("new"===e){if(t instanceof o&&!t["do"]&&!t.isNew)return t.newInstance();(t instanceof h&&t.bound||t["do"])&&(t=new _(t))}return this.operator=n[e]||e,this.first=t,this.second=i,this.flip=!!s,this}var n,s;return yt(t,e),n={"==":"===","!=":"!==",of:"in"},s={"!==":"===","===":"!=="},t.prototype.children=["first","second"],t.prototype.isSimpleNumber=S,t.prototype.isUnary=function(){return!this.second},t.prototype.isComplex=function(){var e;return!(this.isUnary()&&("+"===(e=this.operator)||"-"===e))||this.first.isComplex()},t.prototype.isChainable=function(){var e;return"<"===(e=this.operator)||">"===e||">="===e||"<="===e||"==="===e||"!=="===e},t.prototype.invert=function(){var e,n,i,r,o;if(this.isChainable()&&this.first.isChainable()){for(e=!0,n=this;n&&n.operator;)e&&(e=n.operator in s),n=n.first;if(!e)return new _(this).invert();for(n=this;n&&n.operator;)n.invert=!n.invert,n.operator=s[n.operator],n=n.first;return this}return(r=s[this.operator])?(this.operator=r,this.first.unwrap()instanceof t&&this.first.invert(),this):this.second?new _(this).invert():"!"===this.operator&&(i=this.first.unwrap())instanceof t&&("!"===(o=i.operator)||"in"===o||"instanceof"===o)?i:new t("!",this)},t.prototype.unfoldSoak=function(e){var t;return("++"===(t=this.operator)||"--"===t||"delete"===t)&&pt(e,this,"first")},t.prototype.generateDo=function(e){var t,n,s,r,a,c,l,u;for(r=[],n=e instanceof i&&(a=e.value.unwrap())instanceof h?a:e,u=n.params||[],c=0,l=u.length;l>c;c++)s=u[c],s.value?(r.push(s.value),delete s.value):r.push(s);return t=new o(e,r),t["do"]=!0,t},t.prototype.compileNode=function(e){var t,n,i,s;return n=this.isChainable()&&this.first.isChainable(),n||(this.first.front=this.front),"delete"===this.operator&&e.scope.check(this.first.unwrapAll().value)&&this.error("delete operand may not be argument or var"),("--"===(i=this.operator)||"++"===i)&&(s=this.first.unwrapAll().value,vt.call(B,s)>=0)&&this.error('cannot increment/decrement "'+this.first.unwrapAll().value+'"'),this.isUnary()?this.compileUnary(e):n?this.compileChain(e):"?"===this.operator?this.compileExistence(e):(t=[].concat(this.first.compileToFragments(e,F),this.makeCode(" "+this.operator+" "),this.second.compileToFragments(e,F)),e.level<=F?t:this.wrapInBraces(t))},t.prototype.compileChain=function(e){var t,n,i,s;return s=this.first.second.cache(e),this.first.second=s[0],i=s[1],n=this.first.compileToFragments(e,F),t=n.concat(this.makeCode(" "+(this.invert?"&&":"||")+" "),i.compileToFragments(e),this.makeCode(" "+this.operator+" "),this.second.compileToFragments(e,F)),this.wrapInBraces(t)},t.prototype.compileExistence=function(e){var t,n;return!e.isExistentialEquals&&this.first.isComplex()?(n=new x(e.scope.freeVariable("ref")),t=new _(new i(n,this.first))):(t=this.first,n=t),new g(new p(t),n,{type:"if"}).addElse(this.second).compileToFragments(e)},t.prototype.compileUnary=function(e){var n,i,s;return i=[],n=this.operator,i.push([this.makeCode(n)]),"!"===n&&this.first instanceof p?(this.first.negated=!this.first.negated,this.first.compileToFragments(e)):e.level>=w?new _(this).compileToFragments(e):(s="+"===n||"-"===n,("new"===n||"typeof"===n||"delete"===n||s&&this.first instanceof t&&this.first.operator===n)&&i.push([this.makeCode(" ")]),(s&&this.first instanceof t||"new"===n&&this.first.isStatement(e))&&(this.first=new _(this.first)),i.push(this.first.compileToFragments(e,F)),this.flip&&i.reverse(),this.joinFragmentArrays(i,""))},t.prototype.toString=function(e){return t.__super__.toString.call(this,e,this.constructor.name+" "+this.operator)},t}(s),e.In=y=function(e){function t(e,t){this.object=e,this.array=t}return yt(t,e),t.prototype.children=["object","array"],t.prototype.invert=D,t.prototype.compileNode=function(e){var t,n,i,s,r;if(this.array instanceof K&&this.array.isArray()){for(r=this.array.base.objects,i=0,s=r.length;s>i;i++)if(n=r[i],n instanceof U){t=!0;break}if(!t)return this.compileOrTest(e)}return this.compileLoopTest(e)},t.prototype.compileOrTest=function(e){var t,n,i,s,r,o,a,c,h,l,u,p;if(0===this.array.base.objects.length)return[this.makeCode(""+!!this.negated)];for(l=this.object.cache(e,F),o=l[0],r=l[1],u=this.negated?[" !== "," && "]:[" === "," || "],t=u[0],n=u[1],a=[],p=this.array.base.objects,i=c=0,h=p.length;h>c;i=++c)s=p[i],i&&a.push(this.makeCode(n)),a=a.concat(i?r:o,this.makeCode(t),s.compileToFragments(e,w));return e.level<F?a:this.wrapInBraces(a)},t.prototype.compileLoopTest=function(e){var t,n,i,s;return s=this.object.cache(e,C),i=s[0],n=s[1],t=[].concat(this.makeCode(dt("indexOf")+".call("),this.array.compileToFragments(e,C),this.makeCode(", "),n,this.makeCode(") "+(this.negated?"< 0":">= 0"))),st(i)===st(n)?t:(t=i.concat(this.makeCode(", "),t),e.level<C?t:this.wrapInBraces(t))},t.prototype.toString=function(e){return t.__super__.toString.call(this,e,this.constructor.name+(this.negated?"!":""))},t}(s),e.Try=X=function(e){function t(e,t,n,i){this.attempt=e,this.errorVariable=t,this.recovery=n,this.ensure=i}return yt(t,e),t.prototype.children=["attempt","recovery","ensure"],t.prototype.isStatement=J,t.prototype.jumps=function(e){var t;return this.attempt.jumps(e)||(null!=(t=this.recovery)?t.jumps(e):void 0)},t.prototype.makeReturn=function(e){return this.attempt&&(this.attempt=this.attempt.makeReturn(e)),this.recovery&&(this.recovery=this.recovery.makeReturn(e)),this},t.prototype.compileNode=function(e){var t,n,s,r;return e.indent+=H,r=this.attempt.compileToFragments(e,N),t=this.recovery?(s=new x("_error"),this.errorVariable?this.recovery.unshift(new i(this.errorVariable,s)):void 0,[].concat(this.makeCode(" catch ("),s.compileToFragments(e),this.makeCode(") {\n"),this.recovery.compileToFragments(e,N),this.makeCode("\n"+this.tab+"}"))):this.ensure||this.recovery?[]:[this.makeCode(" catch (_error) {}")],n=this.ensure?[].concat(this.makeCode(" finally {\n"),this.ensure.compileToFragments(e,N),this.makeCode("\n"+this.tab+"}")):[],[].concat(this.makeCode(""+this.tab+"try {\n"),r,this.makeCode("\n"+this.tab+"}"),t,n)},t}(s),e.Throw=W=function(e){function t(e){this.expression=e}return yt(t,e),t.prototype.children=["expression"],t.prototype.isStatement=J,t.prototype.jumps=S,t.prototype.makeReturn=G,t.prototype.compileNode=function(e){return[].concat(this.makeCode(this.tab+"throw "),this.expression.compileToFragments(e),this.makeCode(";"))},t}(s),e.Existence=p=function(e){function t(e){this.expression=e}return yt(t,e),t.prototype.children=["expression"],t.prototype.invert=D,t.prototype.compileNode=function(e){var t,n,i,s;return this.expression.front=this.front,i=this.expression.compile(e,F),m.test(i)&&!e.scope.check(i)?(s=this.negated?["===","||"]:["!==","&&"],t=s[0],n=s[1],i="typeof "+i+" "+t+' "undefined" '+n+" "+i+" "+t+" null"):i=""+i+" "+(this.negated?"==":"!=")+" null",[this.makeCode(e.level<=T?i:"("+i+")")]},t}(s),e.Parens=_=function(e){function t(e){this.body=e}return yt(t,e),t.prototype.children=["body"],t.prototype.unwrap=function(){return this.body},t.prototype.isComplex=function(){return this.body.isComplex()},t.prototype.compileNode=function(e){var t,n,i;return n=this.body.unwrap(),n instanceof K&&n.isAtomic()?(n.front=this.front,n.compileToFragments(e)):(i=n.compileToFragments(e,L),t=e.level<F&&(n instanceof A||n instanceof o||n instanceof f&&n.returns),t?i:this.wrapInBraces(i))},t}(s),e.For=f=function(e){function t(e,t){var n;this.source=t.source,this.guard=t.guard,this.step=t.step,this.name=t.name,this.index=t.index,this.body=r.wrap([e]),this.own=!!t.own,this.object=!!t.object,this.object&&(n=[this.index,this.name],this.name=n[0],this.index=n[1]),this.index instanceof K&&this.index.error("index cannot be a pattern matching expression"),this.range=this.source instanceof K&&this.source.base instanceof O&&!this.source.properties.length,this.pattern=this.name instanceof K,this.range&&this.index&&this.index.error("indexes do not apply to range loops"),this.range&&this.pattern&&this.name.error("cannot pattern match over range loops"),this.own&&!this.object&&this.index.error("cannot use own with for-in"),this.returns=!1}return yt(t,e),t.prototype.children=["body","source","guard","step"],t.prototype.compileNode=function(e){var t,n,s,o,a,c,h,l,u,p,d,f,b,k,y,v,w,T,F,L,E,D,S,R,A,I,$,O,B,V,P,U,q,G;return t=r.wrap([this.body]),T=null!=(q=rt(t.expressions))?q.jumps():void 0,T&&T instanceof j&&(this.returns=!1),$=this.range?this.source.base:this.source,I=e.scope,L=this.name&&this.name.compile(e,C),k=this.index&&this.index.compile(e,C),L&&!this.pattern&&I.find(L),k&&I.find(k),this.returns&&(A=I.freeVariable("results")),y=this.object&&k||I.freeVariable("i"),v=this.range&&L||k||y,w=v!==y?""+v+" = ":"",this.step&&!this.range&&(G=this.cacheToCodeFragments(this.step.cache(e,C)),O=G[0],V=G[1],B=V.match(M)),this.pattern&&(L=y),U="",d="",h="",f=this.tab+H,this.range?p=$.compileToFragments(at(e,{index:y,name:L,step:this.step})):(P=this.source.compile(e,C),!L&&!this.own||m.test(P)||(h+=""+this.tab+(D=I.freeVariable("ref"))+" = "+P+";\n",P=D),L&&!this.pattern&&(E=""+L+" = "+P+"["+v+"]"),this.object||(O!==V&&(h+=""+this.tab+O+";\n"),this.step&&B&&(u=0>+B)||(F=I.freeVariable("len")),a=""+w+y+" = 0, "+F+" = "+P+".length",c=""+w+y+" = "+P+".length - 1",s=""+y+" < "+F,o=""+y+" >= 0",this.step?(B?u&&(s=o,a=c):(s=""+V+" > 0 ? "+s+" : "+o,a="("+V+" > 0 ? ("+a+") : "+c+")"),b=""+y+" += "+V):b=""+(v!==y?"++"+y:""+y+"++"),p=[this.makeCode(""+a+"; "+s+"; "+w+b)])),this.returns&&(S=""+this.tab+A+" = [];\n",R="\n"+this.tab+"return "+A+";",t.makeReturn(A)),this.guard&&(t.expressions.length>1?t.expressions.unshift(new g(new _(this.guard).invert(),new x("continue"))):this.guard&&(t=r.wrap([new g(this.guard,t)]))),this.pattern&&t.expressions.unshift(new i(this.name,new x(""+P+"["+v+"]"))),l=[].concat(this.makeCode(h),this.pluckDirectCall(e,t)),E&&(U="\n"+f+E+";"),this.object&&(p=[this.makeCode(""+v+" in "+P)],this.own&&(d="\n"+f+"if (!"+dt("hasProp")+".call("+P+", "+v+")) continue;")),n=t.compileToFragments(at(e,{indent:f}),N),n&&n.length>0&&(n=[].concat(this.makeCode("\n"),n,this.makeCode("\n"))),[].concat(l,this.makeCode(""+(S||"")+this.tab+"for ("),p,this.makeCode(") {"+d+U),n,this.makeCode(""+this.tab+"}"+(R||"")))},t.prototype.pluckDirectCall=function(e,t){var n,s,r,a,c,l,u,p,d,f,m,b,k,g,y;for(s=[],f=t.expressions,c=p=0,d=f.length;d>p;c=++p)r=f[c],r=r.unwrapAll(),r instanceof o&&(u=r.variable.unwrapAll(),(u instanceof h||u instanceof K&&(null!=(m=u.base)?m.unwrapAll():void 0)instanceof h&&1===u.properties.length&&("call"===(b=null!=(k=u.properties[0].name)?k.value:void 0)||"apply"===b))&&(a=(null!=(g=u.base)?g.unwrapAll():void 0)||u,l=new x(e.scope.freeVariable("fn")),n=new K(l),u.base&&(y=[n,u],u.base=y[0],n=y[1]),t.expressions[c]=new o(n,r.args),s=s.concat(this.makeCode(this.tab),new i(l,a).compileToFragments(e,N),this.makeCode(";\n"))));return s},t}(z),e.Switch=q=function(e){function t(e,t,n){this.subject=e,this.cases=t,this.otherwise=n}return yt(t,e),t.prototype.children=["subject","cases","otherwise"],t.prototype.isStatement=J,t.prototype.jumps=function(e){var t,n,i,s,r,o,a;for(null==e&&(e={block:!0}),r=this.cases,i=0,s=r.length;s>i;i++)if(o=r[i],n=o[0],t=o[1],t.jumps(e))return t;return null!=(a=this.otherwise)?a.jumps(e):void 0},t.prototype.makeReturn=function(e){var t,n,i,s,o;for(s=this.cases,n=0,i=s.length;i>n;n++)t=s[n],t[1].makeReturn(e);return e&&(this.otherwise||(this.otherwise=new r([new x("void 0")]))),null!=(o=this.otherwise)&&o.makeReturn(e),this},t.prototype.compileNode=function(e){var t,n,i,s,r,o,a,c,h,l,u,p,d,f,m,b;for(c=e.indent+H,h=e.indent=c+H,o=[].concat(this.makeCode(this.tab+"switch ("),this.subject?this.subject.compileToFragments(e,L):this.makeCode("false"),this.makeCode(") {\n")),f=this.cases,a=l=0,p=f.length;p>l;a=++l){for(m=f[a],s=m[0],t=m[1],b=it([s]),u=0,d=b.length;d>u;u++)i=b[u],this.subject||(i=i.invert()),o=o.concat(this.makeCode(c+"case "),i.compileToFragments(e,L),this.makeCode(":\n"));if((n=t.compileToFragments(e,N)).length>0&&(o=o.concat(n,this.makeCode("\n"))),a===this.cases.length-1&&!this.otherwise)break;r=this.lastNonComment(t.expressions),r instanceof j||r instanceof x&&r.jumps()&&"debugger"!==r.value||o.push(i.makeCode(h+"break;\n"))}return this.otherwise&&this.otherwise.expressions.length&&o.push.apply(o,[this.makeCode(c+"default:\n")].concat(wt.call(this.otherwise.compileToFragments(e,N)),[this.makeCode("\n")])),o.push(this.makeCode(this.tab+"}")),o},t}(s),e.If=g=function(e){function t(e,t,n){this.body=t,null==n&&(n={}),this.condition="unless"===n.type?e.invert():e,this.elseBody=null,this.isChain=!1,this.soak=n.soak}return yt(t,e),t.prototype.children=["condition","body","elseBody"],t.prototype.bodyNode=function(){var e;return null!=(e=this.body)?e.unwrap():void 0},t.prototype.elseBodyNode=function(){var e;return null!=(e=this.elseBody)?e.unwrap():void 0},t.prototype.addElse=function(e){return this.isChain?this.elseBodyNode().addElse(e):(this.isChain=e instanceof t,this.elseBody=this.ensureBlock(e)),this},t.prototype.isStatement=function(e){var t;return(null!=e?e.level:void 0)===N||this.bodyNode().isStatement(e)||(null!=(t=this.elseBodyNode())?t.isStatement(e):void 0)},t.prototype.jumps=function(e){var t;return this.body.jumps(e)||(null!=(t=this.elseBody)?t.jumps(e):void 0)},t.prototype.compileNode=function(e){return this.isStatement(e)?this.compileStatement(e):this.compileExpression(e)},t.prototype.makeReturn=function(e){return e&&(this.elseBody||(this.elseBody=new r([new x("void 0")]))),this.body&&(this.body=new r([this.body.makeReturn(e)])),this.elseBody&&(this.elseBody=new r([this.elseBody.makeReturn(e)])),this},t.prototype.ensureBlock=function(e){return e instanceof r?e:new r([e])},t.prototype.compileStatement=function(e){var n,i,s,r,o,a,c;return s=et(e,"chainChild"),(o=et(e,"isExistentialEquals"))?new t(this.condition.invert(),this.elseBodyNode(),{type:"if"}).compileToFragments(e):(c=e.indent+H,r=this.condition.compileToFragments(e,L),i=this.ensureBlock(this.body).compileToFragments(at(e,{indent:c})),a=[].concat(this.makeCode("if ("),r,this.makeCode(") {\n"),i,this.makeCode("\n"+this.tab+"}")),s||a.unshift(this.makeCode(this.tab)),this.elseBody?(n=a.concat(this.makeCode(" else ")),this.isChain?(e.chainChild=!0,n=n.concat(this.elseBody.unwrap().compileToFragments(e,N))):n=n.concat(this.makeCode("{\n"),this.elseBody.compileToFragments(at(e,{indent:c}),N),this.makeCode("\n"+this.tab+"}")),n):a)},t.prototype.compileExpression=function(e){var t,n,i,s;return i=this.condition.compileToFragments(e,T),n=this.bodyNode().compileToFragments(e,C),t=this.elseBodyNode()?this.elseBodyNode().compileToFragments(e,C):[this.makeCode("void 0")],s=i.concat(this.makeCode(" ? "),n,this.makeCode(" : "),t),e.level>=T?this.wrapInBraces(s):s},t.prototype.unfoldSoak=function(){return this.soak&&this},t}(s),c={wrap:function(e,n,i){var s,a,c,l,u;return e.jumps()?e:(l=new h([],r.wrap([e])),s=[],a=e.contains(this.isLiteralArguments),a&&e.classBody&&a.error("Class bodies shouldn't reference arguments"),(a||e.contains(this.isLiteralThis))&&(u=new x(a?"apply":"call"),s=[new x("this")],a&&s.push(new x("arguments")),l=new K(l,[new t(u)])),l.noReturn=i,c=new o(l,s),n?r.wrap([c]):c)},isLiteralArguments:function(e){return e instanceof x&&"arguments"===e.value&&!e.asKey},isLiteralThis:function(e){return e instanceof x&&"this"===e.value&&!e.asKey||e instanceof h&&e.bound||e instanceof o&&e.isSuper}},pt=function(e,t,n){var i;if(i=t[n].unfoldSoak(e))return t[n]=i.body,i.body=new K(t),i},Y={"extends":function(){return"function(child, parent) { for (var key in parent) { if ("+dt("hasProp")+".call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; }"},bind:function(){return"function(fn, me){ return function(){ return fn.apply(me, arguments); }; }"},indexOf:function(){return"[].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; }"},hasProp:function(){return"{}.hasOwnProperty"},slice:function(){return"[].slice"}},N=1,L=2,C=3,T=4,F=5,w=6,H="  ",b="[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*",m=RegExp("^"+b+"$"),M=/^[+-]?\d+$/,E=RegExp("^(?:("+b+")\\.prototype(?:\\.("+b+")|\\[(\"(?:[^\\\\\"\\r\\n]|\\\\.)*\"|'(?:[^\\\\'\\r\\n]|\\\\.)*')\\]|\\[(0x[\\da-fA-F]+|\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\]))|("+b+")$"),k=/^['"]/,dt=function(e){var t;return t="__"+e,V.root.assign(t,Y[e]()),t},ct=function(e,t){return e=e.replace(/\n/g,"$&"+t),e.replace(/\s+$/,"")}}.call(this),t.exports}(),require["./sourcemap"]=function(){var e={},t={exports:e};return function(){var e,n;e=function(){function e(e){this.line=e,this.columns=[]}return e.prototype.add=function(e,t,n){var i,s;return s=t[0],i=t[1],null==n&&(n={}),this.columns[e]&&n.noReplace?void 0:this.columns[e]={line:this.line,column:e,sourceLine:s,sourceColumn:i}},e.prototype.sourceLocation=function(e){for(var t;!((t=this.columns[e])||0>=e);)e--;return t&&[t.sourceLine,t.sourceColumn]},e}(),n=function(){function t(){this.lines=[]}var n,i,s,r;return t.prototype.add=function(t,n,i){var s,r,o,a;return null==i&&(i={}),r=n[0],s=n[1],o=(a=this.lines)[r]||(a[r]=new e(r)),o.add(s,t,i)},t.prototype.sourceLocation=function(e){var t,n,i;for(n=e[0],t=e[1];!((i=this.lines[n])||0>=n);)n--;return i&&i.sourceLocation(t)},t.prototype.generate=function(e,t){var n,i,s,r,o,a,c,h,l,u,p,d,f,m,b,k;for(null==e&&(e={}),null==t&&(t=null),u=0,i=0,r=0,s=0,h=!1,n="",b=this.lines,a=p=0,f=b.length;f>p;a=++p)if(o=b[a])for(k=o.columns,d=0,m=k.length;m>d;d++)if(c=k[d]){for(;u<c.line;)i=0,h=!1,n+=";",u++;h&&(n+=",",h=!1),n+=this.encodeVlq(c.column-i),i=c.column,n+=this.encodeVlq(0),n+=this.encodeVlq(c.sourceLine-r),r=c.sourceLine,n+=this.encodeVlq(c.sourceColumn-s),s=c.sourceColumn,h=!0}return l={version:3,file:e.generatedFile||"",sourceRoot:e.sourceRoot||"",sources:e.sourceFiles||[""],names:[],mappings:n},e.inline&&(l.sourcesContent=[t]),JSON.stringify(l,null,2)},s=5,i=1<<s,r=i-1,t.prototype.encodeVlq=function(e){var t,n,o,a;for(t="",o=0>e?1:0,a=(Math.abs(e)<<1)+o;a||!t;)n=a&r,a>>=s,a&&(n|=i),t+=this.encodeBase64(n);return t},n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t.prototype.encodeBase64=function(e){return n[e]||function(){throw new Error("Cannot Base64 encode value: "+e)}()},t}(),t.exports=n}.call(this),t.exports}(),require["./coffee-script"]=function(){var e={},t={exports:e};return function(){var t,n,i,s,r,o,a,c,h,l,u,p,d,f,m,b,k,g,y,v,w,T,C={}.hasOwnProperty;if(l=require("fs"),y=require("vm"),k=require("path"),s=require("child_process"),t=require("./lexer").Lexer,f=require("./parser").parser,u=require("./helpers"),i=require("./sourcemap"),e.VERSION="1.6.3",e.helpers=u,e.compile=r=function(e,t){var n,s,r,o,a,c,h,l,d,m,b,k;for(null==t&&(t={}),d=u.merge,t.sourceMap&&(l=new i),a=f.parse(p.tokenize(e,t)).compileToFragments(t),r=0,t.header&&(r+=1),t.shiftLine&&(r+=1),s=0,h="",b=0,k=a.length;k>b;b++)o=a[b],t.sourceMap&&(o.locationData&&l.add([o.locationData.first_line,o.locationData.first_column],[r,s],{noReplace:!0}),m=u.count(o.code,"\n"),r+=m,s=o.code.length-(m?o.code.lastIndexOf("\n"):0)),h+=o.code;return t.header&&(c="Generated by CoffeeScript "+this.VERSION,h="// "+c+"\n"+h),t.sourceMap?(n={js:h},n.sourceMap=l,n.v3SourceMap=l.generate(t,e),n):h},e.tokens=function(e,t){return p.tokenize(e,t)},e.nodes=function(e,t){return"string"==typeof e?f.parse(p.tokenize(e,t)):f.parse(e)},e.run=function(e,t){var n,i;return null==t&&(t={}),i=require.main,null==t.sourceMap&&(t.sourceMap=!0),i.filename=process.argv[1]=t.filename?l.realpathSync(t.filename):".",i.moduleCache&&(i.moduleCache={}),i.paths=require("module")._nodeModulePaths(k.dirname(l.realpathSync(t.filename||"."))),!u.isCoffee(i.filename)||require.extensions?(n=r(e,t),m(),g[i.filename]=n.sourceMap,i._compile(n.js,i.filename)):i._compile(e,i.filename)},e.eval=function(e,t){var n,i,s,o,a,c,h,l,u,p,d,f,m,b;if(null==t&&(t={}),e=e.trim()){if(i=y.Script){if(null!=t.sandbox){if(t.sandbox instanceof i.createContext().constructor)h=t.sandbox;else{h=i.createContext(),f=t.sandbox;for(o in f)C.call(f,o)&&(l=f[o],h[o]=l)}h.global=h.root=h.GLOBAL=h}else h=global;if(h.__filename=t.filename||"eval",h.__dirname=k.dirname(h.__filename),h===global&&!h.module&&!h.require){for(n=require("module"),h.module=d=new n(t.modulename||"eval"),h.require=b=function(e){return n._load(e,d,!0)},d.filename=h.__filename,m=Object.getOwnPropertyNames(require),u=0,p=m.length;p>u;u++)c=m[u],"paths"!==c&&(b[c]=require[c]);b.paths=d.paths=n._nodeModulePaths(process.cwd()),b.resolve=function(e){return n._resolveFilename(e,d)}}}a={};for(o in t)C.call(t,o)&&(l=t[o],a[o]=l);return a.bare=!0,s=r(e,a),h===global?y.runInThisContext(s):y.runInContext(s,h)}},d=function(e,t){var n,i,s;return i=l.readFileSync(t,"utf8"),s=65279===i.charCodeAt(0)?i.substring(1):i,n=r(s,{filename:t,sourceMap:!0,literate:u.isLiterate(t)}),g[t]=n.sourceMap,e._compile(n.js,t)},require.extensions){for(T=[".coffee",".litcoffee",".coffee.md"],v=0,w=T.length;w>v;v++)o=T[v],require.extensions[o]=d;n=require("module"),a=function(e){var t,i;for(i=k.basename(e).split("."),""===i[0]&&i.shift();i.shift();)if(t="."+i.join("."),n._extensions[t])return t;return".js"},n.prototype.load=function(e){var t;return this.filename=e,this.paths=n._nodeModulePaths(k.dirname(e)),t=a(e),n._extensions[t](this,e),this.loaded=!0}}s&&(c=s.fork,s.fork=function(e,t,n){var i;return null==t&&(t=[]),null==n&&(n={}),i=u.isCoffee(e)?"coffee":null,Array.isArray(t)||(t=[],n=t||{}),n.execPath||(n.execPath=i),c(e,t,n)}),p=new t,f.lexer={lex:function(){var e,t;return t=this.tokens[this.pos++],t?(e=t[0],this.yytext=t[1],this.yylloc=t[2],this.yylineno=this.yylloc.first_line):e="",e},setInput:function(e){return this.tokens=e,this.pos=0},upcomingInput:function(){return""}},f.yy=require("./nodes"),f.yy.parseError=function(e,t){var n;return n=t.token,e="unexpected "+(1===n?"end of input":n),u.throwSyntaxError(e,f.lexer.yylloc)},b=!1,g={},m=function(){var t;if(!b)return b=!0,t=require.main,Error.prepareStackTrace=function(t,n){var i,s,r,o,a;return o={},r=function(e,t,n){var i,s;return s=g[e],s&&(i=s.sourceLocation([t-1,n-1])),i?[i[0]+1,i[1]+1]:null},s=function(){var t,s,o;for(o=[],t=0,s=n.length;s>t&&(i=n[t],i.getFunction()!==e.run);t++)o.push("  at "+h(i,r));return o}(),""+t.name+": "+(null!=(a=t.message)?a:"")+"\n"+s.join("\n")+"\n"}},h=function(e,t){var n,i,s,r,o,a,c,h,l,u,p,d;return r=void 0,s="",e.isNative()?s="native":(e.isEval()?(r=e.getScriptNameOrSourceURL(),r||(s=""+e.getEvalOrigin()+", ")):r=e.getFileName(),r||(r="<anonymous>"),h=e.getLineNumber(),i=e.getColumnNumber(),u=t(r,h,i),s=u?""+r+":"+u[0]+":"+u[1]+", <js>:"+h+":"+i:""+r+":"+h+":"+i),o=e.getFunctionName(),a=e.isConstructor(),c=!(e.isToplevel()||a),c?(l=e.getMethodName(),d=e.getTypeName(),o?(p=n="",d&&o.indexOf(d)&&(p=""+d+"."),l&&o.indexOf("."+l)!==o.length-l.length-1&&(n=" [as "+l+"]"),""+p+o+n+" ("+s+")"):""+d+"."+(l||"<anonymous>")+" ("+s+")"):a?"new "+(o||"<anonymous>")+" ("+s+")":o?""+o+" ("+s+")":s}}.call(this),t.exports}(),require["./browser"]=function(){var exports={},module={exports:exports};return function(){var CoffeeScript,compile,runScripts,__indexOf=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};CoffeeScript=require("./coffee-script"),CoffeeScript.require=require,compile=CoffeeScript.compile,CoffeeScript.eval=function(code,options){return null==options&&(options={}),null==options.bare&&(options.bare=!0),eval(compile(code,options))},CoffeeScript.run=function(e,t){return null==t&&(t={}),t.bare=!0,t.shiftLine=!0,Function(compile(e,t))()},"undefined"!=typeof window&&null!==window&&("undefined"!=typeof btoa&&null!==btoa&&"undefined"!=typeof JSON&&null!==JSON&&"undefined"!=typeof unescape&&null!==unescape&&"undefined"!=typeof encodeURIComponent&&null!==encodeURIComponent&&(compile=function(e,t){var n,i,s;return null==t&&(t={}),t.sourceMap=!0,t.inline=!0,s=CoffeeScript.compile(e,t),n=s.js,i=s.v3SourceMap,""+n+"\n//@ sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(i)))+"\n//@ sourceURL=coffeescript"}),CoffeeScript.load=function(e,t,n){var i;return null==n&&(n={}),n.sourceFiles=[e],i=window.ActiveXObject?new window.ActiveXObject("Microsoft.XMLHTTP"):new window.XMLHttpRequest,i.open("GET",e,!0),"overrideMimeType"in i&&i.overrideMimeType("text/plain"),i.onreadystatechange=function(){var s;if(4===i.readyState){if(0!==(s=i.status)&&200!==s)throw new Error("Could not load "+e);if(CoffeeScript.run(i.responseText,n),t)return t()}},i.send(null)},runScripts=function(){var e,t,n,i,s,r,o;return o=window.document.getElementsByTagName("script"),t=["text/coffeescript","text/literate-coffeescript"],e=function(){var e,n,i,s;
for(s=[],e=0,n=o.length;n>e;e++)r=o[e],i=r.type,__indexOf.call(t,i)>=0&&s.push(r);return s}(),i=0,s=e.length,(n=function(){var s,r,o;return o=e[i++],s=null!=o?o.type:void 0,__indexOf.call(t,s)>=0?(r={literate:"text/literate-coffeescript"===s},o.src?CoffeeScript.load(o.src,n,r):(r.sourceFiles=["embedded"],CoffeeScript.run(o.innerHTML,r),n())):void 0})(),null},window.addEventListener?window.addEventListener("DOMContentLoaded",runScripts,!1):window.attachEvent("onload",runScripts))}.call(this),module.exports}(),require["./coffee-script"]}();"function"==typeof define&&define.amd?define(function(){return CoffeeScript}):root.CoffeeScript=CoffeeScript}(this);
},{}],"CLQAaQ":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var asite, coffeeScript, d3, js, result, src, _;

d3 = require("d3");

_ = require("underscore");

asite = exports;

coffeeScript = require("./coffee-script.js");

coffeeScript = coffeeScript.CoffeeScript;

src = "debugger\na = -> \na()";

result = coffeeScript.compile(src, {
  sourceMap: true
});

js = "" + result.js + "\n//@ sourceURL=asite://asite/foo.js";

eval(js);

},{"./coffee-script.js":5,"d3":2,"underscore":3}]},{},[])
//# sourceMappingURL=asite.js.map
;