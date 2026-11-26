/* Dropdown menu Kapsio: klik (atau arahkan kursor di laptop) pada tab untuk melihat isi halamannya. */
(function () {
  var MENU = {
    "index.html": { t: "Jasa Website", d: "Website rapi di HP, jadi mulai 3 hari kerja.", items: [
      ["🎬", "Cara kami membuat website", "Dari chat sampai website tayang", "index.html#cerita"],
      ["💡", "Kenapa perlu website", "Pelanggan mencarimu di Google dulu", "index.html#masalah"],
      ["🔍", "Audit gratis", "Cek Instagram atau websitemu", "index.html#audit"],
      ["🧰", "Layanan", "Website, toko online, animasi, 3D", "index.html#layanan"],
      ["🖼️", "Contoh tampilan", "23 contoh website per jenis usaha", "index.html#contoh"],
      ["🏷️", "Paket dan harga", "Rintis, Tumbuh, Juara, Toko, Jaga", "index.html#paket"],
      ["🪜", "Proses kerja", "4 langkah sampai tayang", "index.html#proses"],
      ["💳", "Pembayaran", "DP 50%, lunas setelah puas", "index.html#bayar"],
      ["❓", "Tanya jawab", "Hosting, domain, lama pengerjaan", "index.html#faq"]
    ]},
    "sosmed.html": { t: "Kelola Sosmed", d: "Instagram dan TikTok aktif tiap minggu.", items: [
      ["⭐", "Portofolio akun nyata", "Reel sampai 14,3 juta tayangan", "sosmed.html#portofolio"],
      ["🧰", "Yang kami kerjakan", "Rencana konten, desain, Reels, laporan", "sosmed.html#layanan"],
      ["🏷️", "Paket dan harga", "Hadir, Aktif, Bintang", "sosmed.html#paket"],
      ["🪜", "Cara kerja", "Mulai dalam seminggu", "sosmed.html#proses"],
      ["❓", "Tanya jawab", "Kontrak, akses akun, syuting", "sosmed.html#faq"],
      ["💬", "Konsultasi gratis", "Isi formulir singkat", "sosmed.html#kontak"]
    ]},
    "digital-marketing.html": { t: "Meta Ads", d: "Iklan Facebook dan Instagram yang mendatangkan chat WhatsApp.", items: [
      ["📈", "Hasil iklan nyata", "Dashboard asli, 7.600+ chat", "digital-marketing.html#hasil"],
      ["📣", "Layanan iklan", "Meta Ads, Pixel, tindak lanjut WhatsApp", "digital-marketing.html#layanan"],
      ["🏷️", "Paket dan harga", "Langkah, Laju, Melesat", "digital-marketing.html#paket"],
      ["⭐", "Portofolio", "Konten yang sudah terbukti ditonton", "digital-marketing.html#portofolio"],
      ["🪜", "Cara kerja", "Dari audit sampai laporan", "digital-marketing.html#proses"],
      ["❓", "Tanya jawab", "Budget minimal, kapan hasil terlihat", "digital-marketing.html#faq"],
      ["💬", "Konsultasi gratis", "Isi formulir singkat", "digital-marketing.html#kontak"]
    ]},
    "portofolio.html": { t: "Portofolio", d: "Contoh website dan akun sosmed yang kami pegang.", items: [
      ["🖥️", "23 contoh website", "Klik untuk membuka tiap websitenya", "portofolio.html"],
      ["📱", "Akun sosmed nyata", "Cerita Sibiru, Sekolah Binekas, dan lainnya", "sosmed.html#portofolio"],
      ["🎬", "Website bercerita 3D", "Contoh laundry yang dibangun saat di-scroll", "index.html#cerita"]
    ]}
  };

  var css = "" +
    ".kd-panel{position:fixed;left:0;right:0;z-index:60;display:none;padding:0 16px}" +
    ".kd-panel.on{display:block;animation:kdIn .18s ease-out}" +
    "@keyframes kdIn{from{opacity:0;transform:translateY(-6px)}}" +
    ".kd-box{max-width:1080px;margin:8px auto 0;background:#fff;color:#0f172a;border-radius:20px;box-shadow:0 30px 70px rgba(10,22,48,.35);display:grid;grid-template-columns:1fr 250px;overflow:hidden;font-family:inherit}" +
    ".kd-list{display:grid;grid-template-columns:repeat(3,1fr);gap:2px 6px;padding:14px;align-content:start}" +
    ".kd-list a{display:block;padding:8px 12px;border-radius:12px;text-decoration:none;color:inherit}" +
    ".kd-list a:hover,.kd-list a:focus-visible{background:#f2f5ff;outline:none}" +
    ".kd-list i{font-style:normal;font-size:20px;line-height:1.2}" +
    ".kd-list b{display:block;font-size:.92rem;line-height:1.3}.kd-list small{display:block;color:#5b6478;font-size:.8rem;line-height:1.3;margin-top:1px}" +
    ".kd-side{background:linear-gradient(160deg,#13244a,#0a1630);color:#fff;padding:20px;display:flex;flex-direction:column;gap:10px}" +
    ".kd-side b{font-size:1.1rem}.kd-side p{margin:0;color:#c7d2f5;font-size:.88rem;line-height:1.5}" +
    ".kd-side .kd-go{margin-top:auto;display:block;text-align:center;background:#fff;color:#0a1630;font-weight:800;font-size:.88rem;padding:.65em .8em;border-radius:99px;text-decoration:none}" +
    ".kd-side .kd-wa{display:block;text-align:center;background:#25d366;color:#052e16;font-weight:800;font-size:.88rem;padding:.65em .8em;border-radius:99px;text-decoration:none}" +
    ".tabs a .kd-c,.tb a .kd-c{display:inline-block;margin-left:4px;font-size:.7em;transition:transform .2s;opacity:.8}" +
    ".tabs a.kd-open .kd-c,.tb a.kd-open .kd-c{transform:rotate(180deg)}" +
    ".tabs a.kd-open:not(.on){background:rgba(255,255,255,.16);color:#fff}" +
    ".kd-dim{position:fixed;inset:0;z-index:45;background:rgba(10,22,48,.25);display:none}.kd-dim.on{display:block}" +
    "@media(max-width:900px){.kd-box{grid-template-columns:1fr;max-height:calc(100vh - 150px);overflow:auto}.kd-list{grid-template-columns:1fr 1fr;padding:10px}.kd-list a{padding:7px 9px}.kd-side{padding:14px}.kd-side p{display:none}}" +
    "@media(max-width:520px){.kd-list{grid-template-columns:1fr}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var tabs = [].slice.call(document.querySelectorAll(".tabs a, .tb a"));
  if (!tabs.length) return;
  var header = tabs[0].closest("header") || tabs[0].parentNode;
  var panel = document.createElement("div"); panel.className = "kd-panel"; panel.setAttribute("role", "menu");
  var dim = document.createElement("div"); dim.className = "kd-dim";
  document.body.appendChild(dim); document.body.appendChild(panel);
  var C = window.KAPSIO || {};
  var wa = C.wa ? "https://wa.me/" + C.wa + "?text=" : null;
  var openTab = null, hoverT = null;

  function key(a) { var h = (a.getAttribute("href") || "").split("#")[0].split("/").pop(); return h || "index.html"; }
  function place() { var r = header.getBoundingClientRect(); panel.style.top = Math.max(0, r.bottom) + "px"; }
  function build(k) {
    var m = MENU[k]; if (!m) return false;
    var list = m.items.map(function (x) {
      return '<a role="menuitem" href="' + x[3] + '"><span><b>' + x[1] + '</b><small>' + x[2] + '</small></span></a>';
    }).join("");
    var msg = encodeURIComponent("Halo Kapsio Digital, saya mau tanya soal " + m.t.toLowerCase() + ".");
    panel.innerHTML = '<div class="kd-box"><div class="kd-list">' + list + '</div><div class="kd-side"><b>' + m.t + '</b><p>' + m.d + '</p>' +
      '<a class="kd-go" href="' + k + '">Buka halaman ' + m.t + '</a>' +
      (wa ? '<a class="kd-wa" target="_blank" rel="noopener" href="' + wa + msg + '">Tanya CS</a>' : '') + '</div></div>';
    return true;
  }
  function open(a) {
    var k = key(a); if (!build(k)) return;
    tabs.forEach(function (t) { t.classList.toggle("kd-open", t === a); t.setAttribute("aria-expanded", t === a ? "true" : "false"); });
    openTab = a; place(); panel.classList.add("on"); dim.classList.add("on");
  }
  function close() {
    openTab = null; panel.classList.remove("on"); dim.classList.remove("on");
    tabs.forEach(function (t) { t.classList.remove("kd-open"); t.setAttribute("aria-expanded", "false"); });
  }
  var hover = matchMedia("(hover:hover) and (pointer:fine)").matches;
  tabs.forEach(function (a) {
    if (!MENU[key(a)]) return;
    a.setAttribute("aria-haspopup", "true"); a.setAttribute("aria-expanded", "false");
    var c = document.createElement("span"); c.className = "kd-c"; c.textContent = "▾"; c.setAttribute("aria-hidden", "true"); a.appendChild(c);
    a.addEventListener("click", function (e) {
      e.preventDefault();
      if (openTab === a) close(); else open(a);
    });
    if (hover) {
      a.addEventListener("mouseenter", function () { clearTimeout(hoverT); hoverT = setTimeout(function () { open(a); }, 120); });
      a.addEventListener("mouseleave", function () { clearTimeout(hoverT); hoverT = setTimeout(function () { if (!panel.matches(":hover")) close(); }, 250); });
    }
  });
  if (hover) {
    panel.addEventListener("mouseleave", function () { hoverT = setTimeout(function () { if (!openTab || !openTab.matches(":hover")) close(); }, 250); });
    panel.addEventListener("mouseenter", function () { clearTimeout(hoverT); });
  }
  panel.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
  dim.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  addEventListener("resize", function () { if (openTab) place(); });
  addEventListener("scroll", function () { if (openTab) place(); }, { passive: true });
})();
