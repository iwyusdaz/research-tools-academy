/* Skills check engine.
 *
 * Accessibility contract (verified with Playwright keyboard tests):
 * - One scenario at a time; options are radios in a fieldset (legend = prompt).
 * - "Check answer" evaluates; per-option feedback renders in a role=status
 *   region and the feedback heading receives focus.
 * - Back stays available after checking so a learner can re-read the previous
 *   scenario.
 * - Progress and results are text; nothing is stored or transmitted.
 * - Lesson links in feedback make sense out of context.
 */
(function () {
  "use strict";

  var root = document.getElementById("skills-check");
  if (!root) return;

  var DATA = null;
  var state = { index: 0, answers: {}, checked: false };

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

  function fetchItems() {
    return fetch("items.json").then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  function start() {
    state = { index: 0, answers: {}, checked: false };
    renderItem();
  }

  function renderItem() {
    var item = DATA.items[state.index];
    state.checked = false;
    root.innerHTML = "";

    root.appendChild(el("h2", { text: "Scenario " + (state.index + 1) + " of " + DATA.items.length }));
    var pathName = DATA.paths[item.path].title;
    root.appendChild(el("p", { class: "tool-status", text: "Path: " + pathName }));

    var section = el("section", { class: "tool-section", "aria-labelledby": "item-heading" });
    section.appendChild(el("h3", { id: "item-heading", tabindex: "-1", text: item.scenario }));

    var form = el("form", { novalidate: true });
    var fieldset = el("fieldset", { class: "tool-fieldset" });
    fieldset.appendChild(el("legend", { text: "Choose one answer" }));
    var opts = el("div", { class: "tool-options" });

    item.options.forEach(function (opt, i) {
      var id = item.id + "-opt-" + i;
      var label = el("label", { for: id });
      var radio = el("input", { type: "radio", name: item.id, id: id, value: String(i) });
      label.appendChild(radio);
      label.appendChild(document.createTextNode(" " + opt.text));
      opts.appendChild(label);
    });

    fieldset.appendChild(opts);
    form.appendChild(fieldset);
    section.appendChild(form);
    root.appendChild(section);

    var controls = el("div", { class: "tool-controls" });
    if (state.index > 0) {
      var back = el("button", { type: "button", class: "btn btn-secondary", text: "Back" });
      back.addEventListener("click", function () {
        state.index -= 1;
        renderItem();
      });
      controls.appendChild(back);
    }
    var check = el("button", { type: "button", class: "btn", text: "Check answer" });
    check.addEventListener("click", function () { checkAnswer(item); });
    controls.appendChild(check);
    root.appendChild(controls);

    var note = el("p", { class: "tool-note", text: "Nothing you answer is stored or sent anywhere — the check runs entirely in your browser." });
    root.appendChild(note);

    var h = root.querySelector("#item-heading");
    if (h) h.focus();
  }

  function checkAnswer(item) {
    if (state.checked) return;
    var chosen = root.querySelector('input[name="' + item.id + '"]:checked');
    if (!chosen) {
      var warn = el("p", { class: "tool-status", role: "alert", text: "Choose an answer first, then check it." });
      var existing = root.querySelector('[role="alert"]');
      if (existing) existing.remove();
      root.insertBefore(warn, root.querySelector(".tool-controls"));
      return;
    }

    state.checked = true;
    var idx = parseInt(chosen.value, 10);
    var opt = item.options[idx];
    state.answers[item.id] = opt.correct;

    // Feedback panel
    var feedback = el("div", { class: "tool-section", role: "status", "aria-labelledby": "feedback-heading" });
    feedback.appendChild(el("h4", { id: "feedback-heading", tabindex: "-1", text: opt.correct ? "Correct." : "Not quite." }));
    feedback.appendChild(el("p", { text: opt.feedback }));
    if (opt.lesson) {
      var p = el("p");
      var a = el("a", { href: "../" + opt.lesson, text: opt.lesson_label });
      p.appendChild(document.createTextNode("Review: "));
      p.appendChild(a);
      feedback.appendChild(p);
    }

    var controls = root.querySelector(".tool-controls");
    root.insertBefore(feedback, controls);

    // Replace check button with next / results; keep Back so the previous
    // scenario can be re-read after checking
    controls.innerHTML = "";
    if (state.index > 0) {
      var back = el("button", { type: "button", class: "btn btn-secondary", text: "Back" });
      back.addEventListener("click", function () {
        state.index -= 1;
        renderItem();
      });
      controls.appendChild(back);
    }
    var isLast = state.index === DATA.items.length - 1;
    var next = el("button", {
      type: "button",
      class: "btn",
      text: isLast ? "See your results" : "Next scenario"
    });
    next.addEventListener("click", function () {
      if (isLast) renderResults();
      else {
        state.index += 1;
        renderItem();
      }
    });
    controls.appendChild(next);
    var fbHeading = feedback.querySelector("#feedback-heading");
    fbHeading.focus();
  }

  function renderResults() {
    root.innerHTML = "";
    root.appendChild(el("h2", { tabindex: "-1", id: "results-heading", text: "Your results" }));

    var byPath = {};
    Object.keys(DATA.paths).forEach(function (p) {
      byPath[p] = { total: 0, correct: 0 };
    });
    DATA.items.forEach(function (item) {
      byPath[item.path].total += 1;
      if (state.answers[item.id]) byPath[item.path].correct += 1;
    });

    var table = el("table", { class: "score-table" });
    var caption = el("caption", { text: "Correct answers by learning path" });
    table.appendChild(caption);
    var thead = el("thead");
    var hr = el("tr");
    ["Path", "Correct", "Out of"].forEach(function (t) {
      hr.appendChild(el("th", { scope: "col", text: t }));
    });
    thead.appendChild(hr);
    table.appendChild(thead);
    var tbody = el("tbody");
    Object.keys(byPath).forEach(function (p) {
      var row = el("tr");
      var titleCell = el("td");
      var overview = DATA.paths[p].overview;
      var a = el("a", { href: "../" + overview, text: DATA.paths[p].title });
      titleCell.appendChild(a);
      row.appendChild(titleCell);
      row.appendChild(el("td", { text: String(byPath[p].correct) }));
      row.appendChild(el("td", { text: String(byPath[p].total) }));
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    root.appendChild(table);

    var interpretation = el("p");
    interpretation.textContent =
      "A lower score in one path suggests starting with that path's first lesson — the feedback on each scenario linked the relevant lesson.";
    root.appendChild(interpretation);

    root.appendChild(el("p", { class: "tool-note", text: "Nothing is stored: closing this page forgets everything. Re-running the check any time is encouraged." }));

    var again = el("button", { type: "button", class: "btn", text: "Start over" });
    again.addEventListener("click", start);
    var controls = el("div", { class: "tool-controls" });
    controls.appendChild(again);
    root.appendChild(controls);

    var h = root.querySelector("#results-heading");
    h.focus();
  }

  fetchItems()
    .then(function (data) {
      DATA = data;
      start();
    })
    .catch(function () {
      root.innerHTML = "";
      root.appendChild(el("p", { class: "tool-status", text: "The skills check could not load. It needs JavaScript and the items.json file next to this page." }));
    });
})();
