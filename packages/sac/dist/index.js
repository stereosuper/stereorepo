(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Highway", [], factory);
	else if(typeof exports === 'object')
		exports["Highway"] = factory();
	else
		root["Highway"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function() {
'use strict';

// Exit early if we're not running in a browser.
if (typeof window !== 'object') {
  return;
}

// Exit early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * A local reference to the document.
 */
var document = window.document;


/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observing a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }

  if (parent && parent.assignedSlot) {
    // If the parent is distributed in a <slot>, return the parent of a slot.
    return parent.assignedSlot.parentNode;
  }

  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}());


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob:
    'FileReader' in self &&
    'Blob' in self &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    var parts = line.split(':')
    var key = parts.shift().trim()
    if (key) {
      var value = parts.join(':').trim()
      headers.append(key, value)
    }
  })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : 'OK'
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = self.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      resolve(new Response(body, options))
    }

    xhr.onerror = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.onabort = function() {
      reject(new DOMException('Aborted', 'AbortError'))
    }

    xhr.open(request.method, request.url, true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob'
    }

    request.headers.forEach(function(value, name) {
      xhr.setRequestHeader(name, value)
    })

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!self.fetch) {
  self.fetch = fetch
  self.Headers = Headers
  self.Request = Request
  self.Response = Response
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/async.js
/* harmony default export */ var src_async = ({});
// CONCATENATED MODULE: ./src/core.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// NOTE: Functions not calling any other functions.
var createCrossBrowserEvent = function createCrossBrowserEvent(name) {
  var crossBrowserEvent;

  if (typeof window.CustomEvent === 'function') {
    crossBrowserEvent = function crossBrowserEvent(eventName) {
      var e = new Event(eventName);

      if (typeof Event !== 'function') {
        e = document.createEvent('Event');
        e.initEvent(eventName, true, true);
      }

      return e;
    };
  } else {
    // ie 11
    crossBrowserEvent = function crossBrowserEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    crossBrowserEvent.prototype = window.Event.prototype;
    window.CustomEvent = crossBrowserEvent;
  }

  return crossBrowserEvent(name);
};
var forEach = function forEach(arr, callback) {
  var i = 0;
  var length = arr.length;

  while (i < length) {
    callback(arr[i], i);
    i += 1;
  }
};
/**
 * @description get display state of one element
 */

var isDisplayed = function isDisplayed(element) {
  return getComputedStyle(element).display !== 'none';
};
var nodeIndex = function nodeIndex(node) {
  return _toConsumableArray(node.parentNode.children).indexOf(node);
};
var query = function query(_ref) {
  var selector = _ref.selector,
      ctx = _ref.ctx;
  var classes = selector.substr(1).replace(/\./g, ' ');
  var context = ctx || document; // Redirect simple selectors to the more performant function

  if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
    switch (selector.charAt(0)) {
      case '#':
        // Handle ID-based selectors
        return [document.getElementById(selector.substr(1))];

      case '.':
        // Handle class-based selectors
        // Query by multiple classes by converting the selector
        // string into single spaced class names
        return _toConsumableArray(context.getElementsByClassName(classes));

      default:
        // Handle tag-based selectors
        return _toConsumableArray(context.getElementsByTagName(selector));
    }
  } // Default to `querySelectorAll`


  return _toConsumableArray(context.querySelectorAll(selector));
};
var requestAnimFrame = function requestAnimFrame(callback) {
  var anim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  return anim(callback);
};
function supportsWebp() {
  return _supportsWebp.apply(this, arguments);
}

