# Snake Retro Game Shortcode by Eskim

[![WordPress Plugin](https://img.shields.io/wordpress/plugin/v/snake-retro-game-shortcode-by-eskim.svg)](https://wordpress.org/plugins/snake-retro-game-shortcode-by-eskim/)
[![License](https://img.shields.io/badge/license-GPLv2-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

**Plugin URL:**  [https://eskim.pl/snake-retro-game-shortcode-en/](https://eskim.pl/snake-retro-game-shortcode-en/)  
**Tags:** snake, game, retro, classic, arcade  
**Requires at least:** WordPress 5.0  
**Tested up to:** WordPress 6.8.1  
**Requires PHP:** 7.0  
**Stable tag:** 1.2.1  
**License:** GPLv2 or later  
**License URI:** [https://www.gnu.org/licenses/gpl-2.0.html](https://www.gnu.org/licenses/gpl-2.0.html)  
**Donate link:** [https://buymeacoffee.com/eskim](https://buymeacoffee.com/eskim)

> **Note:** This is a WordPress plugin.  
> Classic retro Snake game embedded via shortcode. Built with HTML5 canvas and pure JavaScript.

---

## Description

Snake Retro Game Shortcode by Eskim adds a classic Snake game to your WordPress site, fully playable directly in the browser.

The game is embedded via the `[snake_game]` shortcode, and is rendered with HTML5 canvas and JavaScript — no external libraries needed.

**Features:**
- Simple shortcode: `[snake_game]`
- Fully customizable: colors, size, speed
- Adjustable game speed (1 = slowest, 100 = fastest)
- Pause/Resume with spacebar
- Score counter and "PAUSED" message on canvas
- Responsive and lightweight

---

## Installation

1. Upload the plugin folder to `/wp-content/plugins/`.
2. Activate the plugin via the "Plugins" menu in WordPress.
3. Add the `[snake_game]` shortcode to any post or page.

**Example usage:**

```plaintext
[snake_game background_color="#111" snake_color="lime" food_color="yellow" border_color="#0ff" width="400" height="400" speed="75"]
```

---

## Shortcode Parameters

Customize the game using these shortcode attributes:

| Attribute         | Description                                 | Default  |
|-------------------|---------------------------------------------|----------|
| `background_color` | Canvas background color                    | `#000`   |
| `snake_color`      | Snake segment color                        | `lime`   |
| `food_color`       | Food color                                 | `red`    |
| `border_color`     | Border color of the canvas                 | `#333`   |
| `width`            | Canvas width in pixels                    | `300`    |
| `height`           | Canvas height in pixels                   | `300`    |
| `speed`            | Snake speed (1 = slow, 100 = fast)         | `50`     |

---

## Controls

- Use arrow keys (← ↑ ↓ →) to move the snake.
- Press Spacebar to pause/resume the game.
- Click "Start Game" to begin or restart.

---

## Screenshots

1. Snake game displayed with default settings.
2. Game with custom colors and size.
3. Score counter and PAUSED state in action.

---

## FAQ

### Can I change the size and colors?

Yes! Use the shortcode attributes to fully customize the game.

### Can I use this in a widget area?

No — this version is shortcode-only.

### Is it mobile-friendly?

It works on mobile but is best played with a keyboard.

---

## Changelog

### 1.2.1
- Fixed issue where pressing two arrow keys quickly could cause an instant game over
- Improved input handling to prevent unintended diagonal movement
- Minor cleanup and logic stabilization

### 1.2.0
- Added support for multiple games per page (no more ID conflicts)
- Local highscore saved per instance via localStorage
- Added start countdown (3…2…1…START)
- Improved canvas rendering and contrast
- Clean refactor of CSS and JS for multi-instance suport
- Added support for translations

### 1.1.0
- Removed widget support
- Added `mapRange` logic for better speed control
- "PAUSED" label rendered on canvas
- Optimized shortcode-only version

### 1.0.0
- Initial release with shortcode and widget support

---

## License

GPL v2 or later — see [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html).

---

## Upgrade Notice

### 1.2.1
Fixes a bug where pressing two arrow keys too quickly could cause an unexpected game over.

### 1.2.0
Improved UX with countdown, multiple game support, and highscore tracking per instance.

---

## Support the Developer

If you enjoy this plugin and want to support its development, consider [buying me a coffee](https://buymeacoffee.com/eskim).

---

