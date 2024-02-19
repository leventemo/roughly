# ROUGHLY

.. is a draft version of a guessing game I'm working on. It's work in progress right now.

TODO:
- [ ] format numbers in scores for floats: no "0.7000000000000002"
- [ ] hourglass icon with messages
- [ ] show recap of qns, answers, links & scores
- [ ] finalize styling
- [ ] randomize order of qns
- [ ] sanitize

refactor with Quiz class + Game class
* Roughly class
  + qns – DONE
  + messages for invalid anwers – DONE
  + messages on screen (see "Roughly.delay") – DONE
  + evaluateAnswers() – DONE
* global in main.ts
  + index - done
* Game class
  + scoresA – DONE
  + scoresB – DONE
  + answerA – DONE
  + answerB – DONE
  + starterPlayer – DONE
  + winner – DONE
  + toggleStarterPlayers() – DONE
  + currentRound – ???
  + get currentRound() – ???
  + chooseWinner() – DONE
  + gameLog

call both classes in main or Roughly only?
