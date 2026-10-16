/* ========================================================
   スクロールに合わせた、控えめなフェードイン。
   動かすのは opacity と translateY だけで、レイアウト(大きさ・位置)は変わらない。
   隠す役目の .reveal クラスはこのファイルだけが付けるので、JavaScriptが
   動かない環境・動きを減らす設定の環境では、何も隠れない。
   使い方: initReveal(".home-feature-media, .home-feature-body")
   (見た目のルールは assets/style.css の「スクロール時のフェードイン」)
   ======================================================== */

function initReveal(selector) {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const viewportHeight = window.innerHeight;
  // スマホ・タブレット(幅799px以下、または指で操作する端末。iPadの横向きなども含む)は、
  // 指で素早くスクロールしても透明な時間が長くならないよう、要素が画面に入った時点で動き始める。
  // マウスで操作するPCは、画面に少し入ってから動き始める。
  // この条件は style.css の「@media (max-width: 799px), (pointer: coarse)」と同じにしておくこと。
  const compact = window.matchMedia && matchMedia("(max-width: 799px), (pointer: coarse)").matches;
  const options = compact
    ? { threshold: 0, rootMargin: "0px" }
    : { threshold: 0.12, rootMargin: "0px 0px -8% 0px" };

  // まだ表示していない(.reveal を付けた)要素
  const pending = new Set();

  function show(el) {
    el.classList.add("is-visible");
    pending.delete(el);
    observer.unobserve(el);
    if (pending.size === 0) stopSweep();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // 画面に入った要素、または画面の上へ通り過ぎた要素(ジャンプ・スクロール位置の復元など)は、
      // 透明のまま残さず表示する(通り過ぎた要素は画面の外なので、動きは見えない)
      if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) show(entry.target);
    });
  }, options);

  // 保険: IntersectionObserver の通知が遅れる・届かない環境(Safariの慣性スクロール中など)に備え、
  // スクロール・画面サイズの変更・ページの再表示のあと、まだ表示していない要素を調べ直す。
  // 表示する基準は上の options と同じなので、通常は IntersectionObserver が先に表示する。
  let timer = null;
  function sweep() {
    timer = null;
    const bottomEdge = compact ? window.innerHeight : window.innerHeight * 0.92;
    pending.forEach((el) => {
      const r = el.getBoundingClientRect();
      const overlap = Math.min(r.bottom, bottomEdge) - Math.max(r.top, 0);
      if (r.bottom <= 0 || overlap > options.threshold * r.height) show(el);
    });
  }
  function scheduleSweep() {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(sweep, 150);
  }
  function stopSweep() {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    window.removeEventListener("scroll", scheduleSweep);
    window.removeEventListener("resize", scheduleSweep);
    window.removeEventListener("pageshow", scheduleSweep);
  }

  document.querySelectorAll(selector).forEach((el) => {
    // 最初から画面に見えている要素と、すでに通り過ぎた要素は動かさない
    if (el.getBoundingClientRect().top < viewportHeight * 0.9) return;
    // 監視を先に始め、失敗したときは .reveal を付けない(隠れたまま残らないように)
    try {
      observer.observe(el);
    } catch (e) {
      return;
    }
    el.classList.add("reveal");
    pending.add(el);
  });

  if (pending.size > 0) {
    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep);
    window.addEventListener("pageshow", scheduleSweep);
  }
}
