# How easy is it to rig an election?

**Live: https://yaqzans.github.io/who-should-count-more/**

The page has a good candidate, a bad candidate and 1,001 voters. Someone backing
the bad one tries to rig the election: by paying people for their votes, by
threatening them, or by buying the national news. Every election is counted
twice, on the same ballots:

- **Equal votes:** one person, one vote
- **Educated x5:** an educated person's vote counts as five

The question is which count is harder to steal.

## What is on the page

1. **Pick a country.**
   - Bangladesh, India and Pakistan are tuned to real survey data.
   - Two made-up worlds show the idea in its pure form: everyone shares 3
     channels, or everyone reads widely.
2. **Pick how to rig it.** Pay for votes, threaten voters, buy the TV news,
   or any mix of them.
3. **Hold elections.** There are three ways to run one:
   - **Hold an election:** watch one get counted.
   - **Find a stolen election:** skip ahead to one the rigging flipped.
   - **Run 1,000 elections:** a live chart of how often each count picks the
     good candidate.

   A scoreboard under the buttons keeps a running total for elections held
   with "Hold an election": how many, how many were stolen under each count,
   and what the rigger spent.
4. **Who won, and why.**
   - **Headline:** each election gets one, written from its own numbers, in
     red when the result was stolen.
   - **Two panels, one per count.** Each has its own bar, which ticks up live
     while the votes are counted and marks where the result stood before any
     rigging. Each also has its own write-up:
     - in short: what decided it
     - is this normal: the good candidate's win rate over 300 replayed
       elections with the same settings
     - who has the say
     - the margin
     - what the rigger did, or what flipping it would have cost
     - a verdict
   - **What everyone heard:** shared by both counts. It covers each group's
     news, the worst and most helpful local source, the parties, and the
     swing voters.
   - **Comparing the two:** the exact arithmetic of why the counts differ,
     and the lesson.
5. **Over 1,000 elections:** how many each count won, and how many the
   rigging stole.

**The picture.** Every dot is a voter, linked to the sources they follow:
- **Layout:** educated voters sit above the dashed line, everyone else below.
  Squares are voters loyal to a party.
- **Colour:** dots turn white for a good vote and red for a bad one.
- **The news:** before anyone votes, small dots travel from each source to
  its listeners, coloured by which way that source leaned.
- **The rigger:** a red RIGGER node is wired to the channels it bought and
  sends red dots to the voters it paid or threatened. Those voters get an x.
- **Interaction:** hover anything for its numbers, and click a source to
  highlight its listeners.

Every one of the 21 variables is listed under "Every variable in the model",
each with a one-line meaning and its source.

## How one election is simulated

1. **The electorate is drawn once** per country and setting.
   - Each voter is educated or not.
   - Each voter is loyal to one of the two parties, or is a swing voter.
   - Each voter has an asking price.
   - Each voter is wired to news sources:
     - educated voters follow 3 national outlets
     - everyone else follows one of 30 local sources, plus, with the country's
       TV share, one national channel
2. **Every election, every source slants a random amount.** This is drawn
   from a normal distribution, even if nobody paid it. Everyone who follows a
   source gets the same push. That shared push is what makes whole groups
   wrong together.
3. **Each voter weighs the candidates:**

   ```
   perceived gap = the good candidate's real edge
                 + the average slant of the sources they follow
                 + their party's pull (if loyal)
                 + the educated standing lean (if educated)
                 + their own random misjudgement
   ```

   They vote good if the gap is positive, bad otherwise. An educated voter's
   own misjudgement is smaller (about +-0.8 against +-2).
4. **The votes are counted twice:** once with weight 1 for everyone, once with
   weight 5 for the educated. The good candidate needs more than half the
   weight, and an exact tie goes to the bad candidate.
5. **The rigger acts on each count separately.**
   - **Bought news** pushes every national channel toward the bad candidate.
   - **Cash and threats** turn voters who voted good. It picks the most vote
     weight per taka first and uses whichever is cheaper for each voter, cash
     or a threat. It stops once the bad candidate reaches half, and only pays
     if the whole job fits the budget.
6. **The same election is replayed with no rigging,** using the same random
   numbers (common random numbers). The difference between the two runs is
   exactly what the rigging changed. That is how the write-up can say "the
   good candidate was ahead until the rigger paid 22 voters".

The random numbers are seeded (mulberry32, with Box-Muller for normal draws),
so any result can be reproduced.

## Where the numbers come from

Some settings are measured, some are reported figures, and some are
assumptions. The page shows each one's source next to its slider.

