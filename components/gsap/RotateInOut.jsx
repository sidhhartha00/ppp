import classNames from 'classnames';
import AnimateInOut from './AnimateInOut';

export default function RotateInOut({
    children,
    overflowHidden,
    fade = true,
    durationIn = 0.5,
    durationOut = 0.25,
    delay = 0,
    delayOut = 0,
    ease = 'power1.out',
    rotate = 0,
    rotateTo = 0,
    x = 0,
    y = 0,
    xTo = 0,
    yTo = 0,
    skipOutro,
    watch,
    start = 'top bottom',
    end = 'bottom top',
    scrub = false,
    markers
}) {
    return (
        <div
            className={classNames({
                'u-overflow--hidden': overflowHidden
            })}
        >
            <AnimateInOut
                durationIn={durationIn}
                durationOut={durationOut}
                delay={delay}
                delayOut={delayOut}
                from={{
                    opacity: fade ? 0 : 1,
                    transform: `translate(${x}, ${y}) rotate(${rotate}deg)`
                }}
                to={{
                    ease,
                    opacity: 1,
                    rotate: rotateTo,
                    x: xTo,
                    y: yTo
                }}
                skipOutro={skipOutro}
                watch={watch}
                start={start}
                end={end}
                scrub={scrub}
                markers={markers}
            >
                {children}
            </AnimateInOut>
        </div>
    );
};