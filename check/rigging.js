// Paste into the browser console on the page. Reruns "Run 1,000 elections" for
// every country and every way of rigging, exactly as the page does it (same
// electorate, same random numbers, each election drawn once rigged and once
// honest), and prints good-candidate wins and elections stolen under each
// count (equal / weighted). These are the numbers quoted in the README.
// Settings are the page's presets: equal-sized parties, Tk 10,000 budget,
// threats at Tk 500, bought channels pushing 0.30.
(() => {
  const B = window.__ballot, SEED = 20260212, T = 1000;
  const base = { kE: 3, n: 1001, m: 5, q: 0.15, se: 0.8, su: 2, "mu-e": 0, mu: 30, lam: 1.5, mix: "same", r: 3, pi: 1 };
  const worlds = {
    Bangladesh: { me: 3, f: 0.09, bn: 0.54, bl: 0.68, bank: 0.86, tvU: 0.86 },
    India:      { me: 3, f: 0.23, bn: 0.49, bl: 1.00, bank: 0.83, tvU: 0.63 },
    Pakistan:   { me: 3, f: 0.10, bn: 0.22, bl: 0.46, bank: 0.78, tvU: 0.65 },
  };
  const rigs = {
    "pay for votes":    { bud: 0.1, k: 8000, cap: 0, noBuy: false },
    "threaten voters":  { bud: 0.1, k: 500, cap: 0, noBuy: true },
    "buy the TV news":  { bud: 0, k: 8000, cap: 0.3, noBuy: false },
  };
  const out = {};
  for (const [wn, w] of Object.entries(worlds)) for (const [rn, rg] of Object.entries(rigs)) {
    const p = Object.assign({}, base, w, rg);
    p.pl = p.bank / 2; p.pk = p.bank / 2; p.kOff = p.k >= 8000;
    const clean = Object.assign({}, p, { bud: 0, cap: 0 });
    const pop = B.population(p, SEED), won = [0, 0], fair = [0, 0];
    for (let k = 0; k < T; k++) {
      const e = B.election(p, pop, B.rng(SEED * 31 + k)), h = B.election(clean, pop, B.rng(SEED * 31 + k));
      for (const j of [0, 1]) { won[j] += e.sys[j].betterWins ? 1 : 0; fair[j] += h.sys[j].betterWins ? 1 : 0; }
    }
    out[`${wn}, ${rn}`] = `honest ${fair[0]} / ${fair[1]}, rigged ${won[0]} / ${won[1]}, stolen ${fair[0] - won[0]} / ${fair[1] - won[1]}`;
  }
  console.table(out);
})();