function _supportsWebp() {
  _supportsWebp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var webpData, blob;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (self.createImageBitmap) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", false);

          case 2:
            webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
            _context.next = 5;
            return fetch(webpData).then(function (response) {
              return response.blob();
            });

          case 5:
            blob = _context.sent;
            return _context.abrupt("return", createImageBitmap(blob).then(function () {
              return true;
            }, function () {
              return false;
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _supportsWebp.apply(this, arguments);
}

var throttle = function throttle(_ref2) {
  var callback = _ref2.callback,
      delay = _ref2.delay;
  var last;
  var timer;
  return function throttleFunction() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var now = +new Date();

    var reset = function reset() {
      last = now;
      callback.apply(_this, args);
    };

    if (last && now < last + delay) {
      // le délai n'est pas écoulé on reset le timer
      clearTimeout(timer);
      timer = setTimeout(reset, delay);
    } else {
      reset();
    }
  };
}; // NOTE: Functions calling functions defined above.

/**
 * @description calls a function if the selector exists
 * @param {*} { identifier, callback }
 * @returns
 */

var bodyRouter = function bodyRouter(_ref3) {
  var identifier = _ref3.identifier,
      callback = _ref3.callback;
  if (!identifier) return;

  var _query = query({
    selector: identifier
  }),
      _query2 = _slicedToArray(_query, 1),
      hasIdentifier = _query2[0];

  if (!hasIdentifier || !callback) return;
  callback();
};
/* harmony default export */ var core = ({
  bodyRouter: bodyRouter,
  createCrossBrowserEvent: createCrossBrowserEvent,
  forEach: forEach,
  isDisplayed: isDisplayed,
  nodeIndex: nodeIndex,
  query: query,
  requestAnimFrame: requestAnimFrame,
  supportsWebp: supportsWebp,
  throttle: throttle
});
// CONCATENATED MODULE: ./src/parsing.js
var camalize = function camalize(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (m, chr) {
    return chr.toUpperCase();
  });
};
var reverseString = function reverseString(str) {
  return str.split('').reverse().join('');
};
/* harmony default export */ var parsing = ({
  camalize: camalize,
  reverseString: reverseString
});
// CONCATENATED MODULE: ./src/math.js
var roundNumbers = function roundNumbers(_ref) {
  var number = _ref.number,
      decimalOffset = _ref.decimalOffset;
  var decimalsFactor = Math.pow(10, decimalOffset);
  return Math.round(number * decimalsFactor) / decimalsFactor;
};
/* harmony default export */ var math = ({
  roundNumbers: roundNumbers
});
// CONCATENATED MODULE: ./src/components/Error.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SuperError =
/*#__PURE__*/
function (_Error) {
  _inherits(SuperError, _Error);

  function SuperError(message) {
    var _this;

    _classCallCheck(this, SuperError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SuperError).call(this, message));
    _this.name = 'SuperError';
    _this.message = message;
    return _this;
  }

  _createClass(SuperError, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        error: {
          name: this.name,
          message: this.message,
          stacktrace: this.stack
        }
      };
    }
  }]);

  return SuperError;
}(_wrapNativeSuper(Error));

/* harmony default export */ var components_Error = (SuperError);
// CONCATENATED MODULE: ./src/components/Snif.js
function Snif_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Snif_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Snif_createClass(Constructor, protoProps, staticProps) { if (protoProps) Snif_defineProperties(Constructor.prototype, protoProps); if (staticProps) Snif_defineProperties(Constructor, staticProps); return Constructor; }

