import { query, useSuperWindow } from '@stereorepo/sac';

class Burger {
    constructor({
        burgerSelector = '.js-burger',
        mainNavigationSelector = '.js-main-navigation'
    }) {
        this.state = {
            burgerActivated: false
        };

        useSuperWindow();

        this.burgerSelector = burgerSelector;
        this.mainNavigationSelector = mainNavigationSelector;

        this.transitionElementDuration = null;
    }
    toggleNoScroll({ transitionElement, noScroll }) {
        const removeScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            document.documentElement.style.top = `${-scrollY}px`;
            document.documentElement.classList.add('no-scroll');

            transitionElement.removeEventListener(
                'transitionend',
                removeScroll,
                false
            );
        };

        if (noScroll) {
            if (
                !this.transitionElementDuration ||
                this.transitionElementDuration === '0s'
            ) {
                this.transitionElementDuration = getComputedStyle(
                    transitionElement
                ).getPropertyValue('transition-duration');
            }

            if (this.transitionElementDuration !== '0s') {
                transitionElement.addEventListener(
                    'transitionend',
                    removeScroll,
                    false
                );
            } else {
                removeScroll();
            }
        } else {
            const scrollY = Math.abs(
                parseInt(
                    document.documentElement.style.top.replace('px', ''),
                    10
                )
            );
            document.documentElement.style.top = '';
            document.documentElement.classList.remove('no-scroll');

            setTimeout(() => {
                window.scrollTo(0, scrollY);
            }, 0);
        }
    }
    makeTheDamnBurger() {
        this.state.burgerActivated = !this.state.burgerActivated;
        const [mainNav] = query({ selector: this.mainNavigationSelector });

        this.burger.classList.toggle('activated');
        mainNav.classList.toggle('activated');

        mainNav.setAttribute('aria-expanded', this.state.burgerActivated);
        this.toggleNoScroll({
            transitionElement: mainNav,
            noScroll: this.state.burgerActivated
        });
    }
    thisBurgerIsTooFat() {
        if (
            window.$stereorepo.superWindow.currentBreakpoint === 'xl' &&
            this.state.burgerActivated
        ) {
            this.makeTheDamnBurger();
        }
    }
    bigMacOrWhopper() {
        const [burger] = query({ selector: this.burgerSelector });
        this.burger = burger;

        if (!burger) return;

        burger.addEventListener(
            'click',
            () => {
                this.makeTheDamnBurger();
            },
            false
        );

        window.$stereorepo.superWindow.addResizeFunction(
            this.thisBurgerIsTooFat
        );
    }
}

export default Burger;
