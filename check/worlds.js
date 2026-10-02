// Paste into the browser console on the page. Reruns the five worlds on the
// page's buttons (6 electorates x 200 elections each, the page's default
// settings: good candidate "a bit" better, educated votes 5x, no briber) and
// prints how often the good candidate won under each count. These are the
// numbers quoted in the README.
(() => {
  const B = window.__ballot;
  const base = { n: 1001, se: 0.8, su: 2, mu: 30, pl: 0, pk: 0, lam: 1.5, mix: "same", pi: 1, "mu-e": 0,
                 r: 3, k: 8000, kOff: true, m: 5, q: 0.15, bud: 0 };
  const worlds = {
    "Same 3 channels (made up)": { me: 3, f: 0.25, bn: 1, bl: 1 },
    "Read widely (made up)":     { me: 100, f: 0.25, bn: 1, bl: 1 },
    "Bangladesh 2018 (WVS)":     { me: 3, f: 0.09, bn: 0.54, bl: 0.48 },
    "India 2023 (WVS)":          { me: 3, f: 0.23, bn: 0.49, bl: 0.75 },
    "Pakistan 2018 (WVS)":       { me: 3, f: 0.10, bn: 0.22, bl: 0.34 },
  };
  const out = {};
  for (const [name, w] of Object.entries(worlds)) {
    const p = Object.assign({}, base, w), wins = [0, 0]; let n = 0;
    for (let s = 0; s < 6; s++) {
      const pop = B.population(p, 20260212 + s), R = B.rng(77 + s);
      for (let t = 0; t < 200; t++) { const e = B.election(p, pop, R); e.sys.forEach((r, j) => { wins[j] += r.betterWins ? 1 : 0; }); n++; }
    }
    out[name] = (wins[0] / n).toFixed(3) + " / " + (wins[1] / n).toFixed(3);
  }
  console.table(out);
})();