var Snif =
/*#__PURE__*/
function () {
  function Snif() {
    Snif_classCallCheck(this, Snif);

    this.body = document.body;
    var uA = navigator.userAgent.toLowerCase();
    this.snifTests = {
      isIOS: /iphone|ipad|ipod/i.test(uA),
      isSafari: !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== 'undefined' && !window.chrome || /a/.__proto__ == '//',
      isBlackberry: /blackberry/i.test(uA),
      isMobileIE: /iemobile/i.test(uA),
      isFF: 'MozAppearance' in document.documentElement.style,
      isMS: '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style,
      mixBlendModeSupport: 'CSS' in window && 'supports' in window.CSS && window.CSS.supports('mix-blend-mode', 'multiply'),
      isMobileAndroid: /android.*mobile/.test(uA),
      safari: uA.match(/version\/[\d\.]+.*safari/),
      isChrome: !!window.chrome && !!window.chrome.webstore
    };
    this.snifTests.isAndroid = this.snifTests.isMobileAndroid || !this.snifTests.isMobileAndroid && /android/i.test(uA);
    this.snifTests.isSafari = !!this.snifTests.safari && !this.snifTests.isAndroid;
  }

  Snif_createClass(Snif, [{
    key: "isIOS",
    value: function isIOS() {
      return this.snifTests.isIOS;
    }
  }, {
    key: "isAndroid",
    value: function isAndroid() {
      return this.snifTests.isIOS;
    }
  }, {
    key: "isChrome",
    value: function isChrome() {
      return this.snifTests.isChrome;
    }
  }, {
    key: "isMobile",
    value: function isMobile() {
      return this.snifTests.isMobileAndroid || this.snifTests.isBlackberry || this.snifTests.isIOS || this.snifTests.isMobileIE;
    }
  }, {
    key: "isChromeAndroid",
    value: function isChromeAndroid() {
      return this.snifTests.isMobileAndroid && this.isChrome();
    }
  }, {
    key: "isSafari",
    value: function isSafari() {
      return this.snifTests.isSafari;
    }
  }, {
    key: "isFF",
    value: function isFF() {
      return this.snifTests.isFF;
    }
  }, {
    key: "isMS",
    value: function isMS() {
      return this.snifTests.isMS;
    }
  }, {
    key: "mixBlendModeSupport",
    value: function mixBlendModeSupport() {
      return this.snifTests.mixBlendModeSupport;
    }
  }, {
    key: "isIe11",
    value: function isIe11() {
      return this.body.style.msTouchAction !== undefined;
    }
  }]);

  return Snif;
}();

/* harmony default export */ var components_Snif = (new Snif());
// CONCATENATED MODULE: ./src/components/Fallback.js
function Fallback_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Fallback_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Fallback_createClass(Constructor, protoProps, staticProps) { if (protoProps) Fallback_defineProperties(Constructor.prototype, protoProps); if (staticProps) Fallback_defineProperties(Constructor, staticProps); return Constructor; }



var Fallback_Fallback =
/*#__PURE__*/
function () {
  function Fallback() {
    Fallback_classCallCheck(this, Fallback);

    this.state = {
      fallbacksInitiated: false,
      webAudioApiInitiated: false
    };
    this.html = document.documentElement;
  }

  Fallback_createClass(Fallback, [{
    key: "initializeFallbacks",
    value: function initializeFallbacks() {
      if (!this.state.fallbacksInitiated) {
        if (components_Snif.isMobile()) {
          this.html.classList.add('is-touch');
        } else {
          this.html.classList.add('no-touch');
        }

        if (components_Snif.isIOS()) this.html.classList.add('is-ios');
        if (components_Snif.isSafari()) this.html.classList.add('is-safari');
        if (components_Snif.isFF()) this.html.classList.add('is-ff');
        if (components_Snif.isChromeAndroid()) this.html.classList.add('is-ca');
        if (components_Snif.isMS()) this.html.classList.add('is-ms');
        if (components_Snif.isIe11()) this.html.classList.add('is-ie'); // IE11 fallbacks

        if (!Element.prototype.matches) {
          Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }

        if (!Element.prototype.closest) {
          Element.prototype.closest = function closestPolyfill(s) {
            var el = this;

            do {
              if (el.matches(s)) return el;
              el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);

            return null;
          };
        }

        if (!Object.entries) {
          Object.entries = function entries(obj) {
            var ownProps = Object.keys(obj);
            var i = ownProps.length;
            var resArray = new Array(i);

            while (i--) {
              resArray[i] = [ownProps[i], obj[ownProps[i]]];
            }

            return resArray;
          };
        }

        this.state.fallbacksInitiated = true;
      }
    }
  }, {
    key: "initializeWebAudioApi",
    value: function initializeWebAudioApi() {
      if (!this.state.webAudioApiInitiated) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.state.webAudioApiInitiated = true;
      }
    }
  }]);

  return Fallback;
}();