| variable | value (BD / IN / PK) | source |
|---|---|---|
| Share with higher education | 0.09 / 0.23 / 0.10 | WVS wave 7: 103 of 1,199, 391 of 1,689, 207 of 1,992 |
| Voters loyal to a party | 0.86 / 0.83 / 0.78 | WVS: share who name a party they would vote for |
| Share of loyal voters in the bad candidate's party | 0.50 | assumption: equal parties. WVS gives the ruling party 0.69 / 0.45 / 0.45 of them, which you can set on the slider |
| Educated voters and the parties | loyal as often as everyone else | WVS: the educated are about as attached |
| Everyone else who also watch national TV | 0.86 / 0.63 / 0.65 | WVS: weekly TV viewing in the low-education group |
| How much a national channel slants | 0.54 / 0.49 / 0.22 | fitted to WVS, see below |
| How much a local source slants | 0.68 / 1.00 / 0.46 | fitted to WVS, see below |
| Ordinary vote price | median Tk 1,000 | WFD 2025: "payments per vote starting at BDT 1,000". The spread around it is an assumption, so some votes go cheaper here |
| Price of an educated vote | 3x | assumption. WVS only shows the educated report higher incomes |
| Cost of threatening one voter | Tk 500 | assumption. Afrobarometer: fear of intimidation is the same at every education level, so the cost is the same for everyone |
| The rigger's budget | Tk 10,000 | assumption |
| How hard bought channels push | 0.30 | assumption |
| An educated vote counts | 5x | the question being tested |
| The good candidate's real edge | 0.15 | assumption |
| Own misjudgement, educated / everyone else | +-0.8 / +-2 | assumption, from the research model |
| Standing lean of the educated | none | assumption. WVS shows no clear lean in Bangladesh |
| National channels | 3 | assumption |
| Outlets each educated voter follows | 3 | assumption. WVS: the educated use more kinds of news |
| Local sources | 30 | assumption |
| How strongly loyal voters stick | 1.5 | assumption |
| Voters | 1,001 | assumption. A real seat has about 400,000. In a bigger electorate individual misjudgement cancels out more, so shared mistakes and rigging matter relatively more and the rates would shift; this has not been tested at full size |

### How the slants are fitted

The input everything turns on is how much each group's mistakes are shared.
WVS wave 7 asked three factual questions with known answers. We take the share
of variation in wrong answers that is shared within a region (the intraclass
correlation), for the educated (iE) and for everyone else (iU).

| country | iE | iU |
|---|---|---|
| Bangladesh 2018 | 0.131 | 0.054 |
| India 2023 | 0.111 | 0.124 |
| Pakistan 2018 | 0.024 | 0.028 |

The slants are then set so that the model's share of shared error matches
those values:

```
educated:      (bn^2 / 3) / (bn^2 / 3 + 0.8^2) = iE
everyone else: t (bl^2 + bn^2) / 4 + (1 - t) bl^2 = iU / (1 - iU) * 2^2
```

Here t is the TV share: a TV viewer averages one national channel with their
local source.

This is rough:
- the questions were trivia, not judgements of candidates
- regions are a coarse stand-in for shared news sources
- the surveys cannot see how many outlets people actually share

## What it finds

Over 1,000 elections per cell (`check/rigging.js`, the page's presets), here
is how many the good candidate won, shown as **equal / weighted**:

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

**With no rigging at all,** the two counts are close:
- Bangladesh: weighting loses a few elections, because the educated there share
  their mistakes more.
- India and Pakistan: weighting wins a few, because everyone else's news is
  about as shared as the educated's, so sharper judgement wins out.

**Party loyalty** matters as much as any of these. If the bad candidate's party
holds most of the loyal voters, the good candidate rarely wins under either
count. That is the case in Bangladesh 2018 if the bad candidate belongs to the
ruling party, which held 69% of loyal voters.

## Checked against the research model

The page runs the same equations as a larger Python research model
(simulations, proofs and survey evidence, not public). `check/validate.js`
reruns five cells of that model's sweeps with this page's engine. The new
page-only settings (TV for everyone else, outlets per educated voter,
threats without cash, bought news) are off in these cells, so the comparison
is like for like. Expect agreement within about 0.01 to 0.02:

| case | research model (equal / weighted) | this page |
|---|---|---|
| educated share 3 national outlets, 300 local sources | 0.859 / 0.739 | 0.856 / 0.731 |
| same, 30 local sources | 0.852 / 0.740 | 0.848 / 0.733 |
| educated always lean one way, half the time wrongly | 0.843 / 0.623 | 0.862 / 0.640 |
| bad party's vote bank 40%, educated mostly swing voters | 0.788 / 0.806 | 0.790 / 0.817 |
| same, educated lean to the bad party's bank | 0.494 / 0.295 | 0.500 / 0.303 |

The third row was rerun with 24 electorates: 0.851 +- 0.003 / 0.635 +- 0.005,
against the model's closed form of 0.851 / 0.634.

`check/rigging.js` reruns the results table above. The page's own "Run 1,000
elections" gives the same numbers.

## Files

- `ballot.html`: the page source. Edit this one.
- `index.html`: the full page GitHub Pages serves. Rebuild it after every edit:

  ```
  python make_index.py
  ```

- `check/validate.js`, `check/rigging.js`: paste into the browser console on
  the page.

## Not a forecast

Many settings are assumptions. The two that matter most have not been measured
for real candidates:
- how much educated voters share their mistakes
- what a vote really costs to buy, and what a threat costs

Africa is not included, because Afrobarometer does not ask the factual
questions needed to measure shared mistakes. The candidates are fictional and
stand for no real party.
