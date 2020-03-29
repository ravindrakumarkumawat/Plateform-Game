async function runGame(plans, Display) {
    let lives = 3;
    for (let level = 0; level < plans.length && lives > 0;) {
      console.log(`Level ${level + 1}, lives: ${lives}`);
      let status = await runLevel(new Level(plans[level]),
                                  Display);
      if (status == "won") level++;
      else lives--;
    }
    if (lives > 0) {
      console.log("You've won!");
    } else {
      console.log("Game over");
    }
}