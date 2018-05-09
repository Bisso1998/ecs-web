<template>
    <div class="loading-wrap">
        <div class="cube">
            <div class="front-side face cell">
                <span>പ്ര</span>
            </div>
            <div class="back-side face cell">
                <span>প্র</span>
            </div>
            <div class="top-side face cell">
                <span>પ્ર</span>
            </div>
            <div class="bottom-side face cell">
                <span>ಪ್ರ</span>
            </div>
            <div class="left-side face cell">
                <span>பி</span>
            </div>
            <div class="right-side face cell red">
                <span>प्र</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .spinner {
        text-align: center;
        width: 100%;
        padding: 10px 0;
    }
    .fa-icon {
        color: #d0021b;
    }
    $black: #d0021b;
    $white: #fff;
    $light-grey: #ccc;
    $medium-grey: #999;
    $grey: #666;
    $border-color: #ccc;
    $sideLength: 40px;

    .cell {
        position: relative;
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        transition: background-color 0.3s ease;

        &.changing {
            transition: none;
            background-color: $black;
            &:after,
            &:before {
                border-color: $grey;
            }
            span {
                color: $white;
                &:after,
                &:before {
                    border-color: $grey;
                }
            }
        }
        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 0;
            top: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            z-index: 0;
        }
        &:after {
            content: "";
            position: absolute;
            width: 0;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 0;
        }
        span {
            font-size: 25px;
            position: absolute;
            display: block;
            text-align: center;
            height: 100%;
            width: 100%;
            z-index: 2;
            &:before {
                content: "";
                position: absolute;
                width: 141%;
                height: 0;
                left: -1px;
                top: -1px;
                margin: auto;
                z-index: -1;
                transform: rotate(45deg);
                transform-origin: left top;
            }
            &:after {
                content: "";
                position: absolute;
                width: 141%;
                height: 0;
                right: -1px;
                top: -1px;
                margin: auto;
                z-index: -1;
                transform: rotate(-45deg);
                transform-origin: right top;
            }
        }
    }

    .loading-wrap {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(white, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cube {
        width: $sideLength;
        height: $sideLength;
        transform-style: preserve-3d;

        .face {
            position: absolute;
            width: $sideLength;
            height: $sideLength;
            color: black;
            background-color: #fff;
            box-sizing: border-box;
            border-radius: 0;
            border: 1px solid #000;

            &.cell.red {
                transition: none;
                background-color: $black;
                &:after,
                &:before {
                    border-color: $grey;
                }
                span {
                    color: $white;
                    &:after,
                    &:before {
                        border-color: $grey;
                    }
                }
                i:before {
                    border-color: $grey;
                }
            }
        }

        .front-side {
            transform: translateZ($sideLength/2);
        }
        .back-side {
            transform: translateZ(-$sideLength/2) rotateY(180deg);
        }
        .right-side {
            transform: rotateY(-270deg) translateX($sideLength/2);
            transform-origin: top right;
        }
        .left-side {
            transform: rotateY(270deg) translateX(-$sideLength/2);
            transform-origin: center left;
        }
        .top-side {
            transform: rotateX(-90deg) rotateY(180deg) translateY(-$sideLength/2);
            transform-origin: top center;
        }
        .bottom-side {
            transform: rotateZ(-90deg) rotateY(-90deg) translateY($sideLength/2);
            transform-origin: bottom center;
        }
    }

    @keyframes spin {
        0% {
            transform: rotateX(0) rotateY(0);
        }
        25% {
            transform: rotateX(0) rotateY(-90deg);
        }
        50% {
            transform: rotateX(30deg) rotateY(45deg);
        }
        75% {
            transform: rotateX(-30deg) rotateY(-135deg);
        }
        100% {
            transform: rotateX(0) rotateY(0);
        }
    }

    .cube {
        animation: spin 2400ms ease infinite;
    }
</style>