/* harmony default export */ var components_Fallback = (new Fallback_Fallback());
// CONCATENATED MODULE: ./src/components/Window.js
function Window_toConsumableArray(arr) { return Window_arrayWithoutHoles(arr) || Window_iterableToArray(arr) || Window_nonIterableSpread(); }

function Window_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Window_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Window_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Window_slicedToArray(arr, i) { return Window_arrayWithHoles(arr) || Window_iterableToArrayLimit(arr, i) || Window_nonIterableRest(); }

function Window_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Window_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Window_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Window_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Window_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Window_createClass(Constructor, protoProps, staticProps) { if (protoProps) Window_defineProperties(Constructor.prototype, protoProps); if (staticProps) Window_defineProperties(Constructor, staticProps); return Constructor; }



var Window_Window =
/*#__PURE__*/
function () {
  function Window() {
    Window_classCallCheck(this, Window);

    this.currentBreakpoint = '';
    this.breakpoints = {
      horizontal: null,
      vertical: null
    };
    this.windowWidth = null;
    this.windowHeight = null;
    this.rtime = null;
    this.timeoutWindow = false;
    this.delta = 500;
    this.resizeFunctions = [];
    this.resizeEndFunctions = [];
    this.noTransitionElts = [];
    this.launchWindow = this.launchWindow.bind(this);
  }

  Window_createClass(Window, [{
    key: "setWindowSize",
    value: function setWindowSize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    }
  }, {
    key: "setBreakpointsToDOM",
    value: function setBreakpointsToDOM() {
      var _this = this;

      if (!this.breakpoints.horizontal) return;
      var currentBreakpoint = '';
      forEach(Object.entries(this.breakpoints.horizontal), function (breakpoint) {
        var _breakpoint = Window_slicedToArray(breakpoint, 2),
            name = _breakpoint[0],
            value = _breakpoint[1];

        if (_this.windowWidth > value) {
          currentBreakpoint = name;
        }
      });

      if (this.currentBreakpoint !== currentBreakpoint) {
        forEach(Object.entries(this.breakpoints.horizontal), function (_ref) {
          var _ref2 = Window_slicedToArray(_ref, 1),
              name = _ref2[0];

          document.documentElement.classList.remove("breakpoint-".concat(name));
        });
        this.currentBreakpoint = currentBreakpoint;
        document.documentElement.classList.add("breakpoint-".concat(this.currentBreakpoint));
      }
    }
  }, {
    key: "setBreakpoints",
    value: function setBreakpoints(_ref3) {
      var horizontal = _ref3.horizontal,
          vertical = _ref3.vertical;
      this.breakpoints.horizontal = _objectSpread({}, horizontal);
      this.breakpoints.vertical = _objectSpread({}, vertical);
      this.setBreakpointsToDOM();
    }
  }, {
    key: "setNoTransitionElts",
    value: function setNoTransitionElts(elements) {
      this.noTransitionElts = elements;
    }
  }, {
    key: "resizeEndBuffer",
    value: function resizeEndBuffer() {
      var _this2 = this;

      if (new Date() - this.rtime < this.delta) {
        setTimeout(function () {
          _this2.resizeEndBuffer();
        }, this.delta);
      } else {
        this.timeoutWindow = false;
        forEach(this.resizeEndFunctions, function (f) {
          if (f) {
            f();
          }
        });
        this.noTransitionClassHandler({
          hasClass: false
        });
      }
    }
  }, {
    key: "resizeEnd",
    value: function resizeEnd() {
      var _this3 = this;

      this.rtime = new Date();

      if (this.timeoutWindow === false) {
        this.timeoutWindow = true;
        setTimeout(function () {
          _this3.resizeEndBuffer();
        }, this.delta);
      }
    }
  }, {
    key: "noTransitionClassHandler",
    value: function noTransitionClassHandler(_ref4) {
      var hasClass = _ref4.hasClass;

      if (hasClass) {
        Window_toConsumableArray(this.noTransitionElts).map(function (el) {
          el.classList.add('no-transition');
          return el;
        });
      } else {
        Window_toConsumableArray(this.noTransitionElts).map(function (el) {
          el.classList.remove('no-transition');
          return el;
        });
      }
    }
  }, {
    key: "resizeHandler",
    value: function resizeHandler() {
      this.noTransitionClassHandler({
        hasClass: true
      });
      this.setWindowSize();
      this.setBreakpointsToDOM();
      forEach(this.resizeFunctions, function (f) {
        if (f) {
          f();
        }
      });
      this.resizeEnd();
    }
  }, {
    key: "addResizeFunction",
    value: function addResizeFunction(resizeFunction) {
      this.resizeFunctions.push(resizeFunction);
      return this.resizeFunctions.length - 1;
    }
  }, {
    key: "addResizeEndFunction",
    value: function addResizeEndFunction(resizeEndFunction) {
      this.resizeEndFunctions.push(resizeEndFunction);
      return this.resizeEndFunctions.length - 1;
    }
  }, {
    key: "removeResizeFunction",
    value: function removeResizeFunction(id) {
      this.resizeFunctions[id] = null;
    }
  }, {
    key: "removeResizeEndFunction",
    value: function removeResizeEndFunction(id) {
      this.resizeEndFunctions[id] = null;
    }
  }, {
    key: "launchWindow",
    value: function launchWindow() {
      var _this4 = this;

      requestAnimFrame(function () {
        _this4.resizeHandler();
      });
    }
  }, {
    key: "initializeWindow",
    value: function initializeWindow() {
      this.setWindowSize();
      this.setBreakpointsToDOM();
      window.addEventListener('resize', this.launchWindow, false);
    }
  }, {
    key: "destroyWindow",
    value: function destroyWindow() {
      window.removeEventListener('resize', this.launchWindow, false);
    }
  }]);

  return Window;
}();

