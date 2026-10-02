# Who Should Count More?

**Live: https://yaqzans.github.io/who-should-count-more/**

Should educated people's votes count more? There is a good candidate and a bad
one, and 1,001 voters each guess which is which, nudged by the news they
follow. Every election is counted twice, once with every vote equal and once
with educated votes counting extra, and you can see which way picks the good
candidate more often.

1. **Pick a world.** Two are made up to show the idea; three are tuned to real
   survey data for Bangladesh, India and Pakistan.
2. **Hold elections.** Watch one get counted, jump to an upset where the two
   counts disagree, or run 1,000.
3. **Read the result.** Every election comes with one plain sentence on why
   it went the way it did.

The answer turns on one thing: **do educated voters share their mistakes?**
One by one they guess better. But if they all watch the same few channels,
then when those channels are wrong, they are all wrong together, and giving
them extra votes makes that shared mistake bigger.

How often the good candidate won, out of 1,200 elections per world
(`check/worlds.js`, the page's default settings):

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
measured. Lantern and Kite are fictional and stand for no real party.
