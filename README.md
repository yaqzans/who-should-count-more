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
2. **Pick how to rig it.** Pay for votes, threaten voters, buy the TV news, or
   any mix of them.
3. **Hold elections.** Watch one get counted, jump to a stolen one, or run
   1,000.
4. **Read who won and why.** Every election is also drawn honestly from the
   same random numbers. The write-up comes from that election's own numbers:
   - the margins
   - each channel's lean
   - the worst local source and how its listeners voted
   - the party banks and the swing voters
   - who the rigger paid or threatened, and at what price
   - what flipping a count it could not afford would have cost

All 21 variables are listed on the page under "Every variable in the model".
Each one has a one-line meaning and a source: a survey, a reported figure, or
an assumption.

Over 1,000 elections per cell (`check/rigging.js`, the page's presets:
equal-sized parties, Tk 10,000 budget, threats at Tk 500, bought channels
pushing 0.30), here is how many the good candidate won, shown as
**equal / weighted**:

| country | rigging | honest | rigged | stolen |
|---|---|---|---|---|
| Bangladesh | pay for votes | 816 / 758 | 473 / 486 | 343 / 272 |
| Bangladesh | threaten voters | 816 / 758 | 581 / 188 | 235 / 570 |
| Bangladesh | buy the TV news | 816 / 758 | 501 / 404 | 315 / 354 |
| India | pay for votes | 890 / 894 | 622 / 756 | 268 / 138 |
| India | threaten voters | 890 / 894 | 698 / 531 | 192 / 363 |
| India | buy the TV news | 890 / 894 | 607 / 560 | 283 / 334 |
| Pakistan | pay for votes | 921 / 963 | 412 / 687 | 509 / 276 |
| Pakistan | threaten voters | 921 / 963 | 626 / 76 | 295 / 887 |
| Pakistan | buy the TV news | 921 / 963 | 585 / 529 | 336 / 434 |

**Paying for votes:** weighting educated votes protects the election in all
three countries. The cheap votes a briber buys count least, and educated votes
cost more.

**Threats:** weighting is a disaster everywhere. A threat costs the same for
anyone, so the rigger goes for the educated, whose votes count 5x.

**Buying the news:** it steals many elections either way. Weighting still makes
it somewhat easier, because national channels are all of an educated voter's
news but only half of a TV viewer's among everyone else.

**With no rigging at all:** the two counts are close.
- Bangladesh: weighting loses a few elections, because the educated there
  share their mistakes more.
- India and Pakistan: weighting wins a few, because everyone else's news is
  about as shared as the educated's, so sharper judgement wins out.

Everyone else hears a local source and, in the country presets, national TV
as well. The share watching TV comes from the survey's weekly TV viewing among
the less educated: 86% in Bangladesh, 63% in India, 65% in Pakistan.

Party loyalty matters as much as any of these. If the bad candidate's party
holds most of the loyal voters, the good candidate rarely wins under either
count. That is the case if the bad candidate is the ruling party's in
Bangladesh 2018, which held 69% of them.

## The real-data worlds

These come from World Values Survey wave 7 and use four numbers per country:

- the share of adults with higher education
- the share who name a party they would vote for (the loyal voters)
- the ruling party's share of those (on the slider, not the default)
- weekly national TV viewing among the less educated
- how much people in the same region make the same mistake on three factual
  questions (the regional intraclass correlation of wrong answers, for the
  educated and for everyone else)

The page sets the news-source bias so that the model's share of shared error
matches those correlations. For everyone else, part of their news is now national
TV, so the local slant is refitted to keep their shared share on target.

| country | higher education | shared error, educated | shared error, others | name a party | ruling party's share |
|---|---|---|---|---|---|
| Bangladesh 2018 | 103 of 1,199 | 0.131 | 0.054 | 0.86 | 0.69 |
| India 2023 | 391 of 1,689 | 0.111 | 0.124 | 0.83 | 0.45 |
| Pakistan 2018 | 207 of 1,992 | 0.024 | 0.028 | 0.78 | 0.45 |

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
