// Paste into the browser console on the page. Reruns "Run 1,000 elections" for
// every country and every way of rigging, exactly as the page does it (same
// electorate, same random numbers, each election drawn once rigged and once
// honest), and prints good-candidate wins and elections stolen under each
// count. These are the numbers quoted in the README.
(() => {
  const B = window.__ballot, SEED = 20260212, T = 1000;
  const base = { n: 1001, se: 0.8, su: 2, mu: 30, pl: 0, pk: 0, lam: 1.5, mix: "same", pi: 1, "mu-e": 0,
                 r: 3, k: 8000, kOff: true, m: 5, q: 0.15 };
  const worlds = {
    Bangladesh: { me: 3, f: 0.09, bn: 0.54, bl: 0.48 },
    India:      { me: 3, f: 0.23, bn: 0.49, bl: 0.75 },
    Pakistan:   { me: 3, f: 0.10, bn: 0.22, bl: 0.34 },
  };
  const rigs = { "buy votes": { bud: 0.1, cap: 0 }, "buy the TV news": { bud: 0, cap: 0.3 } };
  const out = {};
  for (const [wn, w] of Object.entries(worlds)) for (const [rn, rg] of Object.entries(rigs)) {
    const p = Object.assign({}, base, w, rg), clean = Object.assign({}, p, { bud: 0, cap: 0 });
    const pop = B.population(p, SEED), won = [0, 0], fair = [0, 0];
    for (let k = 0; k < T; k++) {
      const e = B.election(p, pop, B.rng(SEED * 31 + k)), h = B.election(clean, pop, B.rng(SEED * 31 + k));
      for (const j of [0, 1]) { won[j] += e.sys[j].betterWins ? 1 : 0; fair[j] += h.sys[j].betterWins ? 1 : 0; }
    }
    out[`${wn}, ${rn}`] = `honest ${fair[0]} / ${fair[1]}, rigged ${won[0]} / ${won[1]}, stolen ${fair[0] - won[0]} / ${fair[1] - won[1]}`;
  }
  console.table(out);
})();