/* harmony default export */ var components_Window = (new Window_Window());
// CONCATENATED MODULE: ./src/components/Scroll.js
function Scroll_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Scroll_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Scroll_createClass(Constructor, protoProps, staticProps) { if (protoProps) Scroll_defineProperties(Constructor.prototype, protoProps); if (staticProps) Scroll_defineProperties(Constructor, staticProps); return Constructor; }



var Scroll_Scroll =
/*#__PURE__*/
function () {
  function Scroll() {
    Scroll_classCallCheck(this, Scroll);

    this.scrollTop = null;
    this.event = null;
    this.timeoutScroll = null;
    this.scrollEnd = true;
    this.scrollFunctions = [];
    this.endFunctions = [];
  }

  Scroll_createClass(Scroll, [{
    key: "scrollHandler",
    value: function scrollHandler() {
      var _this = this;

      this.scrollTop = window.pageYOffset || window.scrollY;

      if (this.scrollEnd) {
        this.scrollEnd = false;
      }

      clearTimeout(this.timeoutScroll);
      this.timeoutScroll = setTimeout(function () {
        _this.onScrollEnd();
      }, 66);
      this.scrollFunctions.forEach(function (scrollFunction) {
        if (scrollFunction) {
          scrollFunction();
        }
      });
    }
  }, {
    key: "launchScroll",
    value: function launchScroll(event) {
      var _this2 = this;

      this.event = event;
      requestAnimFrame(function () {
        _this2.scrollHandler();
      });
    }
  }, {
    key: "initializeScroll",
    value: function initializeScroll() {
      var _this3 = this;

      this.scrollHandler();
      window.addEventListener('scroll', function () {
        _this3.launchScroll();
      }, false);
    }
  }, {
    key: "destroyScroll",
    value: function destroyScroll() {
      var _this4 = this;

      window.removeEventListener('scroll', function () {
        _this4.launchScroll();
      }, false);
    }
  }, {
    key: "onScrollEnd",
    value: function onScrollEnd() {
      this.scrollEnd = true;
      this.endFunctions.forEach(function (f) {
        if (f) {
          f();
        }
      });
    }
  }, {
    key: "addScrollFunction",
    value: function addScrollFunction(scrollFunction) {
      var onEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.scrollFunctions.push(scrollFunction);

      if (onEnd) {
        this.endFunctions.push(scrollFunction);
      }

      return this.scrollFunctions.length - 1;
    }
  }, {
    key: "addEndFunction",
    value: function addEndFunction(endFunction) {
      this.endFunctions.push(endFunction);
      return this.endFunctions.length - 1;
    }
  }, {
    key: "removeScrollFunction",
    value: function removeScrollFunction(id) {
      this.scrollFunctions[id] = null;
    }
  }, {
    key: "removeEndFunction",
    value: function removeEndFunction(id) {
      this.endFunctions[id] = null;
    }
  }]);

  return Scroll;
}();

