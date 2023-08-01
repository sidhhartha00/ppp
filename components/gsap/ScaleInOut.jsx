import classNames from 'classnames';
import AnimateInOut from './AnimateInOut';

export default function ScaleInOut({
    children,
    overflowHidden,
    fade = true,
    durationIn = 0.5,
    durationOut = 0.25,
    delay = 0,
    delayOut = 0,
    ease = 'power4.out',
    scale = 0,
    scaleTo = 1,
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
                    transform: `translate(${x}, ${y}) scale(${scale})`
                }}
                to={{
                    ease,
                    opacity: 1,
                    scale: scaleTo,
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