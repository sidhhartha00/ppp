import styles from '@/styles/modules/HeaderBasic.module.scss';
import Button from './Button';
import FadeInOut from './gsap/FadeInOut';
import ScaleInOut from './gsap/ScaleInOut';
import ImplodeExplodeInOut from './gsap/ImplodeExplodeInOut';
import classNames from 'classnames';

export default function HeaderBasic({
    title,
    wysiwyg,
    button,
    className
}) {
    return (
        <>
            {
                title &&
                <section className={classNames('u-spacing--responsive', styles['c-headerBasic'], styles[className])}>
                    <div className="o-container">
                        <div className={classNames('u-text--center', styles['c-headerBasic__row'])}>
                            <div className="o-wysiwyg">
                                <ImplodeExplodeInOut
                                    delay={.5}
                                    target="#title"
                                    // skipOutro
                                >
                                    <h1 id="title">{title}</h1>
                                </ImplodeExplodeInOut>
                                <FadeInOut
                                    delay={.7}
                                    y={70}
                                    // skipOutro
                                >
                                    <p>{wysiwyg}</p>
                                </FadeInOut>
                            </div>
                            {button &&
                                <ScaleInOut
                                    delay={.9}
                                    y={90}
                                    durationIn={1}
                                    ease="elastic.out"
                                    // skipOutro
                                >
                                    <Button
                                        label={button.label}
                                        href={button.href}
                                        isExternal={button.isExternal}
                                        externalHref={button.externalHref}
                                        anchor={button.anchor}
                                        onClick={button.onClick}
                                        className={button.className}
                                        wrapperClassName={styles['c-headerBasic__btn']}
                                    />
                                </ScaleInOut>
                            }
                        </div>
                    </div>
                </section>
            }
        </>
    );
}