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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(selector).forEach((el) => {
    // 最初から画面に見えている要素と、すでに通り過ぎた要素は動かさない
    if (el.getBoundingClientRect().top < viewportHeight * 0.9) return;
    el.classList.add("reveal");
    observer.observe(el);
  });
}
