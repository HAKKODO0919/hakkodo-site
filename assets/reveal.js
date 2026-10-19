/* ========================================================
   スクロールに合わせた、控えめなフェードイン。
   動かすのは opacity と translateY だけで、レイアウト(大きさ・位置)は変わらない。
   隠す役目の .reveal クラスはこのファイルだけが付けるので、JavaScriptが
   動かない環境・動きを減らす設定の環境では、何も隠れない。
   使い方: initReveal(".home-feature-media, .home-feature-body")
   (スマホ(幅599px以下)では、渡した要素を含む .home-feature 全体を、1つの塊として動かす。タブレット・PCは、別々に動かす)
   (見た目のルールは assets/style.css の「スクロール時のフェードイン」)
   ======================================================== */

// config.includeVisible: true のとき、最初から画面に見えている要素も、ページを開いた直後に、
// 上から順に(config.stagger 秒ずつ遅らせて。省略時 0.12秒)ふわっと現れる(読み物のページ向き。トップページは、これまでどおり、動かさない)。
function initReveal(selector, config) {
  const includeVisible = !!(config && config.includeVisible);
  // 最初から見えている要素が、1つずつ遅れて現れる間隔(秒)。config.stagger で変えられる(省略時 0.12)。
  const stagger = config && config.stagger ? config.stagger : 0.12;
  // 最初の1つが動き始めるまでの待ち時間(秒。省略時 0.1)。ページが最初に描かれたあとに動きが始まるよう、少し待たせると、
  // 動きの大半が、画面に出る前に終わってしまうことがなくなる(通信が遅いときほど、最初の描画が遅れるため)。
  const startDelay = config && config.startDelay != null ? config.startDelay : 0.1;
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, options);

  // 動かす対象を決める。タブレット・PCは、写真と文章を別々に動かす。
  // (タブレットは画面が大きく、写真と文章を合わせた塊が縦に800px以上になる。塊の上の端が画面に入った瞬間に
  //  全体が動き出すと、塊のほとんどがまだ画面の外にある間に動きが終わり、フェードインが見えなくなるため。)
  // スマホ(幅599px以下。縦に並び、塊が低い)は、写真と文章が離れて別々に現れると、ばらばらに見えるので、
  // 写真・見出し・本文・ボタンを含むセクション(.home-feature)全体を、1つの塊として、まとめて動かす。
  let targets = Array.from(document.querySelectorAll(selector));
  const grouped = window.matchMedia && matchMedia("(max-width: 599px)").matches;
  if (grouped) {
    const seen = new Set();
    targets = targets
      .map((el) => el.closest(".home-feature") || el)
      .filter((el) => (seen.has(el) ? false : (seen.add(el), true)));
  }

  let initialIndex = 0;
  targets.forEach((el) => {
    if (el.getBoundingClientRect().top < viewportHeight * 0.9) {
      // 最初から画面に見えている要素と、すでに通り過ぎた要素は、これまでどおり動かさない。
      // includeVisible のときだけ、最初から見えている要素を、順に現れさせる(通り過ぎた要素=画面より上は動かさない)。
      if (!includeVisible || el.getBoundingClientRect().bottom < 0) return;
      // 最初から見えている要素は、クラスの付け外しによる動き(トランジション)ではなく、CSSのキーフレームアニメーション
      // (.reveal-load。assets/style.css)で動かす。トランジションは、「隠した状態」が確定する前に「表示」が付くと動かず、
      // 読み込みのタイミングに左右されるが、キーフレームアニメーションは、要素が描かれたときから、遅れ(animation-delay)を待って、
      // 必ず始まる(遅れの間は、最初の状態=透明で待つ)。見た目(透明→表示、下から12px、0.9秒)は、トップページの見出し「旨味の世界へようこそ。」と同じ。
      el.classList.add("reveal-load");
      el.style.animationDelay = (startDelay + stagger * initialIndex++) + "s";
      return;
    }
    // 監視を先に始め、失敗したときは .reveal を付けない(隠れたまま残らないように)
    try {
      observer.observe(el);
    } catch (e) {
      return;
    }
    el.classList.add("reveal");
  });
}
