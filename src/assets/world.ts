export const world: string =
`{"#anywhere":{"do":[{"if":{"eq":[{"value":"#command"},{"value":"check inventory"}]},"then":{"list":{"location":{"value":"#player"},"phrase":{"value":"You have #thing."}}}}]},"places":{"_intro":{"description":"","do":[{"if":{"eq":[{"value":"#command"},{"value":"#enter"}]},"then":{"do":[{"say":[{"value":"A shadow hunts you. What had been but a vague and lurking fear, a scratching at the outer wall of the conscious mind,"}]},{"say":[{"value":"became a sudden reality after that terrible ritual. It had been folly to participate, you knew that now. And perhaps it had"}]},{"say":[{"value":"even been a trap set by Willem to destroy you, or to feed the thing? You could only guess, and there was no time now for guessing.<p>"}]},{"say":[{"value":"Only flight.<p>"}]},{"say":[{"value":"{Continue...|_intro_next 1}"}]}]}},{"if":{"eq":[{"value":"#command"},{"value":"_intro_next 1"}]},"then":{"do":[{"say":[{"value":"The Thing is only a step behind, but somehow you've made it this far. Dusk has fallen and you stand in the very street where"}]},{"say":[{"value":"Dr. Walter Sinclar lives; an expert in the occult and the only hope you have of freedom from your eldrich pursuer."}]},{"say":[{"value":"Still clutching his letter in your hand, you stare wildly about you for the proper house.<p>"}]},{"say":[{"value":"{Continue...|_intro_next 2}"}]}]}},{"if":{"eq":[{"value":"#command"},{"value":"_intro_next 2"}]},"then":{"travel":{"value":"_street"}}}]},"_street":{"description":{"value":"{A Windy Street|_street}"},"do":[{"if":{"neq":[{"value":"#command"},{"value":"#enter"}]},"then":{"do":{"function":{"value":"_street_check_dead"}}}},{"if":{"eq":[{"value":"#command"},{"value":"look around"}]},"or":[{"eq":[{"value":"#command"},{"value":"#enter"}]}],"then":{"say":[{"say":[{"value":"Imposing houses, most with darkened windows, stand back from the pavement to the right and left of the empty street.<p>"}]},{"say":[{"value":"You see {!!a golden plaque|_right_hand_plaque} hanging from the garden wall next to the {!!gate of the house|_right_hand_gate} to the {!!east|go east}.<p>"}]},{"say":[{"value":"You see {!!another plaque|_left_hand_plaque} similarly placed next to {!!the gate|_left_hand_gate} across the street, to the {!!west|go west}.<p>"}]},{"say":[{"value":"The street continues {!!north|go north}, into the dark."}]}]}},{"if":{"eq":[{"value":"#command"},{"value":"examine _left_hand_plaque"}]},"then":{"say":[{"value":"The plaque reads: \\\"380 Mayfair Street\\\""}]}},{"if":{"eq":[{"value":"#command"},{"value":"examine _right_hand_plaque"}]},"then":{"say":[{"value":"The plaque reads: \\\"381 Mayfair Street\\\""}]}},{"if":{"eq":[{"value":"#command"},{"value":"go west"}]},"or":[{"eq":[{"value":"#command"},{"value":"go east"}]},{"eq":[{"value":"#command"},{"value":"use _left_hand_gate"}]},{"eq":[{"value":"#command"},{"value":"use _right_hand_gate"}]},{"eq":[{"value":"#command"},{"value":"examine _left_hand_gate"}]},{"eq":[{"value":"#command"},{"value":"examine _right_hand_gate"}]}],"then":{"say":[{"value":"The gate is locked."}]}},{"if":{"eq":[{"value":"#command"},{"value":"go north"}]},"then":{"travel":{"value":"_street_2"}}}]},"_street_2":{"description":{"value":"{Further Down A Windy Street|_street_2}"},"do":[{"if":{"neq":[{"value":"#command"},{"value":"#enter"}]},"then":{"do":{"function":{"value":"_street_check_dead"}}}},{"if":{"eq":[{"value":"#command"},{"value":"look around"}]},"or":[{"eq":[{"value":"#command"},{"value":"#enter"}]}],"then":{"say":[{"say":[{"value":"Two more houses loom out of the darkness of the lonely street.<p>"}]},{"say":[{"value":"You see {!!an address plaque|_right_hand_plaque} by {!!a gate|_right_hand_gate} to the {!!east|go east}.<p>"}]},{"say":[{"value":"And {!!another plaque|_left_hand_plaque} near {!!the gate|_left_hand_gate} to the {!!west|go west}.<p>"}]},{"say":[{"value":"The street continues {!!north|go north}."}]}]}},{"if":{"eq":[{"value":"#command"},{"value":"examine _left_hand_plaque"}]},"then":{"say":[{"value":"The plaque reads: \\\"382 Mayfair Street\\\""}]}},{"if":{"eq":[{"value":"#command"},{"value":"examine _right_hand_plaque"}]},"then":{"say":[{"value":"The plaque reads: \\\"383 Mayfair Street\\\""}]}},{"if":{"eq":[{"value":"#command"},{"value":"go west"}]},"or":[{"eq":[{"value":"#command"},{"value":"go east"}]},{"eq":[{"value":"#command"},{"value":"use _left_hand_gate"}]},{"eq":[{"value":"#command"},{"value":"use _right_hand_gate"}]},{"eq":[{"value":"#command"},{"value":"examine _left_hand_gate"}]},{"eq":[{"value":"#command"},{"value":"examine _right_hand_gate"}]}],"then":{"say":[{"value":"The gate is locked."}]}},{"if":{"eq":[{"value":"#command"},{"value":"go north"}]},"then":{"travel":{"value":"_street_3"}}},{"if":{"eq":[{"value":"#command"},{"value":"go south"}]},"then":{"travel":{"value":"_street"}}}]},"_street_3":{"description":{"value":"{The End Of A Windy Street|_street_3}"},"do":[{"if":{"neq":[{"value":"#command"},{"value":"#enter"}]},"then":{"do":{"function":{"value":"_street_check_dead"}}}},{"if":{"eq":[{"value":"#command"},{"value":"look around"}]},"or":[{"eq":[{"value":"#command"},{"value":"#enter"}]}],"then":{"say":[{"say":[{"value":"The street ends here.<p>"}]},{"say":[{"value":"{!!A golden plaque|_right_hand_plaque} hangs near {!!the gate|_right_hand_gate} to the {!!east|go east}.<p>"}]},{"say":[{"value":"{!!Another plaque|_left_hand_plaque} hangs near {!!the gate|_left_hand_gate} to the {!!west|go west}.<p>"}]}]}},{"if":{"eq":[{"value":"#command"},{"value":"examine _left_hand_plaque"}]},"then":{"say":[{"value":"The plaque reads: \\\"384 Mayfair Street\\\""}]}},{"if":{"eq":[{"value":"#command"},{"value":"examine _right_hand_plaque"}]},"then":{"say":[{"value":"The plaque reads: \\\"385 Mayfair Street\\\""}]}},{"if":{"eq":[{"value":"#command"},{"value":"go east"}]},"or":[{"eq":[{"value":"#command"},{"value":"use _right_hand_gate"}]}],"then":{"travel":{"interrupt":true,"value":"_street_sinclair_front_lawn"}}},{"if":{"eq":[{"value":"#command"},{"value":"go west"}]},"or":[{"eq":[{"value":"#command"},{"value":"use _left_hand_gate"}]},{"eq":[{"value":"#command"},{"value":"examine _left_hand_gate"}]}],"then":{"say":[{"value":"The gate is locked."}]}},{"if":{"eq":[{"value":"#command"},{"value":"go south"}]},"then":{"travel":{"value":"_street_2"}}}]},"_street_sinclair_front_lawn":{"description":{"value":"{Front Garden|_street_sinclair_front_lawn}"},"do":[{"if":{"eq":[{"value":"#command"},{"value":"#enter"}]},"or":[{"eq":[{"value":"#command"},{"value":"look around"}]}],"then":{"do":[{"if":{"eq":[{"variable":"_street_entered_lawn"},{"value":"false"}]},"then":{"do":[{"set":[{"value":"_street_entered_lawn"},{"value":"true"}]},{"clear":true},{"say":[{"value":"<p>You push open the gate and enter Dr. Sinclair's front garden.<p>"}]}]}},{"if":{"eq":[{"variable":"_street_entered_lawn"},{"value":"true"}]},"then":{"say":[{"say":[{"value":"A gravel path makes straight for the front door of Dr. Sinclair's house."}]}]}}]}}]},"_street_death":{"description":{"value":"You Have Died"},"do":[{"say":[{"value":"<p>Too long in the open, and without Dr. Sinclar's aid, the horrible shadow has consumed you.<p>"}]},{"say":[{"value":"(Refresh the page to play again)"}]}]}},"things":{"#player":{"location":"_intro"},"_sinclar_letter":{"location":"#player","description":"{!!a letter from Dr. Walter Sinclar|_sinclar_letter}","do":[{"if":{"eq":[{"value":"#command"},{"value":"examine _sinclar_letter"}]},"then":{"if":{"in":[{"value":"_sinclar_letter"},{"value":"#player"}]},"then":{"do":[{"say":[{"value":"\\\"Dear Mr. Smith<p>"}]},{"say":[{"value":"I have learned of your plight. Make no mistake, you are in grave danger."}]},{"say":[{"value":"However, I believe I can help you. Come to my home on Mayfair Street at once, number 385.<p>"}]},{"say":[{"value":"Do not delay.\\\""}]}]}}}]}},"variables":{"_street_num_turns":{"value":"0"},"_street_entered_lawn":{"value":"false"},"#turn":{"value":"1"}},"functions":{"_street_check_dead":[{"set":[{"value":"_street_num_turns"},{"modifier":{"operation":"add","operand":{"value":"1"}},"variable":"_street_num_turns"}]},{"if":{"eq":[{"variable":"_street_num_turns"},{"value":"3"}]},"then":{"say":[{"value":"<p>The wind is beginning to howl.<p>"}]}},{"if":{"eq":[{"variable":"_street_num_turns"},{"value":"6"}]},"then":{"say":[{"value":"<p>You sense It drawing near.<p>"}]}},{"if":{"eq":[{"variable":"_street_num_turns"},{"value":"9"}]},"then":{"say":[{"value":"<p>\\\"God save me... It's here...\\\"<p>"}]}},{"if":{"eq":[{"variable":"_street_num_turns"},{"value":"10"}]},"then":{"do":[{"clear":true},{"travel":{"interrupt":true,"value":"_street_death"}}]}}]},"settings":{"keywords":[{"keyword":"use"},{"keyword":"examine"},{"keyword":"look around"},{"keyword":"{inventory|check inventory}"},{"keyword":"{north|go north}"},{"keyword":"{south|go south}"},{"keyword":"{east|go east}"},{"keyword":"{west|go west}"}]}}`;
