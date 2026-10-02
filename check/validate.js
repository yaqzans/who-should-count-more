// Paste into the browser console on the page (or run via a test harness).
// Recomputes five cells of the research model's sweeps with the page's own
// engine and prints them next to the Python results. Expect agreement within
// about 0.01 to 0.02 (Monte Carlo noise from 8 electorates x 500 elections).
(() => {
  const B = window.__ballot;
  const base = { n: 5001, f: 0.25, m: 5, q: 0.3, se: 0.8, su: 2, me: 3, mu: 300, bn: 1, bl: 1, pl: 0, pk: 0,
                 lam: 1.5, mix: "same", pi: 0.5, "mu-e": 0, bud: 0, r: 3, k: 8000, kOff: true };
  function acc(over) {
    const p = Object.assign({}, base, over), w = [0, 0]; let T = 0;
    for (let s = 0; s < 8; s++) {
      const pop = B.population(p, 1000 + s), R = B.rng(5000 + s);
      for (let t = 0; t < 500; t++) { const e = B.election(p, pop, R); e.sys.forEach((r, j) => { w[j] += r.betterWins ? 1 : 0; }); T++; }
    }
    return [w[0] / T, w[1] / T].map((x) => x.toFixed(3)).join(" / ");
  }
  console.table({
    "sweep 5, 3 national / 300 local  (Python 0.859 / 0.739)": acc({}),
    "sweep 5, 3 national / 30 local   (Python 0.852 / 0.740)": acc({ mu: 30 }),
    "sweep 6, lean 0.5, pi 0.5         (Python 0.843 / 0.623)": acc({ me: 1, mu: 1, bn: 0.2, bl: 0.2, "mu-e": 0.5 }),
    "sweep 4a, swing, bad bank 0.40    (Python 0.788 / 0.806)": acc({ me: 1, mu: 1, bn: 0.3, bl: 0.3, pl: 0.25, pk: 0.4, mix: "swing", pi: 1 }),
    "sweep 4a, lean bad, bad bank 0.40 (Python 0.494 / 0.295)": acc({ me: 1, mu: 1, bn: 0.3, bl: 0.3, pl: 0.25, pk: 0.4, mix: "kite", pi: 1 }),
  });
})();
