# Who Should Count More?

An interactive voting experiment. Every dot is a voter, linked to the news
sources they follow; two candidates stand and one is genuinely better. Hold an
election and watch it counted twice, once with every vote equal and once with
educated votes counting more, then hold a thousand and see which system picks
the better candidate more often. Add family vote banks, a briber, or cheap
intimidation and watch what changes.

Everything runs in the browser. There is no server and nothing is collected.

## Run it

Open `index.html` in a browser. To edit, change `ballot.html` and rebuild:

```
python make_index.py
```

`ballot.html` is the page body (also used for a Claude artifact preview);
`index.html` is the full page GitHub Pages serves.

## The model

A voter's perceived gap between the two candidates is

```
(how much better one candidate is) + (average bias of the news sources they follow)
  + (any standing lean) + (pull of their family vote bank, if any) + (personal error)
```

and they vote for whichever looks better. The better candidate needs more
than half the vote weight; an exact tie goes to the worse one. The briber
backs the worse candidate, knows every vote and every price, and buys the most
vote weight per taka first, intimidating instead wherever that is cheaper.

These are the equations of a larger research model (simulations, proofs and
survey evidence) that is not public yet.

## Checked against the research model

`check/validate.js` reruns five cells of that model's sweeps with this page's
own engine. Last run, 2 October 2026 (8 electorates x 500 elections each;
expected agreement about 0.01 to 0.02):

| case | research model (equal / weighted) | this page |
|---|---|---|
| educated share 3 national outlets, 300 local sources | 0.859 / 0.739 | 0.856 / 0.731 |
| same, 30 local sources | 0.852 / 0.740 | 0.848 / 0.733 |
| educated always lean one way, half the time wrongly | 0.843 / 0.623 | 0.862 / 0.640 |
| bad party's vote bank 40%, educated mostly swing voters | 0.788 / 0.806 | 0.790 / 0.817 |
| same, educated lean to the bad party's bank | 0.494 / 0.295 | 0.500 / 0.303 |

The third row was rerun with 24 electorates: 0.851 +- 0.003 / 0.635 +- 0.005,
against the model's closed form of 0.851 / 0.634.

## Not a forecast

The settings are assumptions. The two that matter most, how much educated
voters share their mistakes and what a vote really costs to buy, have not been
measured. Lantern and Kite are fictional and stand for no real party.
