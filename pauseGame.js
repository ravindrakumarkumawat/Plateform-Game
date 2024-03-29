function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    let running = "yes";

    return new Promise(resolve => {
      function escHandler(event) {
        if (event.key != "Escape") return;
        event.preventDefault();
        if (running == "no") {
          running = "yes";
          runAnimation(frame);
        } else if (running == "yes") {
          running = "pausing";
        } else {
          running = "yes";
        }
    }
    window.addEventListener("keydown", escHandler);
    let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

      function frame(time) {
        if (running == "pausing") {
          running = "no";
          return false;
        }

        state = state.update(time, arrowKeys);
        display.syncState(state);
        if (state.status == "playing") {
          return true;
        } else if (ending > 0) {
          ending -= time;
          return true;
        } else {
          display.clear();
          window.removeEventListener("keydown", escHandler);
          arrowKeys.unregister();
          resolve(state.status);
          return false;
        }
      }
      runAnimation(frame);
    });
  }

  function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
      if (keys.includes(event.key)) {
        down[event.key] = event.type == "keydown";
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    down.unregister = () => {
      window.removeEventListener("keydown", track);
      window.removeEventListener("keyup", track);
    };
    return down;
  }