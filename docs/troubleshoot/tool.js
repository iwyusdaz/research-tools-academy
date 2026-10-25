/* Troubleshooting tool: renders the guided flows from flows.json.
 *
 * Accessibility contract (verified with Playwright keyboard tests):
 * - Each step is a <section> whose <h3> receives focus when the step is shown
 *   (heading has tabindex="-1"); options are <button> elements.
 * - Back and Start over are buttons; Back pops the history, Start over resets
 *   to the flow chooser.
 * - No pointer-only interactions; no color-only meaning; no time limits.
 */
(function () {
  "use strict";

  var root = document.getElementById("troubleshooter");
  if (!root) return;

  var FLOWS = null;
  var state = { flow: null, history: [] };

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (html != null) node.innerHTML = html;
    return node;
  }

  function fetchFlows() {
    // flows.json sits next to this page's index.html; a relative fetch works
    // both on the local dev server and on GitHub Pages (baseurl included).
    return fetch("flows.json").then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  function renderChooser() {
    state = { flow: null, history: [] };
    root.innerHTML = "";

    var h = el("h2", { id: "tool-heading", text: "What's going wrong?" });
    var intro = el("p", { text: "Pick the problem closest to yours. Every flow is built from real support questions and the official Zotero documentation." });
    var list = el("div", { class: "tool-flow-chooser", role: "group", "aria-label": "Troubleshooting flows" });

    FLOWS.flows.forEach(function (flow, i) {
      var btn = el("button", {
        type: "button",
        class: "btn btn-flow",
        text: flow.title
      });
      btn.addEventListener("click", function () {
        startFlow(i);
      });
      list.appendChild(btn);
    });

    root.appendChild(h);
    root.appendChild(intro);
    root.appendChild(list);
    h.focus();
  }

  function startFlow(index) {
    state.flow = FLOWS.flows[index];
    state.history = [];
    showStep(state.flow.start);
  }

  function showStep(stepId) {
    var flow = state.flow;
    var step = flow.steps[stepId];
    if (!step) {
      // Fail safe: never dead-end. Offer the restart instead of a blank panel.
      step = { type: "exit", heading: "This flow hit an unexpected step.", body: "<p>Please restart the tool or use the official documentation.</p>", link_label: "Official Zotero documentation", link: "https://www.zotero.org/support/", forum: "https://forums.zotero.org/" };
    }
    state.history.push(stepId);
    var depth = state.history.length;

    root.innerHTML = "";

    // Status line: where am I?
    var status = el("p", { class: "tool-status", id: "tool-status" });
    var flowTitle = el("strong", { text: flow.title });
    status.appendChild(flowTitle);
    status.appendChild(document.createTextNode(" — step " + depth));

    // Step section with focused heading
    var section = el("section", { class: "tool-section", "aria-labelledby": "step-heading" });
    var heading = el("h3", { id: "step-heading", tabindex: "-1", text: step.heading });
    section.appendChild(heading);

    if (step.body) {
      var body = el("div", { class: "tool-step-body" });
      body.innerHTML = step.body;
      section.appendChild(body);
    }

    if (step.type === "exit" && step.link) {
      var linkP = el("p");
      var a = el("a", { href: step.link, text: step.link_label || "Official documentation" });
      a.target = "_blank";
      a.rel = "noopener";
      linkP.appendChild(a);
      section.appendChild(linkP);
    }

    // Options as buttons
    if (step.options) {
      var fieldset = el("fieldset", { class: "tool-fieldset" });
      var legendText = step.type === "fix" ? "Did this solve it?" : "Continue:";
      fieldset.appendChild(el("legend", { text: legendText }));
      var wrap = el("div", { class: "tool-options", role: "group", "aria-label": legendText });
      step.options.forEach(function (opt) {
        var b = el("button", { type: "button", class: "btn", text: opt.label });
        b.addEventListener("click", function () {
          showStep(opt.next);
        });
        wrap.appendChild(b);
      });
      fieldset.appendChild(wrap);
      section.appendChild(fieldset);
    } else if (step.type === "done") {
      var ok = el("p", { class: "tool-status", role: "status", text: "Glad it worked." });
      section.appendChild(ok);
    }

    if (step.type === "exit" && step.forum) {
      var forumP = el("p");
      var fa = el("a", { href: step.forum, text: "Search or post on the official Zotero forums" });
      fa.target = "_blank";
      fa.rel = "noopener";
      forumP.appendChild(fa);
      section.appendChild(forumP);
    }

    // Controls: Back / Start over
    var controls = el("div", { class: "tool-controls" });
    if (state.history.length > 1) {
      var back = el("button", { type: "button", class: "btn btn-secondary", text: "Back" });
      back.addEventListener("click", goBack);
      controls.appendChild(back);
    }
    var restart = el("button", { type: "button", class: "btn btn-secondary", text: "Start over" });
    restart.addEventListener("click", renderChooser);
    controls.appendChild(restart);

    root.appendChild(status);
    root.appendChild(section);
    root.appendChild(controls);

    heading.focus();
  }

  function goBack() {
    if (state.history.length <= 1) return renderChooser();
    state.history.pop();
    var prev = state.history[state.history.length - 1];
    state.history.pop();
    showStep(prev);
  }

  fetchFlows()
    .then(function (data) {
      FLOWS = data;
      renderChooser();
    })
    .catch(function () {
      root.innerHTML = "";
      var p = el("p", { class: "tool-status" });
      p.textContent = "The troubleshooting flows could not be loaded (no JavaScript or fetch unavailable). Use the official documentation instead:";
      var a = el("a", { href: "https://www.zotero.org/support/", text: "zotero.org/support" });
      p.appendChild(document.createElement("br"));
      p.appendChild(a);
      root.appendChild(p);
    });
})();
