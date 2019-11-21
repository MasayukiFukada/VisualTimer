"use strict";

/** ビジュアルタイマー */
class VisualTimer {
    constructor(width, height, radius) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.radius = radius;
        this.context = this.canvas.getContext('2d');
        this.timerBackColor = 'rgb(255, 255, 255)';
        this.timerColor = 'rgb(255, 0, 0)';
        this.frontColor = 'rgb(255, 255, 255)';
        this.startTime = new Date();
        this.endTime = new Date();
        this.totalTick = 0
        // 先に計算しておきたい項目
        this.position_x = width / 2;
        this.position_y = height / 2;
        this.smallRadius = radius / 3;
        this.initialAngle = 270;
        this.startAngle = this.initialAngle * Math.PI / 180;
    }

    /** タイマーの目標時間をセット */
    setTimer(minutes) {
        this.startTime = new Date();
        this.endTime = new Date();
        this.endTime.setMinutes(this.endTime.getMinutes() + minutes);
        this.totalTick = this.endTime.getTime() - this.startTime.getTime();
    }

    /** 時間の更新 */
    async tickTime() {
        return new Promise((resolve, reject) => {
            this.startTime = new Date();
            this.draw();
            resolve(this.canvas);
        });
    }

    /** 描画 */
    draw() {
        this.clearCanvas();
        this.drawBackground(this.position_x, this.position_y);
        this.drawTimer(this.position_x, this.position_y);
        this.drawFront(this.position_x, this.position_y);
        return this.canvas;
    }

    /** キャンバスのクリア */
    clearCanvas() {
        this.context.clearRect(0, 0, this.context.width, this.context.height);
    }

    /** 背景の円を描画 */
    drawBackground(x, y) {
        this.context.fillStyle = this.timerBackColor;
        this.context.beginPath();
        // ゴミが残らない様に少しだけ大きく描画しておく
        this.context.arc(x, y, this.radius + 1, 0, Math.PI * 2, true);
        this.context.fill();
    }

    /** タイマーの円を描画 */
    drawTimer(x, y) {
        let progress = 1 - ((this.endTime.getTime() - this.startTime.getTime()) / this.totalTick);
        let end = (progress >= 1) ? this.initialAngle : 360 * progress + this.initialAngle;
        let endAngle = end * Math.PI / 180;

        this.context.fillStyle = this.timerColor;
        this.context.beginPath();
        this.context.arc(x, y, this.radius, this.startAngle, endAngle, true); // true: 反時計回り
        this.context.lineTo(x, y); // 重要！！これが無いと変な場所がつながる
        this.context.fill();
    }

    /** 前景の円を描画 */
    drawFront(x, y) {
        this.context.fillStyle = this.frontColor;
        this.context.beginPath();
        this.context.arc(x, y, this.smallRadius, 0, Math.PI * 2); // true: 反時計回り
        this.context.fill();
    }
}