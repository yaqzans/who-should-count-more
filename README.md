# How easy is it to rig an election?

**Live: https://yaqzans.github.io/who-should-count-more/**

The page has a good candidate, a bad candidate and 1,001 voters. Someone backing the
bad one tries to rig the election, either by paying people for their votes or by
buying the TV news. Every election is counted twice:

- one person, one vote
- educated votes worth 5x

The question is which count is harder to steal.

1. **Pick a country.** Bangladesh, India and Pakistan are tuned to real survey
   data. Two made-up worlds show the idea.
2. **Pick how to rig it.** Buy votes, buy the TV news, both, or neither.
3. **Hold elections.** Watch one get counted, jump to a stolen one, or run
   1,000.
4. **Read who won and why.** Every election is also drawn honestly from the
   same random numbers. So the page can say exactly what the rigging changed:
   who would have won without it, who was paid, and whether the result was
   stolen.

Over 1,000 elections per cell (`check/rigging.js`, the page's default
settings), here is how many the good candidate won, shown as
**equal / weighted**:

| country | rigging | honest | rigged | stolen |
|---|---|---|---|---|
| Bangladesh | buy votes | 907 / 795 | 543 / 631 | 364 / 164 |
| Bangladesh | buy the TV news | 907 / 795 | 789 / 489 | 118 / 306 |
| India | buy votes | 836 / 756 | 614 / 663 | 222 / 93 |
| India | buy the TV news | 836 / 756 | 536 / 352 | 300 / 404 |
| Pakistan | buy votes | 951 / 926 | 566 / 701 | 385 / 225 |
| Pakistan | buy the TV news | 951 / 926 | 815 / 413 | 136 / 513 |

**Buying votes:** weighting educated votes protects the election. The cheap
votes a briber buys are the ones that count least, and educated votes cost more.

**Buying the news:** weighting makes the election easier to steal. The bought
national channels are the ones the educated watch, and their votes count 5x.

**With no rigging at all:** weighting already loses some elections. The educated
make fewer mistakes one by one, but they share a few channels, so they make
those mistakes together.

How often the good candidate won with no rigging, out of 1,200 elections per
world (`check/worlds.js`):

| world | every vote equal | educated votes 5x |
|---|---|---|
| Same 3 channels (made up) | 0.692 | 0.621 |
| Read widely, 100 channels (made up) | 0.873 | 0.912 |
| Bangladesh 2018 | 0.897 | 0.796 |
| India 2023 | 0.838 | 0.750 |
| Pakistan 2018 | 0.960 | 0.936 |

## The real-data worlds

These come from World Values Survey wave 7 and use two numbers per country:

- the share of adults with higher education
- how much people in the same region make the same mistake on three factual
  questions (the regional intraclass correlation of wrong answers, for the
  educated and for everyone else)

The page sets the news-source bias so that the model's share of shared error
matches those correlations.

| country | higher education | shared error, educated | shared error, others |
|---|---|---|---|
| Bangladesh 2018 | 103 of 1,199 | 0.131 | 0.054 |
| India 2023 | 391 of 1,689 | 0.111 | 0.124 |
| Pakistan 2018 | 207 of 1,992 | 0.024 | 0.028 |

This calibration is rough:

- the questions were trivia, not judgements of candidates
- regions are a coarse stand-in for shared news sources
- the surveys cannot see how many channels people actually share, so the
  channel count stays at 3

Africa is not included, because Afrobarometer does not ask the factual
questions this needs.

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

The page's simplified controls sit on the full model's engine, unchanged.
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
measured. The candidates are fictional and stand for no real party.
