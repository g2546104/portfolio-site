document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("game-toggle");
    const panel = document.getElementById("game-panel");
    const close = document.getElementById("game-close");
    const clickButton = document.getElementById("click-button");
    const scoreDisplay = document.getElementById("game-score");
    const resetButton = document.getElementById("game-reset");

    if (
        !toggle ||
        !panel ||
        !close ||
        !clickButton ||
        !scoreDisplay ||
        !resetButton
    ) {
        return;
    }

    let score = 0;
    let timeLeft = 10;
    let timer = null;
    let playing = false;

    // 残り時間の表示を作成
    const timerDisplay = document.createElement("p");
    timerDisplay.id = "game-timer";
    timerDisplay.textContent = "残り時間：10秒";

    scoreDisplay.parentElement.insertAdjacentElement(
        "afterend",
        timerDisplay
    );

    // ゲームの表示を更新
    function updateDisplay() {
        scoreDisplay.textContent = score;
        timerDisplay.textContent = `残り時間：${timeLeft}秒`;
    }

    // ゲームを開始
    function startGame() {
        clearInterval(timer);

        score = 0;
        timeLeft = 10;
        playing = true;

        clickButton.disabled = false;
        clickButton.textContent = "クリック！";

        updateDisplay();

        timer = setInterval(function () {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    // ゲームを終了
    function endGame() {
        clearInterval(timer);
        timer = null;
        playing = false;

        timeLeft = 0;
        updateDisplay();

        clickButton.disabled = true;
        clickButton.textContent = "終了！";

        timerDisplay.textContent =
            `終了！ 最終スコア：${score}回`;
    }

    // ゲーム画面を開く
    toggle.addEventListener("click", function () {
        panel.hidden = false;

        toggle.setAttribute("aria-expanded", "true");

        // すでにゲーム中なら二重に開始しない
        if (!playing && timer === null) {
            startGame();
        }
    });

    // ゲーム画面を閉じる
    close.addEventListener("click", function () {
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
    });

    // クリックするたびにスコアを増やす
    clickButton.addEventListener("click", function () {
        if (!playing) return;

        score++;
        scoreDisplay.textContent = score;
    });

    // リセットして10秒から再スタート
    resetButton.addEventListener("click", function () {
        startGame();
    });
});