const monsterSpeed = 4;

    class Monster {
      constructor(pos) { this.pos = pos; }

      get type() { return "monster"; }

      static create(pos) { return new Monster(pos.plus(new Vec(0, -1))); }

      update(time, state) {
        let player = state.player;
        let speed = (player.pos.x < this.pos.x ? -1 : 1) * time * monsterSpeed;
        let newPos = new Vec(this.pos.x + speed, this.pos.y);
        if (state.level.touches(newPos, this.size, "wall")) return this;
        else return new Monster(newPos);
      }

      collide(state) {
        let player = state.player;
        if (player.pos.y + player.size.y < this.pos.y + 0.5) {
          let filtered = state.actors.filter(a => a != this);
          return new State(state.level, filtered, state.status);
        } else {
          return new State(state.level, state.actors, "lost");
        }
      }
    }

    Monster.prototype.size = new Vec(1.2, 2);

    levelChars["M"] = Monster;

    runLevel(new Level(`
..................................
.################################.
.#..............................#.
.#..............................#.
.#..............................#.
.#...........................o..#.
.#..@...........................#.
.##########..............########.
..........#..o..o..o..o..#........
..........#...........M..#........
..........################........
..................................
`), DOMDisplay);