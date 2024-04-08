// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {

  const fillers = {
    detective: [
      "Detective",
      "Inspector",
      "Big Guns",
      "Private Eye",
      "Nancy Drew wannabe",
      "Sleuth",
      "Dr. Strange",
      "Sherlock",
      "Offbrand Holmes",
      "James Bond reject",
      "Captain Obvious",
    ],
    pre: ["Shi", "Tro", "Ding", "Pan", "Ast", "Ara", "Mel", "Stu", "Kings"],
    post: [
      "gria",
      "ston",
      "gott",
      "-on-the-lee",
      "uwu",
      "ed",
      "iesty",
      "ingleberg",
    ],
    people: [
      "kindly",
      "meek",
      "suspicious",
      "grieving",
      "scared",
      "cherished",
      "frightened",
      "forgotten",
      "apathetic",
      "smart-ass",
      "deliberate",
      "malicious",
      "too-concered",
      "fake",
      "dramatic",
    ],
    murder_weapon: [
      "axe",
      "knife",
      "brick",
      "rock",
      "phone line",
      "gun",
      "sword",
      "razor",
      "spoon",
      "fists",
      "mace",
      "potato",
    ],
    detective_tools: [
      "magnifying glass",
      "notebook",
      "flashlight",
      "gloves",
      "evidence bag",
      "tweasers",
    ],
    num: [
      "two",
      "three",
      "eleven",
      "so many",
      "too many",
      "seven",
      "an unknown number",
    ],
    evidence: [
      "crucial",
      "incriminating",
      "cryptic",
      "the key",
      "holy grail",
      "missing link",
      "unsatisfying",
      "miniscule",
    ],
    clues: [
      "a few footprints",
      "couple of fingerprints",
      "some bloodstains",
      "cryptic messages",
      "somehair strands",
      "some weird liquid",
      "a torn pice of frabic",
      "a letter",
      "distinct smell",
    ],
    suspects: [
      "butler",
      "maid",
      "gardener",
      "business partner",
      "relative",
      "wife",
      "husband",
      "partner",
      "brother",
      "sister",
      "friend",
      "best friend",
      "Ex",
      "Psycho Ex",
      "Ex-wife",
      "Ex-Husband",
      "Ex's new boyfriend",
      "Ex's new girlfriend",
      "neighbor",
      "rival",
      "angry ex-employee",
      "teacher",
      "student",
    ],
    message: [
      "You'll never catch me!",
      "Too slow...",
      "Maybe next time",
      "tick tock",
      "Miss me?",
      "You should've heard their screams",
      "tag, you're it!",
      "Your move",
      "Time to Play",
      "Like sand I slip through your fingers",
      "HA HA HA HA",
      "See you soon...",
      "See you next time...",
    ],
  };
  
  const template = `Ahhh $detective, you finally made it!
  
  Listen we got a bad feeling this is your guy. Looks like they made it all the way to good ol' $pre$post unfortunatley. It's a similar MO they attacked the $suspect of the $suspect, with a $murder_weapon. They left a message on the wall for you in the victim's blood saying "$message. Obvioculy they were expecting you $detective. We found a $murder_weapon next to the body, we're thinking the victim was trying to fight back. So far we've got a couple of suspects, the $suspect, $suspect, $suspect, $suspect, and the $suspect. We'll help as much as we can, and since this is your man you'll have to take the lead $detective. 
  
  Thank you officer, I wish we were meetign under different circumstances. I've been hunting this psycho down for $num years, and still he taunts me and I'm no where closer. They've killed $num people, I can't let them die in vain."
  `;
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").text(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  
  generate();
  



}

// let's get this party started - uncomment me
//main();