/* harmony default export */ var components_Scroll = (new Scroll_Scroll());
// CONCATENATED MODULE: ./src/components/LoadHandler.js
function LoadHandler_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function LoadHandler_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function LoadHandler_createClass(Constructor, protoProps, staticProps) { if (protoProps) LoadHandler_defineProperties(Constructor.prototype, protoProps); if (staticProps) LoadHandler_defineProperties(Constructor, staticProps); return Constructor; }






var LoadHandler_LoadHandler =
/*#__PURE__*/
function () {
  function LoadHandler() {
    LoadHandler_classCallCheck(this, LoadHandler);

    this.state = {
      preloaded: false,
      loaded: false,
      animationsLaunched: false
    };
    this.callbacks = {
      preloadCallback: false,
      loadCallback: false,
      animationsCallback: false
    };
  }

  LoadHandler_createClass(LoadHandler, [{
    key: "preload",
    value: function preload(callback) {
      var _document = document,
          readyState = _document.readyState;
      if (readyState !== 'interactive' && readyState !== 'complete') return;
      this.state.preloaded = true;

      if (callback) {
        callback();
      }
    }
  }, {
    key: "load",
    value: function load(callback) {
      var _document2 = document,
          readyState = _document2.readyState;
      if (readyState !== 'complete') return;
      this.state.loaded = true;

      if (callback) {
        callback();

        if (this.callbacks.animationsCallback) {
          this.state.animationsLaunched = true;
          this.callbacks.animationsCallback();
        }
      }
    }
  }, {
    key: "initializeLoadingShit",
    value: function initializeLoadingShit(_ref) {
      var _this = this;

      var _ref$preloadCallback = _ref.preloadCallback,
          preloadCallback = _ref$preloadCallback === void 0 ? null : _ref$preloadCallback,
          _ref$loadCallback = _ref.loadCallback,
          loadCallback = _ref$loadCallback === void 0 ? null : _ref$loadCallback,
          _ref$animationsCallba = _ref.animationsCallback,
          animationsCallback = _ref$animationsCallba === void 0 ? null : _ref$animationsCallba,
          _ref$noTransElementsC = _ref.noTransElementsClass,
          noTransElementsClass = _ref$noTransElementsC === void 0 ? '.element-without-transition-on-resize' : _ref$noTransElementsC;
      this.callbacks.preloadCallback = preloadCallback;
      this.callbacks.loadCallback = loadCallback;
      this.callbacks.animationsCallback = animationsCallback;
      var noTransElem = query({
        selector: noTransElementsClass
      });
      components_Scroll.initializeScroll();
      components_Window.setNoTransitionElts(noTransElem);
      components_Window.initializeWindow();
      components_Fallback.initializeFallbacks();
      this.preload(this.callbacks.preloadCallback);
      this.load(this.callbacks.loadCallback);
      document.addEventListener('readystatechange', function () {
        if (!_this.state.preloaded) _this.preload(_this.callbacks.preloadCallback);
        if (!_this.state.loaded) _this.load(_this.callbacks.loadCallback);
      }, false);
    }
  }]);

  return LoadHandler;
}();

