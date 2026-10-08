/* ========================================================
   ワークショップスケジュールの土台。
   開催が決まるたびに data/workshops/*.js を1件追加し、
   workshops/schedule/index.html の initWorkshopSchedule([...])
   に登録するだけで、開催日ごとの情報を追加・更新できます。
   ======================================================== */

// ワークショップ1件分のカードHTMLに変換する
function renderWorkshopCard(data, lang) {
  const tr = data && data.translations && (data.translations[lang] || data.translations.ja);
  if (!tr) return "";

  const rows = [
    tr.date ? { label: t("workshopDateLabel", lang), value: tr.date } : null,
    tr.time ? { label: t("workshopTimeLabel", lang), value: tr.time } : null,
    tr.place ? { label: t("workshopPlaceLabel", lang), value: tr.place } : null,
    tr.fee ? { label: t("workshopFeeLabel", lang), value: tr.fee } : null,
    tr.capacity ? { label: t("workshopCapacityLabel", lang), value: tr.capacity } : null,
    tr.reservation ? { label: t("workshopReservationLabel", lang), value: tr.reservation } : null,
  ].filter(Boolean);

  const metaHtml = rows.length
    ? `<ul class="workshop-meta">${rows
        .map((r) => `<li><strong>${escapeText(r.label)}</strong>${escapeText(r.value)}</li>`)
        .join("")}</ul>`
    : "";

  return `
    <div class="section workshop-card">
      <h2>${escapeText(tr.title || "")}</h2>
      ${tr.content ? `<p>${escapeText(tr.content)}</p>` : ""}
      ${metaHtml}
    </div>`;
}

// スケジュール一覧を描画する。workshops: [ window.WORKSHOP_DATA相当, ... ]
// 開催予定が無ければ空欄表示にする(既存のレシピ一覧と同じパターン)。
function renderWorkshopScheduleContent(workshops, lang) {
  const root = document.getElementById("workshop-schedule-root");
  if (!root) return;

  if (!workshops || workshops.length === 0) {
    // 開催が決まるまでの案内文。枠やボタンは付けず、他ページの案内文
    // (.intro)と同じ静かな見た目にする。
    // 開催予定が決まったら、initWorkshopSchedule([...]) に1件渡すだけで
    // 自動的にこの案内文から一覧表示へ切り替わる(このifごと変更不要)。
    root.innerHTML = `<div class="intro"><p style="white-space: pre-line;">${escapeText(t("workshopsScheduleEmpty", lang))}</p></div>`;
    return;
  }

  root.innerHTML = workshops.map((data) => renderWorkshopCard(data, lang)).join("");
}

// ワークショップスケジュールページの初期化。
// 想定外のエラーが起きても画面が真っ白にならないよう、失敗時はエラー表示に切り替える。
function initWorkshopSchedule(workshops) {
  const switcherRoot = document.getElementById("lang-switcher-root");

  function render() {
    try {
      const lang = getCurrentLang();
      applyUiStrings(lang);
      document.title = t("workshopsScheduleTitle", lang);
      renderWorkshopScheduleContent(workshops, lang);
    } catch (e) {
      console.error(e);
      const root = document.getElementById("workshop-schedule-root");
      if (root) root.innerHTML = `<div class="load-error">${escapeText(t("productLoadError"))}</div>`;
    }
  }

  try {
    renderLangSwitcher(switcherRoot, render);
  } catch (e) {
    console.error(e);
  }
  render();
}
