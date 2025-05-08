<?php
/**
 * Plugin Name:       Snake Retro Game Shortcode by Eskim
 * Plugin URI:        https://eskim.pl/snake-retro-game-shortcode-by-eskim-en/
 * Description:       Klasyczna gra w węża, dostępna jako shortcode do WordPressa.
 * Version:           1.2.1
 * Requires at least: 5.0
 * Requires PHP:      7.0
 * Author:            Eskim
 * Author URI:        https://eskim.pl
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       snake-retro-game-shortcode-by-eskim
 * Domain Path:       /languages
 */

// Zabezpieczenie przed bezpośrednim dostępem
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Ładowanie tłumaczeń pluginu
add_action('plugins_loaded', 'eskim_snake_load_textdomain');
function eskim_snake_load_textdomain() {
    load_plugin_textdomain(
        'snake-retro-game-shortcode-by-eskim',
        false,
        dirname(plugin_basename(__FILE__)) . '/languages'
    );
}

/**
 * Rejestruje shortcode [snake_game], który renderuje kontener i <canvas> z grą.
 *
 * @return string HTML gry Snake.
 */
function eskim_snake_game_shortcode($atts) {
    $atts = shortcode_atts([
        'speed'            => 65,
        'background_color' => '#000',
        'border_color'     => '#333',
        'snake_color'      => 'lime',
        'food_color'       => 'red',
        'width'            => 300,
        'height'           => 300,
    ], $atts, 'snake_game');

    // Generujemy unikalne ID instancji
    $instance_id = uniqid('snake_');

    ob_start();
    ?>
    <div
        class="snake-game-container"
        data-instance="<?php echo esc_attr($instance_id); ?>"
        data-speed="<?php echo esc_attr($atts['speed']); ?>"
        data-bg-color="<?php echo esc_attr($atts['background_color']); ?>"
        data-border-color="<?php echo esc_attr($atts['border_color']); ?>"
        data-snake-color="<?php echo esc_attr($atts['snake_color']); ?>"
        data-food-color="<?php echo esc_attr($atts['food_color']); ?>"
        data-width="<?php echo esc_attr($atts['width']); ?>"
        data-height="<?php echo esc_attr($atts['height']); ?>"
    >
        <!-- Wyświetlanie aktualnego wyniku -->
        <div class="snake-score" data-label="<?php echo esc_attr__('Score', 'snake-retro-game-shortcode-by-eskim'); ?>">
            <?php echo esc_html__('Score', 'snake-retro-game-shortcode-by-eskim'); ?>: 0
        </div>

        <div class="snake-canvas-wrapper" style="position: relative; display: inline-block;">
            <canvas class="snake-game-canvas" width="<?php echo esc_attr($atts['width']); ?>" height="<?php echo esc_attr($atts['height']); ?>"></canvas>
            <button class="start-snake-game"><?php esc_html_e('Start Game', 'snake-retro-game-shortcode-by-eskim'); ?></button>
        </div>

        <p class="snake-instructions">
            <?php
            echo wp_kses_post(
                __('Use <strong>← ↑ ↓ →</strong> to move, <strong>space</strong> to pause.', 'snake-retro-game-shortcode-by-eskim')
            );
            ?>
        </p>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'snake_game', 'eskim_snake_game_shortcode' );

/**
 * Rejestruje i ładuje pliki JS oraz CSS potrzebne do działania gry.
 * Skrypty ładowane tylko, gdy shortcode lub widżet są aktywne.
 */
function eskim_snake_game_assets() {
    // Rejestracja skryptu i stylu
    wp_register_script(
        'eskim-snake-js',
        plugins_url( 'assets/game.js', __FILE__ ),
        [],
        '1.0.0',
        true
    );

    wp_register_style(
        'eskim-snake-css',
        plugins_url( 'assets/style.css', __FILE__ ),
        [],
        '1.0.0'
    );

    // Ładowanie tylko na pojedynczych stronach lub gdy aktywny widżet
    if ( is_singular() || is_active_widget( false, false, 'eskim_snake_widget', true ) ) {
        // Przekazujemy przetłumaczone teksty do JS
        wp_localize_script('eskim-snake-js', 'SnakeGameL10n', [
            'startText'    => __('Start Game', 'snake-retro-game-shortcode-by-eskim'),
            'scoreText'    => __('Score', 'snake-retro-game-shortcode-by-eskim'),
            'pausedText'   => __('PAUSED', 'snake-retro-game-shortcode-by-eskim'),
            'instructions' => __('Use ← ↑ ↓ → to move, space to pause.', 'snake-retro-game-shortcode-by-eskim'),
        ]);

        wp_enqueue_script( 'eskim-snake-js' );
        wp_enqueue_style( 'eskim-snake-css' );
    }
}
add_action( 'wp_enqueue_scripts', 'eskim_snake_game_assets' );

/**
 * Dodaje link "Buy me a coffee" w wierszu pluginu
 */
add_filter( 'plugin_row_meta', 'eskim_snake_plugin_meta_links', 10, 2 );
function eskim_snake_plugin_meta_links( $links, $file ) {
    if ( strpos( $file, 'snake-retro-game-shortcode-by-eskim.php' ) !== false ) {
        $links[] = '<a href="https://www.buymeacoffee.com/eskim" target="_blank" rel="noopener">Buy me a coffee ☕</a>';
    }
    return $links;
}