/* harmony default export */ var components_LoadHandler = (new LoadHandler_LoadHandler());
// CONCATENATED MODULE: ./src/components/Polyfill.js
function Polyfill_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Polyfill_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Polyfill_createClass(Constructor, protoProps, staticProps) { if (protoProps) Polyfill_defineProperties(Constructor.prototype, protoProps); if (staticProps) Polyfill_defineProperties(Constructor, staticProps); return Constructor; }

var Polyfill =
/*#__PURE__*/
function () {
  function Polyfill() {
    Polyfill_classCallCheck(this, Polyfill);

    this.state = {
      intersectionObserverInitiated: false,
      whatwgFetchInitiated: false
    };
  }

  Polyfill_createClass(Polyfill, [{
    key: "initializeIntersectionObserver",
    value: function initializeIntersectionObserver() {
      if (!this.state.intersectionObserverInitiated) {
        if (!window.IntersectionObserver) {
          __webpack_require__(0);
        }

        this.state.intersectionObserverInitiated = true;
      }
    }
  }, {
    key: "initializeWhatwgFetch",
    value: function initializeWhatwgFetch() {
      if (!this.state.whatwgFetchInitiated) {
        __webpack_require__(1);

        this.state.whatwgFetchInitiated = true;
      }
    }
  }]);

  return Polyfill;
}();

/* harmony default export */ var components_Polyfill = (new Polyfill());
// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bodyRouter", function() { return src_bodyRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCrossBrowserEvent", function() { return src_createCrossBrowserEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return src_forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDisplayed", function() { return src_isDisplayed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeIndex", function() { return src_nodeIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return src_query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestAnimFrame", function() { return src_requestAnimFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsWebp", function() { return src_supportsWebp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return src_throttle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camalize", function() { return src_camalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverseString", function() { return src_reverseString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundNumbers", function() { return src_roundNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuperError", function() { return src_SuperError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "superFallback", function() { return superFallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "superLoad", function() { return superLoad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "superPolyfill", function() { return superPolyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "superScroll", function() { return superScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "superSnif", function() { return superSnif; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "superWindow", function() { return superWindow; });



 // Components classes imports

 // Components instances imports







var src_bodyRouter = core.bodyRouter;

var src_createCrossBrowserEvent = core.createCrossBrowserEvent;

var src_forEach = core.forEach;

var src_isDisplayed = core.isDisplayed;

var src_nodeIndex = core.nodeIndex;

var src_query = core.query;

var src_requestAnimFrame = core.requestAnimFrame;

var src_supportsWebp = core.supportsWebp;

var src_throttle = core.throttle;

var src_camalize = parsing.camalize;

var src_reverseString = parsing.reverseString;

var src_roundNumbers = math.roundNumbers; // Components classes exports


var src_SuperError = components_Error; // Components instances exports

var superFallback = components_Fallback;
var superLoad = components_LoadHandler;
var superPolyfill = components_Polyfill;
var superScroll = components_Scroll;
var superSnif = components_Snif;
var superWindow = components_Window;
/* harmony default export */ var src = __webpack_exports__["default"] = ({
  bodyRouter: src_bodyRouter,
  camalize: src_camalize,
  createCrossBrowserEvent: src_createCrossBrowserEvent,
  forEach: src_forEach,
  isDisplayed: src_isDisplayed,
  nodeIndex: src_nodeIndex,
  query: src_query,
  requestAnimFrame: src_requestAnimFrame,
  reverseString: src_reverseString,
  roundNumbers: src_roundNumbers,
  supportsWebp: src_supportsWebp,
  throttle: src_throttle
});

/***/ })
/******/ ]);
});