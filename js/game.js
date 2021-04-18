const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
	state = {}
	showTextNode(1)
}

//Implements story text, removes buttons
function showTextNode(textNodeIndex) {
	const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
	textElement.innerText = textNode.text
	while (optionButtonsElement.firstChild) {
		optionButtonsElement.removeChild(optionButtonsElement.firstChild)
	}

//Adds buttons in based on textNode options
	textNode.options.forEach(option => {
		if (showOption(option)) {
			const button = document.createElement('button')
			button.innerText = option.text
			button.classList.add('btn')
			button.addEventListener('click', () => selectOption(option))
			optionButtonsElement.appendChild(button)
		}
	})
}

function showOption(option) {
	return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
	const nextTextNodeId = option.nextText
	if (nextTextNodeId <= 0) {
		return startGame ()
	}
	state = Object.assign(state, option.setState)
	showTextNode(nextTextNodeId)
}

const textNodes = [
{
	id: 1,
	text: "After a week of classes and social activities, you realize that your pantry is nearly barren. You need to stock up on a few things at the store before another busy week sets in. You should get going. Do you want to walk or take the bus?",
	options: [
		{
			text: "Take the bus.",
			setState: {bus: true},
			nextText: 2
		},
		{
			text: "It's nice out, I'll walk.",
			setState: {walk: true},
			nextText: 40
		}
	]
},
{
	id: 2,
	text: "The rickety old bus is never as nice, but it certainly gets you there faster. Now that you're at the store what do you need?",
	options: [
		{
			text: "I need milk.",
			nextText: 3
		},
		{
			text: "I'm getting orange juice.",
			nextText: 68
		}
	]
},
{
	id: 3,
	text: "Right, it's milk you need! Which kind do you need again?",
	options: [
		{
			text: "2% cow's milk is fine.",
			nextText: 4
		},
		{
			text: "Soy milk, preferably.",
			nextText: 5
		}
	]
},
{
	id: 4,
	text: "Shockingly, of all things ... the store appears to be out of milk! On the disgruntled bus ride home you write a pointed review on the store's Google Maps page incredulously questioning how a grocery store could run out of milk.",
	options: [
		{
			text: "Play again?",
			nextText: -1
		}

	]
},
{
	id: 5,
	text: "As you approach the milk section and grab a carton of soy milk, a twentysomething man in a MAGA hat emerges out of the corner of your eye and violently knocks it out of your hand, calling you a 'soy boy.' What should you do in response?",
	options: [
		{
			text: "Blinded by sudden rage, you retaliate physically with a swing for his jugular.",
			nextText: 6
		},
		{
			text: "You gather yourself, holding back the impulse to engage physically, instead searching for a sharp verbal riposte.",
			nextText: 7
		},
		{
			text: "Being conflict averse and already on edge, you shamefully put the soy milk back and decide to take cow's milk instead.",
			nextText: 4
		}
	]
},
{
	id: 6,
	text: "Your punch lands and knocks the man back into a display of Goldfish Crackers. He gathers himself and - before you can think - torpedoes himself into you, knocking you into a basket of Pringles. Footage of your 'Grocery Store Fight' becomes a minor meme online. You start a Patreon from it, eventually generating enough revenue from a growing patron base to and resign from your day job.",
	options: [
		{
			text: "Play again?",
			nextText: -1
		}
	]
},
{
	id: 7,
	text: "You're never as quick with your tongue in these situations as you'd like. While racking your brain for a quick zinger, you search the man's face ... realizing that he is a childhood friend from grade school that you lost touch with nearly a decade ago! What do you do?",
	options: [
		{
			text: "You shout his name - which has just miraculously come to mind - at him, urging him to (hopefully) recognize you.",
			nextText: 8
		},
		{
			text: "You overrule your recognition and yell back something about him being a 'MAGA chud.'",
			nextText: 9
		}
	]
},
{
	id: 8,
	text: "Your voice cracks calling out his name, and he seems to recognize you for a split second, diffusing the situation. Both mildly embarrassed, you chat for a while and catch up on the last decade. He razzes you about the soy milk, but ... somehow more good-naturedly than he did at first. Eventually, you excuse yourself, pay for the soy milk, and head out, reflecting the whole bus ride home on the complicated interconnection between the personal and political.",
	options: [
		{
			text: "Play again?",
			nextText: -1
		}
	]
},
{
	id: 9,
	text: "Your epithet lands and the MAGA-capped man lunges at you, pinning you under his considerable weight and beating you to a pulp. Amidst the din of supper hour shopping the store security eventually does arrive, but, unfortunately, they intervene too late.",
	options: [
		{
			text: "Play again?",
			nextText: -1
		}
	]
},
{
	id: 40,
	text: "You've decided to walk to the store. The fresh air is nice. On your way there you see a man pacing in the park. He doesn't seem to notice you. It looks like he has a gun.",
	options: [
	{
		text: "Leave the guy alone. It's probably nothing and it's none of your business anyways. You keep walking.",
		setState: {notBusyBody: true},
		nextText: 41
	},
	{
		text: "You have a bad feeling but you're trying not to be such a busy-body. Maybe if he's still in the park on your way back you'll do something. You keep walking.",
		setState: {busyBody: true},
		nextText: 41
	}]
},
{
	id: 41,
	text: "You arrive at the store. Now that you're here, what do you need?",
	options: [
	{
		text: "Milk.",
		nextText: 42
	},
	{
		text: "Orange juice.",
		nextText: 60
	}]
},
{
	id: 42,
	text: "They store is out of milk.",
	options: [
	{
		text: "I guess I'll go home.",
		nextText: 43
	},
	{
		text: "I already came all this way. I'll get orange juice instead",
		nextText: 60
	}
	]
},
{
	id: 43,
	text: "What kind of grocery store runs out of milk. You walk home and resolve to leave a scathing Google review when you get in.",
	options: [
	{
		text: "The man is not at the park anymore. It must have been nothing. You start to feel good about not getting involved but you can't quite shake the low hum of dread that something bad might have happened.",
		requiredState: (currentState) => currentState.busyBody,
		nextText: 44
	},
	{
		text: "Play again.",
		requiredState: (currentState) => currentState.notBusyBody,
		nextText: -1
	}
	]
},
{
	id: 44,
	text: "Do you want to play again?",
	options: [
	{
		text: "Play again.",
		nextText: -1
	}
	]
},
{
	id: 60,
	text: "You go to look for the orange juice. It literally could not be further from the front of the store. You think you hear a commotion near the front doors.",
	options: [
	{
		text: "The high ceilings mean it's always loud in here. You ignore it and grab some OJ.",
		requiredState: (currentState) => currentState.notBusyBody,
		setState: {orangeJuice: true},
		nextText: 61
	},
	{
		text: "You decide to go investigate.",
		requiredState: (currentState) => currentState.notBusyBody,
		setState: {noOrangeJuice: true},
		nextText: 61
	},
	{
		text: "It's probaby nothing but you remember the man in the park and start to feel anxious. You're already at the coolers so you grab a jug of orange juice anyways",
		requiredState: (currentState) => currentState.busyBody,
		setState: {orangeJuice: true},
		nextText: 61
	},
	{
		text: "You think about the man you saw in the park and begin to feel panicked. You head for the doors.",
		requiredState: (currentState) => currentState.busyBody,
		setState: {noOrangeJuice: true},
		nextText: 61
	}
	]
},
{
	id: 61,
	text: "You head for the front of the store and notice the shouts getting louder. As you get closer you see it's the man from the park.",
	options: [
	{
		text: "You're glad you didn't grab any orange juice. You sneak out the doors without anyone noticing you",
		requiredState: (currentState) => currentState.noOrangeJuice,
		nextText: 44
	},
	{
		text: "You try to get closer to see what's going on.",
		requiredState: (currentState) => currentState.noOrangeJuice,
		nextText: 62
	},
	{
		text: "He's making a scene but you can't tell why. You wait in line to pay for your juice.",
		requiredState: (currentState) => currentState.orangeJuice,
		nextText: 64
	},
	{
		text: "You try to get closer to see what's going on.",
		requiredState: (currentState) => currentState.orangeJuice,
		nextText: 62
	}
	]
},
{
	id: 62,
	text: "The man from the park has a gun! He's robbing the store!",
	options:
	[
	{
		text: "You head for the doors before he notices you.",
		nextText: 66
	},
	{
		text: "You try to get closer without being noticed.",
		nextText: 64
	}
	]
},
{
	id: 63,
	text: "You escape unscathed with your 'free' orange juice.",
	options: [
	{
		text: "You make a mental note to go back and pay another day",
		requiredState: (currentState) => currentState.busyBody,
		nextText: 44
	},
	{
		text: "Your heart is racing but you make it home basically okay. You feel a twinge of regret for not doing anything about the man in the park earlier but shake it off easily.",
		nextText: 44
	}
	]
},
{
	id: 64,
	text: "You're in a grocery store while it's being robbed. What do you want to do?",
	options: [
	{
		text: "Maybe no one has called the cops yet? You decide you'll call them.",
		requiredState: (currentState) => currentState.busyBody,
		setState: {callTheCops: true},
		nextText: 65
	},
	{
		text: "Surely someone has already called the police. You decide to film with your phone in case they need evidence.",
		requiredState: (currentState) => currentState.busyBody,
		setState: {film: true},
		nextText: 65
	},
	{
		text: "You run for the doors.",
		requiredState: (currentState) => currentState.orangeJuice,
		nextText: 63
	},
	{
		text: "Worldstar Hiphop! You decide to film for the internet.",
		requiredState: (currentState) => currentState.notBusyBody,
		setState: {film: true},
		nextText: 65
	},
	{
		text: "You want no part of this. You head for the doors.",
		requiredState: (currentState) => currentState.noOrangeJuice,
		nextText: 66
	}
	]
},
{
	id: 65,
	text: "The robber notices you and starts yelling at you to put your phone away",
	options: [
	{
		text: "You drop your phone and back away, like he asks.",
		nextText: 67
	},
	{
		text: "You realize this is something you would never do. Why are you filming a man with a gun? What has gotten into you.",
		setState: {isThisADream: true},
		nextText: 67
	},
	{
		text: "You drop your phone but are careful not to hang up. Maybe they can track your call?",
		requiredState: (currentState) => currentState.callTheCops,
		nextText: 67
	}
	]
},
{
	id: 66,
	text: "You escape unscathed. Do you want to play again?",
	options: [
	{
		text: "Play again.",
		nextText: -1
	}
	]
},
{
	id: 67,
	text: "The cashier hands the robber some cash and he leaves. No one is hurt.",
	options: [
	{
		text: "Your footage is basically unsalvageable. Looks like you won't be going viral anytime soon.",
		requiredState: (currentState) => currentState.film,
		nextText: 71
	},
	{
		text: "This seems like an odd way for this story to end.",
		requiredState: (currentState) => currentState.isThisADream,
		nextText: 70
	},
	{
		text: "You pay for your orange juice--finally.",
		requiredState: (currentState) => currentState.orangeJuice,
		nextText: 69
	},
	{
		text: "You're relieved that no one is hurt. You go back to the coolers to get the orange juice that you came for.",
		requiredState: (currentState) => currentState.noOrangeJuice,
		nextText: 68
	}
	]
},
{
	id: 68,
	text: "Wow, they're sold out of orange juice! What a waste of a trip.",
	options: [
	{
		text: "Play again?",
		nextText: -1
	}
	]
},
{
	id: 69,
	text: "You pay for your orange juice and head home. The cashier is nice.",
	options: [
	{
		text: "You go home.",
		nextText: 44
	}
	]
},
{
	id: 70,
	text: "You wake up! It was all a dream! You should probably cut back on the melatonin.",
	options: [
	{
		text: "This seems like a cop out.",
		nextText: 72
	},
	{
		text: "I guess that's fine.",
		nextText: 44
	}
	]
},
{
	id: 71,
	text: "You're disappointed about the footage but happy to get out of here unscathed. You head home.",
	options: [
	{
		text: "Play again?",
		nextText: -1
	}
	]
},
{
	id: 72,
	text: "¯\_(ツ)_/¯",
	options: [
	{
		text: "Play again?",
		nextText: -1
	}
	]
}
]

startGame()