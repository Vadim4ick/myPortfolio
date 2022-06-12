/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  "use strict";
  const t = {};
  let e = (t, e = 500, n = 0) => {
      t.classList.contains("_slide") ||
        (t.classList.add("_slide"),
        (t.style.transitionProperty = "height, margin, padding"),
        (t.style.transitionDuration = e + "ms"),
        (t.style.height = `${t.offsetHeight}px`),
        t.offsetHeight,
        (t.style.overflow = "hidden"),
        (t.style.height = n ? `${n}px` : "0px"),
        (t.style.paddingTop = 0),
        (t.style.paddingBottom = 0),
        (t.style.marginTop = 0),
        (t.style.marginBottom = 0),
        window.setTimeout(() => {
          (t.hidden = !n),
            !n && t.style.removeProperty("height"),
            t.style.removeProperty("padding-top"),
            t.style.removeProperty("padding-bottom"),
            t.style.removeProperty("margin-top"),
            t.style.removeProperty("margin-bottom"),
            !n && t.style.removeProperty("overflow"),
            t.style.removeProperty("transition-duration"),
            t.style.removeProperty("transition-property"),
            t.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: t } })
            );
        }, e));
    },
    n = (t, e = 500, n = 0) => {
      if (!t.classList.contains("_slide")) {
        t.classList.add("_slide"),
          (t.hidden = !t.hidden && null),
          n && t.style.removeProperty("height");
        let i = t.offsetHeight;
        (t.style.overflow = "hidden"),
          (t.style.height = n ? `${n}px` : "0px"),
          (t.style.paddingTop = 0),
          (t.style.paddingBottom = 0),
          (t.style.marginTop = 0),
          (t.style.marginBottom = 0),
          t.offsetHeight,
          (t.style.transitionProperty = "height, margin, padding"),
          (t.style.transitionDuration = e + "ms"),
          (t.style.height = i + "px"),
          t.style.removeProperty("padding-top"),
          t.style.removeProperty("padding-bottom"),
          t.style.removeProperty("margin-top"),
          t.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            t.style.removeProperty("height"),
              t.style.removeProperty("overflow"),
              t.style.removeProperty("transition-duration"),
              t.style.removeProperty("transition-property"),
              t.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: t } })
              );
          }, e);
      }
    },
    i = !0,
    r = (t = 500) => {
      let e = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < n.length; t++) {
            n[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, t);
      }
    },
    o = (t = 500) => {
      let e = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < n.length; t++) {
          n[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (e.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, t);
      }
    };
  function a(t) {
    return t.filter(function (t, e, n) {
      return n.indexOf(t) === e;
    });
  }
  function s(t, e) {
    const n = Array.from(t).filter(function (t, n, i) {
      if (t.dataset[e]) return t.dataset[e].split(",")[0];
    });
    if (n.length) {
      const t = [];
      n.forEach((n) => {
        const i = {},
          r = n.dataset[e].split(",");
        (i.value = r[0]),
          (i.type = r[1] ? r[1].trim() : "max"),
          (i.item = n),
          t.push(i);
      });
      let i = t.map(function (t) {
        return (
          "(" + t.type + "-width: " + t.value + "px)," + t.value + "," + t.type
        );
      });
      i = a(i);
      const r = [];
      if (i.length)
        return (
          i.forEach((e) => {
            const n = e.split(","),
              i = n[1],
              o = n[2],
              a = window.matchMedia(n[0]),
              s = t.filter(function (t) {
                if (t.value === i && t.type === o) return !0;
              });
            r.push({ itemsArray: s, matchMedia: a });
          }),
          r
        );
    }
  }
  t.watcher = new (class {
    constructor(t) {
      (this.config = Object.assign({ logging: !0 }, t)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(t) {
      if (t.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${t.length})...`
        ),
          a(
            Array.from(t).map(function (t) {
              return `${
                t.dataset.watchRoot ? t.dataset.watchRoot : null
              }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
            })
          ).forEach((e) => {
            let n = e.split("|"),
              i = { root: n[0], margin: n[1], threshold: n[2] },
              r = Array.from(t).filter(function (t) {
                let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                  n = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                  r = t.dataset.watchThreshold ? t.dataset.watchThreshold : 0;
                if (
                  String(e) === i.root &&
                  String(n) === i.margin &&
                  String(r) === i.threshold
                )
                  return t;
              }),
              o = this.getScrollWatcherConfig(i);
            this.scrollWatcherInit(r, o);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(t) {
      let e = {};
      if (
        (document.querySelector(t.root)
          ? (e.root = document.querySelector(t.root))
          : "null" !== t.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${t.root} нет на странице`
            ),
        (e.rootMargin = t.margin),
        !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
      ) {
        if ("prx" === t.threshold) {
          t.threshold = [];
          for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
        } else t.threshold = t.threshold.split(",");
        return (e.threshold = t.threshold), e;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
      );
    }
    scrollWatcherCreate(t) {
      this.observer = new IntersectionObserver((t, e) => {
        t.forEach((t) => {
          this.scrollWatcherCallback(t, e);
        });
      }, t);
    }
    scrollWatcherInit(t, e) {
      this.scrollWatcherCreate(e), t.forEach((t) => this.observer.observe(t));
    }
    scrollWatcherIntersecting(t, e) {
      t.isIntersecting
        ? (!e.classList.contains("_watcher-view") &&
            e.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${e.classList}, добавил класс _watcher-view`
          ))
        : (e.classList.contains("_watcher-view") &&
            e.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${e.classList}, убрал класс _watcher-view`
          ));
    }
    scrollWatcherOff(t, e) {
      e.unobserve(t),
        this.scrollWatcherLogging(`Я перестал следить за ${t.classList}`);
    }
    scrollWatcherLogging(t) {
      this.config.logging &&
        (function (t) {
          setTimeout(() => {
            window.FLS && console.log(t);
          }, 0);
        })(`[Наблюдатель]: ${t}`);
    }
    scrollWatcherCallback(t, e) {
      const n = t.target;
      this.scrollWatcherIntersecting(t, n),
        n.hasAttribute("data-watch-once") &&
          t.isIntersecting &&
          this.scrollWatcherOff(n, e),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: t } })
        );
    }
  })({});
  let c = !1;
  setTimeout(() => {
    if (c) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0);
  if (document.getElementById("home")) {
    const t = document.querySelectorAll('a[href*="#"]');
    for (let e of t)
      e.addEventListener("click", function (t) {
        t.preventDefault();
        const n = e.getAttribute("href").substr(1);
        document.getElementById(n) &&
          document
            .getElementById(n)
            .scrollIntoView({ behavior: "smooth", block: "start" });
      });
    window.addEventListener("scroll", () => {
      let t = window.scrollY;
      document.querySelectorAll(".observe") &&
        document.querySelectorAll(".observe").forEach((e, n) => {
          e.offsetTop - document.querySelector(".header").clientHeight - 50 <=
            t &&
            (document.querySelectorAll("nav a").forEach((t) => {
              t.classList.contains("_active") && t.classList.remove("_active");
            }),
            document
              .querySelectorAll("nav li")
              [n].querySelector("a")
              .classList.add("_active"));
        });
    });
  }
  if (document.querySelector("#stars")) {
    String.prototype.trim === h &&
      (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
      }),
      Array.prototype.reduce === h &&
        (Array.prototype.reduce = function (t) {
          if (null == this) throw new TypeError();
          var e,
            n = Object(this),
            i = n.length >>> 0,
            r = 0;
          if ("function" != typeof t) throw new TypeError();
          if (0 == i && 1 == arguments.length) throw new TypeError();
          if (arguments.length >= 2) e = arguments[1];
          else
            for (;;) {
              if (r in n) {
                e = n[r++];
                break;
              }
              if (++r >= i) throw new TypeError();
            }
          for (; r < i; ) r in n && (e = t.call(h, e, n[r], r, n)), r++;
          return e;
        });
    var l = (function () {
      function t(t) {
        return null == t ? String(t) : Z[U.call(t)] || "object";
      }
      function e(e) {
        return "function" == t(e);
      }
      function n(t) {
        return null != t && t == t.window;
      }
      function i(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE;
      }
      function r(e) {
        return "object" == t(e);
      }
      function o(t) {
        return r(t) && !n(t) && t.__proto__ == Object.prototype;
      }
      function a(t) {
        return t instanceof Array;
      }
      function s(t) {
        return "number" == typeof t.length;
      }
      function c(t) {
        return t.length > 0 ? E.fn.concat.apply([], t) : t;
      }
      function l(t) {
        return t
          .replace(/::/g, "/")
          .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
          .replace(/([a-z\d])([A-Z])/g, "$1_$2")
          .replace(/_/g, "-")
          .toLowerCase();
      }
      function u(t) {
        return t in M ? M[t] : (M[t] = new RegExp("(^|\\s)" + t + "(\\s|$)"));
      }
      function h(t, e) {
        return "number" != typeof e || q[l(t)] ? e : e + "px";
      }
      function f(t) {
        return "children" in t
          ? L.call(t.children)
          : E.map(t.childNodes, function (t) {
              if (1 == t.nodeType) return t;
            });
      }
      function d(t, e, n) {
        for (x in e)
          n && (o(e[x]) || a(e[x]))
            ? (o(e[x]) && !o(t[x]) && (t[x] = {}),
              a(e[x]) && !a(t[x]) && (t[x] = []),
              d(t[x], e[x], n))
            : e[x] !== b && (t[x] = e[x]);
      }
      function p(t, e) {
        return e === b ? E(t) : E(t).filter(e);
      }
      function m(t, n, i, r) {
        return e(n) ? n.call(t, i, r) : n;
      }
      function g(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n);
      }
      function y(t, e) {
        var n = t.className,
          i = n && n.baseVal !== b;
        if (e === b) return i ? n.baseVal : n;
        i ? (n.baseVal = e) : (t.className = e);
      }
      function v(t) {
        var e;
        try {
          return t
            ? "true" == t ||
                ("false" != t &&
                  ("null" == t
                    ? null
                    : isNaN((e = Number(t)))
                    ? /^[\[\{]/.test(t)
                      ? E.parseJSON(t)
                      : t
                    : e))
            : t;
        } catch (e) {
          return t;
        }
      }
      function w(t, e) {
        for (var n in (e(t), t.childNodes)) w(t.childNodes[n], e);
      }
      var b,
        x,
        E,
        S,
        A,
        T,
        C = [],
        L = C.slice,
        P = C.filter,
        k = window.document,
        _ = {},
        M = {},
        j = k.defaultView.getComputedStyle,
        q = {
          "column-count": 1,
          columns: 1,
          "font-weight": 1,
          "line-height": 1,
          opacity: 1,
          "z-index": 1,
          zoom: 1,
        },
        O = /^\s*<(\w+|!)[^>]*>/,
        N =
          /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        W = /^(?:body|html)$/i,
        $ = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        R = k.createElement("table"),
        I = k.createElement("tr"),
        D = {
          tr: k.createElement("tbody"),
          tbody: R,
          thead: R,
          tfoot: R,
          td: I,
          th: I,
          "*": k.createElement("div"),
        },
        z = /complete|loaded|interactive/,
        F = /^\.([\w-]+)$/,
        B = /^#([\w-]*)$/,
        H = /^[\w-]+$/,
        Z = {},
        U = Z.toString,
        V = {},
        X = k.createElement("div");
      return (
        (V.matches = function (t, e) {
          if (!t || 1 !== t.nodeType) return !1;
          var n =
            t.webkitMatchesSelector ||
            t.mozMatchesSelector ||
            t.oMatchesSelector ||
            t.matchesSelector;
          if (n) return n.call(t, e);
          var i,
            r = t.parentNode,
            o = !r;
          return (
            o && (r = X).appendChild(t),
            (i = ~V.qsa(r, e).indexOf(t)),
            o && X.removeChild(t),
            i
          );
        }),
        (A = function (t) {
          return t.replace(/-+(.)?/g, function (t, e) {
            return e ? e.toUpperCase() : "";
          });
        }),
        (T = function (t) {
          return P.call(t, function (e, n) {
            return t.indexOf(e) == n;
          });
        }),
        (V.fragment = function (t, e, n) {
          t.replace && (t = t.replace(N, "<$1></$2>")),
            e === b && (e = O.test(t) && RegExp.$1),
            e in D || (e = "*");
          var i,
            r,
            a = D[e];
          return (
            (a.innerHTML = "" + t),
            (r = E.each(L.call(a.childNodes), function () {
              a.removeChild(this);
            })),
            o(n) &&
              ((i = E(r)),
              E.each(n, function (t, e) {
                $.indexOf(t) > -1 ? i[t](e) : i.attr(t, e);
              })),
            r
          );
        }),
        (V.Z = function (t, e) {
          return ((t = t || []).__proto__ = E.fn), (t.selector = e || ""), t;
        }),
        (V.isZ = function (t) {
          return t instanceof V.Z;
        }),
        (V.init = function (t, n) {
          if (!t) return V.Z();
          if (e(t)) return E(k).ready(t);
          if (V.isZ(t)) return t;
          var i;
          if (a(t))
            i = (function (t) {
              return P.call(t, function (t) {
                return null != t;
              });
            })(t);
          else if (r(t)) (i = [o(t) ? E.extend({}, t) : t]), (t = null);
          else if (O.test(t))
            (i = V.fragment(t.trim(), RegExp.$1, n)), (t = null);
          else {
            if (n !== b) return E(n).find(t);
            i = V.qsa(k, t);
          }
          return V.Z(i, t);
        }),
        (E = function (t, e) {
          return V.init(t, e);
        }),
        (E.extend = function (t) {
          var e,
            n = L.call(arguments, 1);
          return (
            "boolean" == typeof t && ((e = t), (t = n.shift())),
            n.forEach(function (n) {
              d(t, n, e);
            }),
            t
          );
        }),
        (V.qsa = function (t, e) {
          var n;
          return i(t) && B.test(e)
            ? (n = t.getElementById(RegExp.$1))
              ? [n]
              : []
            : 1 !== t.nodeType && 9 !== t.nodeType
            ? []
            : L.call(
                F.test(e)
                  ? t.getElementsByClassName(RegExp.$1)
                  : H.test(e)
                  ? t.getElementsByTagName(e)
                  : t.querySelectorAll(e)
              );
        }),
        (E.contains = function (t, e) {
          return t !== e && t.contains(e);
        }),
        (E.type = t),
        (E.isFunction = e),
        (E.isWindow = n),
        (E.isArray = a),
        (E.isPlainObject = o),
        (E.isEmptyObject = function (t) {
          var e;
          for (e in t) return !1;
          return !0;
        }),
        (E.inArray = function (t, e, n) {
          return C.indexOf.call(e, t, n);
        }),
        (E.camelCase = A),
        (E.trim = function (t) {
          return t.trim();
        }),
        (E.uuid = 0),
        (E.support = {}),
        (E.expr = {}),
        (E.map = function (t, e) {
          var n,
            i,
            r,
            o = [];
          if (s(t))
            for (i = 0; i < t.length; i++)
              null != (n = e(t[i], i)) && o.push(n);
          else for (r in t) null != (n = e(t[r], r)) && o.push(n);
          return c(o);
        }),
        (E.each = function (t, e) {
          var n, i;
          if (s(t)) {
            for (n = 0; n < t.length; n++)
              if (!1 === e.call(t[n], n, t[n])) return t;
          } else for (i in t) if (!1 === e.call(t[i], i, t[i])) return t;
          return t;
        }),
        (E.grep = function (t, e) {
          return P.call(t, e);
        }),
        window.JSON && (E.parseJSON = JSON.parse),
        E.each(
          "Boolean Number String Function Array Date RegExp Object Error".split(
            " "
          ),
          function (t, e) {
            Z["[object " + e + "]"] = e.toLowerCase();
          }
        ),
        (E.fn = {
          forEach: C.forEach,
          reduce: C.reduce,
          push: C.push,
          sort: C.sort,
          indexOf: C.indexOf,
          concat: C.concat,
          map: function (t) {
            return E(
              E.map(this, function (e, n) {
                return t.call(e, n, e);
              })
            );
          },
          slice: function () {
            return E(L.apply(this, arguments));
          },
          ready: function (t) {
            return (
              z.test(k.readyState)
                ? t(E)
                : k.addEventListener(
                    "DOMContentLoaded",
                    function () {
                      t(E);
                    },
                    !1
                  ),
              this
            );
          },
          get: function (t) {
            return t === b ? L.call(this) : this[t >= 0 ? t : t + this.length];
          },
          toArray: function () {
            return this.get();
          },
          size: function () {
            return this.length;
          },
          remove: function () {
            return this.each(function () {
              null != this.parentNode && this.parentNode.removeChild(this);
            });
          },
          each: function (t) {
            return (
              C.every.call(this, function (e, n) {
                return !1 !== t.call(e, n, e);
              }),
              this
            );
          },
          filter: function (t) {
            return e(t)
              ? this.not(this.not(t))
              : E(
                  P.call(this, function (e) {
                    return V.matches(e, t);
                  })
                );
          },
          add: function (t, e) {
            return E(T(this.concat(E(t, e))));
          },
          is: function (t) {
            return this.length > 0 && V.matches(this[0], t);
          },
          not: function (t) {
            var n = [];
            if (e(t) && t.call !== b)
              this.each(function (e) {
                t.call(this, e) || n.push(this);
              });
            else {
              var i =
                "string" == typeof t
                  ? this.filter(t)
                  : s(t) && e(t.item)
                  ? L.call(t)
                  : E(t);
              this.forEach(function (t) {
                i.indexOf(t) < 0 && n.push(t);
              });
            }
            return E(n);
          },
          has: function (t) {
            return this.filter(function () {
              return r(t) ? E.contains(this, t) : E(this).find(t).size();
            });
          },
          eq: function (t) {
            return -1 === t ? this.slice(t) : this.slice(t, +t + 1);
          },
          first: function () {
            var t = this[0];
            return t && !r(t) ? t : E(t);
          },
          last: function () {
            var t = this[this.length - 1];
            return t && !r(t) ? t : E(t);
          },
          find: function (t) {
            var e = this;
            return "object" == typeof t
              ? E(t).filter(function () {
                  var t = this;
                  return C.some.call(e, function (e) {
                    return E.contains(e, t);
                  });
                })
              : 1 == this.length
              ? E(V.qsa(this[0], t))
              : this.map(function () {
                  return V.qsa(this, t);
                });
          },
          closest: function (t, e) {
            var n = this[0],
              r = !1;
            for (
              "object" == typeof t && (r = E(t));
              n && !(r ? r.indexOf(n) >= 0 : V.matches(n, t));

            )
              n = n !== e && !i(n) && n.parentNode;
            return E(n);
          },
          parents: function (t) {
            for (var e = [], n = this; n.length > 0; )
              n = E.map(n, function (t) {
                if ((t = t.parentNode) && !i(t) && e.indexOf(t) < 0)
                  return e.push(t), t;
              });
            return p(e, t);
          },
          parent: function (t) {
            return p(T(this.pluck("parentNode")), t);
          },
          children: function (t) {
            return p(
              this.map(function () {
                return f(this);
              }),
              t
            );
          },
          contents: function () {
            return this.map(function () {
              return L.call(this.childNodes);
            });
          },
          siblings: function (t) {
            return p(
              this.map(function (t, e) {
                return P.call(f(e.parentNode), function (t) {
                  return t !== e;
                });
              }),
              t
            );
          },
          empty: function () {
            return this.each(function () {
              this.innerHTML = "";
            });
          },
          pluck: function (t) {
            return E.map(this, function (e) {
              return e[t];
            });
          },
          show: function () {
            return this.each(function () {
              "none" == this.style.display && (this.style.display = null),
                "none" == j(this, "").getPropertyValue("display") &&
                  (this.style.display = (function (t) {
                    var e, n;
                    return (
                      _[t] ||
                        ((e = k.createElement(t)),
                        k.body.appendChild(e),
                        (n = j(e, "").getPropertyValue("display")),
                        e.parentNode.removeChild(e),
                        "none" == n && (n = "block"),
                        (_[t] = n)),
                      _[t]
                    );
                  })(this.nodeName));
            });
          },
          replaceWith: function (t) {
            return this.before(t).remove();
          },
          wrap: function (t) {
            var n = e(t);
            if (this[0] && !n)
              var i = E(t).get(0),
                r = i.parentNode || this.length > 1;
            return this.each(function (e) {
              E(this).wrapAll(n ? t.call(this, e) : r ? i.cloneNode(!0) : i);
            });
          },
          wrapAll: function (t) {
            if (this[0]) {
              var e;
              for (E(this[0]).before((t = E(t))); (e = t.children()).length; )
                t = e.first();
              E(t).append(this);
            }
            return this;
          },
          wrapInner: function (t) {
            var n = e(t);
            return this.each(function (e) {
              var i = E(this),
                r = i.contents(),
                o = n ? t.call(this, e) : t;
              r.length ? r.wrapAll(o) : i.append(o);
            });
          },
          unwrap: function () {
            return (
              this.parent().each(function () {
                E(this).replaceWith(E(this).children());
              }),
              this
            );
          },
          clone: function () {
            return this.map(function () {
              return this.cloneNode(!0);
            });
          },
          hide: function () {
            return this.css("display", "none");
          },
          toggle: function (t) {
            return this.each(function () {
              var e = E(this);
              (t === b ? "none" == e.css("display") : t) ? e.show() : e.hide();
            });
          },
          prev: function (t) {
            return E(this.pluck("previousElementSibling")).filter(t || "*");
          },
          next: function (t) {
            return E(this.pluck("nextElementSibling")).filter(t || "*");
          },
          html: function (t) {
            return t === b
              ? this.length > 0
                ? this[0].innerHTML
                : null
              : this.each(function (e) {
                  var n = this.innerHTML;
                  E(this).empty().append(m(this, t, e, n));
                });
          },
          text: function (t) {
            return t === b
              ? this.length > 0
                ? this[0].textContent
                : null
              : this.each(function () {
                  this.textContent = t;
                });
          },
          attr: function (t, e) {
            var n;
            return "string" == typeof t && e === b
              ? 0 == this.length || 1 !== this[0].nodeType
                ? b
                : "value" == t && "INPUT" == this[0].nodeName
                ? this.val()
                : !(n = this[0].getAttribute(t)) && t in this[0]
                ? this[0][t]
                : n
              : this.each(function (n) {
                  if (1 === this.nodeType)
                    if (r(t)) for (x in t) g(this, x, t[x]);
                    else g(this, t, m(this, e, n, this.getAttribute(t)));
                });
          },
          removeAttr: function (t) {
            return this.each(function () {
              1 === this.nodeType && g(this, t);
            });
          },
          prop: function (t, e) {
            return e === b
              ? this[0] && this[0][t]
              : this.each(function (n) {
                  this[t] = m(this, e, n, this[t]);
                });
          },
          data: function (t, e) {
            var n = this.attr("data-" + l(t), e);
            return null !== n ? v(n) : b;
          },
          val: function (t) {
            return t === b
              ? this[0] &&
                  (this[0].multiple
                    ? E(this[0])
                        .find("option")
                        .filter(function (t) {
                          return this.selected;
                        })
                        .pluck("value")
                    : this[0].value)
              : this.each(function (e) {
                  this.value = m(this, t, e, this.value);
                });
          },
          offset: function (t) {
            if (t)
              return this.each(function (e) {
                var n = E(this),
                  i = m(this, t, e, n.offset()),
                  r = n.offsetParent().offset(),
                  o = { top: i.top - r.top, left: i.left - r.left };
                "static" == n.css("position") && (o.position = "relative"),
                  n.css(o);
              });
            if (0 == this.length) return null;
            var e = this[0].getBoundingClientRect();
            return {
              left: e.left + window.pageXOffset,
              top: e.top + window.pageYOffset,
              width: Math.round(e.width),
              height: Math.round(e.height),
            };
          },
          css: function (e, n) {
            if (arguments.length < 2 && "string" == typeof e)
              return (
                this[0] &&
                (this[0].style[A(e)] || j(this[0], "").getPropertyValue(e))
              );
            var i = "";
            if ("string" == t(e))
              n || 0 === n
                ? (i = l(e) + ":" + h(e, n))
                : this.each(function () {
                    this.style.removeProperty(l(e));
                  });
            else
              for (x in e)
                e[x] || 0 === e[x]
                  ? (i += l(x) + ":" + h(x, e[x]) + ";")
                  : this.each(function () {
                      this.style.removeProperty(l(x));
                    });
            return this.each(function () {
              this.style.cssText += ";" + i;
            });
          },
          index: function (t) {
            return t
              ? this.indexOf(E(t)[0])
              : this.parent().children().indexOf(this[0]);
          },
          hasClass: function (t) {
            return C.some.call(
              this,
              function (t) {
                return this.test(y(t));
              },
              u(t)
            );
          },
          addClass: function (t) {
            return this.each(function (e) {
              S = [];
              var n = y(this);
              m(this, t, e, n)
                .split(/\s+/g)
                .forEach(function (t) {
                  E(this).hasClass(t) || S.push(t);
                }, this),
                S.length && y(this, n + (n ? " " : "") + S.join(" "));
            });
          },
          removeClass: function (t) {
            return this.each(function (e) {
              if (t === b) return y(this, "");
              (S = y(this)),
                m(this, t, e, S)
                  .split(/\s+/g)
                  .forEach(function (t) {
                    S = S.replace(u(t), " ");
                  }),
                y(this, S.trim());
            });
          },
          toggleClass: function (t, e) {
            return this.each(function (n) {
              var i = E(this);
              m(this, t, n, y(this))
                .split(/\s+/g)
                .forEach(function (t) {
                  (e === b ? !i.hasClass(t) : e)
                    ? i.addClass(t)
                    : i.removeClass(t);
                });
            });
          },
          scrollTop: function () {
            if (this.length)
              return "scrollTop" in this[0]
                ? this[0].scrollTop
                : this[0].scrollY;
          },
          position: function () {
            if (this.length) {
              var t = this[0],
                e = this.offsetParent(),
                n = this.offset(),
                i = W.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset();
              return (
                (n.top -= parseFloat(E(t).css("margin-top")) || 0),
                (n.left -= parseFloat(E(t).css("margin-left")) || 0),
                (i.top += parseFloat(E(e[0]).css("border-top-width")) || 0),
                (i.left += parseFloat(E(e[0]).css("border-left-width")) || 0),
                { top: n.top - i.top, left: n.left - i.left }
              );
            }
          },
          offsetParent: function () {
            return this.map(function () {
              for (
                var t = this.offsetParent || k.body;
                t && !W.test(t.nodeName) && "static" == E(t).css("position");

              )
                t = t.offsetParent;
              return t;
            });
          },
        }),
        (E.fn.detach = E.fn.remove),
        ["width", "height"].forEach(function (t) {
          E.fn[t] = function (e) {
            var r,
              o = this[0],
              a = t.replace(/./, function (t) {
                return t[0].toUpperCase();
              });
            return e === b
              ? n(o)
                ? o["inner" + a]
                : i(o)
                ? o.documentElement["offset" + a]
                : (r = this.offset()) && r[t]
              : this.each(function (n) {
                  (o = E(this)).css(t, m(this, e, n, o[t]()));
                });
          };
        }),
        ["after", "prepend", "before", "append"].forEach(function (e, n) {
          var i = n % 2;
          (E.fn[e] = function () {
            var e,
              r,
              o = E.map(arguments, function (n) {
                return "object" == (e = t(n)) || "array" == e || null == n
                  ? n
                  : V.fragment(n);
              }),
              a = this.length > 1;
            return o.length < 1
              ? this
              : this.each(function (t, e) {
                  (r = i ? e : e.parentNode),
                    (e =
                      0 == n
                        ? e.nextSibling
                        : 1 == n
                        ? e.firstChild
                        : 2 == n
                        ? e
                        : null),
                    o.forEach(function (t) {
                      if (a) t = t.cloneNode(!0);
                      else if (!r) return E(t).remove();
                      w(r.insertBefore(t, e), function (t) {
                        null != t.nodeName &&
                          "SCRIPT" === t.nodeName.toUpperCase() &&
                          (!t.type || "text/javascript" === t.type) &&
                          !t.src &&
                          window.eval.call(window, t.innerHTML);
                      });
                    });
                });
          }),
            (E.fn[i ? e + "To" : "insert" + (n ? "Before" : "After")] =
              function (t) {
                return E(t)[e](this), this;
              });
        }),
        (V.Z.prototype = E.fn),
        (V.uniq = T),
        (V.deserializeValue = v),
        (E.zepto = V),
        E
      );
    })();
    (window.Zepto = l),
      "$" in window || (window.$ = l),
      (function (t) {
        function e(t) {
          var e = (this.os = {}),
            n = (this.browser = {}),
            i = t.match(/WebKit\/([\d.]+)/),
            r = t.match(/(Android)\s+([\d.]+)/),
            o = t.match(/(iPad).*OS\s([\d_]+)/),
            a = !o && t.match(/(iPhone\sOS)\s([\d_]+)/),
            s = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            c = s && t.match(/TouchPad/),
            l = t.match(/Kindle\/([\d.]+)/),
            u = t.match(/Silk\/([\d._]+)/),
            h = t.match(/(BlackBerry).*Version\/([\d.]+)/),
            f = t.match(/(BB10).*Version\/([\d.]+)/),
            d = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
            p = t.match(/PlayBook/),
            m = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
            g = t.match(/Firefox\/([\d.]+)/);
          (n.webkit = !!i) && (n.version = i[1]),
            r && ((e.android = !0), (e.version = r[2])),
            a &&
              ((e.ios = e.iphone = !0), (e.version = a[2].replace(/_/g, "."))),
            o && ((e.ios = e.ipad = !0), (e.version = o[2].replace(/_/g, "."))),
            s && ((e.webos = !0), (e.version = s[2])),
            c && (e.touchpad = !0),
            h && ((e.blackberry = !0), (e.version = h[2])),
            f && ((e.bb10 = !0), (e.version = f[2])),
            d && ((e.rimtabletos = !0), (e.version = d[2])),
            p && (n.playbook = !0),
            l && ((e.kindle = !0), (e.version = l[1])),
            u && ((n.silk = !0), (n.version = u[1])),
            !u && e.android && t.match(/Kindle Fire/) && (n.silk = !0),
            m && ((n.chrome = !0), (n.version = m[1])),
            g && ((n.firefox = !0), (n.version = g[1])),
            (e.tablet = !!(
              o ||
              p ||
              (r && !t.match(/Mobile/)) ||
              (g && t.match(/Tablet/))
            )),
            (e.phone =
              !e.tablet &&
              !!(
                r ||
                a ||
                s ||
                h ||
                f ||
                (m && t.match(/Android/)) ||
                (m && t.match(/CriOS\/([\d.]+)/)) ||
                (g && t.match(/Mobile/))
              ));
        }
        e.call(t, navigator.userAgent), (t.__detect = e);
      })(l),
      (function (t) {
        function e(t) {
          return t._zid || (t._zid = h++);
        }
        function n(t, n, r, o) {
          if ((n = i(n)).ns)
            var a = (function (t) {
              return new RegExp(
                "(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)"
              );
            })(n.ns);
          return (u[e(t)] || []).filter(function (t) {
            return (
              t &&
              (!n.e || t.e == n.e) &&
              (!n.ns || a.test(t.ns)) &&
              (!r || e(t.fn) === e(r)) &&
              (!o || t.sel == o)
            );
          });
        }
        function i(t) {
          var e = ("" + t).split(".");
          return { e: e[0], ns: e.slice(1).sort().join(" ") };
        }
        function r(e, n, i) {
          "string" != t.type(e)
            ? t.each(e, i)
            : e.split(/\s/).forEach(function (t) {
                i(t, n);
              });
        }
        function o(t, e) {
          return (t.del && ("focus" == t.e || "blur" == t.e)) || !!e;
        }
        function a(t) {
          return d[t] || t;
        }
        function s(n, s, c, l, h, f) {
          var p = e(n),
            m = u[p] || (u[p] = []);
          r(s, c, function (e, r) {
            var s = i(e);
            (s.fn = r),
              (s.sel = l),
              s.e in d &&
                (r = function (e) {
                  var n = e.relatedTarget;
                  if (!n || (n !== this && !t.contains(this, n)))
                    return s.fn.apply(this, arguments);
                }),
              (s.del = h && h(r, e));
            var c = s.del || r;
            (s.proxy = function (t) {
              var e = c.apply(n, [t].concat(t.data));
              return !1 === e && (t.preventDefault(), t.stopPropagation()), e;
            }),
              (s.i = m.length),
              m.push(s),
              n.addEventListener(a(s.e), s.proxy, o(s, f));
          });
        }
        function c(t, i, s, c, l) {
          var h = e(t);
          r(i || "", s, function (e, i) {
            n(t, e, i, c).forEach(function (e) {
              delete u[h][e.i], t.removeEventListener(a(e.e), e.proxy, o(e, l));
            });
          });
        }
        function l(e) {
          var n,
            i = { originalEvent: e };
          for (n in e) !g.test(n) && void 0 !== e[n] && (i[n] = e[n]);
          return (
            t.each(y, function (t, n) {
              (i[t] = function () {
                return (this[n] = p), e[t].apply(e, arguments);
              }),
                (i[n] = m);
            }),
            i
          );
        }
        t.zepto.qsa;
        var u = {},
          h = 1,
          f = {},
          d = { mouseenter: "mouseover", mouseleave: "mouseout" };
        (f.click = f.mousedown = f.mouseup = f.mousemove = "MouseEvents"),
          (t.event = { add: s, remove: c }),
          (t.proxy = function (n, i) {
            if (t.isFunction(n)) {
              var r = function () {
                return n.apply(i, arguments);
              };
              return (r._zid = e(n)), r;
            }
            if ("string" == typeof i) return t.proxy(n[i], n);
            throw new TypeError("expected function");
          }),
          (t.fn.bind = function (t, e) {
            return this.each(function () {
              s(this, t, e);
            });
          }),
          (t.fn.unbind = function (t, e) {
            return this.each(function () {
              c(this, t, e);
            });
          }),
          (t.fn.one = function (t, e) {
            return this.each(function (n, i) {
              s(this, t, e, null, function (t, e) {
                return function () {
                  var n = t.apply(i, arguments);
                  return c(i, e, t), n;
                };
              });
            });
          });
        var p = function () {
            return !0;
          },
          m = function () {
            return !1;
          },
          g = /^([A-Z]|layer[XY]$)/,
          y = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped",
          };
        (t.fn.delegate = function (e, n, i) {
          return this.each(function (r, o) {
            s(o, n, i, e, function (n) {
              return function (i) {
                var r,
                  a = t(i.target).closest(e, o).get(0);
                if (a)
                  return (
                    (r = t.extend(l(i), { currentTarget: a, liveFired: o })),
                    n.apply(a, [r].concat([].slice.call(arguments, 1)))
                  );
              };
            });
          });
        }),
          (t.fn.undelegate = function (t, e, n) {
            return this.each(function () {
              c(this, e, n, t);
            });
          }),
          (t.fn.live = function (e, n) {
            return t(document.body).delegate(this.selector, e, n), this;
          }),
          (t.fn.die = function (e, n) {
            return t(document.body).undelegate(this.selector, e, n), this;
          }),
          (t.fn.on = function (e, n, i) {
            return !n || t.isFunction(n)
              ? this.bind(e, n || i)
              : this.delegate(n, e, i);
          }),
          (t.fn.off = function (e, n, i) {
            return !n || t.isFunction(n)
              ? this.unbind(e, n || i)
              : this.undelegate(n, e, i);
          }),
          (t.fn.trigger = function (e, n) {
            return (
              ("string" == typeof e || t.isPlainObject(e)) && (e = t.Event(e)),
              (function (t) {
                if (!("defaultPrevented" in t)) {
                  t.defaultPrevented = !1;
                  var e = t.preventDefault;
                  t.preventDefault = function () {
                    (this.defaultPrevented = !0), e.call(this);
                  };
                }
              })(e),
              (e.data = n),
              this.each(function () {
                "dispatchEvent" in this && this.dispatchEvent(e);
              })
            );
          }),
          (t.fn.triggerHandler = function (e, i) {
            var r, o;
            return (
              this.each(function (a, s) {
                ((r = l("string" == typeof e ? t.Event(e) : e)).data = i),
                  (r.target = s),
                  t.each(n(s, e.type || e), function (t, e) {
                    if (((o = e.proxy(r)), r.isImmediatePropagationStopped()))
                      return !1;
                  });
              }),
              o
            );
          }),
          "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error"
            .split(" ")
            .forEach(function (e) {
              t.fn[e] = function (t) {
                return t ? this.bind(e, t) : this.trigger(e);
              };
            }),
          ["focus", "blur"].forEach(function (e) {
            t.fn[e] = function (t) {
              return (
                t
                  ? this.bind(e, t)
                  : this.each(function () {
                      try {
                        this[e]();
                      } catch (t) {}
                    }),
                this
              );
            };
          }),
          (t.Event = function (t, e) {
            "string" != typeof t && (t = (e = t).type);
            var n = document.createEvent(f[t] || "Events"),
              i = !0;
            if (e)
              for (var r in e) "bubbles" == r ? (i = !!e[r]) : (n[r] = e[r]);
            return (
              n.initEvent(
                t,
                i,
                !0,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
              ),
              (n.isDefaultPrevented = function () {
                return this.defaultPrevented;
              }),
              n
            );
          });
      })(l),
      (function (t) {
        function e(e, n, i, r) {
          if (e.global)
            return (function (e, n, i) {
              var r = t.Event(n);
              return t(e).trigger(r, i), !r.defaultPrevented;
            })(n || d, i, r);
        }
        function n(t, n) {
          var i = n.context;
          if (
            !1 === n.beforeSend.call(i, t, n) ||
            !1 === e(n, i, "ajaxBeforeSend", [t, n])
          )
            return !1;
          e(n, i, "ajaxSend", [t, n]);
        }
        function i(t, n, i) {
          var r = i.context,
            a = "success";
          i.success.call(r, t, a, n),
            e(i, r, "ajaxSuccess", [n, i, t]),
            o(a, n, i);
        }
        function r(t, n, i, r) {
          var a = r.context;
          r.error.call(a, i, n, t), e(r, a, "ajaxError", [i, r, t]), o(n, i, r);
        }
        function o(n, i, r) {
          var o = r.context;
          r.complete.call(o, i, n),
            e(r, o, "ajaxComplete", [i, r]),
            (function (n) {
              n.global && !--t.active && e(n, null, "ajaxStop");
            })(r);
        }
        function a() {}
        function s(t, e) {
          return (t + "&" + e).replace(/[&?]{1,2}/, "?");
        }
        function c(e, n, i, r) {
          var o = !t.isFunction(n);
          return {
            url: e,
            data: o ? n : void 0,
            success: o ? (t.isFunction(i) ? i : void 0) : n,
            dataType: (o && r) || i,
          };
        }
        function l(e, n, i, r) {
          var o,
            a = t.isArray(n);
          t.each(n, function (n, s) {
            (o = t.type(s)),
              r && (n = i ? r : r + "[" + (a ? "" : n) + "]"),
              !r && a
                ? e.add(s.name, s.value)
                : "array" == o || (!i && "object" == o)
                ? l(e, s, i, n)
                : e.add(n, s);
          });
        }
        var u,
          h,
          f = 0,
          d = window.document,
          p = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          m = /^(?:text|application)\/javascript/i,
          g = /^(?:text|application)\/xml/i,
          y = "application/json",
          v = "text/html",
          w = /^\s*$/;
        (t.active = 0),
          (t.ajaxJSONP = function (e) {
            if ("type" in e) {
              var o,
                s = "jsonp" + ++f,
                c = d.createElement("script"),
                l = function () {
                  clearTimeout(o), t(c).remove(), delete window[s];
                },
                u = function (t) {
                  l(),
                    (t && "timeout" != t) || (window[s] = a),
                    r(null, t || "abort", h, e);
                },
                h = { abort: u };
              return !1 === n(h, e)
                ? (u("abort"), !1)
                : ((window[s] = function (t) {
                    l(), i(t, h, e);
                  }),
                  (c.onerror = function () {
                    u("error");
                  }),
                  (c.src = e.url.replace(/=\?/, "=" + s)),
                  t("head").append(c),
                  e.timeout > 0 &&
                    (o = setTimeout(function () {
                      u("timeout");
                    }, e.timeout)),
                  h);
            }
            return t.ajax(e);
          }),
          (t.ajaxSettings = {
            type: "GET",
            beforeSend: a,
            success: a,
            error: a,
            complete: a,
            context: null,
            global: !0,
            xhr: function () {
              return new window.XMLHttpRequest();
            },
            accepts: {
              script: "text/javascript, application/javascript",
              json: y,
              xml: "application/xml, text/xml",
              html: v,
              text: "text/plain",
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0,
          }),
          (t.ajax = function (o) {
            var c = t.extend({}, o || {});
            for (u in t.ajaxSettings)
              void 0 === c[u] && (c[u] = t.ajaxSettings[u]);
            (function (n) {
              n.global && 0 == t.active++ && e(n, null, "ajaxStart");
            })(c),
              c.crossDomain ||
                (c.crossDomain =
                  /^([\w-]+:)?\/\/([^\/]+)/.test(c.url) &&
                  RegExp.$2 != window.location.host),
              c.url || (c.url = window.location.toString()),
              (function (e) {
                e.processData &&
                  e.data &&
                  "string" != t.type(e.data) &&
                  (e.data = t.param(e.data, e.traditional)),
                  e.data &&
                    (!e.type || "GET" == e.type.toUpperCase()) &&
                    (e.url = s(e.url, e.data));
              })(c),
              !1 === c.cache && (c.url = s(c.url, "_=" + Date.now()));
            var l = c.dataType,
              f = /=\?/.test(c.url);
            if ("jsonp" == l || f)
              return f || (c.url = s(c.url, "callback=?")), t.ajaxJSONP(c);
            var d,
              p = c.accepts[l],
              b = {},
              x = /^([\w-]+:)\/\//.test(c.url)
                ? RegExp.$1
                : window.location.protocol,
              E = c.xhr();
            c.crossDomain || (b["X-Requested-With"] = "XMLHttpRequest"),
              p &&
                ((b.Accept = p),
                p.indexOf(",") > -1 && (p = p.split(",", 2)[0]),
                E.overrideMimeType && E.overrideMimeType(p)),
              (c.contentType ||
                (!1 !== c.contentType &&
                  c.data &&
                  "GET" != c.type.toUpperCase())) &&
                (b["Content-Type"] =
                  c.contentType || "application/x-www-form-urlencoded"),
              (c.headers = t.extend(b, c.headers || {})),
              (E.onreadystatechange = function () {
                if (4 == E.readyState) {
                  (E.onreadystatechange = a), clearTimeout(d);
                  var e,
                    n = !1;
                  if (
                    (E.status >= 200 && E.status < 300) ||
                    304 == E.status ||
                    (0 == E.status && "file:" == x)
                  ) {
                    (l =
                      l ||
                      (function (t) {
                        return (
                          t && (t = t.split(";", 2)[0]),
                          (t &&
                            (t == v
                              ? "html"
                              : t == y
                              ? "json"
                              : m.test(t)
                              ? "script"
                              : g.test(t) && "xml")) ||
                            "text"
                        );
                      })(E.getResponseHeader("content-type"))),
                      (e = E.responseText);
                    try {
                      "script" == l
                        ? (0, eval)(e)
                        : "xml" == l
                        ? (e = E.responseXML)
                        : "json" == l &&
                          (e = w.test(e) ? null : t.parseJSON(e));
                    } catch (t) {
                      n = t;
                    }
                    n ? r(n, "parsererror", E, c) : i(e, E, c);
                  } else r(null, E.status ? "error" : "abort", E, c);
                }
              });
            var S = !("async" in c) || c.async;
            for (h in (E.open(c.type, c.url, S), c.headers))
              E.setRequestHeader(h, c.headers[h]);
            return !1 === n(E, c)
              ? (E.abort(), !1)
              : (c.timeout > 0 &&
                  (d = setTimeout(function () {
                    (E.onreadystatechange = a),
                      E.abort(),
                      r(null, "timeout", E, c);
                  }, c.timeout)),
                E.send(c.data ? c.data : null),
                E);
          }),
          (t.get = function (e, n, i, r) {
            return t.ajax(c.apply(null, arguments));
          }),
          (t.post = function (e, n, i, r) {
            var o = c.apply(null, arguments);
            return (o.type = "POST"), t.ajax(o);
          }),
          (t.getJSON = function (e, n, i) {
            var r = c.apply(null, arguments);
            return (r.dataType = "json"), t.ajax(r);
          }),
          (t.fn.load = function (e, n, i) {
            if (!this.length) return this;
            var r,
              o = this,
              a = e.split(/\s/),
              s = c(e, n, i),
              l = s.success;
            return (
              a.length > 1 && ((s.url = a[0]), (r = a[1])),
              (s.success = function (e) {
                o.html(r ? t("<div>").html(e.replace(p, "")).find(r) : e),
                  l && l.apply(o, arguments);
              }),
              t.ajax(s),
              this
            );
          });
        var b = encodeURIComponent;
        t.param = function (t, e) {
          var n = [];
          return (
            (n.add = function (t, e) {
              this.push(b(t) + "=" + b(e));
            }),
            l(n, t, e),
            n.join("&").replace(/%20/g, "+")
          );
        };
      })(l),
      (function (t) {
        (t.fn.serializeArray = function () {
          var e,
            n = [];
          return (
            t(Array.prototype.slice.call(this.get(0).elements)).each(
              function () {
                var i = (e = t(this)).attr("type");
                "fieldset" != this.nodeName.toLowerCase() &&
                  !this.disabled &&
                  "submit" != i &&
                  "reset" != i &&
                  "button" != i &&
                  (("radio" != i && "checkbox" != i) || this.checked) &&
                  n.push({ name: e.attr("name"), value: e.val() });
              }
            ),
            n
          );
        }),
          (t.fn.serialize = function () {
            var t = [];
            return (
              this.serializeArray().forEach(function (e) {
                t.push(
                  encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value)
                );
              }),
              t.join("&")
            );
          }),
          (t.fn.submit = function (e) {
            if (e) this.bind("submit", e);
            else if (this.length) {
              var n = t.Event("submit");
              this.eq(0).trigger(n), n.defaultPrevented || this.get(0).submit();
            }
            return this;
          });
      })(l),
      (function (t, e) {
        function n(t) {
          return i(t.replace(/([a-z])([A-Z])/, "$1-$2"));
        }
        function i(t) {
          return t.toLowerCase();
        }
        function r(t) {
          return o ? o + t : i(t);
        }
        var o,
          a,
          s,
          c,
          l,
          u,
          h,
          f,
          d = "",
          p = window.document.createElement("div"),
          m =
            /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
          g = {};
        t.each(
          { Webkit: "webkit", Moz: "", O: "o", ms: "MS" },
          function (t, n) {
            if (p.style[t + "TransitionProperty"] !== e)
              return (d = "-" + i(t) + "-"), (o = n), !1;
          }
        ),
          (a = d + "transform"),
          (g[(s = d + "transition-property")] =
            g[(c = d + "transition-duration")] =
            g[(l = d + "transition-timing-function")] =
            g[(u = d + "animation-name")] =
            g[(h = d + "animation-duration")] =
            g[(f = d + "animation-timing-function")] =
              ""),
          (t.fx = {
            off: o === e && p.style.transitionProperty === e,
            speeds: { _default: 400, fast: 200, slow: 600 },
            cssPrefix: d,
            transitionEnd: r("TransitionEnd"),
            animationEnd: r("AnimationEnd"),
          }),
          (t.fn.animate = function (e, n, i, r) {
            return (
              t.isPlainObject(n) &&
                ((i = n.easing), (r = n.complete), (n = n.duration)),
              n &&
                (n =
                  ("number" == typeof n
                    ? n
                    : t.fx.speeds[n] || t.fx.speeds._default) / 1e3),
              this.anim(e, n, i, r)
            );
          }),
          (t.fn.anim = function (i, r, o, d) {
            var p,
              y,
              v,
              w = {},
              b = "",
              x = this,
              E = t.fx.transitionEnd;
            if (
              (r === e && (r = 0.4), t.fx.off && (r = 0), "string" == typeof i)
            )
              (w[u] = i),
                (w[h] = r + "s"),
                (w[f] = o || "linear"),
                (E = t.fx.animationEnd);
            else {
              for (p in ((y = []), i))
                m.test(p)
                  ? (b += p + "(" + i[p] + ") ")
                  : ((w[p] = i[p]), y.push(n(p)));
              b && ((w[a] = b), y.push(a)),
                r > 0 &&
                  "object" == typeof i &&
                  ((w[s] = y.join(", ")),
                  (w[c] = r + "s"),
                  (w[l] = o || "linear"));
            }
            return (
              (v = function (e) {
                if (void 0 !== e) {
                  if (e.target !== e.currentTarget) return;
                  t(e.target).unbind(E, v);
                }
                t(this).css(g), d && d.call(this);
              }),
              r > 0 && this.bind(E, v),
              this.size() && this.get(0).clientLeft,
              this.css(w),
              r <= 0 &&
                setTimeout(function () {
                  x.each(function () {
                    v.call(this);
                  });
                }, 0),
              this
            );
          }),
          (p = null);
      })(l);
    window.requestAnimationFrame ||
      (window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (t) {
          return window.setTimeout(t, 1e3 / 60);
        });
    var u = new (function () {
      var t = Date.now(),
        e = t,
        n = 0,
        i = 1 / 0,
        r = 0,
        o = 0,
        a = 1 / 0,
        s = 0,
        c = 0,
        l = 0,
        u = document.createElement("div");
      (u.id = "stats"),
        u.addEventListener(
          "mousedown",
          function (t) {
            t.preventDefault(), v(++l % 2);
          },
          !1
        ),
        (u.style.cssText = "width:80px;opacity:0.9;cursor:pointer");
      var h = document.createElement("div");
      (h.id = "fps"),
        (h.style.cssText =
          "padding:0 0 3px 3px;text-align:left;background-color:#002"),
        u.appendChild(h);
      var f = document.createElement("div");
      (f.id = "fpsText"),
        (f.style.cssText =
          "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px"),
        (f.innerHTML = "FPS"),
        h.appendChild(f);
      var d = document.createElement("div");
      for (
        d.id = "fpsGraph",
          d.style.cssText =
            "position:relative;width:74px;height:30px;background-color:#0ff",
          h.appendChild(d);
        d.children.length < 74;

      ) {
        ((y = document.createElement("span")).style.cssText =
          "width:1px;height:30px;float:left;background-color:#113"),
          d.appendChild(y);
      }
      var p = document.createElement("div");
      (p.id = "ms"),
        (p.style.cssText =
          "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none"),
        u.appendChild(p);
      var m = document.createElement("div");
      (m.id = "msText"),
        (m.style.cssText =
          "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px"),
        (m.innerHTML = "MS"),
        p.appendChild(m);
      var g = document.createElement("div");
      for (
        g.id = "msGraph",
          g.style.cssText =
            "position:relative;width:74px;height:30px;background-color:#0f0",
          p.appendChild(g);
        g.children.length < 74;

      ) {
        var y;
        ((y = document.createElement("span")).style.cssText =
          "width:1px;height:30px;float:left;background-color:#131"),
          g.appendChild(y);
      }
      var v = function (t) {
          switch ((l = t)) {
            case 0:
              (h.style.display = "block"), (p.style.display = "none");
              break;
            case 1:
              (h.style.display = "none"), (p.style.display = "block");
          }
        },
        w = function (t, e) {
          t.appendChild(t.firstChild).style.height = e + "px";
        };
      return {
        REVISION: 11,
        domElement: u,
        setMode: v,
        begin: function () {
          t = Date.now();
        },
        end: function () {
          var l = Date.now();
          return (
            (n = l - t),
            (i = Math.min(i, n)),
            (r = Math.max(r, n)),
            (m.textContent = n + " MS (" + i + "-" + r + ")"),
            w(g, Math.min(30, 30 - (n / 200) * 30)),
            c++,
            l > e + 1e3 &&
              ((o = Math.round((1e3 * c) / (l - e))),
              (a = Math.min(a, o)),
              (s = Math.max(s, o)),
              (f.textContent = o + " FPS (" + a + "-" + s + ")"),
              w(d, Math.min(30, 30 - (o / 100) * 30)),
              (e = l),
              (c = 0)),
            l
          );
        },
        update: function () {
          t = this.end();
        },
      };
    })();
    u.setMode(0),
      (u.domElement.style.position = "absolute"),
      (u.domElement.style.left = "0px"),
      (u.domElement.style.top = "0px"),
      (function (t, e) {
        function n(n, i) {
          var r = t(n),
            o = n.getContext("2d"),
            a = {
              star: {
                color: "rgba(255, 255, 255, .9)",
                width: 1,
                randomWidth: !0,
              },
              line: { color: "rgba(255, 255, 255, .9)", width: 0.2 },
              position: { x: 0, y: 0 },
              width: e.innerWidth,
              height: e.innerHeight,
              velocity: 0.5,
              length: 80,
              distance: 100,
              radius: 150,
              stars: [],
            },
            s = t.extend(!0, {}, a, i);
          function c() {
            (this.x = Math.random() * n.width),
              (this.y = Math.random() * n.height),
              (this.vx = s.velocity - 0.5 * Math.random()),
              (this.vy = s.velocity - 0.5 * Math.random()),
              (this.radius = s.star.randomWidth
                ? Math.random() * s.star.width
                : s.star.width);
          }
          (c.prototype = {
            create: function () {
              o.beginPath(),
                o.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !1),
                o.fill();
            },
            animate: function () {
              var t;
              for (t = 0; t < s.length; t++) {
                var e = s.stars[t];
                e.y < 0 || e.y > n.height
                  ? ((e.vx = e.vx), (e.vy = -e.vy))
                  : (e.x < 0 || e.x > n.width) &&
                    ((e.vx = -e.vx), (e.vy = e.vy)),
                  (e.x += e.vx),
                  (e.y += e.vy);
              }
            },
            line: function () {
              var t,
                e,
                n,
                i,
                r = s.length;
              for (n = 0; n < r; n++)
                for (i = 0; i < r; i++)
                  (t = s.stars[n]),
                    (e = s.stars[i]),
                    t.x - e.x < s.distance &&
                      t.y - e.y < s.distance &&
                      t.x - e.x > -s.distance &&
                      t.y - e.y > -s.distance &&
                      t.x - s.position.x < s.radius &&
                      t.y - s.position.y < s.radius &&
                      t.x - s.position.x > -s.radius &&
                      t.y - s.position.y > -s.radius &&
                      (o.beginPath(),
                      o.moveTo(t.x, t.y),
                      o.lineTo(e.x, e.y),
                      o.stroke(),
                      o.closePath());
            },
          }),
            (this.createStars = function () {
              var t,
                e,
                i = s.length;
              for (o.clearRect(0, 0, n.width, n.height), e = 0; e < i; e++)
                s.stars.push(new c()), (t = s.stars[e]).create();
              t.line(), t.animate();
            }),
            (this.setCanvas = function () {
              (n.width = s.width), (n.height = s.height);
            }),
            (this.setContext = function () {
              (o.fillStyle = s.star.color),
                (o.strokeStyle = s.line.color),
                (o.lineWidth = s.line.width);
            }),
            (this.setInitialPosition = function () {
              (i && i.hasOwnProperty("position")) ||
                (s.position = { x: 0.5 * n.width, y: 0.5 * n.height });
            }),
            (this.loop = function (t) {
              t(),
                e.requestAnimationFrame(
                  function () {
                    u.begin(), this.loop(t), u.end();
                  }.bind(this)
                );
            }),
            (this.bind = function () {
              r.on("mousemove", function (t) {
                (s.position.x = t.pageX - r.offset().left),
                  (s.position.y = t.pageY - r.offset().top);
              });
            }),
            (this.init = function () {
              this.setCanvas(),
                this.setContext(),
                this.setInitialPosition(),
                this.loop(this.createStars),
                this.bind();
            });
        }
        t.fn.constellation = function (t) {
          return this.each(function () {
            new n(this, t).init();
          });
        };
      })($, window),
      $("#stars").constellation({
        star: { width: 3 },
        line: { color: "rgba(157, 188, 225, 1)" },
        radius: 250,
      });
  }
  var h;
  (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    (function () {
      let t = document.querySelector(".icon-menu");
      t &&
        t.addEventListener("click", function (t) {
          i &&
            (((t = 500) => {
              document.documentElement.classList.contains("lock") ? r(t) : o(t);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const t = document.querySelectorAll("[data-tabs]");
      let i = [];
      if (t.length > 0) {
        const e = (function () {
          if (location.hash) return location.hash.replace("#", "");
        })();
        e && e.startsWith("tab-") && (i = e.replace("tab-", "").split("-")),
          t.forEach((t, e) => {
            t.classList.add("_tab-init"),
              t.setAttribute("data-tabs-index", e),
              t.addEventListener("click", a),
              (function (t) {
                let e = t.querySelectorAll("[data-tabs-titles]>*"),
                  n = t.querySelectorAll("[data-tabs-body]>*");
                const r = t.dataset.tabsIndex,
                  o = i[0] == r;
                if (o) {
                  const e = t.querySelector("[data-tabs-titles]>._tab-active");
                  e && e.classList.remove("_tab-active");
                }
                n.length &&
                  ((n = Array.from(n).filter(
                    (e) => e.closest("[data-tabs]") === t
                  )),
                  (e = Array.from(e).filter(
                    (e) => e.closest("[data-tabs]") === t
                  )),
                  n.forEach((t, n) => {
                    e[n].setAttribute("data-tabs-title", ""),
                      t.setAttribute("data-tabs-item", ""),
                      o && n == i[1] && e[n].classList.add("_tab-active"),
                      (t.hidden = !e[n].classList.contains("_tab-active"));
                  }));
              })(t);
          });
        let n = s(t, "tabs");
        n &&
          n.length &&
          n.forEach((t) => {
            t.matchMedia.addEventListener("change", function () {
              r(t.itemsArray, t.matchMedia);
            }),
              r(t.itemsArray, t.matchMedia);
          });
      }
      function r(t, e) {
        t.forEach((t) => {
          let n = (t = t.item).querySelector("[data-tabs-titles]"),
            i = t.querySelectorAll("[data-tabs-title]"),
            r = t.querySelector("[data-tabs-body]"),
            o = t.querySelectorAll("[data-tabs-item]");
          (i = Array.from(i).filter((e) => e.closest("[data-tabs]") === t)),
            (o = Array.from(o).filter((e) => e.closest("[data-tabs]") === t)),
            o.forEach((o, a) => {
              e.matches
                ? (r.append(i[a]), r.append(o), t.classList.add("_tab-spoller"))
                : (n.append(i[a]), t.classList.remove("_tab-spoller"));
            });
        });
      }
      function o(t) {
        let i = t.querySelectorAll("[data-tabs-title]"),
          r = t.querySelectorAll("[data-tabs-item]");
        const o = t.dataset.tabsIndex;
        const a = (function (t) {
          if (t.hasAttribute("data-tabs-animate"))
            return t.dataset.tabsAnimate > 0
              ? Number(t.dataset.tabsAnimate)
              : 500;
        })(t);
        if (r.length > 0) {
          const s = t.hasAttribute("data-tabs-hash");
          (r = Array.from(r).filter((e) => e.closest("[data-tabs]") === t)),
            (i = Array.from(i).filter((e) => e.closest("[data-tabs]") === t)),
            r.forEach((t, r) => {
              var c;
              i[r].classList.contains("_tab-active")
                ? (a ? n(t, a) : (t.hidden = !1),
                  s &&
                    !t.closest(".popup") &&
                    ((c = (c = `tab-${o}-${r}`)
                      ? `#${c}`
                      : window.location.href.split("#")[0]),
                    history.pushState("", "", c)))
                : a
                ? e(t, a)
                : (t.hidden = !0);
            });
        }
      }
      function a(t) {
        const e = t.target;
        if (e.closest("[data-tabs-title]")) {
          const n = e.closest("[data-tabs-title]"),
            i = n.closest("[data-tabs]");
          if (
            !n.classList.contains("_tab-active") &&
            !i.querySelector("._slide")
          ) {
            let t = i.querySelectorAll("[data-tabs-title]._tab-active");
            t.length &&
              (t = Array.from(t).filter((t) => t.closest("[data-tabs]") === i)),
              t.length && t[0].classList.remove("_tab-active"),
              n.classList.add("_tab-active"),
              o(i);
          }
          t.preventDefault();
        }
      }
    })();
})();
